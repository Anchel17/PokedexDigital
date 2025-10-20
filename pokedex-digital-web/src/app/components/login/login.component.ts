import { Component, ViewChild } from '@angular/core';
import { FormGroup, NgForm, NonNullableFormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild("formLogin") formLoginElement: NgForm;
  @ViewChild("formCadastro") formCadastroElement: NgForm;

  public loginFormGroup: FormGroup;
  public cadastroFormGroup: FormGroup;

  constructor(private fb: NonNullableFormBuilder, private loginService: LoginService,
    private router: Router, private snackBar: MatSnackBar){}

  ngOnInit(){
    this.inicializarForms();
  }

  onTabChanged(){
    this.formLoginElement.resetForm();
    this.formCadastroElement.resetForm();
  }

  onSubmitLogin(){
    if(this.loginFormGroup.invalid){
      return;
    }

    this.loginService.login({
      login: this.loginFormGroup.value.login,
      senha: this.loginFormGroup.value.senha
    })
    .subscribe((response: string) => {
      if(response){
        this.router.navigate(['/']);
      }
    }, (err) => {
        this.snackBar.open("Credenciais inválidas.", '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
    })
  }

  onSubmitCadastro(){
    if(this.cadastroFormGroup.invalid){
      return;
    }

    this.loginService.cadastrar({
      nome: this.cadastroFormGroup.value.nome,
      email: this.cadastroFormGroup.value.email,
      login: this.cadastroFormGroup.value.login,
      senha: this.cadastroFormGroup.value.senha
    })
    .subscribe((response: any) => {
      if(response){
        this.snackBar.open("Usuário criado com sucesso!", '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
      }
    }, (err) => {
        this.snackBar.open("Login ou email já cadastrado.", '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
    })
  }

  private inicializarForms(){
    this.loginFormGroup = this.fb.group({
      login: ['', {validators: [Validators.required], updateOn: 'change'}],
      senha: ['', {validators: [Validators.required], updateOn: 'change'}]
    });

    this.cadastroFormGroup = this.fb.group({
      nome: ['', {validators: [Validators.required], updateOn: 'change'}],
      email: ['', {validators: [Validators.required], updateOn: 'change'}],
      login: ['', {validators: [Validators.required], updateOn: 'change'}],
      senha: ['', {validators: [Validators.required], updateOn: 'change'}],
    });
  }
}
