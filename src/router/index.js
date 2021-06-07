import Vue from 'vue'
import routes from './routes'
import Router from 'vue-router'
import before from './beforeEach'

Vue.use(Router)
const router = new Router({ routes })

router.beforeEach(before)

export default router
