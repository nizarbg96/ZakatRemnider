import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBeneficiary, Beneficiary } from 'app/shared/model/beneficiary.model';
import { BeneficiaryService } from './beneficiary.service';
import { IUserExtra } from 'app/shared/model/user-extra.model';
import { UserExtraService } from 'app/entities/user-extra/user-extra.service';

@Component({
  selector: 'jhi-beneficiary-update',
  templateUrl: './beneficiary-update.component.html'
})
export class BeneficiaryUpdateComponent implements OnInit {
  isSaving = false;
  userextras: IUserExtra[] = [];

  editForm = this.fb.group({
    id: [],
    firstName: [],
    lastName: [],
    phoneNumber: [],
    adress: [],
    otherDetails: [],
    userExtra: []
  });

  constructor(
    protected beneficiaryService: BeneficiaryService,
    protected userExtraService: UserExtraService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ beneficiary }) => {
      this.updateForm(beneficiary);

      this.userExtraService.query().subscribe((res: HttpResponse<IUserExtra[]>) => (this.userextras = res.body || []));
    });
  }

  updateForm(beneficiary: IBeneficiary): void {
    this.editForm.patchValue({
      id: beneficiary.id,
      firstName: beneficiary.firstName,
      lastName: beneficiary.lastName,
      phoneNumber: beneficiary.phoneNumber,
      adress: beneficiary.adress,
      otherDetails: beneficiary.otherDetails,
      userExtra: beneficiary.userExtra
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const beneficiary = this.createFromForm();
    if (beneficiary.id !== undefined) {
      this.subscribeToSaveResponse(this.beneficiaryService.update(beneficiary));
    } else {
      this.subscribeToSaveResponse(this.beneficiaryService.create(beneficiary));
    }
  }

  private createFromForm(): IBeneficiary {
    return {
      ...new Beneficiary(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      phoneNumber: this.editForm.get(['phoneNumber'])!.value,
      adress: this.editForm.get(['adress'])!.value,
      otherDetails: this.editForm.get(['otherDetails'])!.value,
      userExtra: this.editForm.get(['userExtra'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBeneficiary>>): void {
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

  trackById(index: number, item: IUserExtra): any {
    return item.id;
  }
}
