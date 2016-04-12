System.register(['angular2/core', 'angular2/common', 'rxjs/Rx', 'rxjs/add/operator/debounceTime', 'rxjs/add/operator/map'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, Rx_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (_1) {},
            function (_2) {}],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(fb) {
                    this.form = fb.group({
                        search: []
                    });
                    //this.search = this.form.controls['search'];
                    var search = this.form.find('search');
                    search.valueChanges
                        .debounceTime(400)
                        .map(function (str) { return str.replace(' ', '-'); })
                        .subscribe(function (x) { return console.log(x); });
                    //this.form.valueChanges
                    //    .debounceTime(300)
                    //    .subscribe(x=> console.log(x));
                }
                AppComponent.prototype.twoDay = function () {
                    var startDates = [];
                    var startDate = new Date;
                    console.log("twoDay() called. StartDate: " + startDate);
                    for (var day = -2; day <= 2; day++) {
                        var date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + day);
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
                    var userStream = Rx_1.Observable.of({
                        userId: 1, username: 'tor'
                    }).delay(2000);
                    var tweetStream = Rx_1.Observable.of([1, 2, 3]).delay(1500);
                    Rx_1.Observable
                        .forkJoin(userStream, tweetStream)
                        .map(function (join) { return new Object({ user: join[0], tweet: join[1] }); })
                        .subscribe(function (result) { return console.log(result); }, function (error) { return console.error(error); });
                    //***************** Exception:
                    //var obsThrow = Observable.throw(new Error("Something failed"));
                    //obsThrow.subscribe(
                    //    x=> console.log(x),
                    //    error => console.error(error)
                    //);
                    //*********************  AJAX
                    var counter = 0;
                    var ajaxCall = Rx_1.Observable.of('url')
                        .flatMap(function () {
                        if (++counter < 2)
                            return Rx_1.Observable.throw(new Error("AJAX Request failed"));
                        else
                            return Rx_1.Observable.of([1, 2, 3]);
                    });
                    ajaxCall.retry(3)
                        .subscribe(function (x) { return console.log(x); }, function (error) { return console.error(error); });
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
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n        <form [ngFormModel]= \"form\" (ngSubmit)=\"twoDay()\">\n            <input type=\"text\" ngControl=\"search\">\n            <button class=\"btn btn-primary\" type=\"submit\">2 day window</button>\n    "
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map