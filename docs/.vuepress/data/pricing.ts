export const plans = {
    openSource: {
        title: '开源版',
        description: ' 个人开发者与独立项目之选',
        features: [
            '所有基础功能',
            '所有架构源码',
            '所有官方插件',
            '所有文档访问',
            '自由使用',
            '自主部署',
            'MIT 许可证',
            '无需保留版权',
            '无需保留许可声明',
        ]
    },
    professional: {
        title: '专业版',
        description: '专业开发者的得力助手',
        price: {
            current: '任意打赏',
            original: '￥1999'
        },
        features: [
            '所有开源版功能',
            'Discord 身份标签',
            'Discord 专属频道',
            '优先支持',
            '部署指导',
        ]
    },
    enterprise: {
        title: '企业版',
        description: '为团队与大规模项目而生',
        price: {
            current: '￥xxxx',
            original: '￥19999'
        },
        features: [
            '所有专业版功能',
            '专属企业群组',
            '远程支持',
            '......',
        ]
    }
}
