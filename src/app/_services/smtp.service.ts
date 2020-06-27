import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class SmtpService {
    constructor(private http: HttpClient) { }

    sendEmail(message: Object) {
        return this.http.post<Object>(environment.sftp_server_uri+'sendmail/', message);
    }
}
