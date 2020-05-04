import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmModalComponent } from './shared/modals/confirm-modal/confirm-modal.component';
import { UtilityService } from './shared/services/utility.service';
import { BaseService } from './shared/services/base.service';
import { HttpHelperService } from './shared/services/http-helper.service';
import { LocatorService } from './shared/services/locator.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { EllipsisPipe } from './shared/pipes/ellipsis.pipe';
import { RouterModule } from '@angular/router';
import { CustomMaterialModule } from './custom-material.module';
import { PrototypeService } from './shared/services/prototype.service';

@NgModule({
  declarations: [
    // Pipes
    PaginationComponent,
    EllipsisPipe,
    // Modals
    ConfirmModalComponent,
  ],
  exports: [
    PaginationComponent,
    // Pipes
    EllipsisPipe,
    //
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    UtilityService,
    PrototypeService,
    BaseService,
    LocatorService,
    HttpHelperService,
  ],
})
export class SharedModule {
  constructor(private injector: Injector) {
    // Create global Service Injector.
    LocatorService.injector = this.injector;
  }
}
