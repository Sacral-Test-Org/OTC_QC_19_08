export class Comment {
  id: string;
  contractId: string;
  text: string;
  flag: string;

  constructor(id: string, contractId: string, text: string, flag: string) {
    this.id = id;
    this.contractId = contractId;
    this.text = text;
    this.flag = flag;
  }
}

export class ShowUwCommentsModel {
  comments: Comment[];

  constructor(comments: Comment[]) {
    this.comments = comments;
  }

  static fetchComments(): ShowUwCommentsModel[] {
    // Mock data for demonstration purposes
    return [
      new ShowUwCommentsModel([
        new Comment('1', 'contract1', 'This is a comment.', 'N'),
        new Comment('2', 'contract1', 'This is another comment.', 'Y')
      ])
    ];
  }

  static addComment(comment: Comment): ShowUwCommentsModel[] {
    // Mock data for demonstration purposes
    const comments = ShowUwCommentsModel.fetchComments();
    comments[0].comments.push(comment);
    return comments;
  }
}