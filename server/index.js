const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const con = require('./assets/BD/bd')
const UserDAO = require('./assets/DAO/UserDAO')
const User = require('./assets/model/User')
const constantes = require('./assets/shared/constantes')


//MIDDLEWARES
//FRONT-END <---------MIDDLEWARE-------> SERVER -------------------->BANCO DE DADOS
app.use(cors())
app.use(bodyParser.json())
app.use((req, res, next) => {
  req.con = con
  //VOLTAR AQUI E TROCAR A CONEXÃO POR UMA PULL DE CONEXÕES
  next()

})

//BANCO DE DADOS

app.post('/register', (req, res) => {
  let user = new User(req.body.nome, req.body.email, req.body.senha)
  let userDAO = new UserDAO(req, user)
  userDAO.insert((err) => {
    if (err) {
      console.log(err);
      res.json({
        status: constantes.HTTP_STATUS_OK
      })
    } else {
      res.json({
        status: constantes.HTTP_STATUS_ERRO
      })
    }
  })
})
// userDAO.con.query('INSERT INTO user VALUES(DEFAULT, ?, ? ,sha2(?,512))', [req.body.nome, req.body.email, req.body.senha], (err) => {
//   if (err) {
//     console.log(err);
//     res.json({
//       status: 200
//     })
//   } else {
//     res.json({
//       status: 500
//     })
//   }
// })


app.post('/login', (req, res) => {
  con.query('SELECT count(*) as count,id as id FROM user WHERE email = ? and senha = sha2(?,512)', [req.body.email, req.body.senha], (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        status: constantes.HTTP_STATUS_OK,
      })
    } else {
      res.json({
        status: constantes.HTTP_STATUS_ERRO,
        result: result
      })
    }
  })
})



app.post('/cadastrarForum', (req, res) => {
  console.log(req.body)
  con.query('INSERT INTO forum VALUES(DEFAULT, ?, ?, ?)', [req.body.titulo, req.body.descricao, req.body.url], (err) => {
    if (err) {
      console.log(err);
      res.json({
        status: constantes.HTTP_STATUS_OK
      })
    } else {
      res.json({
        status: constantes.HTTP_STATUS_ERRO
      })
    }
  })
})

app.get('/selectAllForuns', (req, res) => {
  con.query('SELECT * FROM forum', (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        status: constantes.HTTP_STATUS_OK
      })
    } else {
      res.json({
        status: constantes.HTTP_STATUS_ERRO,
        result: result
      })
    }
  })
})
app.get('/selectAllComandos', (req, res) => {
  con.query('SELECT * FROM comandos', (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        status: constantes.HTTP_STATUS_OK
      })
    } else {
      res.json({
        status: constantes.HTTP_STATUS_ERRO,
        result: result
      })
    }
  })
})
app.post('/apagarForum', (req, res) => {
  console.log(req.body)
  con.query('DELETE FROM forum WHERE id_fo = ?', [req.body.id], (err) => {
    if (err) {
      console.log(err);
      res.json({
        status: constantes.HTTP_STATUS_OK
      })
    } else {
      res.json({
        status: constantes.HTTP_STATUS_ERRO
      })
    }
  })
})
app.post('/cadastrarComandos', (req, res) => {
  console.log(req.body)
  con.query('INSERT INTO comandos VALUES(DEFAULT, ?, ?, ?, ?)', [req.body.linguagem, req.body.comando, req.body.descricao, req.body.exemplo], (err) => {
    if (err) {
      console.log(err);
      res.json({
        status: constantes.HTTP_STATUS_OK
      })
    } else {
      res.json({
        status: constantes.HTTP_STATUS_ERRO
      })
    }
  })
})

app.post('/selectUser', (req, res) => {
  con.query('select nome, email from user where id=?', [req.body.id], (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        status: constantes.HTTP_STATUS_OK
      })
    } else {
      res.json({
        status: constantes.HTTP_STATUS_ERRO,
        result: result
      })
    }
  })
})
app.post('/apagarComando', (req, res) => {
  console.log(req.body)
  con.query('DELETE FROM comandos WHERE id_com = ?', [req.body.id], (err) => {
    if (err) {
      console.log(err);
      res.json({
        status: constantes.HTTP_STATUS_OK
      })
    } else {
      res.json({
        status: constantes.HTTP_STATUS_ERRO
      })
    }
  })
})
app.listen(3001, () => {
  console.log("SERVIDOR RODANDO NA PORTA 3001")
})
