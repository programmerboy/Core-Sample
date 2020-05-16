import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import { NavigationModel } from 'src/app/shared/models/navigation.model';
import { delay } from 'rxjs/operators';
import { timer } from 'rxjs';
import { CustomAlertConfig } from './shared/base/base.component';
import { BaseService } from './shared/services/base.service';
import { MessagingService } from './shared/services/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  navigation: NavigationModel[];
  navigationSideMenu: NavigationModel[];

  isAuthenticated: boolean;
  isPageTransitionOn: boolean;

  themeName = 'otd-candy-theme';
  disableInteraction: boolean;
  isPending: boolean;
  alert: any;

  constructor(private overlayContainer: OverlayContainer,
    private _bs: BaseService,
    private _ms: MessagingService
  ) { }

  ngOnInit(): void {

    this._bs.$disableSubject.pipe(delay(500)).subscribe((val: boolean) => {
      this.disableInteraction = val;
    });

    this._bs.$isPending.subscribe((val: boolean) => {
      timer(100).subscribe(() => this.isPending = val); // To Avoid ExpressionChangedAfterItHasBeenCheckedError
    });

    this._bs.$alert.subscribe((val: CustomAlertConfig) => {
      this.alert = val;
    }, (strError: string) => { console.log(strError) });

    this.initializeLinks();

    this.setOverlayTheme(this.themeName);
  }

  ngAfterViewInit(): void {

  }

  initializeLinks = () => {

    this.navigation = [
      new NavigationModel('/lookup', 'Device Compatablity', false),
      new NavigationModel('/devices', 'Devices', false),
      new NavigationModel('/about', 'About', false),
      // new NavigationModel('/samples', 'Samples', false),
    ];

    this.navigationSideMenu = [
      ...this.navigation,
      // new NavigationModel("/editProfile", "Edit Profile"),
      // new NavigationModel("/settings", "Settings")
    ];

  }

  private setOverlayTheme(effectiveTheme: string) {

    // remove old theme class and add new theme class
    // we're removing any css class that contains '-theme' string but your theme classes can follow any pattern

    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const toRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'));

    if (toRemove.length) {
      overlayContainerClasses.remove(...toRemove);
    }

    overlayContainerClasses.add(effectiveTheme);
  }

  public onAlertClose(alert: CustomAlertConfig) {
    this._ms.onAlertClosed(alert);
  }

}
