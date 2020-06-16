import {Component, OnInit} from '@angular/core';
import {HttpService} from '../service/http/http.service';
import Config from '../config';
import {LoadingController, ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {QrcodeComponent} from './qrcode/qrcode.component';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {

    host = Config.host;
    loading = false;
    data: any;

    constructor(private http: HttpService,
                private router: Router,
                public modal: ModalController,
                public load: LoadingController) {
    }

    ngOnInit() {
        this.getAbout();
    }

    async getAbout() {
        const loading = await this.load.create({
            duration: 2000,
            mode: 'ios'
        });
        await loading.present();
        const params = {
            url: `api.php/cms/company`,
        };
        this.http.get(params).subscribe(res => {
            if (res.code === 1) {
                this.loading = true;
                this.data = res.data;
            }
            loading.dismiss();
        });
    }

    itemClick(type: number): void {
        switch (type) {
            case 1:
                this.router.navigate(['/views/about/introduce']);
                break;
            case 2:
                this.router.navigate(['/views/about/course']);
                break;
            case 3:
                this.router.navigate(['/views/about/time']);
                break;
            case 5:
                this.router.navigate(['/views/about/traffic']);
                break;
            case 6:
                this.router.navigate(['/views/about/notice']);
                break;
            case 7:
                this.setModal(1);
                break;
            case 8:
                this.setModal(2);
                break;
        }
    }

    async setModal(type: number) {
        const modal = await this.modal.create({
            componentProps: {
                type,
                title: type === 1 ? 'ᠠᠵᠢᠯ ᠲᠥᠷᠥᠯ ᠤᠨ ᠪᠦᠯᠦᠭ' : 'ᠰᠣᠶᠣᠯ ᠤᠨ ᠡᠭᠦᠳᠦᠯᠲᠡ ᠶᠢᠨ ᠪᠢᠴᠢᠯ ᠳᠡᠯᠭᠡᠭᠦᠷ'
            },
            component: QrcodeComponent
        });
        return await modal.present();
    }

}
