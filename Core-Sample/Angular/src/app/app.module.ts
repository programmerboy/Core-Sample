import { NgModule, Injector } from '@angular/core';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { ConfirmModalComponent } from './shared/modals/confirm-modal/confirm-modal.component';
import { UtilityService } from './shared/services/utility.service';
import { BaseService } from './shared/services/base.service';
import { HttpHelperService } from './shared/services/http-helper.service';
import { LocatorService } from './shared/services/locator.service';
import { AboutComponent } from './component/about/about.component';
import { PrototypeService } from './shared/services/prototype.service';

import { SharedModule } from './shared.module';
import { AppRoutingModule } from './app-routing.module';
import { BaseComponent } from './shared/base/base.component';
import { LookupComponent } from './component/lookup-component/lookup.component';
import { LookupService } from './component/lookup-component/lookup.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DevicesComponent } from './component/devices/devices.component';
import { AddDeviceModalComponent } from './shared/modals/add-device-modal/add-device-modal.component';
import { ToastModalComponent } from './shared/modals/toast-modal/toast-modal.component';

@NgModule({
  declarations: [
    BaseComponent,
    AppComponent,
    WelcomeComponent,
    AboutComponent,
    LookupComponent,
    DevicesComponent,
    AddDeviceModalComponent,
    ToastModalComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    UtilityService,
    PrototypeService,
    BaseService,
    LocatorService,
    HttpHelperService,
    //
    LookupService
  ],
  entryComponents: [
    ConfirmModalComponent,
    AddDeviceModalComponent,
    ToastModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    // Create global Service Injector.
    LocatorService.injector = this.injector;
  }
}
