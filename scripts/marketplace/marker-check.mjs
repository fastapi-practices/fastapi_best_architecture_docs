#!/usr/bin/env node
// 校验「标签/主题收录」的判定规则，确保与文档描述一致
//
// 文档（docs/plugin/share.md、skills 的 plugin-sharing.md）声称：
//   1. 主题与标签命中其一即可收录
//   2. 比较时不区分大小写，但字母必须一致
//   3. GitHub 的主题由平台规范为小写
//
// 官方工作流只写主题，标签是历史写法，采集端仍然兼容
import { hasMarker } from './collect.mjs'

const cases = [
  { labels: ['fba-plugin'], topics: [], expected: true, note: '全小写标签' },
  { labels: ['FBA-Plugin'], topics: [], expected: true, note: '大写标签，采集端统一转小写' },
  { labels: ['Fba-Plugin'], topics: [], expected: true, note: '混合大小写标签' },
  { labels: ['FBA-PLUGIN'], topics: [], expected: true, note: '全大写标签' },
  { labels: ['FB-Plugin'], topics: [], expected: false, note: '字母不一致的拼写' },
  { labels: ['Fb-Plugin'], topics: [], expected: false, note: '字母不一致的拼写' },
  { labels: [], topics: ['fba-plugin'], expected: true, note: '同名主题' },
  { labels: ['bug'], topics: [], expected: false, note: '无关标签' },
  { labels: [], topics: ['other'], expected: false, note: '无关主题' },
]

let failed = 0

for (const item of cases) {
  const actual = hasMarker(item.labels, item.topics)
  const passed = actual === item.expected
  if (!passed) failed += 1
  const signal = JSON.stringify([...item.labels, ...item.topics])
  console.log(`${passed ? 'ok  ' : 'FAIL'} ${item.note}: ${signal} -> ${actual}`)
}

if (failed > 0) {
  console.error(`\n${failed} 项与文档描述不一致`)
  process.exit(1)
}

console.log('\n全部通过')
