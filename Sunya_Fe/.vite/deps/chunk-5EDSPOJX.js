import {
  ENTERED,
  ENTERING,
  TransitionWrapper_default,
  transitionEndListener,
  triggerBrowserReflow
} from "./chunk-GD727WW5.js";
import {
  require_classnames,
  require_jsx_runtime
} from "./chunk-2CUF2IDB.js";
import {
  require_prop_types
} from "./chunk-VQIQFCQ2.js";
import {
  require_react
} from "./chunk-C4GATGNJ.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/react-bootstrap/esm/Fade.js
var import_classnames = __toESM(require_classnames());
var React = __toESM(require_react());
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var fadeStyles = {
  [ENTERING]: "show",
  [ENTERED]: "show"
};
var Fade = React.forwardRef(({
  className,
  children,
  transitionClasses = {},
  onEnter,
  ...rest
}, ref) => {
  const props = {
    in: false,
    timeout: 300,
    mountOnEnter: false,
    unmountOnExit: false,
    appear: false,
    ...rest
  };
  const handleEnter = (0, import_react.useCallback)((node, isAppearing) => {
    triggerBrowserReflow(node);
    onEnter == null || onEnter(node, isAppearing);
  }, [onEnter]);
  return (0, import_jsx_runtime.jsx)(TransitionWrapper_default, {
    ref,
    addEndListener: transitionEndListener,
    ...props,
    onEnter: handleEnter,
    childRef: children.ref,
    children: (status, innerProps) => React.cloneElement(children, {
      ...innerProps,
      className: (0, import_classnames.default)("fade", className, children.props.className, fadeStyles[status], transitionClasses[status])
    })
  });
});
Fade.displayName = "Fade";
var Fade_default = Fade;

// node_modules/react-bootstrap/esm/CloseButton.js
var import_prop_types = __toESM(require_prop_types());
var React2 = __toESM(require_react());
var import_classnames2 = __toESM(require_classnames());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var propTypes = {
  /** An accessible label indicating the relevant information about the Close Button. */
  "aria-label": import_prop_types.default.string,
  /** A callback fired after the Close Button is clicked. */
  onClick: import_prop_types.default.func,
  /**
   * Render different color variant for the button.
   *
   * Omitting this will render the default dark color.
   */
  variant: import_prop_types.default.oneOf(["white"])
};
var CloseButton = React2.forwardRef(({
  className,
  variant,
  "aria-label": ariaLabel = "Close",
  ...props
}, ref) => (0, import_jsx_runtime2.jsx)("button", {
  ref,
  type: "button",
  className: (0, import_classnames2.default)("btn-close", variant && `btn-close-${variant}`, className),
  "aria-label": ariaLabel,
  ...props
}));
CloseButton.displayName = "CloseButton";
CloseButton.propTypes = propTypes;
var CloseButton_default = CloseButton;

export {
  Fade_default,
  CloseButton_default
};
//# sourceMappingURL=chunk-5EDSPOJX.js.map
