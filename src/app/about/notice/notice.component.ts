import {Component, OnInit} from '@angular/core';
import Config from '../../config';
import {HttpService} from '../../service/http/http.service';
import {LoadingController} from '@ionic/angular';

@Component({
    selector: 'app-notice',
    templateUrl: './notice.component.html',
    styleUrls: ['./notice.component.scss'],
})
export class NoticeComponent implements OnInit {

    host = Config.host;
    loading = false;
    data: any;

    constructor(private http: HttpService,
                public load: LoadingController,) {
    }

    ngOnInit() {
        this.getDetail();
    }

    async getDetail() {
        const loading = await this.load.create({
            duration: 2000,
            mode: 'ios'
        });
        await loading.present();
        const params = {
            url: `api.php/about/25`,
        };
        this.http.get(params).subscribe(res => {
            if (res.code === 1) {
                this.loading = true;
                this.data = res.data;
            }
            loading.dismiss();
        });
    }

}
