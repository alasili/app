import {Component, Input, OnInit} from '@angular/core';
import Config from '../../config';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-qrcode',
    templateUrl: './qrcode.component.html',
    styleUrls: ['./qrcode.component.scss'],
})
export class QrcodeComponent implements OnInit {

    @Input()
    title: string;

    @Input()
    type: number;

    host = Config.host;

    constructor(public modal: ModalController) {
    }

    ngOnInit() {
    }

    close(): void {
        this.modal.dismiss();
    }

}
