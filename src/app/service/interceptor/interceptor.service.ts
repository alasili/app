import {Injectable} from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';

import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';
import {UtilsService} from '../utils/utils.service';

@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

    constructor(private log: UtilsService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const started = Date.now();
        let ok: string;
        let authReq: any;
        authReq = req.clone({
            setHeaders: {
            }
        });
        return next.handle(authReq)
            .pipe(tap(event => ok = event instanceof HttpResponse ? '成功' : '', error => ok = '失败'), finalize(() => {
                    const elapsed = Date.now() - started;
                    const msg = `${req.method} -> ${req.urlWithParams} -> ${ok} in ${elapsed} ms.`;
                    // tslint:disable-next-line:max-line-length
                    console.log(`%c👽 ${req.method} -> ${req.urlWithParams} -> ${ok} in ${elapsed} ms.`, `background: rgba(23, 35, 61, 0.8); color: ${ok === '成功' ? '#19be6b' : '#ed4014'}`);
                    // const data = {
                    //     method: req.method,
                    //     url: req.urlWithParams,
                    //     params: req.body,
                    //     status: ok,
                    //     elapsed: `${elapsed} ms`
                    // };
                    // this.log.requestLog(data);
                })
            );
    }
}
