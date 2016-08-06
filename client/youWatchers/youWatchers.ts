import 'reflect-metadata';
import 'zone.js/dist/zone';
import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

// Angular
import {Component, EventEmitter, OnInit, provide, ViewContainerRef, Input, ElementRef} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';
import { bootstrap } from '@angular/platform-browser-dynamic';
import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';
import { APP_BASE_HREF } from '@angular/common';
import { provideRouter, RouterConfig, ROUTER_DIRECTIVES, Router } from '@angular/router';
import {InjectUser} from 'angular2-meteor-accounts-ui';

// Admir

import {AdmirMessagingWatchCore} from  '../../client/coreWatch';
import {AdmirMessagingWatch} from  '../../client/app';
// bootstrap(AdmirMessagingWatch, [APP_ROUTER_PROVIDERS, provide(APP_BASE_HREF, { useValue: '/' })]);

// import {Staffs} from '../../imports/api/staffs';
import {StaffsList} from '../../imports/staffs/staffs-list/staffs-list';
import {Bugs} from '../../imports/api/bugs';
import {BugsList} from '../../imports/bugs/bugs-list/bugs-list';
import {Register} from '../../imports/auth/register/register';
import {Login} from '../../imports/auth/login/login';
import {HomeView} from '../../imports/homeView/homeView';
import {DisplayName} from '../../imports/pipes/pipes.ts';

import {MyComponent} from '../../imports/homeView/st';

// import {enableProdMode} from '@angular/core';
// enableProdMode();

import template from './youWatchers.html';

export const routes: RouterConfig = [
  { path: '', component: HomeView },
  { path: 'bugs', component: BugsList },
  { path: 'homeView', component: HomeView },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'staffsList', component: StaffsList }, 
  { path: 'myComponent', component: MyComponent }, 
  
];


//           {path : 'mediaLibraries', component : MediaLibrariesList, data : {some_data : 'some value'}}
export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];

@InjectUser()
@Component({
  selector: 'you-watchers',
  template,
  directives: [ROUTER_DIRECTIVES, BugsList, HomeView, Register, Login,
    StaffsList],
  pipes: [DisplayName]
})
class AdmirYouWatchers extends AdmirMessagingWatchCore implements OnInit {

  private fullScreen: boolean = false;

  private customerId: string = "CUST1";
  private userId: string = "USER1";
  private name: string = "Kelvin";
  public user: Meteor.User;
  public role: string;

  constructor(private router: Router, viewContainerRef: ViewContainerRef, elementRef: ElementRef) {
    super();



  }
  // this.inAdmin () {
  //   return Roles.userIsInRole(Meteor.userId(), ['admin'], 'default-group');
  // }
  ngOnInit() {
    // console.log(this._today.getTime());


    this.activate();
    console.log("I'm being called when component is initalized after constructor method in AdmirYouWatchers in youWatchers.ts");
  }



  activate() {
    console.log("in activate()")

  }



  logout() {
    this.autorun(() => {
      Meteor.logout();
      this.router.navigate(['/HomeView']);
    });
  }



}
  bootstrap(AdmirYouWatchers, [APP_ROUTER_PROVIDERS, provide(APP_BASE_HREF, { useValue: '/' })]);

if (this.fullScreen == true) {
  // bootstrap(AdmirMessagingWatch, [APP_ROUTER_PROVIDERS, provide(APP_BASE_HREF, { useValue: '/' })]);
}
else {
  // bootstrap(AdmirYouWatchers, [APP_ROUTER_PROVIDERS, provide(APP_BASE_HREF, { useValue: '/' })]);
}

