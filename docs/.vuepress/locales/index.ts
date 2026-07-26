import zhCN from './zh-CN'
import enUS from './en-US'

export type MessageSchema = typeof zhCN

export const messages = {
  'zh-CN': zhCN,
  zh: zhCN,
  'en-US': enUS,
  en: enUS,
} as const

export type LocaleCode = keyof typeof messages

export { zhCN, enUS }
