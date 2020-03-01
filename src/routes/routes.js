import DashboardLayout from '../layout/DashboardLayout.vue'
import RequesterLayout from '../layout/RequesterLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

//Admin Views
import Requests from 'src/pages/Requests.vue'
import Accounts from 'src/pages/Accounts.vue'

import Kiosk from 'src/pages/Kiosk.vue'

import Login from 'src/pages/Login.vue'

const routes = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/accounts',
    children: [
      {
        path: 'accounts',
        name: 'accounts',
        component: Accounts
      },
      {
        path: 'requests',
        name: 'requests',
        component: Requests
      },
    ]
  },
  {
    path: '/engineer',
    component: DashboardLayout,
    redirect: '/engineer/requests',
    children: [
      {
        path: 'requests',
        name: 'requests',
        component: Requests
      },
    ]
  },
  {
    path: '/worker',
    component: DashboardLayout,
    redirect: '/worker/requests',
    children: [
      {
        path: 'requests',
        name: 'requests',
        component: Requests
      },
    ]
  },
  {
    path: '/requester',
    component: RequesterLayout,
    redirect: '/requester/kiosk',
    children: [
      {
        path: 'kiosk',
        name: 'kios',
        component: Kiosk
      },
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
