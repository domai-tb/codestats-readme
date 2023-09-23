"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var core = __importStar(require("@actions/core"));
var fs = __importStar(require("fs"));
var fetcher_1 = require("./src/fetcher");
var ProfileCard_1 = __importDefault(require("./src/cards/ProfileCard"));
var TopLanguagesCard_1 = __importDefault(require("./src/cards/TopLanguagesCard"));
var HistoryCard_1 = __importDefault(require("./src/cards/HistoryCard"));
var server_1 = __importDefault(require("react-dom/server"));
var utils_1 = require("./src/common/utils");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var username, profile, toplang, history_1, profilecard, toplangcard, historycard, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    username = core.getInput("username");
                    return [4 /*yield*/, (0, fetcher_1.fetchProfile)(username)];
                case 1:
                    profile = _a.sent();
                    return [4 /*yield*/, (0, fetcher_1.fetchTopLanguages)(username)];
                case 2:
                    toplang = _a.sent();
                    return [4 /*yield*/, (0, fetcher_1.fetchHistory)(username, 32)];
                case 3:
                    history_1 = _a.sent();
                    profilecard = server_1.default.renderToStaticMarkup(new ProfileCard_1.default(profile.username, profile.xp, profile.recentXp, {
                        hide: (0, utils_1.parseArray)(core.getInput("hide")),
                        show_icons: true,
                        hide_rank: false,
                        line_height: 45,
                        title: "Code::Stats of ".concat(username),
                        title_color: core.getInput("title_color"),
                        icon_color: core.getInput("icon_color"),
                        text_color: core.getInput("text_color"),
                        bg_color: core.getInput("bg_color"),
                        hide_title: false,
                        hide_border: false, //parseBoolean(core.getInput("hide_border")),
                    }).render());
                    console.log("Generated ./codestats_profilecard_".concat(username, ".svg"));
                    fs.writeFileSync("./codestats_profilecard_".concat(username, ".svg"), profilecard);
                    toplangcard = server_1.default.renderToStaticMarkup(new TopLanguagesCard_1.default(username, toplang.langs, {
                        hide: (0, utils_1.parseArray)(core.getInput("hide")),
                        language_count: 21,
                        card_width: (0, utils_1.clampValue)((0, utils_1.parseNumber)(core.getInput("card_width")) || 300, 500),
                        layout: "compact",
                        title: "Code::Stats of ".concat(username),
                        title_color: core.getInput("title_color"),
                        text_color: core.getInput("text_color"),
                        bg_color: core.getInput("bg_color"),
                        hide_title: false,
                        hide_border: false, //parseBoolean(core.getInput("hide_border")),
                    }).render());
                    console.log("Generated ./codestats_toplangs_".concat(username, ".svg"));
                    fs.writeFileSync("./codestats_toplangs_".concat(username, ".svg"), toplangcard);
                    historycard = server_1.default.renderToStaticMarkup(new HistoryCard_1.default(username, history_1, {
                        hide: (0, utils_1.parseArray)(core.getInput("hide")),
                        language_count: 21,
                        hide_legend: (0, utils_1.parseBoolean)(core.getInput("hide_legend")),
                        reverse_order: (0, utils_1.parseBoolean)(core.getInput("reverse_order")),
                        width: (0, utils_1.clampValue)((0, utils_1.parseNumber)(core.getInput("card_width")) || 300, 500),
                        height: (0, utils_1.clampValue)((0, utils_1.parseNumber)(core.getInput("height")) || 300, 200),
                        title_color: core.getInput("title_color"),
                        text_color: core.getInput("text_color"),
                        bg_color: core.getInput("bg_color"),
                        layout: undefined,
                        hide_title: false,
                        hide_border: false, //parseBoolean(core.getInput("hide_border")),
                    }).render());
                    console.log("Generated ./codestats_history_".concat(username, ".svg"));
                    fs.writeFileSync("./codestats_history_".concat(username, ".svg"), historycard);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
main();
