import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {DetailComponent} from './grid/detail/detail.component';

const routes: Routes = [
    {
        path: 'views',
        loadChildren: () => import('./views/views.module').then(m => m.ViewsPageModule)
    },
    {
        path: 'detail',
        component: DetailComponent
    },
    {
        path: '',
        redirectTo: '/views/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
