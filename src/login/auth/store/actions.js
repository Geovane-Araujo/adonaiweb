import services from '@/http'
import * as storage from '../storage'
import * as types from './mutation-types'

export const ActionLogin = ({ dispatch }, payload) => {
  return services.auth.login(payload).then(res => {
    sessionStorage.setItem('name', res.data.login.nome)
    sessionStorage.setItem('path', res.data.login.pathimg)
    sessionStorage.setItem('nomeigreja', res.data.login.igreja.nome)
    if (res.data.login.permissoesuser.membro === 1) {
      sessionStorage.setItem('membro', 0)
    } else {
      sessionStorage.setItem('membro', 1)
    }
    if (res.data.login.permissoesuser.despesas === 1) {
      sessionStorage.setItem('despesas', 0)
    } else {
      sessionStorage.setItem('despesas', 1)
    }
    if (res.data.login.permissoesuser.entradas === 1) {
      sessionStorage.setItem('entradas', 0)
    } else {
      sessionStorage.setItem('entradas', 1)
    }
    if (res.data.login.permissoesuser.caixa === 1) {
      sessionStorage.setItem('caixa', 0)
    } else {
      sessionStorage.setItem('caixa', 1)
    }
    if (res.data.login.permissoesuser.multiIgreja === 1) {
      sessionStorage.setItem('multiIgreja', 0)
    } else {
      sessionStorage.setItem('multiIgreja', 1)
    }
    if (res.data.login.permissoesuser.usuarios === 1) {
      sessionStorage.setItem('usuarios', 0)
    } else {
      sessionStorage.setItem('usuarios', 1)
    }
    if (res.data.login.permissoesuser.relatorios === 1) {
      sessionStorage.setItem('relatorios', 0)
    } else {
      sessionStorage.setItem('relatorios', 1)
    }
    if (res.data.login.permissoesuser.visitante === 1) {
      sessionStorage.setItem('visitante', 0)
    } else {
      sessionStorage.setItem('visitante', 1)
    }
    if (res.data.login.permissoesuser.aniversariante === 1) {
      sessionStorage.setItem('aniversariante', 0)
    } else {
      sessionStorage.setItem('aniversariante', 1)
    }
    if (res.data.login.permissoesuser.congregacao === 1) {
      sessionStorage.setItem('congregacao', 0)
    } else {
      sessionStorage.setItem('congregacao', 1)
    }
    if (res.data.login.permissoesuser.novoconvertido === 1) {
      sessionStorage.setItem('novoconvertido', 0)
    } else {
      sessionStorage.setItem('novoconvertido', 1)
    }
    if (res.data.login.permissoesuser.contabancaria === 1) {
      sessionStorage.setItem('contabancaria', 0)
    } else {
      sessionStorage.setItem('contabancaria', 1)
    }
    if (res.data.login.permissoesuser.biblia === 1) {
      sessionStorage.setItem('biblia', 0)
    } else {
      sessionStorage.setItem('biblia', 1)
    }
    if (res.data.login.permissoesuser.termouso === 1) {
      sessionStorage.setItem('termouso', 0)
    } else {
      sessionStorage.setItem('termouso', 1)
    }
    if (res.data.login.permissoesuser.politicaprivacidade === 1) {
      sessionStorage.setItem('politicaprivacidade', 0)
    } else {
      sessionStorage.setItem('politicaprivacidade', 1)
    }
    if (res.data.login.permissoesuser.minhasfaturas === 1) {
      sessionStorage.setItem('minhasfaturas', 0)
    } else {
      sessionStorage.setItem('minhasfaturas', 1)
    }
    if (res.data.login.permissoesuser.notaversao === 1) {
      sessionStorage.setItem('notaversao', 0)
    } else {
      sessionStorage.setItem('notaversao', 1)
    }
    if (res.data.login.permissoesuser.agenda === 1) {
      sessionStorage.setItem('agenda', 0)
    } else {
      sessionStorage.setItem('agenda', 1)
    }
    if (res.data.login.permissoesuser.auditoria === 1) {
      sessionStorage.setItem('auditoria', 0)
    } else {
      sessionStorage.setItem('auditoria', 1)
    }
    if (res.data.login.permissoesuser.cargos === 1) {
      sessionStorage.setItem('cargos', 0)
    } else {
      sessionStorage.setItem('cargos', 1)
    }
    if (res.data.login.permissoesuser.tipoconta === 1) {
      sessionStorage.setItem('tipoconta', 0)
    } else {
      sessionStorage.setItem('tipoconta', 1)
    }
    if (res.data.login.permissoesuser.tipoevento === 1) {
      sessionStorage.setItem('tipoevento', 0)
    } else {
      sessionStorage.setItem('tipoevento', 1)
    }
    if (res.data.login.igreja.idPessoa === 9999) {
      sessionStorage.setItem('db', 'true')
    } else {
      sessionStorage.setItem('db', 'false')
    }
    if (res.data.login.igreja.pessoaIgrejaPlanos.multiigreja === 0) {
      sessionStorage.setItem('campoecle', 'true')
    } else {
      sessionStorage.setItem('campoecle', 'false')
    }
    localStorage.setItem('ret', res.data.ret)
    dispatch('ActionUser', res.data.login)
    dispatch('ActionToken', res.data.login.token)
    // permissoes
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
