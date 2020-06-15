import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-vr-page',
    templateUrl: './vr-page.component.html',
    styleUrls: ['./vr-page.component.scss'],
})
export class VrPageComponent implements OnInit {

    constructor(public modal: ModalController) {
    }

    ngOnInit() {
    }

    close() {
        this.modal.dismiss();
    }

}
