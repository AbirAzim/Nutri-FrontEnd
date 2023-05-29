export interface WikiCommentsType {
  userComment: WikiUserComment;
  comments: WikiComment[];
}

export interface WikiUserComment {
  comment: string;
  type: string;
  entityId: string;
  createdAt: string;
  updatedAt: string;
  _id?: string;
}

export interface WikiComment {
  comment: string;
  type: string;
  entityId: string;
  createdAt: string;
  updatedAt: string;
  userId: {
    displayName: string;
    firstName: string;
    lastName: string;
    image: string;
    email: string;
    _id: string;
  };
}
