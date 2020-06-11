import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AboutRoutingModule} from './about-routing.module';
import {AboutComponent} from './about.component';
import {ComponentModule} from '../component/component.module';
import {IonicModule} from '@ionic/angular';
import {IntroduceComponent} from './introduce/introduce.component';
import {CourseComponent} from './course/course.component';
import {TimeComponent} from './time/time.component';
import {TrafficComponent} from './traffic/traffic.component';
import {NoticeComponent} from './notice/notice.component';
import {QrcodeComponent} from './qrcode/qrcode.component';


@NgModule({
    declarations: [
        AboutComponent,
        IntroduceComponent,
        CourseComponent,
        TimeComponent,
        TrafficComponent,
        NoticeComponent,
        QrcodeComponent
    ],
    imports: [
        CommonModule,
        AboutRoutingModule,
        ComponentModule,
        IonicModule
    ],
    entryComponents: [
        QrcodeComponent
    ]
})
export class AboutModule {
}
