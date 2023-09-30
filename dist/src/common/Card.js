"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var FlexLayout_1 = __importDefault(require("../components/FlexLayout"));
var utils_1 = require("./utils");
var Card = /** @class */ (function () {
    function Card(options) {
        this.hideBorder = false;
        this.hideTitle = false;
        this.css = '';
        this.paddingX = 25;
        this.paddingY = 35;
        this.animations = true;
        this.height = 100;
        this.width = 100;
        this.title = '';
        this.colors = {};
        if (options) {
            this.hideBorder = (0, utils_1.parseBoolean)(options.hide_border);
            this.hideTitle = (0, utils_1.parseBoolean)(options.hide_title);
            this.colors = {
                titleColor: (0, utils_1.getColor)('title_color', options === null || options === void 0 ? void 0 : options.title_color, options === null || options === void 0 ? void 0 : options.theme),
                bgColor: (0, utils_1.getColor)('bg_color', options === null || options === void 0 ? void 0 : options.bg_color, options === null || options === void 0 ? void 0 : options.theme)
            };
        }
    }
    Card.prototype.renderTitle = function () {
        var titleText = (react_1.default.createElement("text", { x: "0", y: "0", className: "header" }, this.title));
        var prefixIcon = (react_1.default.createElement("svg", { className: "icon", x: "0", y: "-13", viewBox: "0 0 16 16", version: "1.1", width: "16", height: "16" }, this.titlePrefix));
        return (react_1.default.createElement("g", { transform: "translate(".concat(this.paddingX, ", ").concat(this.paddingY, ")") },
            react_1.default.createElement(FlexLayout_1.default, { items: [this.titlePrefix && prefixIcon, titleText], gap: 25 })));
    };
    Card.prototype.renderGradient = function () {
        if (typeof this.colors.bgColor !== 'object')
            return;
        var gradients = this.colors.bgColor.slice(1);
        return typeof this.colors.bgColor === 'object' ?
            (react_1.default.createElement("defs", null,
                react_1.default.createElement("linearGradient", { id: "gradient", gradientTransform: "rotate(".concat(this.colors.bgColor[0], ")") }, gradients.map(function (grad, index) {
                    var offset = (index * 100) / (gradients.length - 1);
                    return "<stop offset=\"".concat(offset, "%\" stop-color=\"#").concat(grad, "\" />");
                })))) :
            '';
    };
    Card.prototype.render = function (body) {
        return (react_1.default.createElement("svg", { width: this.width, height: this.height - (this.hideTitle ? 30 : 0), viewBox: "0 0 ".concat(this.width, " ").concat(this.height), fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            react_1.default.createElement("style", null, "\n\t\t\t\t\t.header {\n\t\t\t\t\t\tfont: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;\n\t\t\t\t\t\tfill: ".concat(this.colors.titleColor, ";\n\t\t\t\t\t\tanimation: fadeInAnimation 0.8s ease-in-out forwards;\n\t\t\t\t\t}\n\t\t\t\t\t").concat(this.css, "\n\n\t\t\t\t\t/* Animations */\n\t\t\t\t\t@keyframes scaleInAnimation {\n\t\t\t\t\t\tfrom {\n\t\t\t\t\t\t\ttransform: translate(-5px, 5px) scale(0);\n\t\t\t\t\t\t}\n\t\t\t\t\t\tto {\n\t\t\t\t\t\t\ttransform: translate(-5px, 5px) scale(1);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\t@keyframes fadeInAnimation {\n\t\t\t\t\t\tfrom {\n\t\t\t\t\t\t\topacity: 0;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tto {\n\t\t\t\t\t\t\topacity: 1;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t")),
            this.renderGradient(),
            react_1.default.createElement("rect", { x: "0.5", y: "0.5", rx: "4.5", height: "99%", stroke: "#E4E2E2", width: this.width - 1, fill: typeof this.colors.bgColor === 'object' ?
                    'url(#gradient)' :
                    this.colors.bgColor, strokeOpacity: this.hideBorder ? 0 : 1 }),
            this.hideTitle ? '' : this.renderTitle(),
            react_1.default.createElement("g", { transform: "translate(0, ".concat(this.hideTitle ? this.paddingX : this.paddingY + 20, ")") }, body)));
    };
    return Card;
}());
exports.default = Card;
