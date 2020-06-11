import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar as Bar} from '@ionic-native/status-bar/ngx';
import {Plugins, StatusBarStyle} from '@capacitor/core';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(private platform: Platform,
                private splashScreen: SplashScreen,
                private statusBar: Bar) {
        this.initializeApp();
        this.changeStatusBar();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    changeStatusBar() {
        const {StatusBar} = Plugins;
        StatusBar.setStyle({
            style: StatusBarStyle.Dark
        });
        StatusBar.setBackgroundColor({
            color: '#3880ff'
        });
    }
}
