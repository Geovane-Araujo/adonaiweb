import services from '@/http'
import * as types from './mutation-types'

export const ActionSetMembro = ({ dispatch }) => {
  return services.membro.membroListar().then(res => {
    dispatch('ActionMembro', res.data)
  })
}

export const ActionMembro = ({ commit }, payload) => {
  commit(types.SET_MEMBRO, payload)
}

export const SalvarMembro = ({ dispatch }, payload) => {
  return services.membro.membroSalvar(payload).then(res => {
    dispatch('ActionMembro', res.data)
  })
}
