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

@NgModule({
  declarations: [
    BaseComponent,
    AppComponent,
    WelcomeComponent,
    AboutComponent,
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
  ],
  entryComponents: [
    ConfirmModalComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    // Create global Service Injector.
    LocatorService.injector = this.injector;
  }
}
