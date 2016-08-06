import 'reflect-metadata';
import 'zone.js/dist/zone';

// Meteor
import { Meteor } from 'meteor/meteor';
import {ReactiveVar} from 'meteor/reactive-var';
import {Tracker} from 'meteor/tracker';
import {Mongo} from 'meteor/mongo';

// Angular
import {MeteorComponent} from 'angular2-meteor';
import {Component, EventEmitter, OnInit, Output, ViewChild, ViewChildren, ContentChildren, QueryList, Provider, NgZone } from '@angular/core';
import {FormBuilder, ControlGroup, Validators, Control} from '@angular/common';
import {ControlValueAccessor, NgModel, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';

// Admir
import {StaffsForm} from '../../staffs/staffs-form/staffs-form.ts';
import {StaffsItem} from '../../staffs/staffs-item/staffs-item.ts';
import {Staffs} from '../../../imports/api/staffs';
import {Modal} from '../../directives/modal/modal';
import {AdmirMessagingBaseList} from '../../../client/baseList';

// import {PaginationComponent} from '../../directives/pagination.component';

import {CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
// import { PAGINATION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import {Counts} from 'meteor/tmeasday:publish-counts';

import {PaginatePipe, PaginationControlsCmp, PaginationService} from 'ng2-pagination';

import template from './staffs-list.html';
@Component({
  selector: 'staffs-list',
  template,
  directives: [StaffsItem, StaffsForm, Modal, FORM_DIRECTIVES, CORE_DIRECTIVES, PaginationControlsCmp],
  pipes: [PaginatePipe],
  providers: [PaginationService],

})
export class StaffsList extends AdmirMessagingBaseList implements OnInit {
  @ViewChildren(StaffsItem) staffsList: QueryList<StaffsItem>;

  staffs: Mongo.Cursor<Object>;
  staffsArray: Array<Object>;
  // helloEvent: EventEmitter = new EventEmitter();
  // public selfConnectionId: ReactiveVar<string> = new ReactiveVar<string>();
  @Output() helloEvent: EventEmitter<any> = new EventEmitter();
  display: boolean = false;
  n: number = 0;
  data: any = new Object();
  action: string;

  public collection: any[] = ['Fred', 'Jim', 'Jim1', 'Jim3', 'Jim4', 'Jim5', 'Jim6', 'Jim7', 'Jim8', 'Jim8'];

  constructor(private ngZone: NgZone) {
    super();

    this.autorun(() => {

      let options = {
        limit: this.pageSize,
        skip: (this.curPage.get() - 1) * this.pageSize,
        sort: { problem: 1 }
      };

   
        this.ngZone.run(() => {
   this.staffsArray = Staffs.find({}).fetch();
        });

      this.subscribe('staffs', options, this.searchString.get(), () => {
        var self = this;

        this.ngZone.run(() => {
          var query = Staffs.find({});
          this.staffs = query;
        });


        // var handle = query.observeChanges({
        //   added: function (id) {
        //     console.log("subscribe Added: " + id)
        //     console.dir(id)


        //   },
        //   removed: function (id) {
        //     console.log("subscribe Removed: " + id)
        //   },
        //   changed: function (id, o) {
        //     console.log("subscribe Changed: " + id)
        //     console.dir(o)

        //     var genericRecord = o;
        //     if (genericRecord.editColor == 'red') {


        //     };

        //   },
        // });




      }, true);
    });



    // this.autorun(() => {
    //   this.totalItems = Counts.get('numberOfRecords');
    //   this.maxPagesCalc = Math.ceil(this.totalItems / this.pageSize);
    // }, true);
    this.autorun(() => {
      this.ngZone.run(() => {
        this.totalItems = Counts.get('numberOfRecords');
        this.maxPagesCalc = Math.ceil(this.totalItems / this.pageSize);
      });
    });

    this.action = "add";
    this.helloEvent.subscribe((args) => {
      var self = this;

      // this.setStaffs();
      console.log("hello from helloEvent")
      // console.dir(args)

      // this.staffsList.last.setStaff(args);


      // this.staffsList.toArray().forEach((list) => {
      //   this.setStaff(list);
      // });
      //        var j = 5.1;
      // (function (j,self) {
      //     setTimeout(() => {
      //          self.setStaffs();
      //     }, 1000 * j);
      // })(j,self);



    });

    console.log("hello from staffs-list.ts")
    // this.selfConnectionId.set("Test1 !!!")


    console.log("hello from staffs-list.ts")
  }

  ngOnInit() {

    console.log("I'm being called when component is initalized after constructor method from staffs-list.ts");





  }

  setStaff(list) {
    console.log("in setStaff()")
    list.setStaff(list.staffModel);
  }


  setStaffs() {

    //  let activeTabs = this.tabs.filter((tab)=>tab.active);
    // this.staffsList.first.setDiv();
    // this.staffsList.last.setDiv();

    // this.staffsList.toArray().forEach((list) => {
    //   this.setStaff(list);
    // });


    var b = new Object();
    this.helloEvent.emit(b)

  }

  showDialog(n, data) {
    this.display = true;
    // console.log(this.display);
    //     console.log(n);
    //     this.n = n;

    //             this.data = data;
    //                     console.dir(this.data);


  }
  hideDialog(e) {
    console.dir(e)
    this.display = false;
  }

}




