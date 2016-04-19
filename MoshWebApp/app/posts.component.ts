import {Component, OnInit} from 'angular2/core';
import {PostService} from './post.service';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Post} from './post';
import {SpinnerComponent} from './spinner.component';

@Component({
    selector: 'posts',
	 styles: [`
         .posts li { cursor: default; }
         .posts li:hover { background: #ecf0f1; } 
         .list-group-item.active, 
         .list-group-item.active:hover, 
         .list-group-item.active:focus { 
             background-color: #ecf0f1;
             border-color: #ecf0f1; 
             color: #2c3e50;
         }
    `],
    template: `
	<h2>Posts</h2>
	<div class="row">
		<div class="col-md-6">
			<spinner [isVisible]="_isLoading"></spinner>
			<ul class="list-group">
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
					{{ currentPost.body }}
				</div>
			</div>
		</div>		
	</div>		
    `,
    providers: [PostService, HTTP_PROVIDERS],
	directives:[SpinnerComponent]
}
})
export class PostsComponent implements OnInit {
    private _isLoading = true;
	private _posts: Post[];
	private currentPost;

    constructor(private _postService: PostService) {
        
    }

    ngOnInit() {
        //Called after instruction
        this._postService.getPosts().subscribe(x=> {
            this._isLoading = false;
			this._posts = x;
            console.log(x);
            },
            null,
            () => { this._isLoading = false; });
    }
	
	select(post){
		this.currentPost = post;
	}

}