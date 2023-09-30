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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var utils_1 = require("../common/utils");
var Card_1 = __importDefault(require("../common/Card"));
var FlexLayout_1 = __importDefault(require("../components/FlexLayout"));
var HistoryCard = /** @class */ (function (_super) {
    __extends(HistoryCard, _super);
    function HistoryCard(username, days, options) {
        var _this = _super.call(this, options) || this;
        _this.username = username;
        _this.days = days;
        _this.options = options;
        _this.legendMinWidth = 180;
        _this.processOptions();
        var languagesToHide = options.hide || [];
        var languageCount = [];
        for (var _i = 0, _a = _this.days; _i < _a.length; _i++) {
            var day = _a[_i];
            var _loop_1 = function (data) {
                var index = languageCount.findIndex(function (item) { return item.language === data.language; });
                if (index === -1) {
                    index = languageCount.push({
                        language: data.language,
                        xp: 0
                    }) - 1;
                }
                languageCount[index].xp += data.xp;
            };
            for (var _b = 0, _c = day.data; _b < _c.length; _b++) {
                var data = _c[_b];
                _loop_1(data);
            }
        }
        _this.topLanguages = languageCount
            .sort(function (a, b) { return b.xp - a.xp; })
            .map(function (item) { return item.language; })
            .filter(function (lang) { return !languagesToHide.includes(lang); });
        languagesToHide.push.apply(languagesToHide, _this.topLanguages.splice((options.language_count || 8)));
        if (languagesToHide.length > 0) {
            _this.topLanguages.push('Other');
        }
        _this.hideLanguages(languagesToHide);
        return _this;
    }
    HistoryCard.prototype.hideLanguages = function (languagesToHide) {
        for (var _i = 0, _a = this.days; _i < _a.length; _i++) {
            var day = _a[_i];
            // Prepare array of indexes to remove
            var toRemove = [];
            // Loop through data
            for (var i = 0; i < day.data.length; i++) {
                var element = day.data[i];
                // If Language should not be hidden: goto next
                if (!languagesToHide.includes(element.language)) {
                    continue;
                }
                // Search indexOf 'Others'
                var otherIndex = day.data.findIndex(function (el) { return el.language === 'Others'; });
                if (otherIndex === -1) {
                    day.data.push({
                        language: 'Others',
                        xp: element.xp
                    });
                }
                else {
                    day.data[otherIndex].xp += element.xp;
                }
                toRemove.push(i);
            }
            // Reverse array and remove each indexes
            for (var _b = 0, _c = toRemove.reverse(); _b < _c.length; _b++) {
                var index = _c[_b];
                day.data.splice(index, 1);
            }
        }
    };
    HistoryCard.prototype.processOptions = function () {
        var _a, _b, _c;
        this.height = 45 + (this.days.length + 1) * 40;
        this.width = (_a = this.options.width) !== null && _a !== void 0 ? _a : 500;
        if (this.options.layout === 'horizontal') {
            this.width = 45 + (this.days.length + 1) * 40 + (this.options.hide_legend ? 0 : this.legendMinWidth);
            this.height = (_b = this.options.height) !== null && _b !== void 0 ? _b : 300;
        }
        this.title = (_c = this.options.title) !== null && _c !== void 0 ? _c : "Last ".concat(this.days.length, " days XP history");
        this.css = ProgressNode.getCSS((0, utils_1.getColor)('text_color', this.options.text_color, this.options.theme));
        if (this.options.reverse_order) {
            this.days = this.days.reverse();
        }
    };
    HistoryCard.prototype.render = function () {
        var _this = this;
        var totalTotal = this.days.reduce(function (prvs, crnt) {
            if (prvs < crnt.total) {
                return crnt.total;
            }
            return prvs;
        }, 0);
        var legendWidth = this.options.hide_legend ? 0 : Math.max(this.width * 20 / 100 + 60, this.legendMinWidth);
        var historyWidth = this.width - legendWidth;
        var items = [];
        // Format History bars
        var history = this.options.layout === 'horizontal' ? (react_1.default.createElement(FlexLayout_1.default, { key: 0, items: this.days.reverse().map(function (el, index) { return (react_1.default.createElement(VerticalProgressNode, __assign({ key: index }, el, { totalTotal: totalTotal, height: _this.height - 120 }))); }), gap: 40 })) : (react_1.default.createElement(FlexLayout_1.default, { key: 0, items: this.days.map(function (el, index) { return (react_1.default.createElement(ProgressNode, __assign({ key: index }, el, { totalTotal: totalTotal, width: historyWidth - 60 }))); }), gap: 40, direction: "column" }));
        items.push(history);
        if (!this.options.hide_legend) {
            items.push(react_1.default.createElement(FlexLayout_1.default, { key: 1, items: this.topLanguages.map(function (el, index) { return (react_1.default.createElement(react_1.default.Fragment, { key: index },
                    react_1.default.createElement("rect", { rx: "5", x: "2", y: "7", height: "12", width: "12", fill: (0, utils_1.getColorOfLanguage)(el) }),
                    react_1.default.createElement("text", { x: "18", y: "18", className: "lang-name", key: index }, el))); }), gap: 20, direction: "column" }));
        }
        return _super.prototype.render.call(this, react_1.default.createElement("svg", { x: "25" },
            react_1.default.createElement(FlexLayout_1.default, { items: items, gap: historyWidth })));
    };
    return HistoryCard;
}(Card_1.default));
exports.default = HistoryCard;
var ProgressNode = /** @class */ (function (_super) {
    __extends(ProgressNode, _super);
    function ProgressNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProgressNode.prototype.render = function () {
        var _this = this;
        var offset = 0;
        var maskId = "mask-".concat(this.props.day);
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("text", { x: "2", y: "15", className: "lang-name" }, new Date(this.props.day).toDateString().substr(4, 6)),
            react_1.default.createElement("svg", { width: this.props.width },
                react_1.default.createElement("mask", { id: maskId },
                    react_1.default.createElement("rect", { x: "0", y: "20", width: this.calcSize(this.props.total), height: "16", fill: "white", rx: "5" })),
                react_1.default.createElement("rect", { rx: "5", ry: "5", x: "0", y: "20", width: this.props.width, height: "16", fill: "#ddd" }),
                this.props.data.map(function (el, index) {
                    var color = (0, utils_1.getColorOfLanguage)(el.language);
                    offset += el.xp;
                    return (react_1.default.createElement("rect", { key: index, mask: "url(#".concat(maskId, ")"), height: "16", fill: color, x: _this.calcSize(offset - el.xp), y: "20", width: "".concat(_this.calcSize(el.xp), "px") }));
                }),
                this.getXPText(offset))));
    };
    ProgressNode.prototype.calcSize = function (number) {
        return number * this.props.width / this.props.totalTotal;
    };
    ProgressNode.prototype.getXPText = function (offset) {
        var size = this.calcSize(offset) + 6;
        var txtSize = (this.props.total.toString().length + 3) * 8;
        var classes = 'xp-txt';
        if (size + txtSize >= this.calcSize(this.props.totalTotal)) {
            size -= txtSize;
            classes += ' xp-txt-invert';
        }
        return (react_1.default.createElement("text", { x: size, y: "33", className: classes },
            this.props.total,
            " XP"));
    };
    ProgressNode.getCSS = function (textColor) { return "\n\t.lang-name {\n\t\tfont: 400 16px 'Segoe UI', Ubuntu, Sans-Serif;\n\t\tfill: ".concat(textColor, ";\n\t}\n\t.xp-txt {\n\t\tfont: 400 12px 'Segoe UI', Ubuntu, Sans-Serif;\n\t\tfill: black;\n\t}\n\t.xp-txt-invert {\n\t\tfont: 600 12px 'Segoe UI', Ubuntu, Sans-Serif;\n\t\tfill: white;\n\t}\n\t.subtitle {\n\t\tfont: 400 14px 'Segoe UI', Ubuntu, Sans-Serif;\n\t\tfill: ").concat(textColor, ";\n\t}\n"); };
    return ProgressNode;
}(react_1.default.Component));
var VerticalProgressNode = /** @class */ (function (_super) {
    __extends(VerticalProgressNode, _super);
    function VerticalProgressNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VerticalProgressNode.prototype.render = function () {
        var _this = this;
        var offset = this.props.totalTotal;
        var maskId = "mask-".concat(this.props.day);
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("svg", { x: "7", y: "-20", height: this.props.height + 60 },
                react_1.default.createElement("mask", { id: maskId },
                    react_1.default.createElement("rect", { x: "0", y: 25 + this.calcSize(this.props.totalTotal - this.props.total), width: "16", height: this.calcSize(this.props.total), fill: "white", rx: "5" })),
                react_1.default.createElement("rect", { rx: "5", ry: "5", x: "0", y: "25", width: "16", height: this.props.height, fill: "#ddd" }),
                this.props.data.map(function (el, index) {
                    var color = (0, utils_1.getColorOfLanguage)(el.language);
                    offset -= el.xp;
                    return (react_1.default.createElement("rect", { key: index, mask: "url(#".concat(maskId, ")"), width: "16", fill: color, y: 25 + _this.calcSize(offset), x: "0", height: "".concat(_this.calcSize(el.xp), "px") }));
                }),
                this.getXPTxt()),
            react_1.default.createElement("text", { x: "2", y: this.props.height + 18, className: "subtitle" }, new Date(this.props.day).toDateString().substr(4, 3)),
            react_1.default.createElement("text", { x: "6", y: this.props.height + 34, className: "subtitle" }, (0, utils_1.formatDateNumber)(new Date(this.props.day).getDate()))));
    };
    VerticalProgressNode.prototype.calcSize = function (number) {
        return number * this.props.height / this.props.totalTotal;
    };
    VerticalProgressNode.prototype.getXPTxt = function () {
        var txtLength = (this.props.total.toString().length + 3) * 13;
        var position = 25 + this.calcSize(this.props.totalTotal - this.props.total) - txtLength;
        var classes = 'xp-txt';
        if (position <= 28) {
            position += txtLength + 16;
            classes += ' xp-txt-invert';
        }
        return (react_1.default.createElement("text", { transform: "rotate(90, 4, ".concat(position, ")"), letterSpacing: "5", y: position, x: "4", rotate: "-90", className: classes },
            this.props.total,
            " XP"));
    };
    return VerticalProgressNode;
}(react_1.default.Component));
