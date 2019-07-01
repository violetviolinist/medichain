import { Injectable } from "@angular/core";
import { Http, Response,Headers,RequestOptions } from '@angular/http';
// import 'rxjs/add/operator/map';
import { Observable,Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import 'rxjs/Rx'; //get everything from Rx    
// import 'rxjs/add/operator/toPromise';
import { HttpHeaders } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { post } from 'selenium-webdriver/http';

@Injectable({ providedIn: 'root' })
export class UserService{

    openPackage=new EventEmitter<any>();        
  
    constructor(private http:Http) {
    }
    //------------List of all packages available by provider---------------
    allPackages()
    {
        // return this.http.get('assets/data/dispackage.json')
        return this.http.get('http://localhost:3000/api/Package') 
        .flatMap((data) =>data.json());
    }
    //------------get specific package------------------------------------
    
    getSpecificPackage(packageId){
        // return this.http.get('assets/data/openPackage.json')
        return this.http.get('http://localhost:3000/api/Package/'+packageId) 
        .map((data) =>data.json());
    }

     //------------get specific bought package------------------------------------
    
     getSpecificBoughtPackage(){
        // return this.http.get('assets/data/openBoughtPackage.json')
        return this.http.get('http://localhost:3000/api/BoughtPackage/boughtPackage2') 
        .map((data) =>data.json());
    }

    //----------------------Post provider generated package----------------
    postPackage(packageDetails){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:3000/api/Package',packageDetails, options)
                .map(this.extractData)
                .catch(this.handleErrorObservable);
    }

    //----------------------Post bought package---------------------------
    postBoughtPackage(bPackage){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:3000/api/BoughtPackage',bPackage, options)
                .map(this.extractData)
                .catch(this.handleErrorObservable);
    }

    //------------------complete stage------------------------------
    providerCompleteStage(bPackageId){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:3000/api/CompleteStage',bPackageId, options)
                .map(this.extractData)
                .catch(this.handleErrorObservable);
    }
     //------------------complete contingency------------------------------
     providerContingencyStage(bPackageId){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:3000/api/CompleteContingency',bPackageId, options)
                .map(this.extractData)
                .catch(this.handleErrorObservable);
    }
     //------------------patient verify stage------------------------------
     patientVerifyStage(bPackageId){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:3000/api/VerifyStage',bPackageId, options)
                .map(this.extractData)
                .catch(this.handleErrorObservable);
    }
    //------------------patient verify contingency------------------------------
    patientVerifyContingency(bPackageId){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:3000/api/VerifyContingency',bPackageId, options)
                .map(this.extractData)
                .catch(this.handleErrorObservable);
    }
    //------------------patient verify contingency------------------------------
    raiseContingency(bPackageId){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:3000/api/RaiseContingency',bPackageId, options)
                .map(this.extractData)
                .catch(this.handleErrorObservable);
    }
    //------------------patient verify contingency------------------------------
    expertValidateContingency(bPackageId){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:3000/api/ValidateContingency',bPackageId, options)
                .map(this.extractData)
                .catch(this.handleErrorObservable);
    }
    
    
    //---------for extracting and handling errors(post request)------------
    extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
    handleErrorObservable (error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    } 
}