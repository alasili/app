import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'bee-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

    @Input() title: string;
    @Input() back: boolean;

    constructor() { }

    ngOnInit() {
    }

}
