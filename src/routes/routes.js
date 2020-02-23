import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

//Admin Views
import Requests from 'src/pages/Requests.vue'
import Accounts from 'src/pages/Accounts.vue'

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
