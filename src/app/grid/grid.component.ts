import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../service/http/http.service';
import Config from '../config';
import {UtilsService} from '../service/utils/utils.service';
import {IonInfiniteScroll, IonRefresher} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {ɵangular_packages_platform_browser_platform_browser_k} from '@angular/platform-browser';
import {prepareEventListenerParameters} from '@angular/compiler/src/render3/view/template';
// import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';
// import { spawnSync } from 'child_process';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {

    @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
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
    title = '鄂青博快讯';
    back = true;
    requestType = '0';
    pid = -1;
    catPic = '';

    constructor(private http: HttpService,
                private route: ActivatedRoute,
                private router: Router,
                private toast: UtilsService,
                public sanitizer: DomSanitizer) {
        this.route.queryParams.subscribe(res => {
            this.requestType = res.type;
            this.pid = res.parent;
            this.segmentValue2 = res.did;
            this.getTabs();
            this.getDatas();
            // if (res.par === null || res.par === undefined) {
            //     this.parseParams(this.route.snapshot.queryParams.par);
            // }
            // else {
            //     this.parseParams(res.par);
            // }
        });
    }

    ngOnInit() {
    }

    getTabs(): void {
        const params = {
            url: 'api.php/cms/nav',
        };
        this.http.get(params).subscribe(res => {
            if (res.code === 1) {
                var dd = res.data;
                /*
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
                */
                this.data.splice(0, this.data.length);
                if (this.pid != -1) {
                    dd.forEach(d => {
                        if (d.id === this.pid) {
                            this.title = d.subname != null && d.subname.length > 0 ? d.subname : d.title;

                            var son = d.son ? d.son : [];
                            son.forEach(dSon => {
                                if (this.segmentValue2 === dSon.scode) {
                                    this.data.push(dSon.title);
                                }
                            });
                        }
                    });
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
            if (this.refresher) {
                this.refresher.complete();
            }
            if (this.infiniteScroll) {
                this.infiniteScroll.complete();
            }

            if (res.code === 1) {
                this.list = this.list.concat(res.data);
                if (this.list.length === res.rowtotal) {
                    this.toast.showToast('ᠲᠦᠷ ᠨᠠᠩ ᠣᠯᠠᠨ ᠲᠣᠭ᠎ᠠ ᠪᠠᠷᠢᠮᠲᠠ ᠪᠠᠶᠬᠤ ᠦᠭᠡᠢ', 'top');
                    if (this.infiniteScroll) {
                        this.infiniteScroll.disabled = true;
                    }
                } else {
                    if (this.infiniteScroll) {
                        this.infiniteScroll.disabled = true;
                    }
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
        this.router.navigate(['/detail'], {
            queryParams: {
                id: event.id,
                did: this.segmentValue2,
                type: this.requestType,
                parent: this.pid
            }
        });
    }

    parseParams(res) {
        var pSplit = res.split(',');
        if (pSplit.length == 0) {
            return;
        }

        this.back = pSplit.length > 1;

        this.requestType = pSplit[0];

        if (pSplit.length > 1) {
            this.pid = pSplit[1];
            this.segmentValue2 = pSplit[2];
        }
    }

    getDatas() {
        if (this.requestType === '0') {
            this.cmsSearch();
        } else if (this.requestType === '1') {
            this.getData();
        }
    }

    cmsSearch() {
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

    safeHtml(content) {
        const str = content.replace(/<[^>]+>/g, '').substring(0, 100);
        return this.sanitizer.bypassSecurityTrustHtml(str);
    }

    formatDate(date) {
        return date.substring(0, date.indexOf(' '));
    }

    handleTitle(str: any) {
        return str.replace(/<[^>]+>/g, '');
    }
}
