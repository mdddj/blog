export interface Blog {
  id: number;
  title: string;
  content: string;
  createTime: Date;
  category: Category;
  author: string;
  thumbnail: string;
  dateString: string;
  tags: Tag[];
  aliasString: string;
  html: string;
}

export interface Category {
  id: number;
  name: string;
  logo: string;
  intro: string;
  createTime: Date;
}

export interface Tag {
  id: number;
  name: string;
}
