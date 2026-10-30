<template>
  <span class="hero-title-particles" hidden aria-hidden="true" />
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { useRoute } from 'vuepress/client'

interface Particle {
  hx: number
  hy: number
  x: number
  y: number
  vx: number
  vy: number
  ch: string
}

interface TextLine {
  text: string
  x: number
  y: number
}

interface Palette {
  calm: string
  heroFrom: string
  heroTo: string
}

const PARTICLE_CHAR = '+'
const TITLE_SELECTOR = '.vp-home-hero .hero-name, .vp-home-hero .hero-tagline'
const MOTION = {
  effectRadius: 54,
  influenceRadius: 84,
  repel: 1.35,
  pointerInfluence: 0.035,
  spring: 0.045,
  damping: 0.78,
}
const route = useRoute()
const instances = new Set<TitleParticles>()

let mountFrame = 0
let disposed = false
let themeObserver: MutationObserver | null = null

function readPalette(): Palette {
  const isDark = document.documentElement.dataset.theme === 'dark'
  return {
    calm: isDark ? '#f1eee8' : '#292930',
    heroFrom: isDark ? '#d0b5ff' : '#5b3db7',
    heroTo: isDark ? '#5ff2df' : '#00756d',
  }
}

function isWhitespace(char: string) {
  return !char.trim()
}

function collectTextLines(element: HTMLElement, rect: DOMRect): TextLine[] {
  const lines: TextLine[] = []
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT)
  let node = walker.nextNode() as Text | null

  while (node) {
    const value = node.nodeValue || ''
    if (!value.trim()) {
      node = walker.nextNode() as Text | null
      continue
    }

    const glyphs: Array<{ start: number; end: number; rect: DOMRect }> = []
    let offset = 0

    for (const char of Array.from(value)) {
      const end = offset + char.length
      if (!isWhitespace(char)) {
        const range = document.createRange()
        range.setStart(node, offset)
        range.setEnd(node, end)
        const glyphRect = Array.from(range.getClientRects()).find(item => item.width > 0 && item.height > 0)
        if (glyphRect) {
          glyphs.push({ start: offset, end, rect: glyphRect })
        }
      }
      offset = end
    }

    const groups: Array<{ top: number; bottom: number; left: number; glyphs: typeof glyphs }> = []

    for (const glyph of glyphs) {
      const tolerance = Math.max(2, glyph.rect.height * 0.25)
      const group = groups.find(item => Math.abs(item.top - glyph.rect.top) <= tolerance)
      if (group) {
        group.top = Math.min(group.top, glyph.rect.top)
        group.bottom = Math.max(group.bottom, glyph.rect.bottom)
        group.left = Math.min(group.left, glyph.rect.left)
        group.glyphs.push(glyph)
      } else {
        groups.push({
          top: glyph.rect.top,
          bottom: glyph.rect.bottom,
          left: glyph.rect.left,
          glyphs: [glyph],
        })
      }
    }

    for (const group of groups) {
      const minStart = Math.min(...group.glyphs.map(item => item.start))
      const maxEnd = Math.max(...group.glyphs.map(item => item.end))
      const text = value.slice(minStart, maxEnd).trim()
      if (!text) continue

      lines.push({
        text,
        x: group.left - rect.left,
        y: (group.top + group.bottom) / 2 - rect.top,
      })
    }

    node = walker.nextNode() as Text | null
  }

  if (!lines.length) {
    const text = element.textContent?.trim()
    if (text) {
      lines.push({ text, x: rect.width / 2, y: rect.height / 2 })
    }
  }

  return lines
}

function buildFont(style: CSSStyleDeclaration) {
  return [style.fontStyle, style.fontWeight, style.fontSize, style.fontFamily].join(' ')
}

class TitleParticles {
  private readonly element: HTMLElement
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D
  private readonly originalStyle: string | null
  private readonly resizeObserver: ResizeObserver
  private readonly reducedMotion: boolean
  private readonly isTitle: boolean
  private readonly mouse = {
    x: -10000,
    y: -10000,
    vx: 0,
    vy: 0,
    previousX: null as number | null,
    previousY: null as number | null,
  }

  private particles: Particle[] = []
  private lines: TextLine[] = []
  private palette = readPalette()
  private titleGradient: CanvasGradient | null = null
  private raf = 0
  private width = 0
  private height = 0
  private padding = 0
  private dpr = 1
  private fontSize = 10
  private textFont = ''
  private destroyed = false

