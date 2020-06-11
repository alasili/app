import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'bee-icon',
    templateUrl: './bee-icon.component.html',
    styleUrls: ['./bee-icon.component.scss'],
})
export class BeeIconComponent implements OnInit {

    @Input()
    name: string;

    @Input()
    color = '';

    @Input()
    size = '';

    constructor() {
    }

    ngOnInit() {
    }

}
