import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { IdentityService } from 'src/app/core/services/identity.service';
import { PublicationService } from 'src/app/core/services/publication.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  private userSubscription!: Subscription;
  user: any;
  userId: any;
  page: number = 1;
  limit: number = 5;
  publications: any;
  text: any;

  constructor(
    private alertService: AlertService,
    private identityService: IdentityService,
    private userService: UserService,
    private publicationService: PublicationService
  ) {

  }

  ngOnInit() {
    this.userSubscription = this.identityService.user$.subscribe(user => {
      if (user) {
        this.user = user;
        this.userId = user.id;
        this.getPublications();
      }
    });
    this.userId = this.identityService.getUser().id;
  }

  getPublications() {
    this.publicationService.getAllPublication(this.page - 1, this.limit).subscribe({
      next: (data) => {
        this.publications = data.publications;
      }
    })
  }

  createPublications() {
    this.publicationService.createPublication(this.text).subscribe({
      next: () => {
        this.alertService.success('¡Correcto!', 'Publicación creada')
        this.cancel()
      },
      error: (err) => {
        this.alertService.error('¡Error!', err.error.message)
      }
    })
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.text, 'confirm');
  }


}
