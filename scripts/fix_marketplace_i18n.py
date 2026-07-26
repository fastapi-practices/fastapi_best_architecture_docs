from pathlib import Path
import re

path = Path(r'D:\git_projects\fastapi_best_architecture_docs\docs\.vuepress\components\PluginMarketplace.vue')
text = path.read_text(encoding='utf-8')

replacements = [
    ("t('插件市场', 'Plugin Marketplace')", "t('marketplace.title')"),
    ("t('发现由', 'Discover plugins listed in')", "t('marketplace.subtitleBefore')"),
    ("t('收录的插件，扩展你的应用能力', 'to extend your application')", "t('marketplace.subtitleAfter')"),
    ("t('创建插件', 'Create Plugin')", "t('marketplace.create')"),
    ("t('申请插件', 'Request Plugin')", "t('marketplace.request')"),
    ("t('发布插件', 'Publish Plugin')", "t('marketplace.publish')"),
    (
        "t('探索符合你需求的插件：名称、作者、描述...', 'Search plugins by name, author, or description...')",
        "t('marketplace.searchPlaceholder')",
    ),
    ("t('全部', 'All')", "t('marketplace.all')"),
    ("t('正在加载插件列表...', 'Loading plugins...')", "t('marketplace.loading')"),
    ("t('重试', 'Retry')", "t('marketplace.retry')"),
    ("t('未找到匹配的插件', 'No matching plugins found')", "t('marketplace.empty')"),
    ("t('清除筛选', 'Clear filters')", "t('marketplace.clearFilters')"),
    ("t('已复制安装命令', 'Install command copied')", "t('marketplace.installCommandCopied')"),
    ("t('安装插件', 'Install plugin')", "t('marketplace.installPlugin')"),
    ("t('已复制', 'Copied')", "t('marketplace.copied')"),
    ("t('安装', 'Install')", "t('marketplace.install')"),
    ("t('分享', 'Share')", "t('marketplace.share')"),
    ("t('关闭安装提示', 'Close install tip')", "t('marketplace.closeInstallTip')"),
    ("t('查看安装文档', 'View install docs')", "t('marketplace.viewInstallDocs')"),
    ("t('前端', 'Frontend')", "t('marketplace.frontend')"),
    ("t('后端', 'Backend')", "t('marketplace.backend')"),
    ("t('#前端', '#frontend')", "t('marketplace.frontendAnchor')"),
    ("t('#后端', '#backend')", "t('marketplace.backendAnchor')"),
    ("t('官方', 'Official')", "t('marketplace.official')"),
    ("t('社区', 'Community')", "t('marketplace.community')"),
    ("t('安装命令已复制', 'Install command copied')", "t('marketplace.installCommandCopiedTitle')"),
    (
        "t('请在后端项目根目录激活虚拟环境后执行', 'Activate the venv in the backend project root, then run it')",
        "t('marketplace.activateVenvTip')",
    ),
    (
        "t('CLI 会继续询问前端项目根路径', 'The CLI will then ask for the frontend project root')",
        "t('marketplace.frontendPathTip')",
    ),
    (
        "t('按插件 README 完成配置后重启服务', 'Finish configuration per the plugin README, then restart the service')",
        "t('marketplace.restartServiceTip')",
    ),
    ("t('值得放进你的项目里试一试。', 'Worth trying in your project.')", "t('marketplace.shareTry')"),
]

for old, new in replacements:
    if old not in text:
        print('MISSING:', old[:80])
    else:
        text = text.replace(old, new)

text = re.sub(
    r"t\(`已复制「\$\{pluginName\}」的安装命令`, `Install command for \"\$\{pluginName\}\" copied`\)",
    "t('marketplace.installCommandCopiedFor', { name: pluginName })",
    text,
)
text = re.sub(
    r"t\(`发现一个不错的 fba 插件「\$\{summary\}」`, `Found a solid fba plugin: \"\$\{summary\}\"`\)",
    "t('marketplace.shareFound', { name: summary })",
    text,
)
text = re.sub(
    r"t\(`仓库地址：\$\{plugin\.git\.url\}`, `Repository: \$\{plugin\.git\.url\}`\)",
    "t('marketplace.shareRepo', { url: plugin.git.url })",
    text,
)

old_tags = """const TAG_LABELS_ZH: Record<string, string> = {
  ai: 'AI',
  mcp: 'MCP',
  agent: 'Agent',
  auth: '认证',
  storage: '存储',
  notification: '通知',
  task: '任务',
  payment: '支付',
  other: '其他'
}

const TAG_LABELS_EN: Record<string, string> = {
  ai: 'AI',
  mcp: 'MCP',
  agent: 'Agent',
  auth: 'Auth',
  storage: 'Storage',
  notification: 'Notification',
  task: 'Task',
  payment: 'Payment',
  other: 'Other'
}

"""
if old_tags in text:
    text = text.replace(old_tags, '')
else:
    print('TAG block not found exactly')

text = text.replace(
    "const { t, withLocale } = useI18n()",
    "const { t, tm, withLocale } = useI18n()",
)

old_get = """const getTagLabel = (tag: string): string => {
  const labels = t(TAG_LABELS_ZH, TAG_LABELS_EN)
  return labels[tag] || tag
}"""
new_get = """const getTagLabel = (tag: string): string => {
  const fixed: Record<string, string> = { ai: 'AI', mcp: 'MCP', agent: 'Agent' }
  if (fixed[tag]) return fixed[tag]
  const labels = tm<Record<string, string>>('marketplace.tags') || {}
  return labels[tag] || tag
}"""
if old_get in text:
    text = text.replace(old_get, new_get)
else:
    print('getTagLabel block not found')

path.write_text(text, encoding='utf-8')
print('updated PluginMarketplace.vue')

# leftover dual-arg style (string, string)
leftover = re.findall(r"t\(\s*['\"`][^'\"`]+['\"`]\s*,\s*['\"`]", text)
print('leftover dual-string t():', leftover)
