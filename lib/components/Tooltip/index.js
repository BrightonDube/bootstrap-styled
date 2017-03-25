'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _TetherContent = require('../TetherContent');

var _TetherContent2 = _interopRequireDefault(_TetherContent);

var _tools = require('../../styled/utilities/tools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A Tooltip component
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var DEFAULT_DELAYS = {
  show: 0,
  hide: 250
};

var defaultProps = {
  isOpen: false,
  placement: 'bottom',
  delay: DEFAULT_DELAYS,
  autohide: true,
  toggle: function toggle() {}
};

var defaultTetherConfig = {
  classPrefix: 'bs-tether',
  classes: {
    element: false,
    enabled: 'show'
  },
  constraints: [{ to: 'scrollParent', attachment: 'together none' }, { to: 'window', attachment: 'together none' }]
};
// propTypes need to be excluded of the tooltip class
// issue on : https://github.com/yannickcr/eslint-plugin-react/issues/203
var propTypes = {
  placement: _react2.default.PropTypes.oneOf(_tools.tetherAttachements),
  target: _react.PropTypes.string.isRequired,
  isOpen: _react.PropTypes.bool,
  disabled: _react.PropTypes.bool,
  tether: _react.PropTypes.object,
  tetherRef: _react.PropTypes.func,
  className: _react.PropTypes.string,
  cssModule: _react.PropTypes.object,
  toggle: _react.PropTypes.func,
  autohide: _react.PropTypes.bool,
  delay: _react.PropTypes.oneOfType([_react.PropTypes.shape({ show: _react.PropTypes.number, hide: _react.PropTypes.number }), _react.PropTypes.number])
};

var Tooltip = function (_React$Component) {
  _inherits(Tooltip, _React$Component);

  function Tooltip() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Tooltip);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      focus: false
    }, _this.componentDidMount = function () {
      _this.target = document.getElementById(_this.props.target);
      _this.addTargetEvents();
    }, _this.componentWillUnmount = function () {
      _this.removeTargetEvents();
    }, _this.onMouseOverTooltip = function () {
      if (_this.hideTimeout) {
        _this.clearHideTimeout();
      }
      _this.showTimeout = setTimeout(_this.show, _this.getDelay('show'));
    }, _this.onMouseLeaveTooltip = function () {
      if (_this.showTimeout) {
        _this.clearShowTimeout();
      }
      _this.hideTimeout = setTimeout(_this.hide, _this.getDelay('hide'));
    }, _this.onMouseOverTooltipContent = function () {
      if (_this.props.autohide) {
        return;
      }
      if (_this.hideTimeout) {
        _this.clearHideTimeout();
      }
    }, _this.onMouseLeaveTooltipContent = function () {
      if (_this.props.autohide) {
        return;
      }
      if (_this.showTimeout) {
        _this.clearShowTimeout();
      }
      _this.hideTimeout = setTimeout(_this.hide, _this.getDelay('hide'));
    }, _this.getDelay = function (key) {
      var delay = _this.props.delay;

      if ((typeof delay === 'undefined' ? 'undefined' : _typeof(delay)) === 'object') {
        return isNaN(delay[key]) ? DEFAULT_DELAYS[key] : delay[key];
      }
      return delay;
    }, _this.getTetherConfig = function () {
      var attachments = (0, _tools.getTetherAttachments)(_this.props.placement);
      return _extends({}, defaultTetherConfig, attachments, {
        target: '#' + _this.props.target }, _this.props.tether);
    }, _this.show = function () {
      if (!_this.props.isOpen) {
        _this.clearShowTimeout();
        _this.toggle();
      }
    }, _this.hide = function () {
      if (_this.props.isOpen) {
        _this.clearHideTimeout();
        _this.toggle();
      }
    }, _this.clearShowTimeout = function () {
      clearTimeout(_this.showTimeout);
      _this.showTimeout = undefined;
    }, _this.clearHideTimeout = function () {
      clearTimeout(_this.hideTimeout);
      _this.hideTimeout = undefined;
    }, _this.handleDocumentClick = function (e) {
      if (e.target === _this.target || _this.target.contains(e.target)) {
        if (_this.hideTimeout) {
          _this.clearHideTimeout();
        }

        if (!_this.props.isOpen) {
          _this.toggle();
        }
      }
    }, _this.addTargetEvents = function () {
      _this.target.addEventListener('mouseover', _this.onMouseOverTooltip, true);
      _this.target.addEventListener('mouseout', _this.onMouseLeaveTooltip, true);
      document.addEventListener('click', _this.handleDocumentClick, true);
    }, _this.removeTargetEvents = function () {
      _this.target.removeEventListener('mouseover', _this.onMouseOverTooltip, true);
      _this.target.removeEventListener('mouseout', _this.onMouseLeaveTooltip, true);
      document.removeEventListener('click', _this.handleDocumentClick, true);
    }, _this.toggle = function (e) {
      if (_this.props.disabled) {
        return e && e.preventDefault();
      }

      return _this.props.toggle();
    }, _this.handleFocus = function () {
      _this.setState({
        focus: true
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Tooltip, [{
    key: 'render',
    value: function render() {
      if (!this.props.isOpen) {
        return null;
      }

      var attributes = (0, _tools.omit)(this.props, Object.keys(propTypes));

      var classes = (0, _tools.mapToCssModules)((0, _classnames2.default)('tooltip', this.props.className), this.props.cssModule);

      var tetherConfig = this.getTetherConfig();

      var optional = {};
      if (this.state.focus === true) {
        optional.onFocus = this.handleFocus;
      }

      return _jsx(_TetherContent2.default, {
        className: classes,
        tether: tetherConfig,
        tetherRef: this.props.tetherRef,
        isOpen: this.props.isOpen,
        toggle: this.toggle
      }, void 0, _react2.default.createElement('div', _extends({}, attributes, {
        className: 'tooltip-inner',
        onMouseOver: this.onMouseOverTooltipContent,
        onMouseLeave: this.onMouseLeaveTooltipContent,
        onFocus: this.handleFocus
      }, optional)));
    }
  }]);

  return Tooltip;
}(_react2.default.Component);

// eslint-disable-next-line no-class-assign


Tooltip = (0, _styledComponents2.default)(Tooltip).withConfig({
  displayName: 'Tooltip__Tooltip',
  componentId: 'Tooltip__Tooltip-kmr1dc'
})(['', ''], function (props) {
  return '\n    &.tooltip {\n      position: absolute;\n      z-index: 1070;\n      display: block;\n      font-family: -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif;\n      font-style: normal;\n      font-weight: 400;\n      letter-spacing: normal;\n      line-break: auto;\n      line-height: 1.5;\n      text-align: left;\n      text-align: start;\n      text-decoration: none;\n      text-shadow: none;\n      text-transform: none;\n      white-space: normal;\n      word-break: normal;\n      word-spacing: normal;\n      font-size: .875rem;\n      word-wrap: break-word;\n      opacity: 0\n    }\n    \n    &.tooltip.show {\n      opacity: ' + props.theme['$tooltip-opacity'] + '\n    }\n    \n    &.tooltip.bs-tether-element-attached-bottom,\n    &.tooltip.tooltip-top {\n      padding: 5px 0;\n      margin-top: -3px\n    }\n    \n    &.tooltip.bs-tether-element-attached-bottom .tooltip-inner:before,\n    &.tooltip.tooltip-top .tooltip-inner:before {\n      bottom: 0;\n      left: 50%;\n      margin-left: -5px;\n      content: "";\n      border-width: 5px 5px 0;\n      border-top-color: #000\n    }\n    \n    &.tooltip.bs-tether-element-attached-left,\n    &.tooltip.tooltip-right {\n      padding: 0 5px;\n      margin-left: 3px\n    }\n    \n    &.tooltip.bs-tether-element-attached-left .tooltip-inner:before,\n    &.tooltip.tooltip-right .tooltip-inner:before {\n      top: 50%;\n      left: 0;\n      margin-top: -5px;\n      content: "";\n      border-width: 5px 5px 5px 0;\n      border-right-color: #000\n    }\n    \n    &.tooltip.bs-tether-element-attached-top,\n    &.tooltip.tooltip-bottom {\n      padding: 5px 0;\n      margin-top: 3px\n    }\n    \n    &.tooltip.bs-tether-element-attached-top .tooltip-inner:before,\n    &.tooltip.tooltip-bottom .tooltip-inner:before {\n      top: 0;\n      left: 50%;\n      margin-left: -5px;\n      content: "";\n      border-width: 0 5px 5px;\n      border-bottom-color: #000\n    }\n    \n    &.tooltip.bs-tether-element-attached-right,\n    &.tooltip.tooltip-left {\n      padding: 0 5px;\n      margin-left: -3px\n    }\n    \n    &.tooltip.bs-tether-element-attached-right .tooltip-inner:before,\n    &.tooltip.tooltip-left .tooltip-inner:before {\n      top: 50%;\n      right: 0;\n      margin-top: -5px;\n      content: "";\n      border-width: 5px 0 5px 5px;\n      border-left-color: #000\n    }\n    \n    & .tooltip-inner {\n      max-width: ' + props.theme['$tooltip-max-width'] + ';\n      padding: ' + props.theme['$tooltip-padding-y'] + ' ' + props.theme['$tooltip-padding-x'] + ';\n      color: ' + props.theme['$tooltip-color'] + ';\n      text-align: center;\n      background-color: ' + props.theme['$tooltip-bg'] + ';\n      border-radius: .25rem\n    }\n    \n    & .tooltip-inner:before {\n      position: absolute;\n      width: 0;\n      height: 0;\n      border-color: transparent;\n      border-style: solid\n    }\n  ';
});

Tooltip.defaultProps = defaultProps;

exports.default = Tooltip;

//
//
//
// render() {
//   if (!this.props.isOpen) {
//     return null;
//   }
//
//
//   const {
//     className,
//     cssModule,
//     tag: Tag,
//     theme,  // eslint-disable-line
//     ...attributes
//   } = omit(this.props, Object.keys(this.props));
//
//   const classes = mapToCssModules(cn(
//     'tooltip-inner',
//     className
//   ), cssModule);
//
//   const tetherConfig = this.getTetherConfig();
//
//   const optional = {};
//   if (this.state.focus === true) {
//     optional.onFocus = this.handleFocus;
//   }
//
//
//   return (
//     <TetherContent
//       className="tooltip"
//       tether={tetherConfig}
//       tetherRef={this.props.tetherRef}
//       isOpen={this.props.isOpen}
//       toggle={this.toggle}
//     >
//       <Tag
//         {...attributes}
//         className={classes}
//         onMouseOver={this.onMouseOverTooltipContent}
//         onMouseLeave={this.onMouseLeaveTooltipContent}
//         onFocus={this.handleFocus}
//         {...optional}
//       />
//     </TetherContent>
//   );
// }
// }