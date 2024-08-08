import {
  CloseButton_default,
  Fade_default
} from "./chunk-5EDSPOJX.js";
import {
  divWithClassName_default
} from "./chunk-GAK2O2HM.js";
import {
  Anchor_default
} from "./chunk-B54XGL5P.js";
import {
  useEventCallback,
  useUncontrolled
} from "./chunk-BJJISEMP.js";
import {
  require_classnames,
  require_jsx_runtime,
  useBootstrapPrefix
} from "./chunk-2CUF2IDB.js";
import {
  require_react
} from "./chunk-C4GATGNJ.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/react-bootstrap/esm/Alert.js
var import_classnames3 = __toESM(require_classnames());
var React3 = __toESM(require_react());

// node_modules/react-bootstrap/esm/AlertHeading.js
var React = __toESM(require_react());
var import_classnames = __toESM(require_classnames());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var DivStyledAsH4 = divWithClassName_default("h4");
DivStyledAsH4.displayName = "DivStyledAsH4";
var AlertHeading = React.forwardRef(({
  className,
  bsPrefix,
  as: Component = DivStyledAsH4,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "alert-heading");
  return (0, import_jsx_runtime.jsx)(Component, {
    ref,
    className: (0, import_classnames.default)(className, bsPrefix),
    ...props
  });
});
AlertHeading.displayName = "AlertHeading";
var AlertHeading_default = AlertHeading;

// node_modules/react-bootstrap/esm/AlertLink.js
var React2 = __toESM(require_react());
var import_classnames2 = __toESM(require_classnames());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var AlertLink = React2.forwardRef(({
  className,
  bsPrefix,
  as: Component = Anchor_default,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "alert-link");
  return (0, import_jsx_runtime2.jsx)(Component, {
    ref,
    className: (0, import_classnames2.default)(className, bsPrefix),
    ...props
  });
});
AlertLink.displayName = "AlertLink";
var AlertLink_default = AlertLink;

// node_modules/react-bootstrap/esm/Alert.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var Alert = React3.forwardRef((uncontrolledProps, ref) => {
  const {
    bsPrefix,
    show = true,
    closeLabel = "Close alert",
    closeVariant,
    className,
    children,
    variant = "primary",
    onClose,
    dismissible,
    transition = Fade_default,
    ...props
  } = useUncontrolled(uncontrolledProps, {
    show: "onClose"
  });
  const prefix = useBootstrapPrefix(bsPrefix, "alert");
  const handleClose = useEventCallback((e) => {
    if (onClose) {
      onClose(false, e);
    }
  });
  const Transition = transition === true ? Fade_default : transition;
  const alert = (0, import_jsx_runtime4.jsxs)("div", {
    role: "alert",
    ...!Transition ? props : void 0,
    ref,
    className: (0, import_classnames3.default)(className, prefix, variant && `${prefix}-${variant}`, dismissible && `${prefix}-dismissible`),
    children: [dismissible && (0, import_jsx_runtime3.jsx)(CloseButton_default, {
      onClick: handleClose,
      "aria-label": closeLabel,
      variant: closeVariant
    }), children]
  });
  if (!Transition) return show ? alert : null;
  return (0, import_jsx_runtime3.jsx)(Transition, {
    unmountOnExit: true,
    ...props,
    ref: void 0,
    in: show,
    children: alert
  });
});
Alert.displayName = "Alert";
var Alert_default = Object.assign(Alert, {
  Link: AlertLink_default,
  Heading: AlertHeading_default
});

export {
  AlertHeading_default,
  AlertLink_default,
  Alert_default
};
//# sourceMappingURL=chunk-PUC32ZVH.js.map
