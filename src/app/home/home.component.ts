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

    tabs = [
        {
            icon: '',
            label: 'ᠦᠵᠡᠰᠬᠦᠯᠡᠩ <br> ᠦᠨ <br> ᠠᠩᠬᠠᠷᠤᠯ',
            value: 1
        },
        {
            icon: '',
            label: 'ᠬᠡᠶ᠋ᠢᠰᠪᠦᠷᠢ <br> ᠮᠦᠽᠧᠶ',
            value: 2
        },
        {
            icon: '',
            label: `ᠰᠣᠶᠣᠯ ᠤᠨ <br> ᠡᠭᠦᠳ᠋ᠦᠯᠲᠡ ᠶ᠋ᠢᠨ <br> ᠦᠶᠯᠡᠳᠬᠦᠨ`,
            value: 3
        },
        {
            icon: '',
            label: 'ᠡᠷᠳᠠᠮ <br> ᠰᠢᠠᠵᠢᠯᠠ‍ᠭᠡ',
            value: 4
        }
    ];

    constructor(private http: HttpService,
                private router: Router) {
    }

    ngOnInit() {
        this.getBanner();
        this.getData();
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

    detailChange(event: any): void {
        this.router.navigate(['/detail'], {queryParams: {id: event.id}});
    }

    doRefresh(): void {
        this.list = [];
        this.getData();
    }

}
