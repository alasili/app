import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../service/http/http.service';
import {LoadingController} from '@ionic/angular';
import Config from '../../config';

@Component({
    selector: 'app-introduce',
    templateUrl: './introduce.component.html',
    styleUrls: ['./introduce.component.scss'],
})
export class IntroduceComponent implements OnInit {

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
            url: `api.php/about/1`,
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
