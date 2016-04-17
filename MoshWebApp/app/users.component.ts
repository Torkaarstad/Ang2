import {Component, OnInit} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import {User } from './user';
import {UserService } from './user.service';


@Component({
    styles: [
        `
            table, th, td {
                border: 1px solid black;
                border-collapse: collapse;
            }
            th, td {
                padding: 5px;
            }
    `
    ],
    template: `
        <i *ngIf="_isLoading" class="fa fa-spinner fa-spin fa-3x"></i>
        <h2>Users</h2>

        <p>
            <a [routerLink]="['NewUser']" class="btn btn-primary">Add User</a>
        </p>
        
        <table style="width:100%">
             <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th> 
                <th>Edit</th> 
                <th>Delete</th> 
            </tr>
            <tr *ngFor="#user of _users">
                <td>{{user.id}}</td>
                <td>{{user.name}}</td>
                <td>{{user.email}}</td> 
                <td>
                    <a  [routerLink] ="['EditUser', {id: user.id}]">
                        <i class="glyphicon glyphicon-edit">
                        </i>
                    </a>
                </td> 
                <td><i class="glyphicon glyphicon-remove"></i></td> 
            </tr>
        </table>
    `,
    directives: [RouterLink],
    providers: [UserService, HTTP_PROVIDERS]
})
export class UsersComponent implements OnInit {
    private _isLoading = true;
    private _users: User[];

    constructor(private _userService: UserService) { }

    ngOnInit() {
        this._userService.getUsers()
            .subscribe(x=> {
                this._isLoading = false;
                this._users = x;
                console.log(x);
            },
            null,
            () => { this._isLoading = false; });
    }

}