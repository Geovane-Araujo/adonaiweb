import * as types from './mutation-types'

export default {
  [types.SET_CARGO] (state, payload) {
    state.cargo = payload
  }
}
