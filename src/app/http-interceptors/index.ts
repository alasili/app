import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {InterceptorService} from '../service/interceptor/interceptor.service';

export const httpInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: InterceptorService,
        multi: true
    },
];
