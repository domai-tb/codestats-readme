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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var utils_1 = require("../common/utils");
var Card_1 = __importDefault(require("../common/Card"));
var FlexLayout_1 = __importDefault(require("../components/FlexLayout"));
var TopLanguagesCard = /** @class */ (function (_super) {
    __extends(TopLanguagesCard, _super);
    function TopLanguagesCard(username, langs, options) {
        var _a;
        var _this = _super.call(this, options) || this;
        _this.username = username;
        _this.langs = langs;
        _this.options = options;
        _this.langs = _this.langs
            .filter(function (item) { return !(options.hide || []).includes(item.name); })
            .slice(0, options.language_count || 5);
        _this.height = 45 + (_this.langs.length + 1) * 40;
        _this.width = 300;
        if (options.card_width && !isNaN(options.card_width)) {
            _this.width = options.card_width;
        }
        var textColor = (0, utils_1.getColor)('text_color', options.text_color, options.theme);
        _this.title = (_a = _this.options.title) !== null && _a !== void 0 ? _a : 'Most Used Languages';
        _this.css = CompactTextNode.getCSS(textColor);
        return _this;
    }
    TopLanguagesCard.prototype.render = function () {
        var _this = this;
        var total = this.langs.reduce(function (acc, curr) { return acc + curr.xp; }, 0);
        if (this.options.layout === 'compact') {
            this.width = this.width + 50;
            this.height = 90 + Math.round(this.langs.length / 2) * 25;
            return _super.prototype.render.call(this, react_1.default.createElement("svg", { x: "25" },
                react_1.default.createElement("mask", { id: "rect-mask" },
                    react_1.default.createElement("rect", { x: "0", y: "0", width: this.width - 50, height: "8", fill: "white", rx: "5" })),
                react_1.default.createElement(CompactProgressBar, { langs: this.langs, total: total, parentWidth: this.width }),
                this.langs.map(function (el, index) { return (react_1.default.createElement(CompactTextNode, { key: index, index: index, total: total, lang: el })); })));
        }
        else {
            return _super.prototype.render.call(this, react_1.default.createElement("svg", { x: "25" },
                react_1.default.createElement(FlexLayout_1.default, { items: this.langs.map(function (el, index) { return (react_1.default.createElement(ProgressNode, { key: index, lang: el, total: total, parentWidth: _this.width })); }), gap: 40, direction: "column" })));
        }
    };
    return TopLanguagesCard;
}(Card_1.default));
exports.default = TopLanguagesCard;
var CompactProgressBar = /** @class */ (function (_super) {
    __extends(CompactProgressBar, _super);
    function CompactProgressBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CompactProgressBar.prototype.render = function () {
        var _this = this;
        var offset = 0;
        return this.props.langs.map(function (lang, index) {
            var percent = (0, utils_1.trunc)((lang.xp / _this.props.total) * (_this.props.parentWidth - 50), 2);
            var progress = percent < 10 ? percent + 10 : percent;
            var output = (react_1.default.createElement("rect", { key: index, mask: "url(#rect-mask)", "data-testid": "lang-progress", x: offset, y: "0", width: progress, height: "8", fill: lang.color || '#858585' }));
            offset += percent;
            return output;
        });
    };
    return CompactProgressBar;
}(react_1.default.Component));
var CompactTextNode = /** @class */ (function (_super) {
    __extends(CompactTextNode, _super);
    function CompactTextNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CompactTextNode.prototype.render = function () {
        var index = this.props.index;
        var x = 0;
        var y = 12.5 * index + 25;
        if (index % 2 !== 0) {
            x = 150;
            y = 12.5 + 12.5 * index;
        }
        return (react_1.default.createElement("g", { transform: "translate(".concat(x, ", ").concat(y, ")") },
            react_1.default.createElement("circle", { cx: "5", cy: "6", r: "5", fill: this.props.lang.color }),
            react_1.default.createElement("text", { "data-testid": "lang-name", x: "15", y: "10", className: 'lang-name' },
                this.props.lang.name,
                " ",
                (0, utils_1.getPercent)(this.props.lang.xp, this.props.total),
                "%")));
    };
    CompactTextNode.getCSS = function (textColor) { return "\n\t\t.lang-name {\n\t\t\tfont: 400 11px 'Segoe UI', Ubuntu, Sans-Serif;\n\t\t\tfill: ".concat(textColor, ";\n\t\t}\n\t"); };
    return CompactTextNode;
}(react_1.default.Component));
var ProgressNode = /** @class */ (function (_super) {
    __extends(ProgressNode, _super);
    function ProgressNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.paddingRight = 60;
        return _this;
    }
    ProgressNode.prototype.render = function () {
        var width = this.props.parentWidth - this.paddingRight;
        var progress1 = (0, utils_1.getPercent)(this.props.lang.xp, this.props.total);
        var progress2 = (0, utils_1.getPercent)(this.props.lang.xp - this.props.lang.recentXp, this.props.total);
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("text", { x: "2", y: "15", className: "lang-name" },
                this.props.lang.name,
                " ",
                progress1,
                "% ",
                this.props.lang.recentXp >= 1 ? " + ".concat((0, utils_1.trunc)(progress1 - progress2, 2), "%") : ''),
            react_1.default.createElement("svg", { width: width },
                react_1.default.createElement("rect", { rx: "5", ry: "5", x: "0", y: "25", width: width, height: "8", fill: "#ddd" }),
                progress1 !== progress2 && (react_1.default.createElement("rect", { height: "8", fill: "#f2b866", rx: "5", ry: "5", x: "1", y: "25", width: "".concat(progress1, "%") })),
                progress1 >= progress2 && (react_1.default.createElement("rect", { height: "8", fill: this.props.lang.color, rx: "5", ry: "5", x: "0", y: "25", "data-testid": "lang-progress", width: "".concat(progress2, "%") })))));
    };
    return ProgressNode;
}(react_1.default.Component));
