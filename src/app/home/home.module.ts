import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent} from './home.component';
import {IonicModule} from '@ionic/angular';
import {ComponentModule} from '../component/component.module';


@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        IonicModule,
        ComponentModule
    ]
})
export class HomeModule { }
