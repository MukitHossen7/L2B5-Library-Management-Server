"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
exports.app = (0, express_1.default)();
//middleware
exports.app.use([(0, cors_1.default)(), express_1.default.json()]);
//routes
exports.app.use(routes_1.default);
exports.app.get("/", (req, res) => {
    res.send({
        success: true,
        message: "This is Library Management API",
    });
});
