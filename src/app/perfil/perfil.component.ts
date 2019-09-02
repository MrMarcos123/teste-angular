import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public telaDoPerfil: boolean = true
  public perfil;
  constructor(private service: BackendService, private router: Router) { }

  ngOnInit() {
    let id = { id: localStorage.getItem('id') }
    this.service.selectUser(id).subscribe(res => {
      this.perfil = res.json().result[0];
      console.log(this.perfil)
    })
  }

  voltarParaTelaInicail() {
    this.router.navigate(['paginaInicial'])
  }
}
