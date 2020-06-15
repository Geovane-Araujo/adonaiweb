import * as types from './mutation-types'

export default {
  [types.SET_CLIENTE] (state, payload) {
    state.cliente = payload
  }
}
