'use strict';function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: 'VueNumberInputFormatted',
  props: {
    value: {
      type: [Number, String],
      default: null
    },
    positions: {
      type: Number,
      default: 2
    },
    prefix: {
      type: String,
      default: '$'
    },
    suffix: {
      type: String,
      default: ''
    },
    separator: {
      type: String,
      default: ','
    },
    id: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    form: {
      type: String,
      default: null
    },
    maxlength: {
      type: [String, Number],
      default: null
    },
    minlength: {
      type: [String, Number],
      default: null
    },
    name: {
      type: String,
      default: null
    },
    pattern: {
      type: RegExp,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    padStart: {
      type: Number,
      default: 0
    },
    padStartString: {
      type: String,
      default: ''
    },
    allowEmpty: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      isInputActive: false
    };
  },
  computed: {
    displayValue: {
      get: function get() {
        var _this$prefix, _this$suffix;

        if (this.isInputActive) {
          return (this.value || '').toString();
        }

        if (this.allowEmpty && (this.value === null || this.value === undefined || this.value === '')) return '';
        var prefix = (_this$prefix = this.prefix) !== null && _this$prefix !== void 0 && _this$prefix.length ? "".concat(this.prefix, " ") : '';
        var suffix = (_this$suffix = this.suffix) !== null && _this$suffix !== void 0 && _this$suffix.length ? " ".concat(this.suffix) : '';
        console.log(this.value || 0);
        var value = (this.value || 0).toFixed(this.positions).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1".concat(this.separator));

        if (this.padStart > 0) {
          var indexDecimalSeparator = value.indexOf(this.decimalSeparator);

          if (indexDecimalSeparator !== -1) {
            var beginString = value.slice(0, indexDecimalSeparator);
            var endString = value.slice(indexDecimalSeparator, value.length);
            value = beginString.padStart(this.padStart, this.padStartString) + endString;
          } else {
            value = value.padStart(this.padStart, this.padStartString);
          }
        }

        return "".concat(prefix).concat(value).concat(suffix);
      },
      set: function set(modifiedValue) {
        var newValue = parseFloat(modifiedValue);

        if (this.allowEmpty && (modifiedValue === null || modifiedValue === undefined || modifiedValue === '')) {
          newValue = '';
        } else if (Number.isNaN(newValue)) {
          newValue = 0;
        }

        this.$emit('input', newValue);
      }
    },
    decimalSeparator: function decimalSeparator() {
      var n = 1.1;
      n = n.toLocaleString().substring(1, 2);
      return n;
    },
    validProps: function validProps() {
      return {
        id: this.id,
        disabled: this.disabled,
        readonly: this.readonly,
        form: this.form,
        maxlength: this.maxlength,
        minlength: this.minlength,
        name: this.name,
        pattern: this.pattern,
        placeholder: this.placeholder
      };
    }
  },
  methods: {
    onBlurHandler: function onBlurHandler(event) {
      this.isInputActive = false;
      this.$emit('blur', event);
    },
    onChangeHandler: function onChangeHandler(event) {
      this.$emit('change', event);
    },
    onFocusHandler: function onFocusHandler(event) {
      this.isInputActive = true;
      this.$emit('focus', event);
    },
    onKeyDownHandler: function onKeyDownHandler(event) {
      this.$emit('keydown', event);
    },
    onKeyPressHandler: function onKeyPressHandler(event) {
      var value = event.target.value;
      var char = String.fromCharCode(event.which);
      var text = value.toString() + char.toString();

      if (isNaN(text) && text !== '-') {
        event.preventDefault();
      }

      this.$emit('keypress', event);
    },
    onKeyUpHandler: function onKeyUpHandler(event) {
      this.$emit('keyup', event);
    },
    onClickHandler: function onClickHandler(event) {
      this.$emit('click', event);
    },
    focus: function focus() {
      this.$refs.input.focus();
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('input', _vm._b({
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.displayValue,
      expression: "displayValue"
    }],
    ref: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.displayValue
    },
    on: {
      "blur": _vm.onBlurHandler,
      "change": _vm.onChangeHandler,
      "focus": _vm.onFocusHandler,
      "keydown": _vm.onKeyDownHandler,
      "keypress": _vm.onKeyPressHandler,
      "keyup": _vm.onKeyUpHandler,
      "click": _vm.onClickHandler,
      "input": function input($event) {
        if ($event.target.composing) {
          return;
        }

        _vm.displayValue = $event.target.value;
      }
    }
  }, 'input', _vm.validProps, false), []);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = "data-v-eb33c45e";
/* module identifier */

var __vue_module_identifier__ = "data-v-eb33c45e";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

var component$1 = __vue_component__;// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var component = /*#__PURE__*/(function () {
  // Get component instance
  var installable = component$1; // Attach install function executed by Vue.use()

  installable.install = function (Vue) {
    Vue.component('VueNumberInputFormatted', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default':component});// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)

Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      exportName = _ref2[0],
      exported = _ref2[1];

  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;