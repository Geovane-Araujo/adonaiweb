import { Email } from './Email'
import { Endereco } from './Endereco'
import { Telefone } from './Telefone'

export class Membro {
  add = true
  edit = false
  del = false
  id = ''
  nome = ''
  idPessoa = ''
  dataNascimento = ''
  ativo = ''
  idCargo = ''
  naturalidade = ''
  nacionalidade = ''
  cargo = ''
  foto = ''
  observacoes = ''
  dataBatismo = ''
  idEstadoCivil = 0
  pathimg = ''
  batizado = ''
  membroDesde = new Date()
  cpf = ''
  rg = ''
  sexo = 0
  endereco = new Endereco().gerArr(3)
  telefone = new Telefone().gerArr(3)
  email = new Email().gerArr(2)
}
