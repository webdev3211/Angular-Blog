import { Injectable } from '@angular/core';
import { AngularFirestore,  AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
  
import { Post } from './post';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PostService {

  postsCollection: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  postDoc: AngularFirestoreDocument<Post>
  
  constructor(
    private afs: AngularFirestore
  ) { 
    this.postsCollection = this.afs.collection('posts', ref => ref.orderBy('published', 'desc'));
   
  }

  getPosts(){
    this.posts =  this.postsCollection.snapshotChanges()
    .map( (actions) => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        data.id = a.payload.doc.id;
        return data;
      });
    });
    return this.posts; 
  }

  getPostData(id: string){
    this.postDoc = this.afs.doc<Post>(`posts/${id}`)  //return the data from tis document location
    return this.postDoc.valueChanges()   
  }

  getPost(id: string){
    return this.afs.doc<Post>(`posts/${id}`) //we could also use the getPostData function but there we are using valueChanges also that is not needed in delete function
} 

  create(data: Post){
    this.postsCollection.add(data);
  }



  delete(id: string){
    return this.getPost(id).delete();
  }

  update(id: string, formData){
    return this.getPost(id).update(formData)
  }


}



