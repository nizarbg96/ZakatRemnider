import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IZakat, Zakat } from 'app/shared/model/zakat.model';
import { ZakatService } from './zakat.service';
import { IUserExtra } from 'app/shared/model/user-extra.model';
import { UserExtraService } from 'app/entities/user-extra/user-extra.service';

@Component({
  selector: 'jhi-zakat-update',
  templateUrl: './zakat-update.component.html'
})
export class ZakatUpdateComponent implements OnInit {
  isSaving = false;
  userextras: IUserExtra[] = [];

  editForm = this.fb.group({
    id: [],
    dueAmount: [null, [Validators.required]],
    remainingAmount: [null, [Validators.required]],
    userExtra: []
  });

  constructor(
    protected zakatService: ZakatService,
    protected userExtraService: UserExtraService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ zakat }) => {
      this.updateForm(zakat);

      this.userExtraService.query().subscribe((res: HttpResponse<IUserExtra[]>) => (this.userextras = res.body || []));
    });
  }

  updateForm(zakat: IZakat): void {
    this.editForm.patchValue({
      id: zakat.id,
      dueAmount: zakat.dueAmount,
      remainingAmount: zakat.remainingAmount,
      userExtra: zakat.userExtra
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const zakat = this.createFromForm();
    if (zakat.id !== undefined) {
      this.subscribeToSaveResponse(this.zakatService.update(zakat));
    } else {
      this.subscribeToSaveResponse(this.zakatService.create(zakat));
    }
  }

  private createFromForm(): IZakat {
    return {
      ...new Zakat(),
      id: this.editForm.get(['id'])!.value,
      dueAmount: this.editForm.get(['dueAmount'])!.value,
      remainingAmount: this.editForm.get(['remainingAmount'])!.value,
      userExtra: this.editForm.get(['userExtra'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IZakat>>): void {
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
