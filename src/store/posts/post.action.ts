import { createActionGroup, props } from '@ngrx/store';
import { Post } from './post.model';

export const PostsActions = createActionGroup({
  source: 'Posts',
  events: {
    'Add Post': props<{ id: string, title :string, description : string }>(),
    'Update Post': props<{ id: string, title :string, description : string }>(),
    'Remove Post': props<{ id: string }>(),
    'Add Like Reaction': props<{id:string, reactionType : 'like' | 'love'  | 'happy'}>(),
  },
});
