
export const plans = {
    openSource: {
        title: '开源版',
        description: '适合个人开发者和小型项目',
        features: [
            '全部基础功能',
            '全量架构源码',
            '社区支持',
            'MIT许可证',
            '无需保留版权',
            '无需保留许可声明',
            '自主部署',
            '部分文档访问',
            '部分插件源码'
        ]
    },
    professional: {
        title: '专业版',
        description: '适合中小企业和专业开发者',
        price: {
            current: '￥99',
            original: '￥1999'
        },
        features: [
            '所有开源版功能',
            '优先支持',
            '一对一指导',
            '远程支持',
            '所有文档访问',
            '所有官方插件源码'
        ]
    },
    enterprise: {
        title: '企业版',
        description: '适合大型企业和关键业务',
        price: {
            current: '￥xxxx',
            original: '￥xxxx'
        },
        features: [
            '所有专业版功能',
        ]
    }
}
