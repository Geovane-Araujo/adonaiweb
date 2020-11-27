import store from '../store'
// import router from '../router/index'

export default async (to, from, next) => {
  document.title = 'AdonaiSoft - Igreja'
  if (to.name === 'newchurch') {
    next()
  } else if (to.name === 'register') {
    next()
  } else if (to.name !== 'login' && !store.getters['auth/hasToken']) {
    try {
      await store.dispatch('auth/ActionCheckinToken')
      next({ name: to.name })
    } catch (err) {
      next({ name: 'login' })
    }
  } else {
    next()
  }
}
