import { Moment } from 'moment';
import { IBankAccount } from 'app/shared/model/bank-account.model';
import { IPeriod } from 'app/shared/model/period.model';

export interface IBalance {
  id?: number;
  balanceAmount?: number;
  balanceDate?: Moment;
  bankAccount?: IBankAccount;
  period?: IPeriod;
}

export class Balance implements IBalance {
  constructor(
    public id?: number,
    public balanceAmount?: number,
    public balanceDate?: Moment,
    public bankAccount?: IBankAccount,
    public period?: IPeriod
  ) {}
}
