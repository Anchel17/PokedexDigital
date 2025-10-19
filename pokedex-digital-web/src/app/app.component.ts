import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './components/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokedex-digital-web';

  constructor(private router: Router, private loginService: LoginService){}

  ngOnInit(){
    this.loginService.verificarSessaoAtiva().subscribe({
      next: (response) => {
      },
      error: (err) => {
        this.router.navigate(['/login'])
      }
    })
  }
}
