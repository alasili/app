import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {IonicModule} from '@ionic/angular';
import {BeeWaterfallComponent} from './bee-waterfall/bee-waterfall.component';
import {BeeListComponent} from './bee-list/bee-list.component';
import {BeeIconComponent} from './bee-icon/bee-icon.component';


@NgModule({
    declarations: [
        HeaderComponent,
        BeeWaterfallComponent,
        BeeListComponent,
        BeeIconComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        HeaderComponent,
        BeeWaterfallComponent,
        BeeListComponent,
        BeeIconComponent
    ]
})
export class ComponentModule {
}
