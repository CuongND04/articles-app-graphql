import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Article {
    id: ID
    title: String
    avatar: String
    description: String
  }
  type Category {
    id: String
    title: String
    avatar: String
  }

  # truy vấn dữ liệu
  type Query {
    hello: String
    getListArticle: [Article]
    getArticle(id: ID): Article
    getListCategory: [Category]
    getCategory(id: String): Category
  }
  # chỉnh sửa, thêm mới, xóa]
  input ArticleInput {
    title: String
    avatar: String
    description: String
  }
  input CategoryInput {
    title: String
    avatar: String
  }
  type Mutation {
    createArticle(article: ArticleInput): Article
    deleteArticle(id: ID): String
    updateArticle(id: ID, article: ArticleInput): Article

    createCategory(category: CategoryInput): Category
    deleteCategory(id: String): String
    updateCategory(id: String, category: CategoryInput): Category
  }
`;
