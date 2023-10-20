import { Http, Response, RequestOptions, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { Observable } from "rxjs/internal/Observable";
import { IGenericService } from "./IGenericService";
import { environment } from "../../../environment/environment";

export abstract class GenericService<T> implements IGenericService<T> {
  constructor(protected http: Http) {
    console.log("From GenericService contructor...");
  }

  doGetCall(actionCall: any, jsonObj: any) {
    console.log(
      "doGetCall::" +
        "actionCall:" +
        actionCall +
        "  stringUrl:" +
        JSON.stringify(jsonObj)
    );

    let stringUrl = "";
    for (let key in jsonObj) {
      if (jsonObj.hasOwnProperty(key)) {
        let val = jsonObj[key];
        stringUrl += "/" + val;
      }
    }
    let finalUrl = environment.apiUrl + actionCall;
    console.log("doGetCall::" + "finalUrl->" + finalUrl);

    return this.http
      .get(finalUrl + stringUrl)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  doPostCall(actionCall: any, jsonObj: any) {
    console.log(
      "doPostCall::" +
        "actionCall->" +
        actionCall +
        "::stringUrl:" +
        JSON.stringify(jsonObj)
    );

    let finalUrl = environment.apiUrl + actionCall;
    console.log("doPostCall::" + "finalUrl->" + finalUrl);

    let headers = new Headers({ "Content-Type": "application/json" });
    

    try {
      console.log("Inside Try for POST Call" + finalUrl);
      const call = this.http
        .post(finalUrl, jsonObj)
        .map((res: Response) => res.json())
        .catch(this.handleError);
      console.log("After the Call" + finalUrl);
      return call;
    } catch (error) {
      console.log("Post Call::", error);
      return error;
    }
  }


  GetAll(bypassAuth: boolean = false): Observable<T[]> {
    if (bypassAuth) {
      let headers: Headers = new Headers({ bypassAuthorization: "true" });
      let options: RequestOptions = new RequestOptions({ headers: headers });
      return this.http
        .get(environment.apiUrl, options)
        .map((res: Response) => res.json())
        .catch(this.handleError);
    } else {
      return this.http
        .get(environment.apiUrl)
        .map((res: Response) => res.json())
        .catch(this.handleError);
    }
  }
  
  Get(id: any): Observable<T> {
    const url = `${environment.apiUrl}/${id}`;
    return this.http
      .get(url)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
  Add(entity: T): Observable<T[]> {
    let data = JSON.stringify(entity);
    let headers: Headers = new Headers({ "content-type": "application/json" });
    let options: RequestOptions = new RequestOptions({ headers: headers });
    return this.http
      .post(environment.apiUrl, data, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
  Edit(entity: T): Observable<T[]> {
    let data = JSON.stringify(entity);
    let headers: Headers = new Headers({ "content-type": "application/json" });
    let options: RequestOptions = new RequestOptions({ headers: headers });
    return this.http
      .put(environment.apiUrl, data, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
  Delete(id: any): Observable<T[]> {
    const url = `${environment.apiUrl}/${id}`;
    return this.http
      .delete(url)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
 
  
 
  Logout(): Observable<T[]> {
    return this.http
      .get(environment.apiUrl)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  handleError(error: Response | any) {
    var ermg: string = "Sorry! Something wrong! Please try again later.";
    console.error(JSON.stringify(error));
    if (error instanceof Response) {
      let errMsg = `${error.status} - ${error.statusText || ""}`;
      if (error.status == 401 || error.status == 403) {
        //window.location.href = window.location.origin + '/src/unauthorizeErrorPage';
        window.location.href = window.location.origin + "/index.html";
      } else {
        //  swal(ermg);
        console.error(errMsg);
      }
    } else {
      let errMsg = error.message ? error.message : error.toString();
      console.error(errMsg);
    }
    try {
      //	new SentryErrorHandler().handleError(error);
    } catch (err) {
      console.error(err);
    }
    //console.error(errMsg);
    return [];
  }

  logError(error: Response | any) {
    console.error(JSON.stringify(error));
    return [];
  }  
}
