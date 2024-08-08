import {
  require_react
} from "./chunk-C4GATGNJ.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/@restart/hooks/esm/useUpdatedRef.js
var import_react = __toESM(require_react());
function useUpdatedRef(value) {
  const valueRef = (0, import_react.useRef)(value);
  valueRef.current = value;
  return valueRef;
}

// node_modules/@restart/hooks/esm/useWillUnmount.js
var import_react2 = __toESM(require_react());
function useWillUnmount(fn) {
  const onUnmount = useUpdatedRef(fn);
  (0, import_react2.useEffect)(() => () => onUnmount.current(), []);
}

export {
  useWillUnmount
};
//# sourceMappingURL=chunk-OTTW3MF7.js.map
