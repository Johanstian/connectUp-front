import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.page.html',
  styleUrls: ['./pages.page.scss'],
})
export class PagesPage implements OnInit {

  accessToken: any;
  applicationId: any;
  user: any;

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
    // private alertService: AlertService,
    // private authService: AuthService,
    private menuController: MenuController,
    private router: Router
  ) { }

  ngOnInit() {
    // this.user = this.authService.getUser();
  }

  async logout() {
    const alert = await this.alertController.create({
      header: '¿Seguro que quieres salir?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Si',
          handler: () => {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('user')
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

  hasProfile() {

  }

}
