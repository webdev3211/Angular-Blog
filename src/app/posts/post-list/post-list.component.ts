import { Component, OnInit } from '@angular/core';

import { Post } from '../post';
import { PostService } from '../post.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Post[];

  constructor(
    private postService: PostService,
    public auth: AuthService
  ) { 

  }

  ngOnInit() {
    this.postService.getPosts().subscribe( posts => {
      console.log(posts);  
      this.posts = posts;
    })
    // this.posts = posts;
  }

  delete(id: string){
    this.postService.delete(id);
  }

}
