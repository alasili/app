import {Component, OnInit} from '@angular/core';
import {HttpService} from '../service/http/http.service';
import {LoadingController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import Config from '../config';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {


    public host = Config.host;
    public parentId: any;
    public data = [];

    constructor(private http: HttpService,
                public load: LoadingController,
                private router: Router,
                private route: ActivatedRoute) {
        this.route.queryParams.subscribe(res => {
            this.parentId = res.id;
        });
    }

    ngOnInit() {
        this.getNav();
    }

    getNav(): void {
        const param = {
            url: `api.php/cms/nav/scode/${this.parentId}`,
        };
        this.http.get(param).subscribe(res => {
            this.data = res.data;
        });
    }

    itemClick(event: any): void {
        this.router.navigate(['/grid'], {
            queryParams: {
                did: event.scode,
                type: 1,
                parent: event.pcode
            }
        });
    }

}
