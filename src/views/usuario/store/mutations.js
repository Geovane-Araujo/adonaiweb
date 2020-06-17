import * as types from './mutation-types'

export default {
  [types.SET_USUARIO] (state, payload) {
    state.usuario = payload
  }
}
