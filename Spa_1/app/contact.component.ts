import {Component} from 'angular2/core';
import {Router, CanDeactivate} from 'angular2/router'

@Component({
    templateUrl: '/app/contact.component.html'
})
export class ContactComponent implements CanDeactivate {
    constructor(private _router: Router) { }

    onSubmit(form){
        console.log(form);
        this._router.navigate(['Albums']);
    }

    routerCanDeactivate(next, previous) {
        //if (this.for.dirty) //Should include the form definition in the Component code, not in html code.
        return confirm('Are you sure?'); //Returns true/false and navigation is handled by angular
    }
}