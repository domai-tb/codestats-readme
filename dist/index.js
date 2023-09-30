"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var history_1 = __importDefault(require("./api/history"));
var top_langs_1 = __importDefault(require("./api/top-langs"));
var profile_1 = __importDefault(require("./api/profile"));
var app = (0, express_1.default)();
app.use('/profile', profile_1.default);
app.use('/history', history_1.default);
app.use('/toplang', top_langs_1.default);
app.get('/', function (_, res) {
    res.redirect(301, 'https://github.com/domai-tb/codestats-readme');
});
app.listen(3000, function () {
    console.log('server launched!');
});
