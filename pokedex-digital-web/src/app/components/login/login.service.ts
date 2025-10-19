import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

import { LoginDTO } from "src/app/DTO/LoginDTO";
import { RegisterDTO } from "src/app/DTO/RegisterDTO";

@Injectable()
export class LoginService {
  private API_URL = 'http://localhost:5000/auth/'

  constructor(private httpClient: HttpClient){}

  public login(loginDTO: LoginDTO): Observable<string>{
    return this.httpClient.post(this.API_URL + "login", loginDTO, {responseType: 'text', withCredentials: true})
      .pipe(tap((response: any) => {}) )
  }

  public cadastrar(registerDTO: RegisterDTO): Observable<string>{
    return this.httpClient.post(this.API_URL + "register", registerDTO, {responseType: 'text'});
  }

  public verificarSessaoAtiva(){
    return this.httpClient.get(this.API_URL + 'me', {withCredentials: true});
  }
}
