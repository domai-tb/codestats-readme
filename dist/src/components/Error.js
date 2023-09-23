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
var Error = /** @class */ (function (_super) {
    __extends(Error, _super);
    function Error() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.render = function () { return (react_1.default.createElement("svg", { width: "495", height: "120", viewBox: "0 0 495 120", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            react_1.default.createElement("style", null, "\n\t\t\t\t.text { font: 600 16px 'Segoe UI', Ubuntu, Sans-Serif; fill: #2F80ED }\n\t\t\t\t.small { font: 600 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: #252525 }\n\t\t\t\t.gray { fill: #858585 }\n\t\t\t"),
            react_1.default.createElement("rect", { x: "0.5", y: "0.5", width: "494", height: "99%", rx: "4.5", fill: "#FFFEFE", stroke: "#E4E2E2" }),
            react_1.default.createElement("text", { x: "25", y: "45", className: "text" }, "Something went wrong!"),
            react_1.default.createElement("text", { "data-testid": "message", x: "25", y: "55", className: "text small" },
                react_1.default.createElement("tspan", { x: "25", dy: "18" }, (0, utils_1.encodeHTML)(_this.props.message)),
                react_1.default.createElement("tspan", { x: "25", dy: "18", className: "gray" }, _this.props.secondaryMessage)))); };
        return _this;
    }
    return Error;
}(react_1.default.Component));
exports.default = Error;
