#!/usr/bin/env node
// 生成常用汉字拼音数据
//
// 数据来源：Unicode Unihan 数据库中的 kTGHZ2013 字段（通用规范汉字表）
// 用途：插件市场按名称排序时，中文名按拼音与英文名混排
//
// 用法：
//   node scripts/pinyin/generate.mjs [Unihan_Readings.txt 路径]
//   未指定路径时会自动下载并解压 Unihan.zip 到 .temp/unihan
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const UNIHAN_URL = 'https://www.unicode.org/Public/UCD/latest/ucd/Unihan.zip'
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = resolve(SCRIPT_DIR, '../..')
const TEMP_DIR = resolve(ROOT_DIR, '.temp/unihan')
const OUTPUT_FILE = resolve(ROOT_DIR, 'docs/.vuepress/data/pinyin.ts')

const isHan = (code) =>
  (code >= 0x3400 && code <= 0x4dbf) ||
  (code >= 0x4e00 && code <= 0x9fff) ||
  (code >= 0xf900 && code <= 0xfaff)

// 去掉声调，ü 在 n/l/g 后写作 v，其余位置写作 u
const toPlainPinyin = (value) =>
  value
    .normalize('NFD')
    .replace(/([gln])u\u0308/g, '$1v')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

const resolveReadingsFile = () => {
  const arg = process.argv[2]
  if (arg) {
    const path = resolve(arg)
    if (!existsSync(path)) throw new Error(`指定的 Unihan 文件不存在: ${path}`)
    return path
  }

  const cached = resolve(TEMP_DIR, 'Unihan_Readings.txt')
  if (existsSync(cached)) return cached

  mkdirSync(TEMP_DIR, { recursive: true })
  const zipPath = resolve(TEMP_DIR, 'Unihan.zip')
  console.log(`下载 Unihan 数据库: ${UNIHAN_URL}`)
  execFileSync('curl', ['-sSL', '-o', zipPath, UNIHAN_URL], { stdio: 'inherit' })
  console.log('解压 Unihan 数据库')
  execFileSync('unzip', ['-o', '-q', zipPath, '-d', TEMP_DIR], { stdio: 'inherit' })
  return cached
}

const parsePinyin = (readingsFile) => {
  const lines = readFileSync(readingsFile, 'utf8').split('\n')
  const groups = new Map()

  for (const line of lines) {
    if (!line || line.startsWith('#')) continue
    const [codePoint, field, value] = line.split('\t')
    if (field !== 'kTGHZ2013') continue

    const code = Number.parseInt(codePoint.replace(/^U\+/, ''), 16)
    if (!Number.isFinite(code) || !isHan(code)) continue

    const first = value.trim().split(/\s+/)[0]
    const pinyin = toPlainPinyin(first.includes(':') ? first.split(':')[1] : first)
    if (!/^[a-z]+$/.test(pinyin)) continue

    const char = String.fromCodePoint(code)
    if (!groups.has(pinyin)) groups.set(pinyin, [])
    groups.get(pinyin).push(char)
  }

  return groups
}

const renderModule = (groups) => {
  const lines = [...groups.entries()]
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([pinyin, chars]) => `${pinyin}${chars.sort().join('')}`)

  return `// 常用汉字拼音数据（通用规范汉字表，去除非 BMP 汉字后约 7900 字）
// 数据来源：Unicode Unihan kTGHZ2013，由 scripts/pinyin/generate.mjs 生成
// 每行格式为「音节 + 该音节下的汉字」，运行时解析为 汉字 -> 拼音 的映射
export const PINYIN_DATA = \`
${lines.join('\n')}
\`
`
}

const groups = parsePinyin(resolveReadingsFile())
const module = renderModule(groups)
mkdirSync(dirname(OUTPUT_FILE), { recursive: true })
writeFileSync(OUTPUT_FILE, module)
console.log(`已写入 ${OUTPUT_FILE}`)
console.log(`音节数量: ${groups.size}，汉字数量: ${[...groups.values()].reduce((sum, list) => sum + list.length, 0)}`)
