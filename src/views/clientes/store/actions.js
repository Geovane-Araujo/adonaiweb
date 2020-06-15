import services from '@/http'
import * as types from './mutation-types'

export const ActionSetCliente = ({ dispatch }) => {
  return services.cliente.clienteListar().then(res => {
    dispatch('ActionCliente', res.data)
  })
}

export const ActionCliente = ({ commit }, payload) => {
  commit(types.SET_CLIENTE, payload)
}

export const SalvarCliente = ({ dispatch }, payload) => {
  return services.cliente.clienteSalvar(payload).then(res => {
    dispatch('ActionCliente', res.data)
  })
}
