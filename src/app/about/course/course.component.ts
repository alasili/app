import { Component, OnInit } from '@angular/core';
import Config from '../../config';
import {HttpService} from '../../service/http/http.service';
import {LoadingController} from '@ionic/angular';

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {

    host = Config.host;
    loading = false;
    data: any[];
    detail: any;
    courseId: any;

    constructor(private http: HttpService,
                public load: LoadingController,) {
    }

    ngOnInit() {
        this.getList();
    }

    async getList() {
        const loading = await this.load.create({
            duration: 2000,
            mode: 'ios'
        });
        await loading.present();
        const params = {
            url: `api.php/cms/nav/scode/20`,
        };
        this.http.get(params).subscribe(res => {
            if (res.code === 1) {
                this.data = res.data;
                this.courseId = res.data[0].scode;
                this.getDetail();
            }
            loading.dismiss();
        });
    }

    async getDetail() {
        const loading = await this.load.create({
            duration: 2000,
            mode: 'ios'
        });
        await loading.present();
        const params = {
            url: `api.php/about/${this.courseId}`,
        };
        this.http.get(params).subscribe(res => {
            if (res.code === 1) {
                const data = res.data;
                data.content = data.content.replace(/src=["]/g, `src="${this.host}`);
                this.detail = data;
                this.loading = true;
            }
            loading.dismiss();
        });
    }

    segmentChange(event: any): void {
        this.loading = false;
        this.courseId = event.detail.value;
        this.getDetail();
    }

}
