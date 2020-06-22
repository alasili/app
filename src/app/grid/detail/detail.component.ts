import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../service/http/http.service';
import {ActivatedRoute} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import Config from '../../config';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

    host = Config.host;
    loading = false;
    data: any;

    public type: string;
    public pid: string;
    public did: string;

    constructor(private http: HttpService,
                public load: LoadingController,
                private route: ActivatedRoute) {
        this.route.queryParams.subscribe(res => {
            this.type = res.type;
            this.pid = res.parent;
            this.did = res.did;
            this.getDetail(res.id);
        });
    }

    ngOnInit() {
    }

    async getDetail(event: any) {
        const loading = await this.load.create({
            duration: 2000,
            mode: 'ios'
        });
        await loading.present();
        const params = {
            url: `api.php/content/${event}`,
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
