import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ZakatReminderSharedModule } from 'app/shared/shared.module';
import { BeneficiaryComponent } from './beneficiary.component';
import { BeneficiaryDetailComponent } from './beneficiary-detail.component';
import { BeneficiaryUpdateComponent } from './beneficiary-update.component';
import { BeneficiaryDeleteDialogComponent } from './beneficiary-delete-dialog.component';
import { beneficiaryRoute } from './beneficiary.route';

@NgModule({
  imports: [ZakatReminderSharedModule, RouterModule.forChild(beneficiaryRoute)],
  declarations: [BeneficiaryComponent, BeneficiaryDetailComponent, BeneficiaryUpdateComponent, BeneficiaryDeleteDialogComponent],
  entryComponents: [BeneficiaryDeleteDialogComponent]
})
export class ZakatReminderBeneficiaryModule {}