  constructor(element: HTMLElement) {
    this.element = element
    this.isTitle = element.classList.contains('hero-name')
    this.originalStyle = element.getAttribute('style')
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    this.canvas = document.createElement('canvas')
    this.canvas.setAttribute('aria-hidden', 'true')
    this.canvas.style.cssText = [
      'position:absolute',
      'display:block',
      'pointer-events:none',
    ].join(';')

    const context = this.canvas.getContext('2d')
    if (!context) throw new Error('Canvas 2D is not available')
    this.ctx = context

    this.activate()
    this.build()

    this.resizeObserver = new ResizeObserver(() => this.build())
    this.resizeObserver.observe(this.element)

    if (document.fonts) {
      document.fonts.ready.then(() => {
        if (!this.destroyed) this.build()
      })
    }
  }

  private activate() {
    this.element.style.position = 'relative'
    this.element.style.backgroundImage = 'none'
    this.element.style.backgroundClip = 'border-box'
    this.element.style.setProperty('-webkit-background-clip', 'border-box')
    this.element.style.color = 'transparent'
    this.element.style.setProperty('-webkit-text-fill-color', 'transparent')
    this.element.style.textShadow = 'none'
    this.element.appendChild(this.canvas)
  }

  private build() {
    if (this.destroyed) return

    const rect = this.element.getBoundingClientRect()
    if (!rect.width || !rect.height) return

    const style = getComputedStyle(this.element)
    const computedFontSize = Number.parseFloat(style.fontSize) || 48
    const padding = Math.max(14, Math.ceil(computedFontSize * 0.34))
    const layoutWidth = Math.round(rect.width)
    const width = layoutWidth + padding * 2
    const height = Math.round(rect.height) + padding * 2

    this.width = width
    this.height = height
    this.padding = padding
    this.palette = readPalette()

    const dpr = Math.max(1, window.devicePixelRatio || 1)
    this.dpr = dpr
    this.canvas.width = Math.round(width * dpr)
    this.canvas.height = Math.round(height * dpr)
    this.canvas.style.left = `${-padding}px`
    this.canvas.style.top = `${-padding}px`
    this.canvas.style.width = `${width}px`
    this.canvas.style.height = `${height}px`
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    this.titleGradient = this.isTitle ? this.createTitleGradient() : null

    const lines = collectTextLines(this.element, rect)
    this.lines = lines
    this.textFont = buildFont(style)
    const source = document.createElement('canvas')
    source.width = width
    source.height = height

    const sourceCtx = source.getContext('2d', { willReadFrequently: true })
    if (!sourceCtx || !lines.length) return

    sourceCtx.font = this.textFont
    sourceCtx.textAlign = 'left'
    sourceCtx.textBaseline = 'middle'
    sourceCtx.fillStyle = '#fff'

    for (const line of lines) {
      sourceCtx.fillText(line.text, line.x + padding, line.y + padding)
    }

    const pixels = sourceCtx.getImageData(0, 0, width, height).data
    const compact = window.matchMedia('(max-width: 959px)').matches
    const particleSize = this.isTitle
      ? compact
        ? 8
        : Math.max(8.4, Math.min(9.6, Math.max(computedFontSize * 0.09, layoutWidth / 150)))
      : compact
        ? 7.2
        : Math.max(7.2, Math.min(8.4, Math.max(computedFontSize * 0.1, layoutWidth / 170)))
    const cellWidth = particleSize * 0.72
    const cellHeight = particleSize * 1.02
    const particles: Particle[] = []

    for (let y = cellHeight / 2; y < height; y += cellHeight) {
      for (let x = cellWidth / 2; x < width; x += cellWidth) {
        const left = Math.max(0, Math.floor(x - cellWidth / 2))
        const right = Math.min(width - 1, Math.ceil(x + cellWidth / 2))
        const top = Math.max(0, Math.floor(y - cellHeight / 2))
        const bottom = Math.min(height - 1, Math.ceil(y + cellHeight / 2))
        let alphaMax = 0

        for (let py = top; py <= bottom; py++) {
          for (let px = left; px <= right; px++) {
            alphaMax = Math.max(alphaMax, pixels[(py * width + px) * 4 + 3] / 255)
          }
        }

        if (alphaMax < 0.16) continue
        particles.push({ hx: x, hy: y, x, y, vx: 0, vy: 0, ch: PARTICLE_CHAR })
      }
    }

    this.fontSize = particleSize
    this.particles = particles
    this.drawStatic()
  }

