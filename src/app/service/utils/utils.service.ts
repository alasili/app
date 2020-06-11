import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    constructor(private toast: ToastController) {
    }

    /**
     * 显示toast
     * @param title 标题
     * @param position 位置
     * @param duration 持续时间
     */
    async showToast(title: string, position?: 'top' | 'bottom' | 'middle', duration: number = 2000) {
        const toast = await this.toast.create({
            message: title,
            duration,
            position,
            cssClass: 'orh-ionic-toast',
        });
        await toast.present();
    }
}
