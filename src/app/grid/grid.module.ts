import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GridRoutingModule} from './grid-routing.module';
import {GridComponent} from './grid.component';
import {IonicModule} from '@ionic/angular';
import {ComponentModule} from '../component/component.module';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        GridComponent
    ],
    imports: [
        CommonModule,
        GridRoutingModule,
        IonicModule,
        ComponentModule,
        FormsModule
    ]
})
export class GridModule {
}
