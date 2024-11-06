import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { AlertService } from '../core/services/alert.service';
import { IdentityService } from '../core/services/identity.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.page.html',
  styleUrls: ['./pages.page.scss'],
})
export class PagesPage implements OnInit {

  accessToken: any;
  applicationId: any;
  user: any;
  token: any;
  userSubscription: any;

  pages = [
    {
      title: 'Mi cuenta',
      url: 'pages/my-account/account',
      icon: 'person',
      open: false,
    },
    {
      title: 'Inicio',
      url: '/pages/home',
      icon: 'home',
      open: false,
    },
    {
      title: 'Calendario',
      url: 'pages/academic',
      icon: 'school',
      open: false,
    },
    {
      title: 'Calendario',
      url: '/pages/management',
      icon: 'documents',
      open: false,
    },
    {
      title: 'Servicios',
      url: '/pages/services',
      icon: 'server',
      open: false,
    },
    {
      title: 'Agenda',
      url: '/pages/schedule',
      icon: 'today',
      open: false,
    },
  ];

  constructor(
    private alertController: AlertController,
    private alertService: AlertService,
    private identityService: IdentityService,
    private menuController: MenuController,
    private router: Router
  ) { }

  ngOnInit() {
    this.userSubscription = this.identityService.user$.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
    this.token = localStorage.getItem('token');
  }

  async logout() {
    const alert = await this.alertController.create({
      header: '¿Seguro que quieres salir?',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
          role: 'cancel',
        },
        {
          text: 'Si',
          cssClass: 'alert-button-confirm',
          handler: () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.user = null;
            this.token = null;
            this.router.navigate(['/security/sign-in'])
            this.closeMenu();
          }
        }
      ]
    });
    return await alert.present();
  }

  closeMenu() {
    this.menuController.close();
  }


}
