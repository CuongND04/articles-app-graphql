import { gql } from "apollo-server-express";

export const typeDefsUser = gql`
  type User {
    code: Int
    message: String
    id: ID
    fullName: String
    email: String
    token: String
  }
  type Query {
    getUser: User
  }
  input RegisterUserInput {
    fullName: String
    email: String
    password: String
  }
  input LoginUserInput {
    email: String
    password: String
  }
  type Mutation {
    registerUser(user: RegisterUserInput): User
    loginUser(user: LoginUserInput): User
  }
`;
