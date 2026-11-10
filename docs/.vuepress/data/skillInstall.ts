// @ts-ignore
import promptRaw from '../../code/fba-skill-install.txt?raw'

/**
 * fba 技能入口的摆放规则
 *
 * - 卡片形态：只放在「AI 赋能入口」与「开发流程起点」页，每类仅一处
 * - 行内形态：只出现在已经提到「让 AI 干活」的句子里，替换原有普通链接，不新增段落
 * - 其余页面一律不加，避免同一入口反复出现
 *
 * fba 技能安装提示词（唯一来源）
 *
 * 提示词正文存放于 `docs/code/fba-skill-install.txt`，网站上的安装卡片、
 * 行内复制按钮以及 llms.txt 中的 `<llm-only>` 段落都使用同一份内容
 *
 * 该内容由 SkillPay 官方购买流程确定，请勿增删改写任何字符，包括行尾空格
 */
export const FBA_SKILL_INSTALL_PROMPT = promptRaw.replace(/\n$/, '')

/**
 * fba 技能官方安装与购买说明地址
 */
export const FBA_SKILL_PAY_URL = 'https://skillpay.alipay.com/userguide.md'
