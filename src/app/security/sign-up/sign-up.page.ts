import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/core/services/alert.service';
import { IdentityService } from 'src/app/core/services/identity.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  currentSection: number = 1;
  signUpForm!: FormGroup;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private identityService: IdentityService,
    private navController: NavController) {
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      nick: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cellphone: ['', Validators.required],
      profession: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator }
    );
  }

  goToSection(section: number) {
    this.currentSection = section;
  }

  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  createUser() {
    this.identityService.signUp(this.signUpForm.value).subscribe({
      next: () => {
        this.navController.navigateBack('/security/sign-in');
        this.alertService.success('¡Correcto!', 'Usuario creado');
      },
      error: (err) => {
        this.alertService.error('¡Error!', err.error.message);
      }
    })
  }


}
