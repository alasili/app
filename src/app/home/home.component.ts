import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../service/http/http.service';
import Config from '../config';
import {IonRefresher} from '@ionic/angular';
import {Router} from '@angular/router';

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
            // label: 'ᠦᠵᠡᠰᠬᠦᠯᠡᠩ <br> ᠦᠨ <br> ᠠᠩᠬᠠᠷᠤᠯ',
            label: ' ᠠᠭᠤᠯᠭ᠎ᠠ <br> ᠬᠦᠮᠥᠵᠢᠯ',
            icons: '../../assets/image/one.png',
            value: 12
        },
        {
            icon: 'home_tab2',
            label: 'ᠬᠡᠶ᠋ᠢᠰᠪᠦᠷᠢ <br> ᠮᠦᠽᠧᠶ',
            icons: '../../assets/image/two.png',
            value: 48
        },
        {
            icon: 'home_tab3',
            label: `ᠰᠣᠶᠣᠯ ᠤᠨ <br>ᠡᠭᠦᠳ᠋ᠦᠯᠲᠡ ᠶ᠋ᠢᠨ <br> ᠦᠶᠯᠡᠳᠬᠦᠨ`,
            icons: '../../assets/image/three.png',
            value: 14
        },
        {
            icon: 'home_tab4',
            label: 'ᠡᠷᠳᠠᠮ <br> ᠰᠢᠠᠵᠢᠯᠠ‍ᠭᠡ',
            icons: '../../assets/image/four.png',
            value: 15
        }
    ];

    constructor(private http: HttpService,
                private router: Router) {
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

    onTabClick(event: any): void {
        this.router.navigate(['/views/nav'], {queryParams: {id: event.value}});
        // this.router.navigate(['/grid'], {
        //     queryParams: {
        //         did: event.scode,
        //         type: 1,
        //         parent: event.pcode
        //     }
        // });
    }

    // onTabClick(i: any): void {
    //     console.log(i);
    //     switch (i) {
    //         case 0:
    //             this.detailChange({
    //                 id: 34
    //             });
    //             break;
    //         case 1:
    //             this.openVr();
    //             break;
    //         case 2:
    //             this.gotoNewsList(16, 43);
    //             break;
    //         case 3:
    //             this.gotoNewsList(15, 40);
    //             break;
    //     }
    //
    // }

    openVr() {
        this.router.navigate(['/views/home/vr']);
    }
}
