import {Injectable} from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    HttpParams,
} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {UtilsService} from '../utils/utils.service';
import Config from '../../config';

interface Params {
    url: string;
    data?: any;
    host?: string;
}

interface Options {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    // observe?: 'body';
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class HttpService {

    private host = Config.host;

    constructor(private http: HttpClient,
                private utils: UtilsService) {
    }

    /**
     * get 请求
     * @param url 请求参数
     */
    public get(param: Params, option?: Options): Observable<any> {
        const options = {
            params: new HttpParams({fromObject: param.data ? param.data : {}}),
            ...option
        };
        let url = `${this.host}${param.url}`;
        if (param.host) {
            url = `${param.host}${param.url}`;
        }
        return this.http
            .get(url, options)
            .pipe(map(this.handleResult), catchError(this.handleError));
    }

    /**
     * post 请求
     * @param url 请求地址
     * @param data 参数
     */
    public post(param: Params, option?: Options): Observable<any> {
        let url = `${this.host}${param.url}`;
        if (param.host) {
            url = `${param.host}${param.url}`;
        }
        return this.http
            .post(url, param.data, option)
            .pipe(map(this.handleResult), catchError(this.handleError));
    }

    /**
     * put 请求
     * @param url 请求地址
     * @param data 参数
     */
    public put(param: Params, option?: Options): Observable<any> {
        let url = `${this.host}${param.url}`;
        if (param.host) {
            url = `${param.host}${param.url}`;
        }
        return this.http
            .put(url, param.data, option)
            .pipe(map(this.handleResult), catchError(this.handleError));
    }

    /**
     * delete 请求
     * @param url 请求地址
     */
    public delete(param: Params, option?: Options): Observable<{}> {
        let url = `${this.host}${param.url}`;
        if (param.host) {
            url = `${param.host}${param.url}`;
        }
        return this.http
            .delete(url, option)
            .pipe(map(this.handleResult), catchError(this.handleError));
    }

    /**
     * 成功结果
     * @param res 结果
     */
    private handleResult(res, utils?: any): any {
        const body = res;
        return body || {};
    }

    /**
     * 错误结果
     * @param error 错误信息
     */
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // 发生客户端或网络错误。相应处理
            console.error('发生错误:', error.error.message);
        } else {
            // 后端返回了不成功的响应代码。
            // 反应体可能包含了什么地方出了问题的线索，
            console.error(
                `后端返回代码: ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // 返回带有面向用户的错误消息的可观测数据
        return throwError('发生了不好的事情，请稍后再试。');
    }
}
