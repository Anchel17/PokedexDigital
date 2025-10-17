import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { LoginDTO } from "src/app/DTO/LoginDTO";
import { RegisterDTO } from "src/app/DTO/RegisterDTO";

@Injectable()
export class LoginService {
  private API_URL = 'http://127.0.0.1:5000/auth/'

  constructor(private httpClient: HttpClient){}

  public login(loginDTO: LoginDTO): Observable<string>{
    return this.httpClient.post(this.API_URL + "login", loginDTO, {responseType: 'text'})
  }

  public cadastrar(registerDTO: RegisterDTO): Observable<string>{
    return this.httpClient.post(this.API_URL + "register", registerDTO, {responseType: 'text'});
  }
}
