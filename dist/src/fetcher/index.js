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
exports.fetchTopLanguages = exports.fetchHistory = exports.fetchProfile = void 0;
var utils_1 = require("../common/utils");
var retryer_1 = __importDefault(require("../common/retryer"));
function fetchProfile(username) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!username)
                        throw Error('Invalid Username');
                    return [4 /*yield*/, (0, retryer_1.default)(utils_1.request, username)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, {
                            username: username,
                            xp: response.total_xp,
                            recentXp: response.new_xp,
                            level: (0, utils_1.getLevel)(response.total_xp)
                        }];
            }
        });
    });
}
exports.fetchProfile = fetchProfile;
function fetchHistory(username, days) {
    return __awaiter(this, void 0, void 0, function () {
        var date, body, response, result, languagesData, _i, _a, data, day, keys, _b, keys_1, day, item, date2, oldDate;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!username)
                        throw Error('Invalid Username');
                    date = new Date();
                    date.setDate(date.getDate() - (days - 1));
                    body = "{\n\t\tprofile(username: \"".concat(username, "\") {\n\t\t\tday_language_xps: dayLanguageXps(since: \"").concat((0, utils_1.formatDate)(date), "\") {date language xp}\n\t\t}\n\t}");
                    return [4 /*yield*/, (0, retryer_1.default)(utils_1.profileGraphRequest, body)];
                case 1:
                    response = _c.sent();
                    if (response.errors) {
                        throw new utils_1.CustomError(response.errors[0].message, 'MAX_RETRY');
                    }
                    result = {};
                    languagesData = {};
                    for (_i = 0, _a = response.data.profile.day_language_xps; _i < _a.length; _i++) {
                        data = _a[_i];
                        day = result[data.date];
                        if (!day) {
                            day = [];
                        }
                        day.push({
                            xp: data.xp,
                            language: data.language
                        });
                        if (!(data.language in languagesData)) {
                            languagesData[data.language] = 0;
                        }
                        languagesData[data.language] += data.xp;
                        result[data.date] = day;
                    }
                    keys = Object.keys(result);
                    for (_b = 0, keys_1 = keys; _b < keys_1.length; _b++) {
                        day = keys_1[_b];
                        item = result[day];
                        result[day] = item.sort(function (a, b) { return languagesData[b.language] - languagesData[a.language]; });
                        if (keys.indexOf(day) === 0 && day === (0, utils_1.formatDate)(date)) {
                            continue;
                        }
                        date2 = new Date(day);
                        date2.setDate(date2.getDate() - 1);
                        oldDate = (0, utils_1.formatDate)(date2);
                        if (!(oldDate in result)) {
                            result[oldDate] = [];
                        }
                    }
                    return [2 /*return*/, Object.keys(result).map(function (el) { return ({
                            data: result[el],
                            day: el,
                            total: result[el].reduce(function (prvs, crnt) { return prvs + crnt.xp; }, 0)
                        }); }).sort(function (a, b) { return a.day < b.day ? 1 : -1; })];
            }
        });
    });
}
exports.fetchHistory = fetchHistory;
function fetchTopLanguages(username) {
    return __awaiter(this, void 0, void 0, function () {
        var res, langs, resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!username)
                        throw Error('Invalid username');
                    return [4 /*yield*/, (0, retryer_1.default)(utils_1.request, username)];
                case 1:
                    res = _a.sent();
                    langs = res.languages;
                    resp = Object.keys(langs)
                        .map(function (key) {
                        var item = langs[key];
                        return {
                            xp: item.xps,
                            recentXp: item.new_xps,
                            color: (0, utils_1.getColorOfLanguage)(key),
                            name: key,
                            level: (0, utils_1.getLevel)(item.xps)
                        };
                    })
                        .sort(function (a, b) { return (b.xp + b.recentXp) - (a.xp + a.recentXp); });
                    return [2 /*return*/, {
                            username: username,
                            langs: resp
                        }];
            }
        });
    });
}
exports.fetchTopLanguages = fetchTopLanguages;
