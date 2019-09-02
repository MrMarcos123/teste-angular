import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

const URL = 'http://localhost:3001'

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: Http) { }

  register(data) {
    return this.http.post(URL + '/register', data)
  }

  login(data) {
    console.log(data)
    return this.http.post('http://localhost:3002/login', data)
  }

  cadastrarForum(forumdata) {
    return this.http.post(URL + '/cadastrarForum', forumdata)
  }
  selectAllForuns() {
    return this.http.get(URL + '/selectAllForuns')
  }
  apagarForum(id) {
    console.log(id)
    return this.http.post(URL + '/apagarForum', id)
  }
  cadastrarComandos(data) {
    return this.http.post(URL + '/cadastrarComandos', data)
  }
  selectAllComandos() {
    return this.http.get(URL + '/selectAllComandos')
  }
  selectUser(id) {
    return this.http.post(URL + '/selectUser', id)
  }
  apagarComando(id) {
    console.log(id)
    return this.http.post(URL + '/apagarComando', id)
  }
}
