export interface BlogPostForm {
    title: string;
    description: string;
    createdAt: string;
}

export interface BlogPost extends BlogPostForm {
    id: string;
}

export interface FirebasePostsList {
    [id: string]: BlogPostForm;
}