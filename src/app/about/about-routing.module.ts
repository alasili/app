import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AboutComponent} from './about.component';
import {IntroduceComponent} from './introduce/introduce.component';
import {CourseComponent} from './course/course.component';
import {TimeComponent} from './time/time.component';
import {TrafficComponent} from './traffic/traffic.component';
import {NoticeComponent} from './notice/notice.component';


const routes: Routes = [
    {
        path: '',
        component: AboutComponent
    },
    {
        path: 'introduce',
        component: IntroduceComponent
    },
    {
        path: 'course',
        component: CourseComponent
    },
    {
        path: 'time',
        component: TimeComponent
    },
    {
        path: 'traffic',
        component: TrafficComponent
    },
    {
        path: 'notice',
        component: NoticeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AboutRoutingModule {
}
