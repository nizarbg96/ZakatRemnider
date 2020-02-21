import { IPayment } from 'app/shared/model/payment.model';
import { IPeriod } from 'app/shared/model/period.model';
import { IUserExtra } from 'app/shared/model/user-extra.model';

export interface IZakat {
  id?: number;
  dueAmount?: number;
  remainingAmount?: number;
  payments?: IPayment[];
  period?: IPeriod;
  userExtra?: IUserExtra;
}

export class Zakat implements IZakat {
  constructor(
    public id?: number,
    public dueAmount?: number,
    public remainingAmount?: number,
    public payments?: IPayment[],
    public period?: IPeriod,
    public userExtra?: IUserExtra
  ) {}
}
