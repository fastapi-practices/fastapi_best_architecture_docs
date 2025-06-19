import { ref } from "vue";

export interface Card {
    title: string;
    icon: string | { svg: string };
    href: string;
    description: string;
}

export const fbaCards = ref<Card[]>([
    {
        title: '操作人信息',
        icon: 'fluent-color:receipt-16',
        href: 'https://t.zsxq.com/virtV',
        description: '集成操作人信息到数据库表'
    },
    {
        title: 'Celery',
        icon: 'fluent-color:video-16',
        href: 'https://t.zsxq.com/qk5gZ',
        description: '优雅的使用 Celery'
    },
    {
        title: '数据权限',
        icon: 'fluent-color:video-16',
        href: 'https://t.zsxq.com/qlZyT',
        description: '超灵活的行级数据权限'
    },
    {
        title: '自定义中间件',
        icon: 'fluent-color:receipt-16',
        href: 'https://t.zsxq.com/P03oX',
        description: '自定义中间件的编写方法'
    },
    {
        title: '自定义异常',
        icon: 'fluent-color:receipt-16',
        href: 'https://t.zsxq.com/FS7jY',
        description: '轻松实现自定义异常并自动处理'
    },
    {
        title: '服务器部署',
        icon: 'fluent-color:video-16',
        href: 'https://t.zsxq.com/4Dv5Z',
        description: '从零到一在 Linux 上部署 fba'
    },
]);

export const fastapiCards = ref<Card[]>([
    {
        title: 'Socketio',
        icon: 'fluent-color:receipt-16',
        href: 'https://t.zsxq.com/Oi86a',
        description: '轻松集成 SocketIo'
    },
    {
        title: 'Header Token',
        icon: 'fluent-color:receipt-16',
        href: 'https://t.zsxq.com/7qYpx',
        description: '自定义 header token 实现授权'
    },
]);

export const pluginCards = ref<Card[]>([
    {
        title: 'SSO',
        icon: 'fluent-color:receipt-16',
        href: 'https://t.zsxq.com/xTvTi',
        description: '通过 Casdoor 实现 SSO 单点登录集成'
    },
]);
