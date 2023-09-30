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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("react-dom/server"));
var utils_1 = require("../src/common/utils");
var fetcher_1 = require("../src/fetcher");
var TopLanguagesCard_1 = __importDefault(require("../src/cards/TopLanguagesCard"));
var Error_1 = __importDefault(require("../src/components/Error"));
exports.default = (function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, hide, hide_title, hide_border, card_width, title_color, text_color, bg_color, language_count, theme, cache_seconds, layout, title, topLangs, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, username = _a.username, hide = _a.hide, hide_title = _a.hide_title, hide_border = _a.hide_border, card_width = _a.card_width, title_color = _a.title_color, text_color = _a.text_color, bg_color = _a.bg_color, language_count = _a.language_count, theme = _a.theme, cache_seconds = _a.cache_seconds, layout = _a.layout, title = _a.title;
                (0, utils_1.prepareResponse)(res);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, fetcher_1.fetchTopLanguages)(username)];
            case 2:
                topLangs = _b.sent();
                (0, utils_1.setCache)(res, parseInt(cache_seconds || '', 10));
                return [2 /*return*/, res.send(server_1.default.renderToStaticMarkup(new TopLanguagesCard_1.default(username, topLangs.langs, {
                        hide: (0, utils_1.parseArray)(hide),
                        language_count: (0, utils_1.parseNumber)(language_count),
                        card_width: (0, utils_1.parseNumber)(card_width),
                        layout: layout,
                        text_color: text_color,
                        theme: theme,
                        title: title,
                        title_color: title_color,
                        bg_color: bg_color,
                        hide_border: (0, utils_1.parseBoolean)(hide_border),
                        hide_title: (0, utils_1.parseBoolean)(hide_title)
                    }).render()))];
            case 3:
                err_1 = _b.sent();
                return [2 /*return*/, res.send(server_1.default.renderToStaticMarkup(new Error_1.default(err_1).render()))];
            case 4: return [2 /*return*/];
        }
    });
}); });