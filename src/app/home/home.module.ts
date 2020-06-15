import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent} from './home.component';
import {IonicModule} from '@ionic/angular';
import {ComponentModule} from '../component/component.module';
import {VrPageComponent} from './vr-page/vr-page.component';


@NgModule({
    declarations: [
        HomeComponent,
        VrPageComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        IonicModule,
        ComponentModule
    ],
    entryComponents: [
        VrPageComponent
    ]
})
export class HomeModule { }
