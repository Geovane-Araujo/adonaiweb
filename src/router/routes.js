import { routes as home } from '../views/home'
import { routes as auth } from '../modules/auth'

export default [
  ...auth,
  ...home
]
