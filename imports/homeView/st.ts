// import 'reflect-metadata';
// import 'zone.js/dist/zone';

// // Meteor
// import { Meteor } from 'meteor/meteor';
// import {ReactiveVar} from 'meteor/reactive-var';
// import {Tracker} from 'meteor/tracker';
// import {Mongo} from 'meteor/mongo';


// import {Component} from '@angular/core';
// import {PaginatePipe, PaginationControlsCmp, PaginationService} from 'ng2-pagination';



import 'reflect-metadata';
import 'zone.js/dist/zone';

// Meteor
import { Meteor } from 'meteor/meteor';
import {ReactiveVar} from 'meteor/reactive-var';
import {Tracker} from 'meteor/tracker';
import {Mongo} from 'meteor/mongo';

// Angular
import {MeteorComponent} from 'angular2-meteor';
import {Component, EventEmitter, OnInit, Output, ViewChild, ViewChildren, ContentChildren, QueryList, Provider } from '@angular/core';
import {FormBuilder, ControlGroup, Validators, Control} from '@angular/common';
import {ControlValueAccessor, NgModel, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';

// Admir
import {StaffsForm} from '../staffs/staffs-form/staffs-form.ts';
import {StaffsItem} from '../staffs/staffs-item/staffs-item.ts';
import {Staffs} from '../../imports/api/staffs';
import {Modal} from '../directives/modal/modal';
import {AdmirMessagingBaseList} from '../../client/baseList';

// import {PaginationComponent} from '../../directives/pagination.component';

import {CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
// import { PAGINATION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import {Counts} from 'meteor/tmeasday:publish-counts';

import {PaginatePipe, PaginationControlsCmp, PaginationService} from 'ng2-pagination';



@Component({
    selector: 'my-component',
    template: `

    <div style="background:white">

    <ul >
      <li *ngFor="let item of staffs2 | paginate: { itemsPerPage: pageSize, currentPage: curPage.curValue, totalItems: totalItems }">{{item.name}}</li>
    </ul>





</div>
 <button (click)="pageChange(1)">Click # 1</button>
  <button (click)="pageChange(2)">Click # 2</button>
   <button (click)="pageChange(3)">Click # 3</button>
    <div style="color:yellow;"  *ngFor="let staff of staffs ;"># {{staff.name}}</div>

    `,
    directives: [StaffsItem, StaffsForm, Modal, FORM_DIRECTIVES, CORE_DIRECTIVES, PaginationControlsCmp],
    pipes: [PaginatePipe],
    providers: [PaginationService],
})

    // <pagination-controls (pageChange)="pageChange($event)"></pagination-controls>

export class MyComponent extends AdmirMessagingBaseList {
      @ViewChildren(StaffsItem) staffsList: QueryList<StaffsItem>;
    staffs: Mongo.Cursor<Object>;
    // protected totalItems: number = 0;
    // protected curPage: ReactiveVar<number> = new ReactiveVar<number>(1);
    // protected pageSize: number = 6;
    // protected maxPagesCalc = Math.ceil(this.totalItems / this.pageSize);

    // public collection: any[] = ['Fred', 'Jim', 'Jim1', 'Jim3', 'Jim4', 'Jim5', 'Jim6', 'Jim7', 'Jim8', 'Jim8'];
    public collection: any[] = [{ name: 'Fred' }, { name: 'Fred1' }, { name: 'Fred2' }, { name: 'Fred3' }, { name: 'Fred4' }, { name: 'Fred5' }, { name: 'Fred6' }, { name: 'Fred7' }, { name: 'Fred8' }];
    public staffs2: any[];


    // constructor() {
    //     super();

    //     console.log("this.curPage.get()")
    //     console.log(this.curPage.get())
    //     console.dir(this.curPage);
    // }

    constructor() {
        super();

                // var queryInit = Staffs.find({});
                // this.staffs2 = queryInit.fetch();

        this.autorun(() => {

            let options = {
                limit: this.pageSize,
                skip: (this.curPage.get() - 1) * this.pageSize,
                sort: { problem: 1 }
            };


            // this.subscribe('parties', options, this.location.get(), () => {
            //   this.parties = Parties.find({}, { sort: { name: this.nameOrder.get() } });
            // }, true);

            this.subscribe('staffs', options, this.searchString.get(), () => {
                var self = this;


                var query = Staffs.find({});
                this.staffs = query;
                console.dir(this.staffs)

            }, true);
        });


        this.autorun(() => {
            this.totalItems = Counts.get('numberOfRecords');
            this.maxPagesCalc = Math.ceil(this.totalItems / this.pageSize);
        }, true);


    }

    // protected pageChange(page: number) {
    //     // console.log('Page changed to:' + page);
    // this.curPage.set(page);
    // console.log('Page changed to:' + page);

    // }


}