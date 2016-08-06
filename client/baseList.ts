import 'reflect-metadata';
import 'zone.js/dist/zone';
import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {ReactiveVar} from 'meteor/reactive-var';

// Angular
import {Component, EventEmitter, OnInit} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';


// Admir

import {AdmirMessagingCore} from  '../client/core';

@Component({
})
export class AdmirMessagingBaseList extends AdmirMessagingCore implements OnInit {
  protected searchString: ReactiveVar<string> = new ReactiveVar<string>("");

  protected totalItems: number = 0;
  protected curPage: ReactiveVar<number> = new ReactiveVar<number>(1);
  protected pageSize: number = 4;
  protected maxPagesCalc = Math.ceil(this.totalItems / this.pageSize);

  // protected pageChanged(event: any): void {
  //   console.log('Page changed to: ' + event.page);
  //   console.log('Number items per page: ' + event.itemsPerPage);
  //   this.curPage.set(event.page);
  // };

    protected pageChange(page) {

    this.curPage.set(page);
    console.log('Page changed to:' + page);

    }

  constructor() {
    super();

    this.curPage.set(1);
    console.log("this.curPage.get()")
    console.log(this.curPage.get())
        console.dir(this.curPage);
  }

  ngOnInit() {
    console.log("I'm being called when component is initalized after constructor method in AdmirMessagingTrackCore in AdmirMessagingTrackCore.ts");
  }

  protected search(value: string) {
    this.curPage.set(1);
    this.searchString.set(value);
    console.log(value)
  }
}

