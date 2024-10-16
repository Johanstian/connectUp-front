import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  loading: boolean = false;
  signInForm!: FormGroup;
  user: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signInForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    })
  }

  login() {
    this.loading = true;
    setTimeout(() => {
      // localStorage.setItem('user', JSON.stringify(this.user));
      localStorage.setItem('token', 'true');
      this.router.navigate(['/pages/home']);
      this.loading = false;
    }, 2000)
    // this.alertService.showSuccess('¡Bienvenido!', '')
  }


}
