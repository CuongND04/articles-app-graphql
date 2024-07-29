"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefsUser = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefsUser = (0, apollo_server_express_1.gql) `
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
