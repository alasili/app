import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ViewsPage} from './views.page';
import {DetailComponent} from '../grid/detail/detail.component';
import {NavComponent} from '../nav/nav.component';

const routes: Routes = [
    {
        path: '',
        component: ViewsPage,
        children: [
            {
                path: 'home',
                loadChildren: () => import('../home/home.module').then(m => m.HomeModule)
            },
            {
                path: 'grid',
                loadChildren: () => import('../grid/grid.module').then(m => m.GridModule)
            },
            {
                path: 'detail',
                loadChildren: () => import('../home/home.module').then(m => m.HomeModule)
                // component: DetailComponent
            },
            {
                path: 'nav',
                component: NavComponent
            },
            {
                path: 'navs',
                component: NavComponent
            },
            {
                path: 'maps',
                component: NavComponent
            },
            {
                path: 'about',
                loadChildren: () => import('../about/about.module').then(m => m.AboutModule)
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
