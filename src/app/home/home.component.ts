import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../service/http/http.service';
import Config from '../config';
import {IonRefresher} from '@ionic/angular';
import {Router} from '@angular/router';
import {Plugins} from '@capacitor/core';
import {ModalController} from '@ionic/angular';
import {VrPageComponent} from './vr-page/vr-page.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    @ViewChild(IonRefresher, {static: false}) refresher: IonRefresher;

    host = Config.host;
    slideConfig = {
        initialSlide: 0,
        autoHeight: true,
        autoplay: {
            delay: 5000
        },
        loop: true
    };
    data = [];
    list = [];
    newsData = [];
    slidesData2 = [];
    musemList2 = [];

    tabs = [
        {
            icon: 'home_tab1',
            label: 'ᠦᠵᠡᠰᠬᠦᠯᠡᠩ <br> ᠦᠨ <br> ᠠᠩᠬᠠᠷᠤᠯ',
            value: 1
        },
        {
            icon: 'home_tab2',
            label: 'ᠬᠡᠶ᠋ᠢᠰᠪᠦᠷᠢ <br> ᠮᠦᠽᠧᠶ',
            value: 2
        },
        {
            icon: 'home_tab3',
            label: `ᠰᠣᠶᠣᠯ ᠤᠨ <br>ᠡᠭᠦᠳ᠋ᠦᠯᠲᠡ ᠶ᠋ᠢᠨ <br> ᠦᠶᠯᠡᠳᠬᠦᠨ`,
            value: 3
        },
        {
            icon: 'home_tab4',
            label: 'ᠡᠷᠳᠠᠮ <br> ᠰᠢᠠᠵᠢᠯᠠ‍ᠭᠡ',
            value: 4
        }
    ];

    constructor(private http: HttpService,
                private router: Router,
                public modal: ModalController) {
    }

    ngOnInit() {
        this.getBanner();
        this.getData();
        this.requestNews();
        this.requestSlideData2();
        this.requestMusemList();
    }

    getBanner() {
        const params = {
            url: 'api.php/cms/slide/gid/1',
            data: {}
        };
        this.http.get(params).subscribe(res => {
            if (res.code === 1) {
                this.data = res.data;
            }

            this.refresher.complete();
        });
    }

    getData() {
        const params = {
            url: 'api.php/cms/search',
            data: 'isrecommend=1'
        };
        this.http.post(params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            }
        }).subscribe(res => {
            if (res.code === 1) {
                this.list = res.data;
            }
        });
    }

    requestNews() {
        const params = {
            url: 'api.php/list/31/page/1/num/3',
            data: {}
        };
        this.http.get(params).subscribe(res => {
            if (res.code === 1) {
                this.newsData = res.data;
            }

            this.refresher.complete();
        });
    }

    requestSlideData2() {
        const params = {
            url: 'api.php/list/29/page/1/num/10',
            data: {}
        };
        this.http.get(params).subscribe(res => {
            if (res.code === 1) {
                this.slidesData2 = res.data;
            }

            this.refresher.complete();
        });
    }

    requestMusemList() {
        const params = {
            url: 'api.php/list/28/page/1/num/10',
            data: {}
        };
        this.http.get(params).subscribe(res => {
            if (res.code === 1) {
                this.musemList2 = res.data;
            }
            this.refresher.complete();
        });
    }

    detailChange(event: any): void {
        this.router.navigate(['/detail'], {queryParams: {id: event.id}});
    }

    doRefresh(): void {
        this.list = [];
        this.getData();
    }

    gotoNewsList(sid, catId): void {
        this.router.navigate(['grid'], {queryParams: {par: '1,' + sid + ',' + catId}});
    }

    onTabClick(i: any): void {
        console.log(i);
        switch (i) {
            case 0:
                this.detailChange({
                    id: 34
                });
                break;
            case 1:
                this.openVr();
                break;
            case 2:
                this.gotoNewsList(16, 43);
                break;
            case 3:
                this.gotoNewsList(15, 40);
                break;
        }

    }

    // async openVr() {
    //     const {Browser} = Plugins;
    //     await Browser.open({url: 'https://720yun.com/t/212jrghasf4?scene_id=27643058', windowName: '_self'});
    // }

    async openVr() {
        const modal = await this.modal.create({
            component: VrPageComponent
        });
        return await modal.present();
    }
}
