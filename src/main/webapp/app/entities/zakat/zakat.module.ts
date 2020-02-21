import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ZakatReminderSharedModule } from 'app/shared/shared.module';
import { ZakatComponent } from './zakat.component';
import { ZakatDetailComponent } from './zakat-detail.component';
import { ZakatUpdateComponent } from './zakat-update.component';
import { ZakatDeleteDialogComponent } from './zakat-delete-dialog.component';
import { zakatRoute } from './zakat.route';

@NgModule({
  imports: [ZakatReminderSharedModule, RouterModule.forChild(zakatRoute)],
  declarations: [ZakatComponent, ZakatDetailComponent, ZakatUpdateComponent, ZakatDeleteDialogComponent],
  entryComponents: [ZakatDeleteDialogComponent]
})
export class ZakatReminderZakatModule {}
