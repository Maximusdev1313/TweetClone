
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () =>
        import('pages/Index.vue'),
        name: 'Home'

      },
      {
        path: '/about',
        component: () =>
        import('pages/About.vue'),
        name: 'About'
      },
      {
        path: '/register',
        component: () =>
        import('pages/Register.vue'),
        name: 'Register'
      },
      {
        path: '/signin',
        component: () =>
        import('pages/SignIn.vue'),
        name: 'SignIn'
      },
      {
        path: '/feed',
        component: () =>
        import('pages/Feed.vue'),
        name: 'Feed'
      }
    ]
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  },

]

export default routes
