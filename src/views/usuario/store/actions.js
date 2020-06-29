import services from '@/http'
import * as types from './mutation-types'

export const ActionSetUsuario = ({ dispatch }) => {
  return services.usuario.usuarioListar().then(res => {
    dispatch('ActionUsuario', res.data)
  })
}

export const ActionUsuario = ({ commit }, payload) => {
  commit(types.SET_USUARIO, payload)
}

export const SalvarUsuario = ({ dispatch }, payload) => {
  return services.usuario.usuarioSalvar(payload).then(res => {
    dispatch('ActionUsuario', res.data)
  })
}
