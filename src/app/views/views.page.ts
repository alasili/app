import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-views',
    templateUrl: './views.page.html',
    styleUrls: ['./views.page.scss'],
})
export class ViewsPage implements OnInit {

    @ViewChild('slide01', {static: true}) slide01;
    @ViewChild('slides', {static: true}) slides;
    @ViewChild('exhibition1', {static: true}) exhibition1;
    @ViewChild('exhibition2', {static: true}) exhibition2;

    constructor() {
    }

    slideOpts = {
        initialSlide: 0,
        speed: 500,
        autoplay: {
            delay: 3000,
        },
        loop: true,
        autoHeight: true
    };

    segmentValue = 0;
    option = {
        initialSlide: 0,
        autoHeight: true
    };

    exhibition = {
        initialSlide: 0,
        width: 80,
        height: 45,
        speed: 500,
        loop: true,
    };

    showExhibition = {
        initialSlide: 0,
        autoHeight: true,
        speed: 500,
        autoplay: {
            delay: 3000,
        },
        loop: true,
    };

    bannerList = [
        {
            src: '../../assets/image/banner1.jpg',
            path: ''
        },
        {
            src: '../../assets/image/banner2.jpg',
            path: ''
        },
        {
            src: '../../assets/image/banner3.jpg',
            path: ''
        },
        {
            src: '../../assets/image/banner4.jpg',
            path: ''
        },
        {
            src: '../../assets/image/banner5.jpg',
            path: ''
        }
    ];

    data: any[] = [];

    ngOnInit() {
        // this.http.get('http://localhost:8000/api/users').subscribe((res: any) => {
        //     console.log(res, 'ss');
        //     this.data = res.data;
        // });
    }

    slideTouchEnd() {
        this.slide01.startAutoplay();
    }

    slideChane(): void {
        this.slides.getActiveIndex().then(res => {
            console.log(res);
            this.segmentValue = res;
        });
    }

    exhibitionTouchEnd() {
        this.exhibition1.startAutoplay();
    }

    exhibitionChange1(): void {
        this.exhibition1.getActiveIndex().then(res => {
            this.exhibition2.slideTo(res, 500);
        });
    }

    segmentChanged(ev: any) {
        this.slides.slideTo(ev.detail.value, 400);
    }
}
