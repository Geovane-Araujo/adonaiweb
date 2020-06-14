import services from '@/http'
import * as types from './mutation-types'

export const ActionSetCargo = ({ dispatch }) => {
  return services.cargo.cargoListar().then(res => {
    dispatch('ActionCargo', res.data)
  })
}

export const ActionCargo = ({ commit }, payload) => {
  commit(types.SET_CARGO, payload)
}

export const SalvarCargo = ({ dispatch }, payload) => {
  return services.cargo.cargoSalvar(payload).then(res => {
    dispatch('ActionCargo', res.data)
  })
}
