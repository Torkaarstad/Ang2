import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Injectable} from 'angular2/core';
import {Post} from './post';

@Injectable() //Makes the class ready for injection

export class PostService {
    private _url = "http://jsonplaceholder.typicode.com/posts";

    constructor(private _http: Http) { }

    getPosts(): Observable<Post[]> { //Default return is Observable<any[]>
        return this._http.get(this._url).
            map(res => res.json());
    }

    createPost(post: Post) {
        return this._http.post(this._url, JSON.stringify(post)).map(res =>res.json());
    }
}
