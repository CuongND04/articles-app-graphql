"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const article_model_1 = __importDefault(require("./models/article.model"));
const category_model_1 = __importDefault(require("./models/category.model"));
exports.resolvers = {
    Query: {
        getListArticle: () => __awaiter(void 0, void 0, void 0, function* () {
            const articles = yield article_model_1.default.find({
                deleted: false,
            });
            return articles;
        }),
        getArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            const article = yield article_model_1.default.findOne({
                _id: id,
                deleted: false,
            });
            return article;
        }),
        getListCategory: () => __awaiter(void 0, void 0, void 0, function* () {
            const categories = yield category_model_1.default.find({
                deleted: false,
            });
            return categories;
        }),
        getCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            const category = yield category_model_1.default.findOne({
                _id: id,
                deleted: false,
            });
            return category;
        }),
    },
    Article: {
        // Khi nó chạy ra getListArticle thì nó sẽ chạy qua đây, tên hàm này giống tên type
        category: (article) => __awaiter(void 0, void 0, void 0, function* () {
            const categoryId = article.categoryId;
            const category = yield category_model_1.default.findOne({
                _id: categoryId,
            });
            return category;
        }),
    },
    Mutation: {
        createArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { article } = args;
            const record = new article_model_1.default(article);
            yield record.save();
            return record;
        }),
        deleteArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            yield article_model_1.default.updateOne({
                _id: id,
            }, {
                deleted: true,
                deletedAt: new Date(),
            });
            return "Đã xóa";
        }),
        updateArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, article } = args;
            yield article_model_1.default.updateOne({
                _id: id,
            }, article);
            const record = yield article_model_1.default.findOne({
                _id: id,
            });
            return record;
        }),
        createCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { category } = args;
            const newCategory = new category_model_1.default(category);
            yield newCategory.save();
            return newCategory;
        }),
        deleteCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            yield category_model_1.default.updateOne({
                _id: id,
            }, {
                deleted: true,
                deletedAt: new Date(),
            });
            return "Đã xóa";
        }),
        updateCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, category } = args;
            yield category_model_1.default.updateOne({
                _id: id,
                deleted: false,
            }, category);
            const data = yield category_model_1.default.findOne({
                _id: id,
                deleted: false,
            });
            return data;
        }),
    },
};
