import NProgress from 'nprogress'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { setPageTitle } from '@/utils'

let routes: RouteRecordRaw[] = []

const routesContext: any = import.meta.glob('./modules/*.ts', { eager: true })
Object.keys(routesContext).forEach((v) => {
  routes.push(routesContext[v].default)
})
routes.push({
  path: '/:pathMatch(.*)*',
  component: () => import('@/pages/[...all].vue'),
  meta: {
    title: '找不到页面',
  },
})
routes = routes.flat()

// generatedRoutes.forEach((v) => {
//   routes.push(v?.meta?.layout !== false ? setupLayouts([v])[0] : v)
// })

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  // const tokenOutsideStore = useTokenStore()
  // NProgress.start()
  // if (to.meta.requireLogin) {
  //   if (tokenOutsideStore.isLogin) {
  //     next()
  //   }
  //   else {
  //     next({
  //       path: '/login',
  //       query: {
  //         redirect: to.fullPath,
  //       },
  //     })
  //   }
  // }
  // else {
  //   next()
  // }
  next()
})

router.afterEach((to) => {
  NProgress.done()
  setPageTitle(to.meta.title ?? '')
})

export default router
