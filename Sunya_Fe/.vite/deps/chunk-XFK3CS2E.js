import {
  Anchor_default
} from "./chunk-B54XGL5P.js";
import {
  useNavItem
} from "./chunk-L25ZY55E.js";
import {
  makeEventKey
} from "./chunk-C24KFGQ2.js";
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

// node_modules/react-bootstrap/esm/NavLink.js
var import_classnames = __toESM(require_classnames());
var React = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var NavLink = React.forwardRef(({
  bsPrefix,
  className,
  as: Component = Anchor_default,
  active,
  eventKey,
  disabled = false,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "nav-link");
  const [navItemProps, meta] = useNavItem({
    key: makeEventKey(eventKey, props.href),
    active,
    disabled,
    ...props
  });
  return (0, import_jsx_runtime.jsx)(Component, {
    ...props,
    ...navItemProps,
    ref,
    disabled,
    className: (0, import_classnames.default)(className, bsPrefix, disabled && "disabled", meta.isActive && "active")
  });
});
NavLink.displayName = "NavLink";
var NavLink_default = NavLink;

export {
  NavLink_default
};
//# sourceMappingURL=chunk-XFK3CS2E.js.map
