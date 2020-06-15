import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home.component';
import {VrPageComponent} from './vr-page/vr-page.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'vr',
        component: VrPageComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class HomeRoutingModule {
}
