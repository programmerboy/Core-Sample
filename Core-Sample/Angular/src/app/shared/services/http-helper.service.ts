import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError, retry, finalize, map } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Injectable()
export class HttpHelperService {

  private _pendingRequestCount = 0;
  private _pendingRequestCountSubject = new Subject<number>();
  public $pendingRequestCount = this._pendingRequestCountSubject.asObservable();

  private _disableInteractionSubject = new Subject<boolean>();
  public $disableInteractionSubject = this._disableInteractionSubject.asObservable();

  downloadedFileName: string;

  constructor(private http: HttpClient) { }

  // GET : needs to use response.blob() or response.json();
  public get<T>(
    url: string,
    parameters: any[] = [],
    headers: any[] = [],
    isFile: boolean = false,
    isDiscreet = false
  ): Observable<T> {

    const options = this.handleOptions(parameters, headers, isDiscreet);

    if (isFile) {
      options['responseType'] = 'blob';
      options['observe'] = 'response';
    }

    return this.http.get<any>(url, options).pipe(
      // retry(3),
      map(response => {

        if (isFile) {

          const contentDisposition = response.headers.get('Content-Disposition');

          if (contentDisposition) {

            const match = contentDisposition.match(/filename="(.*)"/i);

            if (match) {
              this.downloadedFileName = match[1].trim();
            }
          }

          return response.body;
        }

        return response;

      }),
      catchError(this.handleError),
      finalize(() => {
        if (!isDiscreet) {
          this._pendingRequestCountSubject.next(--this._pendingRequestCount);
        }
      })
    );
  }

  // POST
  public post<T>(
    url: string,
    data: {} = {},
    parameters: any[] = [],
    headers: any[] = [],
    responseType: string = '',
    isDiscreet = false,
    disableInteraction = false
  ): Observable<T> {

    const options = this.handleOptions(parameters, headers, isDiscreet);

    this._disableInteractionSubject.next(disableInteraction);

    if (responseType) {
      options['responseType'] = 'text';
    }

    return this.http.post<T>(url, data, options).pipe(
      catchError(this.handleError),
      finalize(() => {
        this._pendingRequestCountSubject.next(--this._pendingRequestCount);
      })
    );
  }

  // PUT
  public put(
    url: string,
    data: {} = {},
    parameters: any[] = [],
    headers: any[] = []
  ): Observable<HttpResponse<any>> {
    const options = this.handleOptions(parameters, headers);

    return this.http.put<any>(url, data, options).pipe(
      catchError(this.handleError),
      finalize(() => {
        this._pendingRequestCountSubject.next(--this._pendingRequestCount);
      })
    );
  }

  // DELETE
  public delete(
    url: string,
    parameters: any[] = [],
    headers: any[] = []
  ): Observable<HttpResponse<any>> {
    const options = this.handleOptions(parameters, headers);

    options['responseType'] = 'text';

    return this.http.delete<any>(url, options).pipe(
      catchError(this.handleError),
      finalize(() => {
        this._pendingRequestCountSubject.next(--this._pendingRequestCount);
      })
    );
  }

  // Upload File(s)
  public uploadFile(
    url: string,
    files: FileList,
    parameters: any[] = [],
    headers: any[] = []
  ): Observable<boolean> {
    const options = this.handleOptions([], headers);

    const formData: any = new FormData();

    // Add all the files in the collection.
    Array.from(files).forEach((item: File) =>
      formData.append('file', item, item.name)
    );

    // Add any extra parameters which need to be sent.
    parameters.forEach((item: any) => formData.append(item.name, item.value));

    return this.http.post<any>(url, formData, options).pipe(
      map(() => {
        return true;
      }),
      catchError(this.handleError),
      finalize(() => {
        this._pendingRequestCountSubject.next(--this._pendingRequestCount);
      })
    );
  }

  // Handle the options for HTTP requests.
  private handleOptions(parameters: any[] = [], headers: any[] = [], isDiscreet = false): {} {

    // Set the pending count.
    if (!isDiscreet) {
      this._pendingRequestCountSubject.next(++this._pendingRequestCount);
    }

    // Set the parameters
    let httpParams = new HttpParams();
    parameters.forEach((item: any) => {
      if (item && item.name) {
        httpParams = httpParams.append(item.name, item.value);
      }
    });

    // Set the parameters
    let httpHeaders = new HttpHeaders();
    headers.forEach(
      (item: any) => (httpHeaders = httpHeaders.append(item.name, item.value))
    );

    const options = {
      params: httpParams,
      headers: httpHeaders
    };

    return options;
  }

  private handleError(err: HttpErrorResponse) {

    let message = '';

    // A client-side or network error occurred. Handle it accordingly.
    if (err.error instanceof ErrorEvent) {
      console.error('An error occurred:', err.error.message);
    }

    if (err instanceof HttpErrorResponse) {

      if (err.status === 401) {
        message = 'You are not authorized.';
      } else if (err.status === 400) {

        if (typeof (err.error) === 'string') {
          message = err.error;
        } else {

          message = err.error.title + '<br />';

          Object.keys(err.error.errors).forEach(key => {

            const arrErrors = err.error.errors[key];

            arrErrors.forEach(element => {
              message += element + '<br />';
            });
          });
        }

      } else {
        message = 'Something bad happened; please try again later.';
        console.error(`Backend returned code ${err.status}, body was: ${err.message}.${err.error ? '\n' + err.error : ''}`);
      }

    }

    // return an observable with a user-facing error message
    return throwError(message);
  }

  public downloadFile(res: Blob, fileName: string = '') {

    if (!fileName) {
      fileName = this.downloadedFileName;
    }

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(res, fileName);
    } else {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res);
      link.download = fileName;
      link.click();
    }
  }


}
