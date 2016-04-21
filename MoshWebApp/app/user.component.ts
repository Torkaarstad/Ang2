import {Component, OnInit} from 'angular2/core';
import {ControlGroup, Control, Validators, FormBuilder} from 'angular2/common';
import {Router, CanDeactivate, RouteParams} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import {User } from './user';
import {UserValidators} from './userValidators';
import {UserService } from './user.service';

@Component({
    selector: 'signup-form',
    templateUrl: 'app/user.component.html',
    providers: [UserService, HTTP_PROVIDERS]
})
export class UserComponent implements CanDeactivate, OnInit {
    form: ControlGroup;
    user: User = new User();
    title: string;

    constructor(
        private _userService: UserService,
        private _router: Router,
        private _routeParams: RouteParams,
        private _fb: FormBuilder) {
        this.form = _fb.group({
            name: ['', Validators.required],
            email: ['', Validators.compose([
                Validators.required,
                UserValidators.shouldHaveValidEmail
            ])],
            phone: [],
            address: _fb.group({
                street: [],
                suite: [],
                city: [],
                zipcode: []
            })
        });
    }

    ngOnInit() {
        var id = this._routeParams.get("id");

        this.title = id ? "Edit User" : "New User";

        if (!id) return;

        this._userService.getUser(id)
            .subscribe(user=> {
                console.log(user);
                this.user = user;
            },
            error => {
                //Route to other page
                console.log('Could not load getUser.' + error);
                this._router.navigate(['NotFound']);
            });


       

        //console.log("Successfully saved. ");
        //alert("Password successfully changed.");
    }

    save() {
        if (this.form.valid) {

            this._userService.saveUser(this.user)
                .subscribe(x => {
                    // Ideally, here we'd want:
                    //this.form.markAsPristine();
                    console.log("X: " + x);
                    this._router.navigate(['Users']);
                });


            //alert("Password successfully changed.");
        }

        console.log(this.form.value);
    }

    routerCanDeactivate(next, previous) {
        if (this.form.dirty)
            return confirm('You have unsaved changes. Are you sure you want to navigate away?'); //Returns true/false and navigation is handled by angular

        return true;
    }
}