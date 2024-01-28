import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { decrement, increment, reset } from 'src/store/counter/counter.action';
import { PostsActions } from 'src/store/posts/post.action';
import { Post } from 'src/store/posts/post.model';
import { addPost } from 'src/store/posts/posts.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'memory_game';
  posts$!: Observable<any>;
  staticId = 10;
  form!:FormGroup;
  count$!: Observable<number>
  isBtnUpdate = false;
  constructor(private store: Store<{ count: number ,posts:any}>, private _fb : FormBuilder) {

    // getAllPost()

    this.count$ = store.select('count');
    this.posts$ = store.select('posts');

    this.form = this._fb.group({
      id:null,
      title : ['', Validators.required],
      description : ['', Validators.required]
    })
  }

  getAllPost(){
     
  }

  formFill(el:Post){
    this.form.get('title')?.setValue(el.title);
    this.form.get('description')?.setValue(el.description);
    this.form.get('id')?.setValue(el.id);
    this.isBtnUpdate = true;
  }

  public submit():void {
    console.log("this.form ===>",this.form.value)
    this.addPost()
  }

  addPost(){
    this.staticId++;
    
    if(this.isBtnUpdate){
      this.store.dispatch(PostsActions.updatePost({...this.form.value ,
        }));
        this.isBtnUpdate = false;
    }else
    this.store.dispatch(PostsActions.addPost({...this.form.value ,
       id : this.staticId+''}));
      this.form.reset()
      
  }

  onDeleteClick(id:string){
    this.store.dispatch(PostsActions.removePost({id}));   
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

  onAddReaction(id:string,type:"like" | "love" | "happy"){
    this.store.dispatch(PostsActions.addLikeReaction({
      id,
      reactionType : type
    }))
    
  }
  
}
