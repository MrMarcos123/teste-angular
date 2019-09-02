import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { CONSTANTES_APP } from '../shared/constantes'

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  public foruns: [];
  public telaDoForum: boolean = true;
  public cadasfo1Check: boolean = false;
  public tiCheck: String;
  public descriCheck: String;
  public urlCheck: String;
  public coCheck: number;


  constructor(private service: BackendService, private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('logado') != 'true') {
      this.router.navigate(['home'])
    }

    this.service.selectAllForuns().subscribe(res => {
      console.log(this.foruns)
      this.foruns = res.json().result
    })
  }
  voltarParaTelaInicail() {
    this.router.navigate(['paginaInicial'])
  }
  cadastroForum() {
    this.telaDoForum = !this.telaDoForum
    this.cadasfo1Check = !this.cadasfo1Check;

  }
  cadastrarForum() {
    console.log(this.tiCheck, this.descriCheck, this.urlCheck);
    if (this.tiCheck && this.descriCheck && this.urlCheck) {
      let forum = {
        titulo: this.tiCheck,
        descricao: this.descriCheck,
        url: this.urlCheck
      }
      this.service.cadastrarForum(forum).subscribe(res => {
        if (res.json().status == CONSTANTES_APP.HTTP_STATUS_OK) {
          swal('ERRO', 'Houve um erro no cadastro', 'warning')
        } else {
          swal('SUCESSO', 'Cadastro realizado com sucesso', 'success')
          this.cadastroForum()
          window.location.reload()
        }
      })
    }
    else {
      swal('ERRO', 'Falta preencher alguns campos', 'info')
    }
  }
  apagarForum(id) {
    console.log(id)
    let data = {
      id: id
    }
    this.service.apagarForum(data).subscribe(res => {
      if (res.json().status == CONSTANTES_APP.HTTP_STATUS_OK) {
        swal('ERRO', 'Houve um erro na exclusão do forúm', 'warning')
      } else {
        swal('SUCESSO', 'Forum deletado com sucesso', 'success')
        window.location.reload()
      }
    })
  }

}
