import { PINYIN_DATA } from '../data/pinyin'

// 汉字 -> 拼音 映射，按音节分组解析
const PINYIN_MAP = new Map<string, string>()

for (const group of PINYIN_DATA.split(/\s+/)) {
  if (!group) continue
  const match = group.match(/^([a-z]+)([^a-z]+)$/)
  if (!match) continue
  const [, pinyin, chars] = match
  for (const char of chars) {
    PINYIN_MAP.set(char, pinyin)
  }
}

// 生成排序键：中文转拼音，英文原样保留，使中英文按同一套 A-Z 规则混排
export const toPinyinSortKey = (text: string): string => {
  let key = ''
  for (const char of text) {
    key += PINYIN_MAP.get(char) ?? char
  }
  return key
}

// 拼音排序比较器，固定语言环境保证各浏览器排序结果一致
export const compareByPinyin = (a: string, b: string): number => {
  const collator = new Intl.Collator('en-US', { numeric: true, sensitivity: 'base' })
  const byKey = collator.compare(toPinyinSortKey(a), toPinyinSortKey(b))
  if (byKey !== 0) return byKey
  return collator.compare(a, b)
}
