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
var FlexLayout = /** @class */ (function (_super) {
    __extends(FlexLayout, _super);
    function FlexLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FlexLayout.prototype.render = function () {
        var _this = this;
        return this.props.items.filter(Boolean).map(function (item, index) { return (react_1.default.createElement("g", { key: index, transform: _this.getGap(index) }, item)); });
    };
    FlexLayout.prototype.getGap = function (index) {
        var gap = this.props.gap * index;
        var transform = "translate(".concat(gap, ", 0)");
        if (this.props.direction === 'column') {
            transform = "translate(0, ".concat(gap, ")");
        }
        return transform;
    };
    return FlexLayout;
}(react_1.default.Component));
exports.default = FlexLayout;
