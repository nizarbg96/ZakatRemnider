import { Moment } from 'moment';
import { IZakat } from 'app/shared/model/zakat.model';
import { IBalance } from 'app/shared/model/balance.model';
import { IUserExtra } from 'app/shared/model/user-extra.model';

export interface IPeriod {
  id?: number;
  beginDate?: Moment;
  endDate?: Moment;
  duration?: number;
  taxable?: boolean;
  zakat?: IZakat;
  balances?: IBalance[];
  userExtra?: IUserExtra;
}

export class Period implements IPeriod {
  constructor(
    public id?: number,
    public beginDate?: Moment,
    public endDate?: Moment,
    public duration?: number,
    public taxable?: boolean,
    public zakat?: IZakat,
    public balances?: IBalance[],
    public userExtra?: IUserExtra
  ) {
    this.taxable = this.taxable || false;
  }
}
