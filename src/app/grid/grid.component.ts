import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../service/http/http.service';
import Config from '../config';
import {UtilsService} from '../service/utils/utils.service';
import {IonInfiniteScroll, IonRefresher} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {

    @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;
    @ViewChild(IonRefresher, {static: false}) refresher: IonRefresher;
    @ViewChild('slides', {static: true}) slides;

    host = Config.host;
    list = [];
    segmentValue = '';
    segmentValue2 = null;
    coverUrl = '';
    data2 = [];
    data = [];
    page = 1;
    limit = 10;
    initStatus = true;
    slideConfig = {
        initialSlide: 0
    };

    constructor(private http: HttpService,
                private router: Router,
                private toast: UtilsService) {
    }

    ngOnInit() {
        this.getTabs();
    }

    getTabs(): void {
        const params = {
            url: 'api.php/cms/nav',
        };
        this.http.get(params).subscribe(res => {
            if (res.code === 1) {
                this.data = res.data;
                this.segmentValue = res.data[0].id;
                this.coverUrl = res.data[0].pic;
                this.data2 = res.data[0].son;
                this.segmentValue2 = res.data[0].son.length ? res.data[0].son[0].scode : '';
                setTimeout(() => {
                    this.initStatus = false;
                }, 500);

                if (this.segmentValue2) {
                    this.getData();
                }
            }
        });
    }

    getData(): void {
        const params = {
            url: `api.php/list/${this.segmentValue2}/page/${this.page}/num/${this.limit}`,
            data: {}
        };
        this.http.get(params).subscribe(res => {
            this.refresher.complete();
            this.infiniteScroll.complete();

            if (res.code === 1) {
                this.list = this.list.concat(res.data);
                if (this.list.length === res.rowtotal) {
                    this.toast.showToast('ᠲᠦᠷ ᠨᠠᠩ ᠣᠯᠠᠨ ᠲᠣᠭ᠎ᠠ ᠪᠠᠷᠢᠮᠲᠠ ᠪᠠᠶᠬᠤ ᠦᠭᠡᠢ', 'top');
                    this.infiniteScroll.disabled = true;
                } else {
                    this.infiniteScroll.disabled = false;
                }
            } else {
                this.toast.showToast('错误', 'top');
            }
        });
    }

    segmentChanged(event: any): void {
        this.segmentValue = event.detail.value;
        const index = this.data.findIndex(el => el.id === event.detail.value);
        this.coverUrl = this.data[index].pic;
        this.data2 = this.data[index].son;
        this.segmentValue2 = this.data2.length ? this.data2[0].scode : '';
        this.slides.slideTo(index, 400);
    }

    slideChange(): void {
        this.slides.getActiveIndex().then(res => {
            this.segmentValue = this.data[res].id;
        });
    }


    segmentChanged2(event: any): void {
        this.segmentValue2 = event.detail.value;
        if (!this.initStatus) {
            this.page = 1;
            this.list = [];
            if (this.segmentValue2) {
                this.getData();
            }
            this.infiniteScroll.disabled = false;
        }
    }

    doRefresh(): void {
        this.page = 1;
        this.list = [];
        this.infiniteScroll.disabled = false;
        if (this.segmentValue2) {
            this.getData();
        } else {
            this.refresher.complete();
        }
    }

    loadData(): void {
        this.page += 1;
        this.getData();
    }

    detailChange(event: any): void {
        this.router.navigate(['/detail'], {queryParams: {id: event.id}});
    }

}
