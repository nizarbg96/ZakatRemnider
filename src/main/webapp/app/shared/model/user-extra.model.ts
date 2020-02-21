import { IBankAccount } from 'app/shared/model/bank-account.model';
import { IPeriod } from 'app/shared/model/period.model';
import { IZakat } from 'app/shared/model/zakat.model';
import { IBeneficiary } from 'app/shared/model/beneficiary.model';

export interface IUserExtra {
  id?: number;
  bankAccount?: IBankAccount;
  periods?: IPeriod[];
  zakats?: IZakat[];
  beneficiarys?: IBeneficiary[];
}

export class UserExtra implements IUserExtra {
  constructor(
    public id?: number,
    public bankAccount?: IBankAccount,
    public periods?: IPeriod[],
    public zakats?: IZakat[],
    public beneficiarys?: IBeneficiary[]
  ) {}
}
