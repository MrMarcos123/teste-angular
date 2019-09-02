import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { BackendService } from '../backend.service';
import { CONSTANTES_APP } from '../shared/constantes'


@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.css']
})

export class TelaInicialComponent implements OnInit {
  public telaiCheck: boolean = true;
  public forumCheck: boolean = false;
  public comanCheck: boolean = false;
  public perfilCheck: boolean = false;
  public cadasfoCheck: boolean = false;
  public cadasfo1Check: boolean = false;
  public tiCheck: String;
  public descriCheck: String;
  public foruns: [];
  public forum: never;



  constructor(private service: BackendService, private router: Router) { }


  ngOnInit() {
    if (localStorage.getItem('logado') != 'true') {
      this.router.navigate(['home'])
    }
  }

  trocaDeTelaDoForum() {
    this.router.navigate(['forum'])
  }
  trocaDeTelaDoComando() {
    this.router.navigate(['comando'])
  }
  voltarParaTelaInicail() {
    this.telaiCheck = true;
    this.forumCheck = false;
    this.cadasfo1Check = false;
    this.cadasfoCheck = false;
    this.comanCheck = false;
    this.perfilCheck = false;
  }
  datelaCadasForumParaForum() {
    this.telaiCheck = this.telaiCheck;
    this.forumCheck = !this.forumCheck;
    this.cadasfo1Check = !this.cadasfo1Check;
    this.cadasfoCheck = this.cadasfoCheck;
    this.comanCheck = this.comanCheck;
    this.perfilCheck = this.perfilCheck;
  }
  trocadeTelaPerfil() {
    this.router.navigate(['perfil'])
  }
  cadastarFo() {
    this.telaiCheck = this.telaiCheck;
    this.forumCheck = !this.forumCheck;
    this.comanCheck = this.comanCheck;
    this.perfilCheck = this.perfilCheck;
    this.cadasfoCheck = this.cadasfoCheck;
    this.cadasfo1Check = !this.cadasfoCheck;


  }
  deslogar() {
    localStorage.removeItem('logado')
    this.router.navigate(['home'])
  }

  cadastrarForum() {
    console.log(this.tiCheck, this.descriCheck);
    if (this.tiCheck && this.descriCheck) {
      let forum = {
        titulo: this.tiCheck,
        descricao: this.descriCheck
      }
      this.service.cadastrarForum(forum).subscribe(res => {
        if (res.json().status == CONSTANTES_APP.HTTP_STATUS_OK) {
          swal('ERRO', 'Houve um erro no cadastro', 'warning')
        } else {
          swal('SUCESSO', 'Cadastro realizado com sucesso', 'success')
          this.datelaCadasForumParaForum()
        }
      })
    }
    else {
      swal('ERRO', 'Falta preencher alguns campos', 'info')
    }
  }
}