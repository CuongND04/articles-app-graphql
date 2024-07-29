import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Article {
    id: ID
    title: String
    avatar: String
    description: String
  }
  # truy vấn dữ liệu
  type Query {
    hello: String
    getListArticle: [Article]
    getArticle(id: ID): Article
  }
  # chỉnh sửa, thêm mới, xóa]
  input ArticleInput {
    title: String
    avatar: String
    description: String
  }
  type Mutation {
    createArticle(article: ArticleInput): Article
  }
`;
