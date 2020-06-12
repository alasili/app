import {Component, Input, OnInit} from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'bee-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

    @Input() title: string;
    @Input() back: boolean;

    constructor(public nav: NavController) { }

    ngOnInit() {
    }


    goBack() {
        this.nav.back();
    }
}
