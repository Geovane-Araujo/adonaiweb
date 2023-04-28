export class Endereco {
  id = ''
  idPessoa = ''
  endereco = ''
  bairro = ''
  idCidade = 0
  cidade = ''
  numero = ''
  uf = ''
  cep = ''
  complemento = ''
  tipo = 0

  gerArr (qtds) {
    const arrEnd = []
    var i = 0
    while (i <= qtds) {
      var end = new Endereco()
      end.tipo = i
      arrEnd.push(end)
      i++
    }
    return arrEnd
  }
}
