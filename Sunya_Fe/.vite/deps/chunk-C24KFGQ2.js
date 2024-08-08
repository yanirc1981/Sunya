import {
  require_react
} from "./chunk-C4GATGNJ.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/@restart/ui/esm/SelectableContext.js
var React = __toESM(require_react());
var SelectableContext = React.createContext(null);
var makeEventKey = (eventKey, href = null) => {
  if (eventKey != null) return String(eventKey);
  return href || null;
};
var SelectableContext_default = SelectableContext;

// node_modules/dom-helpers/esm/querySelectorAll.js
var toArray = Function.prototype.bind.call(Function.prototype.call, [].slice);
function qsa(element, selector) {
  return toArray(element.querySelectorAll(selector));
}

// node_modules/@restart/ui/esm/DataKey.js
var ATTRIBUTE_PREFIX = `data-rr-ui-`;
var PROPERTY_PREFIX = `rrUi`;
function dataAttr(property) {
  return `${ATTRIBUTE_PREFIX}${property}`;
}
function dataProp(property) {
  return `${PROPERTY_PREFIX}${property}`;
}

export {
  qsa,
  makeEventKey,
  SelectableContext_default,
  dataAttr,
  dataProp
};
//# sourceMappingURL=chunk-C24KFGQ2.js.map
