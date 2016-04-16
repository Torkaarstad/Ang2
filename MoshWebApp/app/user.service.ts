import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Injectable} from 'angular2/core';
import {User} from './user';

@Injectable() //Makes the class ready for injection

export class UserService {
    private _url = "http://jsonplaceholder.typicode.com/users";

    constructor(private _http: Http) { }

    getUsers(): Observable<User[]> { //Default return is Observable<any[]>
        return this._http.get(this._url).
            map(res => res.json());
    }

    //createPost(post: Post) {
    //    return this._http.post(this._url, JSON.stringify(post)).map(res =>res.json());
    }
}
