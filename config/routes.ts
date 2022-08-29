export default [
    {
        path: '/',
        component: '../layout/BasicLayout',
        routes: [
            { path: '/', component: './Home' },
            { path: '/research', component: './Research' },
        ],
    },
];
