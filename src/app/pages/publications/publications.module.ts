import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicationsPageRoutingModule } from './publications-routing.module';

import { PublicationsPage } from './publications.page';
import { HeaderPageModule } from "../../components/header/header.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicationsPageRoutingModule,
    HeaderPageModule
  ],
  declarations: [
    PublicationsPage
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PublicationsPageModule { }
