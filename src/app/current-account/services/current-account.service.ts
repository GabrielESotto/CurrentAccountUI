import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/services/base.service";
import { CurrentAccountStatement } from "../models/currentAccountStatement";
import { Observable, catchError, map } from "rxjs";
import { environment } from "src/app/environment/environment.prod";

@Injectable()
export class CurrentAccountService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  getAllStatement(): Observable<CurrentAccountStatement[]> {
    return this.http.get(environment.apiUrlv1 + 'AccountsStatements', this.GetHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  getStatementById(id: string): Observable<CurrentAccountStatement> {
    return this.http.get(environment.apiUrlv1 + `AccountsStatements/${id}`, this.GetHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  addStatement(accountStatement: CurrentAccountStatement): Observable<CurrentAccountStatement> {
    return this.http.post(environment.apiUrlv1 + 'AccountsStatements', accountStatement, this.GetHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  updateStatement(accountStatement: CurrentAccountStatement): Observable<CurrentAccountStatement> {
    return this.http.put(environment.apiUrlv1 + 'AccountsStatements', accountStatement, this.GetHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  cancelStatement(id: string): Observable<CurrentAccountStatement> {
    return this.http.put(environment.apiUrlv1 + 'AccountsStatements/Cancel?Id=' + id, this.GetHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }
}
