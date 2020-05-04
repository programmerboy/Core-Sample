import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import { NavigationModel } from 'src/app/shared/models/navigation.model';

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

  themeName: string;

  constructor(
    private overlayContainer: OverlayContainer
  ) { }

  ngOnInit(): void {
    this.initializeLinks();
  }

  ngAfterViewInit(): void {

  }

  initializeLinks = () => {

    this.navigation = [
      new NavigationModel('/about', 'About', false),
      // new NavigationModel('/samples', 'Samples', false),
    ];

    this.navigationSideMenu = [
      ...this.navigation,
      // new NavigationModel("/editProfile", "Edit Profile"),
      // new NavigationModel("/settings", "Settings")
    ];

  }


}
