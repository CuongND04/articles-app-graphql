import Article from "./models/article.model";
import Category from "./models/category.model";

export const resolvers = {
  Query: {
    hello: () => {
      return "hello world";
    },
    getListArticle: async () => {
      const articles = await Article.find({
        deleted: false,
      });
      return articles;
    },
    getArticle: async (_, args) => {
      const { id } = args;
      const article = await Article.findOne({
        _id: id,
        deleted: false,
      });
      return article;
    },
    getListCategory: async () => {
      const categories = await Category.find({
        deleted: false,
      });
      return categories;
    },
    getCategory: async (_, args) => {
      const { id } = args;

      const category = await Category.findOne({
        _id: id,
        deleted: false,
      });

      return category;
    },
  },
  Article: {
    // Khi nó chạy ra getListArticle thì nó sẽ chạy qua đây, tên hàm này giống tên type
    category: async (article) => {
      const categoryId = article.categoryId;

      const category = await Category.findOne({
        _id: categoryId,
      });

      return category;
    },
  },
  Mutation: {
    createArticle: async (_, args) => {
      const { article } = args;
      const record = new Article(article);
      await record.save();
      return record;
    },
    deleteArticle: async (_, args) => {
      const { id } = args;
      await Article.updateOne(
        {
          _id: id,
        },
        {
          deleted: true,
          deletedAt: new Date(),
        }
      );
      return "Đã xóa";
    },
    updateArticle: async (_, args) => {
      const { id, article } = args;

      await Article.updateOne(
        {
          _id: id,
        },
        article
      );
      const record = await Article.findOne({
        _id: id,
      });
      return record;
    },
    createCategory: async (_, args) => {
      const { category } = args;

      const newCategory = new Category(category);
      await newCategory.save();

      return newCategory;
    },
    deleteCategory: async (_, args) => {
      const { id } = args;

      await Category.updateOne(
        {
          _id: id,
        },
        {
          deleted: true,
          deletedAt: new Date(),
        }
      );

      return "Đã xóa";
    },
    updateCategory: async (_, args) => {
      const { id, category } = args;

      await Category.updateOne(
        {
          _id: id,
          deleted: false,
        },
        category
      );

      const data = await Category.findOne({
        _id: id,
        deleted: false,
      });

      return data;
    },
  },
};
