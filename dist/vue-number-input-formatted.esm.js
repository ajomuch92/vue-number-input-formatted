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
  data: () => ({
    isInputActive: false
  }),
  computed: {
    displayValue: {
      get() {
        var _this$prefix, _this$suffix;

        if (this.isInputActive) {
          return (this.value || '').toString();
        }

        if (this.allowEmpty && (this.value === null || this.value === undefined || this.value === '')) return '';
        const prefix = (_this$prefix = this.prefix) !== null && _this$prefix !== void 0 && _this$prefix.length ? `${this.prefix} ` : '';
        const suffix = (_this$suffix = this.suffix) !== null && _this$suffix !== void 0 && _this$suffix.length ? ` ${this.suffix}` : '';
        console.log(this.value || 0);
        let value = (this.value || 0).toFixed(this.positions).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, `$1${this.separator}`);

        if (this.padStart > 0) {
          const indexDecimalSeparator = value.indexOf(this.decimalSeparator);

          if (indexDecimalSeparator !== -1) {
            const beginString = value.slice(0, indexDecimalSeparator);
            const endString = value.slice(indexDecimalSeparator, value.length);
            value = beginString.padStart(this.padStart, this.padStartString) + endString;
          } else {
            value = value.padStart(this.padStart, this.padStartString);
          }
        }

        return `${prefix}${value}${suffix}`;
      },

      set(modifiedValue) {
        let newValue = parseFloat(modifiedValue);

        if (this.allowEmpty && (modifiedValue === null || modifiedValue === undefined || modifiedValue === '')) {
          newValue = '';
        } else if (Number.isNaN(newValue)) {
          newValue = 0;
        }

        this.$emit('input', newValue);
      }

    },

    decimalSeparator() {
      let n = 1.1;
      n = n.toLocaleString().substring(1, 2);
      return n;
    },

    validProps() {
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
    onBlurHandler(event) {
      this.isInputActive = false;
      this.$emit('blur', event);
    },

    onChangeHandler(event) {
      this.$emit('change', event);
    },

    onFocusHandler(event) {
      this.isInputActive = true;
      this.$emit('focus', event);
    },

    onKeyDownHandler(event) {
      this.$emit('keydown', event);
    },

    onKeyPressHandler(event) {
      const {
        value
      } = event.target;
      const char = String.fromCharCode(event.which);
      const text = value.toString() + char.toString();

      if (isNaN(text) && text !== '-') {
        event.preventDefault();
      }

      this.$emit('keypress', event);
    },

    onKeyUpHandler(event) {
      this.$emit('keyup', event);
    },

    onClickHandler(event) {
      this.$emit('click', event);
    },

    focus() {
      this.$refs.input.focus();
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
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
      "input": function ($event) {
        if ($event.target.composing) {
          return;
        }

        _vm.displayValue = $event.target.value;
      }
    }
  }, 'input', _vm.validProps, false));
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = undefined;
/* scoped */

const __vue_scope_id__ = "data-v-eb33c45e";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

var component = __vue_component__;

// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var entry_esm = /*#__PURE__*/(() => {
  // Get component instance
  const installable = component; // Attach install function executed by Vue.use()

  installable.install = Vue => {
    Vue.component('VueNumberInputFormatted', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export { entry_esm as default };
