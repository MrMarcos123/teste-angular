import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { CONSTANTES_APP } from '../shared/constantes'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public loginCheck: boolean = true; //Se essa variavel for true mostrar tela de login
  public cadastroCheck: boolean = false; //Se essa variavel for true mostrar tela de cadastro
  public nome_cadastro: string;
  public email_cadastro: string;
  public senha_cadastro: string;
  public confirm_senha_cadastro: string;
  public senha: string;
  public email: string;


  constructor(private service: BackendService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('logado') == 'true') {
      this.router.navigate(['paginaInicial'])
    }
  }

  trocarTela() {
    this.loginCheck = !this.loginCheck
    this.cadastroCheck = !this.cadastroCheck
  }

  register() {
    console.log(this.nome_cadastro, this.email_cadastro, this.senha_cadastro, this.confirm_senha_cadastro);
    if (this.nome_cadastro && this.email_cadastro && this.senha_cadastro && this.confirm_senha_cadastro) {
      console.log('state 1');
      if (this.senha_cadastro == this.confirm_senha_cadastro) {
        let data = {
          nome: this.nome_cadastro,
          email: this.email_cadastro,
          senha: this.senha_cadastro
        }
        this.service.register(data).subscribe(res => {
          if (res.json().status == CONSTANTES_APP.HTTP_STATUS_OK) {
            swal('ERRO', 'Houve um erro no cadastro', 'warning')
          } else {
            swal('SUCESSO', 'Cadastro realizado com sucesso', 'success')
            this.trocarTela()
          }
        })
      } else {
        swal('ERRO', 'SENHAS INCOMPATIVEIS', 'warning')
      }
    } else {
      swal('ERRO', 'Campos vazios', 'info')
    }
  }



  login() {
    if (this.email && this.senha) {
      let data = {
        email: this.email,
        senha: this.senha
      }

      this.service.login(data).subscribe(res => {
        if (res.json().status == CONSTANTES_APP.HTTP_STATUS_OK) {
          swal('ERRO', 'Houve um erro no login', 'warning')
        } else {
          if (res.json().result[0].count == 1) {
            localStorage.setItem('logado', 'true')
            localStorage.setItem('id', res.json().result[0].id)
            this.router.navigate(['paginaInicial'])
          } else {
            swal('ERRO', 'Usuário ou senha incorreta', 'warning')
          }
        }
      })
    }
  }
}

