import services from '@/http'
import * as types from './mutation-types'

export const ActionSetTipoconta = ({ dispatch }) => {
  return services.tipoconta.tipoContaListar().then(res => {
    dispatch('ActionTipoConta', res.data)
  })
}

export const ActionTipoConta = ({ commit }, payload) => {
  commit(types.SET_TIPOCONTA, payload)
}

export const SalvarTipoconta = ({ dispatch }, payload) => {
  return services.tipoconta.tipoContaSalvar(payload).then(res => {
    dispatch('ActionTipoConta', res.data)
  })
}
