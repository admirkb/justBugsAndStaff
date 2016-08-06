import { Meteor } from 'meteor/meteor';

import {loadBugs} from './load-bugs';
import {loadStaffs} from './load-staffs';


import './bugs';
import './staffs';


Meteor.startup(() => {
  console.log("Meteor is starting")
  
   loadBugs();
      loadStaffs();


});
