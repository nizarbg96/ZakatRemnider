import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPeriod, Period } from 'app/shared/model/period.model';
import { PeriodService } from './period.service';
import { IZakat } from 'app/shared/model/zakat.model';
import { ZakatService } from 'app/entities/zakat/zakat.service';
import { IUserExtra } from 'app/shared/model/user-extra.model';
import { UserExtraService } from 'app/entities/user-extra/user-extra.service';

type SelectableEntity = IZakat | IUserExtra;

@Component({
  selector: 'jhi-period-update',
  templateUrl: './period-update.component.html'
})
export class PeriodUpdateComponent implements OnInit {
  isSaving = false;
  zakats: IZakat[] = [];
  userextras: IUserExtra[] = [];
  beginDateDp: any;
  endDateDp: any;

  editForm = this.fb.group({
    id: [],
    beginDate: [null, [Validators.required]],
    endDate: [],
    duration: [],
    taxable: [null, [Validators.required]],
    zakat: [],
    userExtra: []
  });

  constructor(
    protected periodService: PeriodService,
    protected zakatService: ZakatService,
    protected userExtraService: UserExtraService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ period }) => {
      this.updateForm(period);

      this.zakatService
        .query({ filter: 'period-is-null' })
        .pipe(
          map((res: HttpResponse<IZakat[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IZakat[]) => {
          if (!period.zakat || !period.zakat.id) {
            this.zakats = resBody;
          } else {
            this.zakatService
              .find(period.zakat.id)
              .pipe(
                map((subRes: HttpResponse<IZakat>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IZakat[]) => (this.zakats = concatRes));
          }
        });

      this.userExtraService.query().subscribe((res: HttpResponse<IUserExtra[]>) => (this.userextras = res.body || []));
    });
  }

  updateForm(period: IPeriod): void {
    this.editForm.patchValue({
      id: period.id,
      beginDate: period.beginDate,
      endDate: period.endDate,
      duration: period.duration,
      taxable: period.taxable,
      zakat: period.zakat,
      userExtra: period.userExtra
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const period = this.createFromForm();
    if (period.id !== undefined) {
      this.subscribeToSaveResponse(this.periodService.update(period));
    } else {
      this.subscribeToSaveResponse(this.periodService.create(period));
    }
  }

  private createFromForm(): IPeriod {
    return {
      ...new Period(),
      id: this.editForm.get(['id'])!.value,
      beginDate: this.editForm.get(['beginDate'])!.value,
      endDate: this.editForm.get(['endDate'])!.value,
      duration: this.editForm.get(['duration'])!.value,
      taxable: this.editForm.get(['taxable'])!.value,
      zakat: this.editForm.get(['zakat'])!.value,
      userExtra: this.editForm.get(['userExtra'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPeriod>>): void {
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
