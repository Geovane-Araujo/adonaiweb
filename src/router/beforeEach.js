import store from '../store'

export default async (to, from, next) => {
  document.title = 'AdonaiSoft - Igreja'

  if (to.name !== 'login' && !store.getters['auth/hasToken']) {
    try {
      await store.dispatch('auth/ActionCheckinToken')
      next({ name: to.name })
    } catch (err) {
      next({ name: 'login' })
    }
  } else {
    if (to.name === 'login' && store.getters['auth/hasToken']) {
      next({ name: '/' })
    } else {
      next()
    }
  }
}
