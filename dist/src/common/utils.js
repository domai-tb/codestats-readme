"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.getColorOfLanguage = exports.formatDate = exports.formatDateNumber = exports.lowercaseTrim = exports.setCache = exports.prepareResponse = exports.calculateCircleProgress = exports.parseNumber = exports.trunc = exports.getPercent = exports.getProgress = exports.getLevel = exports.CustomError = exports.SECONDARY_ERROR_MESSAGES = exports.CONSTANTS = exports.wrapTextMultiline = exports.getColor = exports.profileGraphRequest = exports.request = exports.clampValue = exports.parseArray = exports.parseBoolean = exports.kFormatter = exports.encodeHTML = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
var word_wrap_1 = __importDefault(require("word-wrap"));
var themes_json_1 = __importDefault(require("../../themes/themes.json"));
var language_bar_json_1 = __importDefault(require("../../themes/language-bar.json"));
/**
 * Encode a string to escape HTML
 *
 * https://stackoverflow.com/a/48073476/10629172
 * @param str the string to encode
 */
function encodeHTML(str) {
    return str
        .replace(/[\u00A0-\u9999<>&](?!#)/gim, function (i) {
        return '&#' + i.charCodeAt(0) + ';';
    });
}
exports.encodeHTML = encodeHTML;
function kFormatter(num) {
    return Math.abs(num) > 999 ?
        trunc(num / 1000) + 'k' :
        num;
}
exports.kFormatter = kFormatter;
/**
 * Transform the `value` query string into a Boolean
 * @param value the value to transform
 */
function parseBoolean(value) {
    return value === 'true' || value === '' || value === true;
}
exports.parseBoolean = parseBoolean;
function parseArray(str) {
    if (!str)
        return [];
    return str.split(',');
}
exports.parseArray = parseArray;
function clampValue(number, min, max) {
    return Math.max(min, max ? Math.min(number, max) : number);
}
exports.clampValue = clampValue;
function request(username) {
    return __awaiter(this, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, node_fetch_1.default)("https://codestats.net/api/users/".concat(username))];
                case 1:
                    resp = _a.sent();
                    return [2 /*return*/, resp.json()];
            }
        });
    });
}
exports.request = request;
function profileGraphRequest(body) {
    return __awaiter(this, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, node_fetch_1.default)('https://codestats.net/profile-graph', {
                        body: body,
                        method: 'POST'
                    })];
                case 1:
                    resp = _a.sent();
                    return [2 /*return*/, resp.json()];
            }
        });
    });
}
exports.profileGraphRequest = profileGraphRequest;
function getColor(color, replacementColor, theme) {
    if (theme === void 0) { theme = 'default'; }
    return '#' + (replacementColor ? replacementColor : themes_json_1.default[theme][color]);
}
exports.getColor = getColor;
function wrapTextMultiline(text, width, maxLines) {
    if (width === void 0) { width = 60; }
    if (maxLines === void 0) { maxLines = 3; }
    var wrapped = (0, word_wrap_1.default)(encodeHTML(text), { width: width })
        .split('\n') // Split wrapped lines to get an array of lines
        .map(function (line) { return line.trim(); }); // Remove leading and trailing whitespace of each line
    var lines = wrapped.slice(0, maxLines); // Only consider maxLines lines
    // Add "..." to the last line if the text exceeds maxLines
    if (wrapped.length > maxLines) {
        lines[maxLines - 1] += '...';
    }
    // Remove empty lines if text fits in less than maxLines lines
    return lines.filter(Boolean);
}
exports.wrapTextMultiline = wrapTextMultiline;
exports.CONSTANTS = {
    THIRTY_MINUTES: 1800,
    TWO_HOURS: 7200,
    FOUR_HOURS: 14400,
    ONE_DAY: 86400,
    LEVEL_FACTOR: 0.025
};
exports.SECONDARY_ERROR_MESSAGES = {
    MAX_RETRY: 'Make sure your profile is not private'
};
var CustomError = /** @class */ (function (_super) {
    __extends(CustomError, _super);
    function CustomError(message, type) {
        var _this = _super.call(this, message) || this;
        _this.type = type;
        _this.secondaryMessage = exports.SECONDARY_ERROR_MESSAGES[type] || 'adsad';
        return _this;
    }
    CustomError.MAX_RETRY = 'MAX_RETRY';
    CustomError.USER_NOT_FOUND = 'USER_NOT_FOUND';
    return CustomError;
}(Error));
exports.CustomError = CustomError;
/**
 * Return the level depending on the xp
 *
 * https://codestats.net/api-docs
 * @param xp the xp count
 */
