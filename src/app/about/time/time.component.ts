import { Component, OnInit } from '@angular/core';
import Config from '../../config';
import {HttpService} from '../../service/http/http.service';
import {LoadingController} from '@ionic/angular';

@Component({
    selector: 'app-time',
    templateUrl: './time.component.html',
    styleUrls: ['./time.component.scss'],
})
export class TimeComponent implements OnInit {

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
            url: `api.php/about/23`,
        };
        this.http.get(params).subscribe(res => {
            if (res.code === 1) {
                const data = res.data;
                data.content = data.content.replace(/src=["]/g, `src="${this.host}`);
                this.data = data;
                this.loading = true;
            }
            loading.dismiss();
        });
    }

}
