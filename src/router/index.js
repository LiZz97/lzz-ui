import {createRouter, createWebHashHistory} from "vue-router";
import layout from '../layout.vue'

export const global = [
    { 
        path: '/',
        component: layout,
        redirect: '/Buttons',
        children: [
            {
                path: '/Buttons',
                component: () => import('../views/template-Buttons.vue')
            },
            {
                path: '/Dialog',
                component: () => import('../views/template-Dialog.vue')
            },
            {
                path: '/Table',
                component: () => import('../views/template-Table.vue')
            },
            {
                path: '/Form',
                component: () => import('../views/template-Form.vue')
            },
            {
                path: '/Upload',
                component: () => import('../views/template-Upload.vue')
            }
        ]
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: global
});

export default router;