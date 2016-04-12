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

        //var obsInterval = Observable.interval(1000);
        //obsInterval
        //    .flatMap(x => {
        //        console.log("calling the server");
        //        return Observable.of([1, 2, 3]);
        //    })
        //    .subscribe(x => console.log(x));


        // ******************** forkJoin
        var userStream = Observable.of({
            userId: 1, username: 'tor'
        }).delay(2000);

        var tweetStream = Observable.of([1, 2, 3]).delay(1500);

        Observable
            .forkJoin(userStream, tweetStream)
            .map(join => new Object({ user: join[0], tweet: join[1] }))
            .subscribe(
            result => console.log(result),
            error=> console.error(error)
            );

        //***************** Exception:
        //var obsThrow = Observable.throw(new Error("Something failed"));

        //obsThrow.subscribe(
        //    x=> console.log(x),
        //    error => console.error(error)
        //);


        //*********************  AJAX
        var counter = 0;
        var ajaxCall = Observable.of('url')
            .flatMap(() => {
                if (++counter < 2) {
                    return Observable.throw(new Error("AJAX Request failed"));
                }
                else {
                    return Observable.of([1, 2, 3]);
                }
            });

        ajaxCall.retry(3)
            .subscribe(
            x=> console.log(x),
            error => console.error(error)
        );


        //var obs = Observable
        //    .fromArray(startDates)
        //    .map(date => {
        //        console.log("fromArray: Getting deals for date " + date);
        //        return [1,2,3]
        //    })
        //    .subscribe(x=> console.log('fromArray' + x));

        //var obsOf = Observable
        //    .of(1,2,3)
        //    .map(date => {
        //        console.log("OF: Getting deals for date " + date);
        //        return [1, 2, 3]
        //    })
        //    .subscribe(x=> console.log('OF' + x));
    }
}
