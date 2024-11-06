import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { IdentityService } from 'src/app/core/services/identity.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  loading: boolean = false;
  signInForm!: FormGroup;
  user: any;
  token: any;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private identityService: IdentityService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signInForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    })
  }

  login() {
    this.loading = true;
    this.identityService.signIn(this.signInForm.value).subscribe({
      next: (data) => {
        this.user = data.user;
        this.token = data.token
        localStorage.setItem('token', JSON.stringify(this.token));
        localStorage.setItem('user', JSON.stringify(this.user));
        this.identityService.setUser(this.user);
        this.router.navigate(['/pages/home']);
        this.loading = false;
        this.alertService.success('¡Bienvenido!', '')
      },
      error: () => {
        this.alertService.error('¡Error!', 'Usuario y/o contraseña inválidos.')
        this.loading = false;
      }
    })
  }


}
