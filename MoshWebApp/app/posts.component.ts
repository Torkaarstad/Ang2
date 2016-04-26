import {Component, OnInit} from 'angular2/core';
import {PostService} from './post.service';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Post} from './post';
import {Comment} from './comment';
import {SpinnerComponent} from './spinner.component';

import {User } from './user';
import {UserService } from './user.service';


@Component({
    selector: 'posts',
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
    template: `
	<h2>Posts</h2>
	<div class="row">
		<div class="col-md-6">
            <select class="form-control" (change)="onUserSelected({ userId: u.value })" #u>
                <option value="">Select a user...</option>
                <option *ngFor="#user of _users" value="{{user.id}}">
                    {{user.name}}
                </option>
            </select>
			<spinner [isVisible]="_postsLoading"></spinner>
			<ul class="list-group posts">
				<li 
					class="list-group-item" 
					*ngFor="#post of _posts"
					[class.active]="currentPost == post"
					(click) = "select(post)">
						{{post.title}}
				
				</li>
			</ul>
		</div>		
			
		<div class="col-md-6">		
			<div class="panel panel-default" *ngIf="currentPost" >
				<div class="panel-heading">
					<h3 class="panel-title">{{ currentPost.title }}</h3>
				</div>
				<div class="panel-body">
					<p>{{ currentPost.body }}</p>
                    <hr/>
                    <spinner [isVisible]="_commentsLoading"></spinner>
                    <div class="media" *ngFor="#comment of currentPost.comments">
                        <div class="media-left">
                            <a href="#">
                                <img class="media-object thumbnail postImage" src="http://lorempixel.com/80/80/people/?random={{comment.id}}" alt="...">
                            </a>
                        </div>
                        <div class="media-body">
                            <h4 class="media-heading">{{comment.name}}</h4>
                                {{comment.body}}
                        </div>
                     </div>
				</div>
			</div>
		</div>		
	</div>		
    `,
    providers: [PostService, UserService, HTTP_PROVIDERS],
    directives: [SpinnerComponent]
})

export class PostsComponent implements OnInit {
    private _postsLoading;
    private _commentsLoading;
    private _posts: Post[];
    private _users: User[];
    private currentPost: Post;

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

}