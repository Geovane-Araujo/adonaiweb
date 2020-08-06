import services from '@/http'
import * as storage from '../storage'
import * as types from './mutation-types'

export const ActionLogin = ({ dispatch }, payload) => {
  return services.auth.login(payload).then(res => {
    dispatch('ActionUser', res.data.login)
    dispatch('ActionToken', res.data.login.token)
  })
}

export const ActionUser = ({ commit }, payload) => {
  commit(types.SET_USER, payload)
}

export const ActionToken = ({ commit }, payload) => {
  storage.setToken(payload)
  commit(types.SET_TOKEN, payload)
}

// verificar o token no state
export const ActionCheckinToken = ({ dispatch, state }) => {
  if (state.token) {
    return Promise.resolve(state.token)
  } else {
    return Promise.reject(new Error('Token inválido'))
  }
}
