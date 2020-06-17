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
  if (payload.permissaoUsuario.relatorios === true) {
    payload.permissaoUsuario.relatorios = 1
  } else {
    payload.permissaoUsuario.relatorios = 0
  }
  if (payload.permissaoUsuario.membro === true) {
    payload.permissaoUsuario.membro = 1
  } else {
    payload.permissaoUsuario.membro = 0
  }
  if (payload.permissaoUsuario.despesas === true) {
    payload.permissaoUsuario.despesas = 1
  } else {
    payload.permissaoUsuario.despesas = 0
  }
  if (payload.permissaoUsuario.entradas === true) {
    payload.permissaoUsuario.entradas = 1
  } else {
    payload.permissaoUsuario.entradas = 0
  }
  if (payload.permissaoUsuario.caixa === true) {
    payload.permissaoUsuario.caixa = 1
  } else {
    payload.permissaoUsuario.caixa = 0
  }
  if (payload.permissaoUsuario.multiIgreja === true) {
    payload.permissaoUsuario.multiIgreja = 1
  } else {
    payload.permissaoUsuario.multiIgreja = 0
  }
  if (payload.permissaoUsuario.usuarios === true) {
    payload.permissaoUsuario.usuarios = 1
  } else {
    payload.permissaoUsuario.usuarios = 0
  }
  return services.usuario.usuarioSalvar(payload).then(res => {
    dispatch('ActionUsuario', res.data)
  })
}