function getLevel(xp) {
    return Math.trunc(Math.floor(exports.CONSTANTS.LEVEL_FACTOR * Math.sqrt(xp)));
}
exports.getLevel = getLevel;
/**
 * Return the progress (0-99)% til next level
 * @param xp Xp number
 */
function getProgress(xp) {
    var currentLvl = getLevel(xp);
    return trunc((exports.CONSTANTS.LEVEL_FACTOR * Math.sqrt(xp) - currentLvl) * 100, 2);
}
exports.getProgress = getProgress;
function getPercent(number, total) {
    return trunc(number * 100 / total, 2);
}
exports.getPercent = getPercent;
/**
 * Round a number without moving it to a string and reparsing it
 *
 * https://stackoverflow.com/a/29494612/7335674
 * @param number the number to truncate
 * @param digits the number of digits after the dot
 */
function trunc(number, digits) {
    if (digits === void 0) { digits = 0; }
    var pow = Math.pow(10, digits);
    return Math.round(number * pow) / pow;
}
exports.trunc = trunc;
function parseNumber(number) {
    if (typeof number === 'undefined' || typeof number === 'number') {
        return 0;
    }
    var n = parseFloat(number);
    if (isNaN(n)) {
        return 0;
    }
    return n;
}
exports.parseNumber = parseNumber;
function calculateCircleProgress(percent, radius) {
    if (radius === void 0) { radius = 40; }
    var c = Math.PI * radius * 2;
    percent = clampValue(percent, 0, 100);
    return ((100 - percent) / 100) * c;
}
exports.calculateCircleProgress = calculateCircleProgress;
/**
 * Prepare the response
 * @param res the response object
 */
function prepareResponse(res) {
    res.setHeader('Content-Type', 'image/svg+xml');
}
exports.prepareResponse = prepareResponse;
/**
 * set the cache in the response
 * @param res the Response object
 * @param cache The cache time in seconds
 */
function setCache(res, cache) {
    if (cache === void 0) { cache = exports.CONSTANTS.THIRTY_MINUTES; }
    if (isNaN(cache)) {
        cache = exports.CONSTANTS.THIRTY_MINUTES;
    }
    var clampedCache = clampValue(cache, exports.CONSTANTS.THIRTY_MINUTES, exports.CONSTANTS.ONE_DAY);
    res.setHeader('Cache-Control', "public, stale-while-revalidate, max-age=".concat(clampedCache, " s-maxage=").concat(clampedCache));
}
exports.setCache = setCache;
function lowercaseTrim(str) {
    return str.toLowerCase().trim();
}
exports.lowercaseTrim = lowercaseTrim;
function formatDateNumber(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number + '';
}
exports.formatDateNumber = formatDateNumber;
function formatDate(date) {
    return "".concat(date.getFullYear(), "-").concat(formatDateNumber(date.getMonth() + 1), "-").concat(formatDateNumber(date.getDate()));
}
exports.formatDate = formatDate;
function getColorOfLanguage(name) {
    return name in language_bar_json_1.default ? language_bar_json_1.default[name].color || '#3e4053' : '#3e4053';
}
exports.getColorOfLanguage = getColorOfLanguage;
