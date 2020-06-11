import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import Config from '../../config';

@Component({
    selector: 'bee-list',
    templateUrl: './bee-list.component.html',
    styleUrls: ['./bee-list.component.scss'],
})
export class BeeListComponent implements OnInit, OnChanges {

    @Input()
    cover: string;

    @Input()
    data: any[];

    @Output()
    onItemClick: EventEmitter<any> = new EventEmitter();

    host = Config.host;

    constructor(private cdr: ChangeDetectorRef) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.cdr.detectChanges();
    }

    itemChange(event: any): void {
        this.onItemClick.emit(event);
    }

}
