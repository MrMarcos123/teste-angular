import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';
import swal from 'sweetalert';
import { CONSTANTES_APP } from '../shared/constantes';

@Component({
  selector: 'app-comantela',
  templateUrl: './comantela.component.html',
  styleUrls: ['./comantela.component.css']
})
export class ComantelaComponent implements OnInit {
  public telaDoComando: boolean = true;
  public cadascomandoCheck: boolean = false;
  public linguagemCheck: String;
  public coCheck: String;
  public descriCheck: String;
  public exemploCheck: String;
  public comandos: [];

  constructor(private service: BackendService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('logado') != 'true') {
      this.router.navigate(['home'])
    }
    this.service.selectAllComandos().subscribe(res => {
      console.log(this.comandos)
      this.comandos = res.json().result
    })
  }
  voltarParaTelaInicail() {
    this.router.navigate(['paginaInicial'])
  }
  cadastroComando() {
    this.telaDoComando = false;
    this.cadascomandoCheck = true;
  }
  telaDoComando1() {
    this.telaDoComando = true;
    this.cadascomandoCheck = false;
  }
  cadastrarComandos() {
    console.log(this.linguagemCheck, this.coCheck, this.descriCheck, this.exemploCheck);
    if (this.linguagemCheck && this.coCheck && this.descriCheck && this.exemploCheck) {
      let data = {
        linguagem: this.linguagemCheck,
        comando: this.coCheck,
        descricao: this.descriCheck,
        exemplo: this.exemploCheck
      }
      this.service.cadastrarComandos(data).subscribe(res => {
        console.log(res.json().status)
        if (res.json().status == CONSTANTES_APP.HTTP_STATUS_ERRO) {
          swal('SUCESSO', 'Cadastro realizado com sucesso', 'success')
          this.telaDoComando1()
          window.location.reload()
        } else {
          swal('ERRO', 'Houve um erro no cadastro', 'warning')
        }
      })
    }
    else {
      swal('ERRO', 'Falta preencher alguns campos', 'info')
    }
  }
  apagarComando(id) {
    console.log(id)
    let data = {
      id: id
    }
  }
}
