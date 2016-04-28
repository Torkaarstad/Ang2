import {Component, OnInit} from 'angular2/core';
import {PostService} from './post.service';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Post} from './post';
import {Comment} from './comment';
import {SpinnerComponent} from './spinner.component';
import {PaginationComponent} from './pagination.component';

import {User } from './user';
import {UserService } from './user.service';


@Component({
    selector: 'posts',
    templateUrl: 'app/posts.component.html',
    styles: [`
         .posts li { cursor: default; }
         .posts li:hover { background: #ecf0f1; } 
         .postImage {border-radius: 100%;}
         .list-group-item.active, 
         .list-group-item.active:hover, 
         .list-group-item.active:focus { 
             background-color: #ecf0f1;
             border-color: #ecf0f1; 
             color: #2c3e50;}
    `],
    providers: [PostService, UserService, HTTP_PROVIDERS],
    directives: [SpinnerComponent, PaginationComponent]
})

export class PostsComponent implements OnInit {
    _postsLoading;
    _commentsLoading;
    _posts = [];
    _pagedPosts: Post[];
    _users: User[];
    currentPost: Post;
    _postPageSize = 10;

    constructor(private _postService: PostService,
        private _userService: UserService) {

    }

    ngOnInit() {
        this.getUsers();
        this.getPosts();
    }

    private select(post) {
        this.currentPost = post;
        this._commentsLoading = true;

        this._postService.getComments(this.currentPost.id).subscribe(x => {
            this.currentPost.comments = x;
            console.log("Count of comments received:" + x.length);
        },
            null,
            () => { this._commentsLoading = false; });
    }

    private onUserSelected(filter) {
        this.currentPost = null;
        this.getPosts(filter);
    }

    private getPosts(filter?) {
        this._postsLoading = true;

        this._postService.getPosts(filter).subscribe(x => {
            this._postsLoading = false;
            this._posts = x;
            this._pagedPosts = _.take(this._posts, this._postPageSize);//this.getPostsInPage(1); //initielt
            console.log("Count of Posts received::" + x.length);
        },
            null,
            () => { this._postsLoading = false; });
    }

    private getUsers() {
        this._userService.getUsers()
            .subscribe(x => {
                this._users = x;
                console.log("Count of users received: " + x.length);
            },
            null);
    }

    onPageChange(page) { //Merke $event er page
        console.log("onPageChange() Event: " + event);
        this.currentPost = null;
        this._pagedPosts = this.getPostsInPage(page);
    }

    private getPostsInPage(page) {
        var result = [];
        var startingIndex = (page - 1) * this._postPageSize;


        result = _.take(_.rest(this._posts, startingIndex), this._postPageSize);
        //var endIndex = Math.min(startingIndex + this._postPageSize, this._posts.length);

        //for (var i = startingIndex; i < endIndex; i++)
        //    result.push(this._posts[i]);

        return result;
    }

}