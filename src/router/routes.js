import { routes as home } from '../views/home'
import { routes as auth } from '../login/auth'
import { routes as register } from '../register'
import { routes as newchurch } from '../newchurch'

export default [
  ...auth,
  ...home,
  ...register,
  ...newchurch
]
