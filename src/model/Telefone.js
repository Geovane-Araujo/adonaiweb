export class Telefone {
  id = ''
  idPessoa = ''
  telefone = ''
  tipo = 0

  gerArr (qtds) {
    const arrEnd = []
    var i = 0
    while (i <= qtds) {
      var end = new Telefone()
      end.tipo = i
      arrEnd.push(end)
      i++
    }
    return arrEnd
  }
}
