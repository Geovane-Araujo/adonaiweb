export class Email {
  id = ''
  idPessoa = ''
  email = ''
  tipo = 0

  gerArr (qtds) {
    const arrEnd = []
    var i = 0
    while (i <= qtds) {
      var end = new Email()
      end.tipo = i
      arrEnd.push(end)
      i++
    }
    return arrEnd
  }
}
