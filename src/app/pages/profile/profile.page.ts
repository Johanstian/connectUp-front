import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { IdentityService } from 'src/app/core/services/identity.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;
  private userSubscription!: Subscription;
  user: any;
  userForm!: FormGroup;
  image!: string;
  counter: any;

  constructor(
    private alertService: AlertService,
    private identityService: IdentityService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {

  }

  ngOnInit() {
    this.userSubscription = this.identityService.user$.subscribe(user => {
      if (user) {
        this.user = user;
        this.avatar();
        this.initForm();
        this.counters();
      }
    });
  }

  getUser() {
    this.userSubscription = this.identityService.user$.subscribe(user => {
      if (user) {
        this.user = user;
      }
    })
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      name: [this.user?.name],
      last_name: [this.user?.last_name],
      nick: [this.user?.nick],
      email: [this.user?.email],
      cellphone: [this.user?.cellphone],
      profession: [this.user?.profession],
      image: [this.image || '']
    })
  }

  avatar() {
    this.userService.getAvatar(this.user._id).subscribe({
      next: (data) => {
        this.image = data.imageUrl;
        this.userForm.get('image')?.setValue(this.image);
      },
      error: () => {
        this.image = 'assets/profile.png';
        this.userForm.get('image')?.setValue(this.image);
      }
    })
  }

  update() {
    this.userService.updateUser(this.userForm.value).subscribe({
      next: (res) => {
        this.identityService.setUser(res.user);
        this.alertService.success('Perfil actualizado', 'Los cambios han sido guardados correctamente.');
      },
      error: (err) => {
        this.alertService.error('¡Error!', err.error.message);
      }
    })
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file0 = input.files[0];
      this.upload(file0);
    }
  }

  upload(file0: File) {
    this.userService.uploadAvatar(file0).subscribe({
      next: () => {
        this.avatar();
      },
      error: (err) => {
        this.alertService.error('¡Error!', err.error.message);
      }
    })
  }

  counters() {
    this.userService.getCounters(this.user._id).subscribe({
      next: (data) => {
        this.counter = data;
      },
      error: (err) => {
        this.alertService.error('¡Error!', err.error.message);
      }
    })
  }


}
