import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/core/services/alert.service';
import { IdentityService } from 'src/app/core/services/identity.service';
import { PublicationService } from 'src/app/core/services/publication.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.page.html',
  styleUrls: ['./publications.page.scss'],
})
export class PublicationsPage implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;
  publications: any;
  page: number = 1;
  limit: number = 5;
  userSubscription: any;
  user: any;
  userId: any;
  myPublications: any;
  selectedId: any;

  constructor(
    private alertService: AlertService,
    private identityService: IdentityService,
    private publicationService: PublicationService
  ) {

  }

  ngOnInit() {
    this.userSubscription = this.identityService.user$.subscribe(user => {
      if (user) {
        this.user = user;
        this.userId = user.id;
        this.getPublications();
        this.getPublicationByUser();
      }
    });
  }

  getPublications() {
    this.publicationService.getAllPublication(this.page - 1, this.limit).subscribe({
      next: (data) => {
        this.publications = data.publications;
      }
    })
  }

  getPublicationByUser() {
    this.publicationService.getPublicationById(this.userId).subscribe({
      next: (data) => {
        this.myPublications = data.publications;
      },
      error: (err) => {
        this.alertService.error('¡Error!', err.error.message);
      }
    })
  }

  delete(publicationId: any) {
    this.publicationService.deletePublication(publicationId).subscribe({
      next: () => {
        this.alertService.success('¡Correcto!', 'Publicación eliminada');
        this.getPublicationByUser();
      },
      error: (err) => {
        this.alertService.error('¡Error!', err.error.message)
      }
    })
  }

  triggerFileInput(publicationId: any) {
    this.fileInput.nativeElement.click();
    this.selectedId = publicationId;
  }

  onFileSelected(publicationId: any, event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file0 = input.files[0];
      this.upload(publicationId, file0);
    }
  }

  upload(publicationId: any, file0: File) {
    this.publicationService.uploadMedia(publicationId, file0).subscribe({
      next: (res) => {
        this.alertService.success('¡Correcto!', 'Imagen cargada');
        this.getPublicationByUser();
      },
      error: (err) => {
        this.alertService.error('¡Error!', 'Al cargar la imagen, subir archivos .jpg ó .png');
      }
    })
  }


}
