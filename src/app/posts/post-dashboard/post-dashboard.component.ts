import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { PostService } from '../post.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage } from 'angularfire2/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {

  title: string;
  image: string = null;
  content: string;

  buttonText: string = "Create Post"
  
  uploadPercent: Observable<number> //it is an observable because that will be available on runtime
  downloadURL: Observable<string>
  
  constructor(
    private auth: AuthService,
    private postService: PostService,
    private storage: AngularFireStorage,
    private router: Router
  ) { }

  ngOnInit() {
  }

  createPost(){
    const data = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      content: this.content,
      image: this.image,
      published: new Date(),
      title: this.title
    };
    this.postService.create(data);
    
  
    this.buttonText = "Post Created!"
    setTimeout( () => {
      this.title = '',
      this.content  = '';
      this.image = '//:0';

      this.buttonText = "Create Post"
      
      this.router.navigate(['/blog'])
    }, 3000);

   

  }

  uploadImage(event){
    const file = event.target.files[0];
    const path = `posts/${file.name}`
    // console.log(event.target.files)
    if(file.type.split('/')[0] !== 'image' ){
      return alert('Only images files are allowed');
    } else{
      const task = this.storage.upload(path, file)
      this.downloadURL = task.downloadURL()    //downloadURL is an observable
      this.uploadPercent = task.percentageChanges()   //percentageChanges is an observable
      console.log('Image Uploaded')
      this.downloadURL.subscribe(url => this.image = url)
    }
  }
  

}
