import {Component} from 'angular2/core';
import {Control, ControlGroup, FormBuilder} from 'angular2/common';

import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';


@Component({
    selector: 'my-app',
    template: `
        <form [ngFormModel]= "form" (ngSubmit)="twoDay()">
            <input type="text" ngControl="search">
            <button class="btn btn-primary" type="submit">2 day window</button>
    `
})
export class AppComponent {
    form: ControlGroup;
    search: Control;

  

    constructor(fb: FormBuilder) {
        this.form = fb.group({
            search: []
        });

        //this.search = this.form.controls['search'];

        var search = this.form.find('search');
        search.valueChanges
            .debounceTime(400)
            .map(str => (<string>str).replace(' ', '-'))
            .subscribe(x=> console.log(x));

        //this.form.valueChanges
        //    .debounceTime(300)
        //    .subscribe(x=> console.log(x));
    }

    twoDay() {
        var startDates = [];
        var startDate = new Date;
        console.log("twoDay() called. StartDate: " + startDate);

        for (var day = -2; day <= 2; day++) {
            var date = new Date(
                startDate.getFullYear(),
                startDate.getMonth(),
                startDate.getDate() + day);
            startDates.push(date);
        }

        Observable
            .fromArray(startDates)
            .map(date => {
                console.log("Getting deals for date " + date);
                return [1,2,3]
            })
            .subscribe(x=>console.log(x));
    }
}
