import { routes as home } from '../views/home'
import { routes as dashboard } from '../views/dashboard'
import { routes as auth } from '../modules/auth'

export default [
  ...auth,
  ...dashboard,
  ...home
]
