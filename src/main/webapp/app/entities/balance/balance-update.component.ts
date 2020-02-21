import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBalance, Balance } from 'app/shared/model/balance.model';
import { BalanceService } from './balance.service';
import { IBankAccount } from 'app/shared/model/bank-account.model';
import { BankAccountService } from 'app/entities/bank-account/bank-account.service';
import { IPeriod } from 'app/shared/model/period.model';
import { PeriodService } from 'app/entities/period/period.service';

type SelectableEntity = IBankAccount | IPeriod;

@Component({
  selector: 'jhi-balance-update',
  templateUrl: './balance-update.component.html'
})
export class BalanceUpdateComponent implements OnInit {
  isSaving = false;
  bankaccounts: IBankAccount[] = [];
  periods: IPeriod[] = [];
  balanceDateDp: any;

  editForm = this.fb.group({
    id: [],
    balanceAmount: [null, [Validators.required]],
    balanceDate: [null, [Validators.required]],
    bankAccount: [],
    period: []
  });

  constructor(
    protected balanceService: BalanceService,
    protected bankAccountService: BankAccountService,
    protected periodService: PeriodService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ balance }) => {
      this.updateForm(balance);

      this.bankAccountService.query().subscribe((res: HttpResponse<IBankAccount[]>) => (this.bankaccounts = res.body || []));

      this.periodService.query().subscribe((res: HttpResponse<IPeriod[]>) => (this.periods = res.body || []));
    });
  }

  updateForm(balance: IBalance): void {
    this.editForm.patchValue({
      id: balance.id,
      balanceAmount: balance.balanceAmount,
      balanceDate: balance.balanceDate,
      bankAccount: balance.bankAccount,
      period: balance.period
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const balance = this.createFromForm();
    if (balance.id !== undefined) {
      this.subscribeToSaveResponse(this.balanceService.update(balance));
    } else {
      this.subscribeToSaveResponse(this.balanceService.create(balance));
    }
  }

  private createFromForm(): IBalance {
    return {
      ...new Balance(),
      id: this.editForm.get(['id'])!.value,
      balanceAmount: this.editForm.get(['balanceAmount'])!.value,
      balanceDate: this.editForm.get(['balanceDate'])!.value,
      bankAccount: this.editForm.get(['bankAccount'])!.value,
      period: this.editForm.get(['period'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBalance>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
