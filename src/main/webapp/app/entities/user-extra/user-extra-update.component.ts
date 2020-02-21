import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IUserExtra, UserExtra } from 'app/shared/model/user-extra.model';
import { UserExtraService } from './user-extra.service';
import { IBankAccount } from 'app/shared/model/bank-account.model';
import { BankAccountService } from 'app/entities/bank-account/bank-account.service';

@Component({
  selector: 'jhi-user-extra-update',
  templateUrl: './user-extra-update.component.html'
})
export class UserExtraUpdateComponent implements OnInit {
  isSaving = false;
  bankaccounts: IBankAccount[] = [];

  editForm = this.fb.group({
    id: [],
    bankAccount: []
  });

  constructor(
    protected userExtraService: UserExtraService,
    protected bankAccountService: BankAccountService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userExtra }) => {
      this.updateForm(userExtra);

      this.bankAccountService
        .query({ filter: 'userextra-is-null' })
        .pipe(
          map((res: HttpResponse<IBankAccount[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IBankAccount[]) => {
          if (!userExtra.bankAccount || !userExtra.bankAccount.id) {
            this.bankaccounts = resBody;
          } else {
            this.bankAccountService
              .find(userExtra.bankAccount.id)
              .pipe(
                map((subRes: HttpResponse<IBankAccount>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IBankAccount[]) => (this.bankaccounts = concatRes));
          }
        });
    });
  }

  updateForm(userExtra: IUserExtra): void {
    this.editForm.patchValue({
      id: userExtra.id,
      bankAccount: userExtra.bankAccount
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userExtra = this.createFromForm();
    if (userExtra.id !== undefined) {
      this.subscribeToSaveResponse(this.userExtraService.update(userExtra));
    } else {
      this.subscribeToSaveResponse(this.userExtraService.create(userExtra));
    }
  }

  private createFromForm(): IUserExtra {
    return {
      ...new UserExtra(),
      id: this.editForm.get(['id'])!.value,
      bankAccount: this.editForm.get(['bankAccount'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserExtra>>): void {
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

  trackById(index: number, item: IBankAccount): any {
    return item.id;
  }
}
