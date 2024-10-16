import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignInPageRoutingModule } from './sign-in-routing.module';

import { SignInPage } from './sign-in.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignInPageRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [SignInPage]
})
export class SignInPageModule {}
