import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Injectable} from 'angular2/core';
import {User} from './user';

@Injectable() //Makes the class ready for injection

export class UserService {
    private _baseUrl = "http://jsonplaceholder.typicode.com/";

    constructor(private _http: Http) { }

    getUsers(): Observable<User[]> { //Default return is Observable<any[]>
        var url = this._baseUrl + "users";
        return this._http.get(url).
            map(res => res.json());
    };

    saveUser(user) {
        var url = this._baseUrl + "users";

        if (user.id > 0) {
            //update
            console.log("put user");
            var url = this._baseUrl + "users/" + user.id;
            return this._http.put(url, JSON.stringify(user)).map(res => res.json());
        }
        else {
            //new user
            console.log("post user");
            return this._http.post(url, JSON.stringify(user)).map(res => res.json());
        }
    };

    getUser(id){ 
        var url = this._baseUrl + "users/"+id;
        return this._http.get(url).
            map(res => res.json());
    };

    deleteUser(id) {
        var url = this._baseUrl + "users/" + id;
        return this._http.delete(url).
            map(res => res.json());

    };
}