  private start() {
    if (this.raf || this.destroyed || this.reducedMotion || !this.particles.length) return
    this.raf = requestAnimationFrame(this.tick)
  }

  private createTitleGradient() {
    const angle = 315 * Math.PI / 180
    const dx = Math.sin(angle)
    const dy = -Math.cos(angle)
    const centerX = this.width / 2
    const centerY = this.height / 2
    const halfLength = (Math.abs(this.width * dx) + Math.abs(this.height * dy)) / 2
    const gradient = this.ctx.createLinearGradient(
      centerX - dx * halfLength,
      centerY - dy * halfLength,
      centerX + dx * halfLength,
      centerY + dy * halfLength,
    )

    gradient.addColorStop(0, this.palette.heroFrom)
    gradient.addColorStop(0.15, this.palette.heroFrom)
    gradient.addColorStop(0.65, this.palette.heroTo)
    gradient.addColorStop(1, this.palette.heroTo)
    return gradient
  }

  private drawCrispText() {
    const ctx = this.ctx
    ctx.save()
    ctx.font = this.textFont
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = this.titleGradient || this.palette.calm

    for (const line of this.lines) {
      ctx.fillText(line.text, line.x + this.padding, line.y + this.padding)
    }
    ctx.restore()
  }

  private fillParticles(particles: Particle[], color: string | CanvasGradient) {
    const ctx = this.ctx
    ctx.fillStyle = color
    ctx.font = `700 ${this.fontSize}px "JetBrains Mono", ui-monospace, monospace`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    for (const particle of particles) {
      const x = Math.round(particle.x * this.dpr) / this.dpr
      const y = Math.round(particle.y * this.dpr) / this.dpr
      ctx.fillText(particle.ch, x, y)
    }
  }

  private get isPointerNear() {
    const margin = MOTION.influenceRadius
    const { x, y } = this.mouse
    return x >= -margin && x <= this.width + margin && y >= -margin && y <= this.height + margin
  }

  private drawPointerParticles() {
    if (!this.isPointerNear) return

    const ctx = this.ctx
    const mouse = this.mouse
    const radius = MOTION.effectRadius + 28
    const radiusSquared = radius * radius
    const particles = this.particles.filter((particle) => {
      const dx = particle.hx - mouse.x
      const dy = particle.hy - mouse.y
      return dx * dx + dy * dy <= radiusSquared
    })
    if (!particles.length) return

    ctx.save()
    ctx.beginPath()
    ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2)
    ctx.clip()
    this.fillParticles(particles, this.titleGradient || this.palette.calm)
    ctx.restore()
  }

  private drawScene() {
    const ctx = this.ctx
    const mouse = this.mouse
    ctx.clearRect(0, 0, this.width, this.height)
    this.drawCrispText()

    if (!this.isPointerNear) return

    const maskRadius = MOTION.effectRadius + 12
    const mask = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, maskRadius)
    mask.addColorStop(0, 'rgba(0, 0, 0, 1)')
    mask.addColorStop(0.72, 'rgba(0, 0, 0, 1)')
    mask.addColorStop(1, 'rgba(0, 0, 0, 0)')

    ctx.save()
    ctx.globalCompositeOperation = 'destination-out'
    ctx.fillStyle = mask
    ctx.beginPath()
    ctx.arc(mouse.x, mouse.y, maskRadius, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()

    this.drawPointerParticles()
  }

  private tick = () => {
    this.raf = 0
    if (this.destroyed || this.reducedMotion) return

    const mouse = this.mouse
    const radius = MOTION.influenceRadius
    const radiusSquared = radius * radius
    let isMoving = false

    if (this.isPointerNear) {
      for (const particle of this.particles) {
        const dx = particle.x - mouse.x
        const dy = particle.y - mouse.y
        const distanceSquared = dx * dx + dy * dy

        if (distanceSquared < radiusSquared) {
          const distance = Math.sqrt(distanceSquared) || 1
          const force = 1 - distance / radius
          const forceSquared = force * force
          particle.vx += dx / distance * forceSquared * MOTION.repel + mouse.vx * forceSquared * MOTION.pointerInfluence
          particle.vy += dy / distance * forceSquared * MOTION.repel + mouse.vy * forceSquared * MOTION.pointerInfluence
        }

        particle.vx += (particle.hx - particle.x) * MOTION.spring
        particle.vy += (particle.hy - particle.y) * MOTION.spring
        particle.vx *= MOTION.damping
        particle.vy *= MOTION.damping
        particle.x += particle.vx
        particle.y += particle.vy

        if (
          Math.abs(particle.vx) > 0.015
          || Math.abs(particle.vy) > 0.015
          || Math.abs(particle.x - particle.hx) > 0.05
          || Math.abs(particle.y - particle.hy) > 0.05
        ) {
          isMoving = true
        }
      }
    }

    mouse.vx *= 0.78
    mouse.vy *= 0.78
    this.drawScene()

    if (isMoving) this.raf = requestAnimationFrame(this.tick)
  }

  private drawStatic() {
    this.drawScene()
  }

  pointerMove(clientX: number, clientY: number) {
    if (this.destroyed || this.reducedMotion) return

    const rect = this.canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    const margin = MOTION.influenceRadius
    const mouse = this.mouse

    if (x < -margin || x > this.width + margin || y < -margin || y > this.height + margin) {
      mouse.x = mouse.y = -10000
      mouse.vx = mouse.vy = 0
      mouse.previousX = mouse.previousY = null
      this.start()
      return
    }

    if (mouse.previousX !== null && mouse.previousY !== null) {
      mouse.vx = Math.max(-18, Math.min(18, x - mouse.previousX))
      mouse.vy = Math.max(-18, Math.min(18, y - mouse.previousY))
    }

    mouse.previousX = mouse.x = x
    mouse.previousY = mouse.y = y
    this.start()
  }

  pointerLeave() {
    const mouse = this.mouse
    mouse.x = mouse.y = -10000
    mouse.previousX = mouse.previousY = null
    mouse.vx = mouse.vy = 0
    this.start()
  }

  refreshPalette() {
    this.build()
  }

  destroy() {
    this.destroyed = true
    cancelAnimationFrame(this.raf)
    this.resizeObserver.disconnect()
    this.canvas.remove()

    if (this.originalStyle === null) this.element.removeAttribute('style')
    else this.element.setAttribute('style', this.originalStyle)
  }
}

