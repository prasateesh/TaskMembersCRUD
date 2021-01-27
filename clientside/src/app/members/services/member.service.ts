import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {IMember} from "../models/IMember";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private httpClient:HttpClient) { }

  // Get all Member
  public getAllMember():Observable<IMember[]>{
    let dataURL = 'http://127.0.0.1:5000/api/members/';
    return this.httpClient.get<IMember[]>(dataURL).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // Get a Single Member
  public getMember(memberId):Observable<IMember>{
    let dataURL = `http://127.0.0.1:5000/api/members/${memberId}`;
    return this.httpClient.get<IMember>(dataURL).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // Create a Member
  public createMember(member:IMember):Observable<IMember>{
    let dataURL = `http://127.0.0.1:5000/api/members/`;
    return this.httpClient.post<IMember>(dataURL, member).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // Update a Member
  public updateMember(member:IMember , memberId:string):Observable<IMember>{
    let dataURL = `http://127.0.0.1:5000/api/members/${memberId}`;
    return this.httpClient.put<IMember>(dataURL, member).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Delete a Member
  public deleteMember(memberId:string):Observable<IMember>{
    let dataURL = `http://127.0.0.1:5000/api/members/${memberId}`;
    return this.httpClient.delete<IMember>(dataURL).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  public handleError(error:HttpErrorResponse){
    let errorMessage:string = '';
    if(error.error instanceof ErrorEvent){
      // client Error
      errorMessage = `Error : ${error.error.message}`
    }
    else{
      // server error
      errorMessage = `Status : ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
