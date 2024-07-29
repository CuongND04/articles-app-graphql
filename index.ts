import express, { Express, Request, Response } from "express";
import * as database from "./config/database";
import dotenv from "dotenv";
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs } from "./typeDefs/index.typeDefs";
import { resolvers } from "./resolvers/index.resolver";
import { requireAuth } from "./middlewares/authen.middleware";
const startServer = async () => {
  const app: Express = express();
  const port: string | number = process.env.PORT || 3000;

  dotenv.config(); // cái này phải đặt trên connect
  database.connect();
  // GraphQL
  app.use("/graphql", requireAuth);
  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: ({ req }) => {
      return { ...req };
    },
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app: app,
    path: "/graphql",
  });
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
};
startServer();
