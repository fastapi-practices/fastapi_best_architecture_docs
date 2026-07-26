import { computed, type ComputedRef } from 'vue'
import { useRouteLocale } from 'vuepress/client'
import { useData } from 'vuepress-theme-plume/client'
import { messages, type LocaleCode, type MessageSchema } from '../locales'

type MessageParams = Record<string, string | number>

function resolveLocaleCode(lang: string, routeLocale: string): LocaleCode {
  if (routeLocale.startsWith('/en') || lang.startsWith('en')) return 'en-US'
  if (lang in messages) return lang as LocaleCode
  return 'zh-CN'
}

function getByPath(source: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, source)
}

function interpolate(template: string, params?: MessageParams): string {
  if (!params) return template
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    params[key] === undefined || params[key] === null ? `{${key}}` : String(params[key]),
  )
}

/**
 * Component i18n helper.
 *
 * Usage:
 * - `t('footer.quickStart')` → resolve from locale message files
 * - `t('marketplace.shareFound', { name: 'xxx' })` → interpolate `{name}`
 * - `tm('testimonials.items')` → return non-string message values (arrays/objects)
 */
export function useI18n() {
  const routeLocale = useRouteLocale()
  const { lang } = useData()

  const localeCode: ComputedRef<LocaleCode> = computed(() =>
    resolveLocaleCode(lang.value, routeLocale.value),
  )

  const isEn = computed(() => localeCode.value.startsWith('en'))
  const localePath = computed(() => (isEn.value ? '/en' : ''))
  const messagesRef = computed(() => messages[localeCode.value] ?? messages['zh-CN'])

  /** Prefix an internal path with the current locale root. */
  const withLocale = (path: string) => {
    if (!path || path.startsWith('http') || path.startsWith('//')) return path
    const normalized = path.startsWith('/') ? path : `/${path}`
    if (!isEn.value) return normalized
    if (normalized === '/en' || normalized.startsWith('/en/')) return normalized
    return `/en${normalized}`
  }

  /**
   * Translate a message key, e.g. `t('footer.docs')`.
   * Supports simple `{name}` interpolation via the second argument.
   */
  const t = (key: string, params?: MessageParams): string => {
    const value = getByPath(messagesRef.value, key)
    if (typeof value === 'string') return interpolate(value, params)
    if (import.meta.env?.DEV) {
      console.warn(`[i18n] missing or non-string key: ${key}`)
    }
    return key
  }

  /**
   * Return a message value of any type (array/object/string), e.g. `tm('testimonials.items')`.
   */
  const tm = <T = unknown>(key: string): T => {
    const value = getByPath(messagesRef.value, key)
    if (value === undefined) {
      if (import.meta.env?.DEV) {
        console.warn(`[i18n] missing key: ${key}`)
      }
      return key as T
    }
    return value as T
  }

  return {
    isEn,
    lang,
    localeCode,
    localePath,
    messages: messagesRef as ComputedRef<MessageSchema>,
    routeLocale,
    withLocale,
    t,
    tm,
  }
}
