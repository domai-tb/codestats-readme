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
var icons_1 = __importDefault(require("../common/icons"));
var Card_1 = __importDefault(require("../common/Card"));
var FlexLayout_1 = __importDefault(require("../components/FlexLayout"));
var ProfileCard = /** @class */ (function (_super) {
    __extends(ProfileCard, _super);
    function ProfileCard(username, xp, recentXp, options) {
        var _a;
        var _this = _super.call(this, options) || this;
        _this.username = username;
        _this.xp = xp;
        _this.recentXp = recentXp;
        _this.options = options;
        _this.defaults = {
            line_height: 25,
            hide: []
        };
        // This Element
        _this.stats = {
            xp: {
                icon: icons_1.default.star,
                label: 'XP',
                value: xp
            },
            recent_xp: {
                icon: icons_1.default.commits,
                label: 'Recent xp',
                value: _this.recentXp
            }
        };
        // Card Settings
        _this.width = 495;
        _this.height = Math.max(45 + (Object.keys(_this.stats).length + 1) * (_this.options.line_height || _this.defaults.line_height), options.hide_rank ? 0 : 120);
        _this.title = (_a = _this.options.title) !== null && _a !== void 0 ? _a : "".concat((0, utils_1.encodeHTML)(_this.username)).concat(['x', 's'].includes(_this.username.slice(-1)) ? '\'' : '\'s', " Code::Stats Profile");
        var textColor = (0, utils_1.getColor)('text_color', options.text_color, options.theme);
        var iconColor = (0, utils_1.getColor)('icon_color', options.icon_color, options.theme);
        if (!_this.options.hide_rank) {
            _this.css += RankCircle.getCSS(textColor, iconColor, (0, utils_1.getProgress)(xp));
        }
        if ((_this.options.hide || []) < Object.keys(_this.stats)) {
            _this.css += TextNode.getCSS(textColor, _this.options.show_icons ? iconColor : undefined);
        }
        return _this;
    }
    ProfileCard.prototype.render = function () {
        var _this = this;
        return _super.prototype.render.call(this, react_1.default.createElement(react_1.default.Fragment, null,
            !this.options.hide_rank && (react_1.default.createElement(RankCircle, { xp: this.xp })),
            react_1.default.createElement("svg", { x: "0", y: "0" },
                react_1.default.createElement(FlexLayout_1.default, { items: Object
                        .keys(this.stats)
                        .filter(function (item) { return !(_this.options.hide || []).includes(item); })
                        .map(function (el, index) {
                        var item = _this.stats[el];
                        return (react_1.default.createElement(TextNode, __assign({}, item, { icon: _this.options.show_icons ? item.icon : undefined, key: index, index: index })));
                    }), gap: this.options.line_height || this.defaults.line_height, direction: "column" }))));
    };
    return ProfileCard;
}(Card_1.default));
exports.default = ProfileCard;
var RankCircle = /** @class */ (function (_super) {
    __extends(RankCircle, _super);
    function RankCircle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.render = function () { return (react_1.default.createElement("g", { "data-testid": "rank-circle", transform: "translate(400, 0)" },
            react_1.default.createElement("circle", { className: "rank-circle-rim", cx: "-10", cy: "8", r: "40" }),
            react_1.default.createElement("circle", { className: "rank-circle", cx: "-10", cy: "8", r: "40" }),
            react_1.default.createElement("g", { className: "rank-text" },
                react_1.default.createElement("text", { x: "-4", y: "0", alignmentBaseline: "central", dominantBaseline: "central", textAnchor: "middle" },
                    "lv ",
                    (0, utils_1.getLevel)(_this.props.xp))))); };
        return _this;
    }
    RankCircle.getCSS = function (textColor, titleColor, progress) { return "\n\t\t.rank-text {\n\t\t\tfont: 800 24px 'Segoe UI', Ubuntu, Sans-Serif; fill: ".concat(textColor, ";\n\t\t\tanimation: scaleInAnimation 0.3s ease-in-out forwards;\n\t\t}\n\n\t\t.rank-circle-rim {\n\t\t\tstroke: ").concat(titleColor, ";\n\t\t\tfill: none;\n\t\t\tstroke-width: 6;\n\t\t\topacity: 0.2;\n\t\t}\n\t\t.rank-circle {\n\t\t\tstroke: ").concat(titleColor, ";\n\t\t\tstroke-dasharray: 250;\n\t\t\tfill: none;\n\t\t\tstroke-width: 6;\n\t\t\tstroke-linecap: round;\n\t\t\topacity: 0.8;\n\t\t\ttransform-origin: -10px 8px;\n\t\t\ttransform: rotate(-90deg);\n\t\t\tanimation: rankAnimation 1s forwards ease-in-out;\n\t\t}\n\n\t\t@keyframes rankAnimation {\n\t\t\tfrom {\n\t\t\t\tstroke-dashoffset: ").concat((0, utils_1.calculateCircleProgress)(0), ";\n\t\t\t}\n\t\t\tto {\n\t\t\t\tstroke-dashoffset: ").concat((0, utils_1.calculateCircleProgress)(progress), ";\n\t\t\t}\n\t\t}\n\t"); };
    return RankCircle;
}(react_1.default.Component));
var TextNode = /** @class */ (function (_super) {
    __extends(TextNode, _super);
    function TextNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextNode.prototype.render = function () {
        var delay = (this.props.index + 3 * 150);
        // Icon prefixing line
        var icon = this.props.icon ? (react_1.default.createElement("svg", { "data-testid": "icon", className: "icon", viewBox: "0 0 16 16", version: "1.1", width: "16", height: "16" }, this.props.icon)) : undefined;
        return (react_1.default.createElement("g", { className: "stagger", style: { animationDelay: "".concat(delay, "ms") }, transform: "translate(25, 0)" },
            icon,
            react_1.default.createElement("text", { className: "stat bold", x: this.props.icon ? 25 : undefined, y: "12.5" },
                this.props.label,
                ":"),
            react_1.default.createElement("text", { className: "stat", x: this.props.icon ? 120 : 100, y: "12.5" }, (0, utils_1.kFormatter)(this.props.value))));
    };
    TextNode.getCSS = function (textColor, iconColor) { return "\n\t\t".concat(iconColor ? ".icon {\n\t\t\t\tfill: ".concat(iconColor, ";\n\t\t\t\t// display: block;\n\t\t\t}") : '', "\n\t\t.stagger {\n\t\t\topacity: 0;\n\t\t\tanimation: fadeInAnimation 0.3s ease-in-out forwards;\n\t\t}\n\t\t.stat {\n\t\t\tfont: 600 14px 'Segoe UI', Ubuntu, \"Helvetica Neue\", Sans-Serif; fill: ").concat(textColor, ";\n\t\t}\n\t\t.bold {\n\t\t\tfont-weight: 700\n\t\t}\n\t"); };
    return TextNode;
}(react_1.default.Component));
