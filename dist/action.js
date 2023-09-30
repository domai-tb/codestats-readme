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
var themes_json_1 = __importDefault(require("./themes/themes.json"));
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
                    printInputVars();
                    core.setFailed('Does GitHub reconize this change?');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    username = core.getInput("username");
                    // Fetch Code::Stats API
                    console.log("Fetch account data: codestats.net/users/".concat(username));
                    return [4 /*yield*/, (0, fetcher_1.fetchProfile)(username)];
                case 2:
                    profile = _a.sent();
                    return [4 /*yield*/, (0, fetcher_1.fetchTopLanguages)(username)];
                case 3:
                    toplang = _a.sent();
                    return [4 /*yield*/, (0, fetcher_1.fetchHistory)(username, (0, utils_1.parseNumber)(core.getInput("history_card_days_count")))];
                case 4:
                    history_1 = _a.sent();
                    profilecard = server_1.default.renderToStaticMarkup(new ProfileCard_1.default(profile.username, profile.xp, profile.recentXp, {
                        hide: (0, utils_1.parseArray)(core.getInput("profile_card_hide_lines")),
                        show_icons: core.getBooleanInput("profile_card_show_icons"),
                        hide_rank: core.getBooleanInput("profile_card_hide_rank"),
                        line_height: (0, utils_1.parseNumber)(core.getInput("profile_card_line_height")),
                        title: core.getInput("profile_card_title")
                            ? core.getInput("profile_card_title")
                            : "Code::Stats of ".concat(username),
                        title_color: core.getInput("common_title_color"),
                        icon_color: core.getInput("common_icon_color"),
                        text_color: core.getInput("common_text_color"),
                        bg_color: core.getInput("common_bg_color"),
                        hide_title: core.getBooleanInput("common_hide_title"),
                        hide_border: core.getBooleanInput("common_hide_border"),
                        theme: core.getInput("theme") in themes_json_1.default
                            ? core.getInput("theme")
                            : "default",
                    }).render());
                    console.log("Generated ./codestats_profilecard_".concat(username, ".svg"));
                    fs.writeFileSync("./codestats_profilecard_".concat(username, ".svg"), profilecard);
                    toplangcard = server_1.default.renderToStaticMarkup(new TopLanguagesCard_1.default(username, toplang.langs, {
                        hide: (0, utils_1.parseArray)(core.getInput("common_hide_languages")),
                        language_count: (0, utils_1.parseNumber)(core.getInput("toplangs_card_language_count")),
                        card_width: 500,
                        layout: core.getBooleanInput("toplangs_card_compact_layout")
                            ? "compact"
                            : undefined,
                        title: core.getInput("toplangs_card_title")
                            ? core.getInput("toplangs_card_title")
                            : "Code::Stats of ".concat(username),
                        title_color: core.getInput("common_title_color"),
                        text_color: core.getInput("common_text_color"),
                        bg_color: core.getInput("common_bg_color"),
                        hide_title: core.getBooleanInput("common_hide_title"),
                        hide_border: core.getBooleanInput("common_hide_border"),
                        theme: core.getInput("theme") in themes_json_1.default
                            ? core.getInput("theme")
                            : "default",
                    }).render());
                    console.log("Generated ./codestats_toplangs_".concat(username, ".svg"));
                    fs.writeFileSync("./codestats_toplangs_".concat(username, ".svg"), toplangcard);
                    historycard = server_1.default.renderToStaticMarkup(new HistoryCard_1.default(username, history_1, {
                        hide: (0, utils_1.parseArray)(core.getInput("common_hide_languages")),
                        language_count: (0, utils_1.parseNumber)(core.getInput("history_card_language_count")),
                        hide_legend: core.getBooleanInput("history_card_hide_legend"),
                        reverse_order: core.getBooleanInput("history_card_reverse_order"),
                        width: 500,
                        height: 300,
                        title_color: core.getInput("common_title_color"),
                        text_color: core.getInput("common_text_color"),
                        bg_color: core.getInput("common_bg_color"),
                        layout: core.getBooleanInput("history_card_horizontal_layout")
                            ? "horizontal"
                            : undefined,
                        hide_title: core.getBooleanInput("common_hide_title"),
                        hide_border: core.getBooleanInput("common_hide_border"),
                        theme: core.getInput("theme") in themes_json_1.default
                            ? core.getInput("theme")
                            : "default",
                    }).render());
                    console.log("Generated ./codestats_history_".concat(username, ".svg"));
                    fs.writeFileSync("./codestats_history_".concat(username, ".svg"), historycard);
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    if (error_1 instanceof Error) {
                        core.setFailed(error_1.message);
                    }
                    else {
                        console.log(error_1);
                    }
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function printInputVars() {
    console.log('username: ' + core.getInput("username"));
    console.log('profile_card_hide_lines: ' + (0, utils_1.parseArray)(core.getInput("profile_card_hide_lines")));
    console.log("profile_card_show_icons: " + core.getBooleanInput("profile_card_show_icons"));
    console.log("profile_card_hide_rank: " + core.getBooleanInput("profile_card_hide_rank"));
    console.log("profile_card_line_height: " +
        (0, utils_1.parseNumber)(core.getInput("profile_card_line_height")));
    console.log("profile_card_title: " + core.getInput("profile_card_title")
        ? core.getInput("profile_card_title")
        : "Code::Stats of <username var>");
    console.log("common_title_color" + core.getInput("common_title_color"));
    console.log('common_icon_color: ' + core.getInput("common_icon_color"));
    console.log("common_text_color: " + core.getInput("common_text_color"));
    console.log("common_bg_color: " + core.getInput("common_bg_color"));
    console.log("common_hide_title: " + core.getBooleanInput("common_hide_title"));
    console.log("common_hide_border: " + core.getBooleanInput("common_hide_border"));
    console.log('theme: ' +
        core.getInput("theme") in themes_json_1.default
        ? core.getInput("theme")
        : "default");
}
main();
