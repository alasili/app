import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ViewsPage} from './views.page';

const routes: Routes = [
    {
        path: '',
        component: ViewsPage,
        children: [
            {
                path: 'about',
                loadChildren: () => import('../about/about.module').then(m => m.AboutModule)
            },
            {
                path: 'home',
                loadChildren: () => import('../home/home.module').then(m => m.HomeModule)
            },
            {
                path: 'grid',
                loadChildren: () => import('../grid/grid.module').then(m => m.GridModule)
            },
            {
                path: '',
                redirectTo: '/views/home',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ViewsPageRoutingModule {
}