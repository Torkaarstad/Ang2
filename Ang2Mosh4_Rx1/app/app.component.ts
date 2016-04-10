/// <reference path="../typings/tsd.d.ts" />

import {Component} from 'angular2/core';
//import {Observable} from 'rxjs/Rx';
import {ControlGroup, FormBuilder} from 'angular2/common';

//import {Observable} from 'rxjs/Observable';
//

@Component({
    selector: 'my-app',
    template: `
        <form [ngFormModel]= "form">
            <input type="text" ngControl="search">
    `
})
export class AppComponent {
    form: ControlGroup;

    constructor(fb: FormBuilder) {
        this.form = fb.group({
            search: []
        });

        var search = this.form.find('search');
        search.valueChanges
            .debounceTime(400)
            .subscribe(x=> console.log(x));

        //.map(str => (<string>str).replace(' ', '-'))
        //export class App {
        //    items: Array<string>;
        //    term = new Control();
        //    constructor(private wikipediaService: WikipediaService) {
        //        this.term.valueChanges
        //            .debounceTime(400)
        //            .subscribe(term => this.wikipediaService.search(term).then(items => this.items = items));
        //    }
        //}

        //var keyup = Observable.fromEvent($("#search"), "keyup")
        //    .map(e=> e.target.value) //DOM element to string
        //    .filter(text => text.length >= 3) //Only call when lengt of string >= 3
        //    .debounceTime(800) //Wait some milliseconds when typing
        //    .distinctUntilChanged() //Wait for string to change
        //    .flatMap(searchTerm => {
        //        var url = "https://api.spotify.com/v1/search?type=artist&q=" + searchTerm;
        //        var promise = $.getJSON(url);
        //        return Observable.fromPromise(promise);
        //    }); //Call spotyfy. Needs to be refactored to call a service instead 

        //var subscription = keyup.subscribe((data) => console.log(data));

        //subscription.unsubscribe();

    }
}