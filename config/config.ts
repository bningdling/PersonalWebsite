// https://umijs.org/config/
import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
    history: {
        type: 'hash',
    },
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    hash: true,
    antd: {},
    locale: {
        antd: true,
    },
    dva: {
        hmr: true,
    },
    dynamicImport: {
        loading: '@ant-design/pro-layout/es/PageLoading',
    },
    targets: {
        ie: 11,
    },
    // umi routes: https://umijs.org/docs/routing
    routes,
    // Theme for antd: https://ant.design/docs/react/customize-theme-cn
    theme: {
        'primary-color': '#1890ff',
        'root-entry-name': 'default',
    },
    // esbuild is father build tools
    // https://umijs.org/plugins/plugin-esbuild
    esbuild: {},
    title: false,
    ignoreMomentLocale: true,
    manifest: {
        basePath: '/',
    },
    // Fast Refresh 热更新
    fastRefresh: {},
    nodeModulesTransform: {
        type: 'none',
    },
    // mfsu: {},
    webpack5: {},
    exportStatic: {},
});
