import { Moment } from 'moment';
import { IZakat } from 'app/shared/model/zakat.model';
import { IBeneficiary } from 'app/shared/model/beneficiary.model';

export interface IPayment {
  id?: number;
  paymentAmount?: number;
  paymentDate?: Moment;
  zakat?: IZakat;
  beneficiary?: IBeneficiary;
}

export class Payment implements IPayment {
  constructor(
    public id?: number,
    public paymentAmount?: number,
    public paymentDate?: Moment,
    public zakat?: IZakat,
    public beneficiary?: IBeneficiary
  ) {}
}
