


import { createAction, createReducer, on } from '@ngrx/store';

import { Post } from './post.model';
import { PostsActions } from './post.action';

export const initialState:Post[]  = [{id:1, title : 'hello there', reaction : {like : 0, love : 0, happy: 0}, description:`
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit incidunt id unde accusamus. Similique impedit in quod voluptate repellendus harum quidem, sapiente blanditiis omnis nulla fuga dicta! Minus, sed amet.`},
    {id:2, title : 'hello there2', reaction : {like : 0, love : 0, happy: 0}, description:`
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit incidunt id unde accusamus. Similique impedit in quod voluptate repellendus harum quidem, sapiente blanditiis omnis nulla fuga dicta! Minus, sed amet.`},
    {id:3, title : 'hello there3', reaction : {like : 0, love : 0, happy: 0}, description:`
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit incidunt id unde accusamus. Similique impedit in quod voluptate repellendus harum quidem, sapiente blanditiis omnis nulla fuga dicta! Minus, sed amet.`},
    {id:4, title : 'hello there4', reaction : {like : 0, love : 0, happy: 0}, description:`
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit incidunt id unde accusamus. Similique impedit in quod voluptate repellendus harum quidem, sapiente blanditiis omnis nulla fuga dicta! Minus, sed amet.`}]
    
    export const addPost = createAction('addPost');

export const postsReducer = createReducer(
  initialState,
  on(PostsActions.addPost, (state,{id, title,description}) =>{
    console.log(state)
    return [{id, title,description},...state];
  }),
  on(PostsActions.removePost, (state,{id}) =>(state.filter((el:Post)=>el.id!==id))),
  on(PostsActions.updatePost, (state,{id, title,description}) =>
  (

    state.map(post => (post.id === id ? { ...post, ...{id, title,description} } : post))
  
  )),



  on(PostsActions.addLikeReaction, (state, {id, reactionType}) => {
    return state.map((post: Post) => {
      if (post.id === id && post.reaction) {
        // Create a new post object with the updated reaction
        return {
          ...post,
          reaction: {
            ...post.reaction,
            [reactionType]: post.reaction[reactionType] + 1,
          },
        };
      }
      return post;
    });
    // return [{id,like},...state];
  })



);