function clearInstances() {
  if (mountFrame) {
    cancelAnimationFrame(mountFrame)
    mountFrame = 0
  }
  for (const instance of instances) instance.destroy()
  instances.clear()
}

function mountInstances() {
  clearInstances()
  if (disposed) return

  const hero = document.querySelector<HTMLElement>('.vp-home-hero')
  if (!hero) return

  for (const element of document.querySelectorAll<HTMLElement>(TITLE_SELECTOR)) {
    try {
      instances.add(new TitleParticles(element))
    } catch (error) {
      console.warn('Unable to initialize hero title particles', error)
    }
  }
}

function scheduleMount() {
  if (mountFrame) cancelAnimationFrame(mountFrame)
  nextTick(() => {
    if (disposed) return
    mountFrame = requestAnimationFrame(() => {
      mountFrame = 0
      mountInstances()
    })
  })
}

function handlePointerMove(event: PointerEvent) {
  for (const instance of instances) instance.pointerMove(event.clientX, event.clientY)
}

function handlePointerOut(event: PointerEvent) {
  if (event.relatedTarget === null) {
    for (const instance of instances) instance.pointerLeave()
  }
}

function handleWindowBlur() {
  for (const instance of instances) instance.pointerLeave()
}

watch(() => route.path, scheduleMount)

onMounted(() => {
  window.addEventListener('pointermove', handlePointerMove, { passive: true })
  window.addEventListener('pointerout', handlePointerOut, { passive: true })
  window.addEventListener('blur', handleWindowBlur)

  let previousTheme = document.documentElement.dataset.theme
  themeObserver = new MutationObserver(() => {
    const theme = document.documentElement.dataset.theme
    if (theme === previousTheme) return
    previousTheme = theme
    for (const instance of instances) instance.refreshPalette()
  })
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

  scheduleMount()
})

onBeforeUnmount(() => {
  disposed = true
  clearInstances()
  themeObserver?.disconnect()
  themeObserver = null

  window.removeEventListener('pointermove', handlePointerMove)
  window.removeEventListener('pointerout', handlePointerOut)
  window.removeEventListener('blur', handleWindowBlur)
})
</script>
