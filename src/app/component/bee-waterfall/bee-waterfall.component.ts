import {Component, Input, OnInit, Output, OnChanges, SimpleChanges, ChangeDetectorRef, EventEmitter} from '@angular/core';
import Config from '../../config';

@Component({
    selector: 'bee-waterfall',
    templateUrl: './bee-waterfall.component.html',
    styleUrls: ['./bee-waterfall.component.scss'],
})
export class BeeWaterfallComponent implements OnInit, OnChanges {

    @Input()
    cover: string;

    @Input()
    data: any[];

    @Output()
    onCover: EventEmitter<any> = new EventEmitter();

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

    logoChange(): void {
        this.onCover.emit();
    }

    setItemStyle(index: number) {
        const h = Math.floor(index / 2);
        let top = 216 * h;
        if (index % 2 !== 0) {
            top += 96;
        }
        return {
            top: `${top}px`
        };
    }

}
