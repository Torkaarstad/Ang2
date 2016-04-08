/// <reference path="../typings/tsd.d.ts" />

import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

//import {Observable} from 'rxjs/Observable';
//

@Component({
    selector: 'my-app',
    template: `
        <input id="search" type="text" class="form-control">
    `
})
export class AppComponent {
    constructor() {
        var keyup = Observable.fromEvent($("#search"), "keyup")
            .map(e=> e.target.value) //DOM element to string
            .filter(text => text.length >= 3) //Only call when lengt of string >= 3
            .debounceTime(800) //Wait some milliseconds when typing
            .distinctUntilChanged() //Wait for string to change
            .flatMap(searchTerm => {
                var url = "https://api.spotify.com/v1/search?type=artist&q=" + searchTerm;
                var promise = $.getJSON(url);
                return Observable.fromPromise(promise);
            }); //Call spotyfy. Needs to be refacroed to call a service instead 

        var subscription = keyup.subscribe((data) => console.log(data));

        //subscription.unsubscribe();

    }
}