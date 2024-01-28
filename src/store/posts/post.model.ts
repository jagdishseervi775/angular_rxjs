
export interface Reaction {
  like : number,
  love : number,
  happy : number
}

export interface Post {
    id: string | number; 
    title: string;
    description : string;
    reaction? : Reaction;
}
