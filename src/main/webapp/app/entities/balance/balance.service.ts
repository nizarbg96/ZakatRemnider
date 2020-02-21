import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBalance } from 'app/shared/model/balance.model';

type EntityResponseType = HttpResponse<IBalance>;
type EntityArrayResponseType = HttpResponse<IBalance[]>;

@Injectable({ providedIn: 'root' })
export class BalanceService {
  public resourceUrl = SERVER_API_URL + 'api/balances';

  constructor(protected http: HttpClient) {}

  create(balance: IBalance): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(balance);
    return this.http
      .post<IBalance>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(balance: IBalance): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(balance);
    return this.http
      .put<IBalance>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IBalance>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBalance[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(balance: IBalance): IBalance {
    const copy: IBalance = Object.assign({}, balance, {
      balanceDate: balance.balanceDate && balance.balanceDate.isValid() ? balance.balanceDate.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.balanceDate = res.body.balanceDate ? moment(res.body.balanceDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((balance: IBalance) => {
        balance.balanceDate = balance.balanceDate ? moment(balance.balanceDate) : undefined;
      });
    }
    return res;
  }
}
