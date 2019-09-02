class UserDAO {
  // model é um objeto do modelo de dados em questão.
  // Como estamos falando do UserDAO,
  // o modelo em questão é o modelo User.
  // Portanto, model é um objeto do modelo User, isto é, model é um usuário.
  constructor(req, user) {
    this.user = user
    this.con = req.con
  }
  insert(callback) {
    this.con.query('INSERT INTO user VALUES(DEFAULT, ?, ? ,sha2(?,512))', [
        this.user.nome, this.user.email, this.user.senha
      ], callback

    )
  }
}
module.exports = UserDAO
