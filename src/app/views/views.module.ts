import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ViewsPageRoutingModule} from './views-routing.module';

import {ViewsPage} from './views.page';
import {ComponentModule} from '../component/component.module';
import {NavComponent} from '../nav/nav.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ViewsPageRoutingModule,
        ComponentModule
    ],
    declarations: [
        ViewsPage,
        NavComponent
    ]
})
export class ViewsPageModule {
}
