((typeof globalThis !== 'undefined' ? globalThis : self)['makoChunk_global'] = (typeof globalThis !== 'undefined' ? globalThis : self)['makoChunk_global'] || []).push([
['src/pages/about/index.tsx'],
{ "src/pages/about/index.tsx": function (module, exports, __mako_require__){
"use strict";
__mako_require__.d(exports, "__esModule", {
    value: true
});
__mako_require__.d(exports, "default", {
    enumerable: true,
    get: function() {
        return Page;
    }
});
var _interop_require_default = __mako_require__("@swc/helpers/_/_interop_require_default");
var _interop_require_wildcard = __mako_require__("@swc/helpers/_/_interop_require_wildcard");
var _reactrefresh = /*#__PURE__*/ _interop_require_wildcard._(__mako_require__("node_modules/react-refresh/runtime.js"));
var _jsxdevruntime = __mako_require__("node_modules/@umijs/preset-umi/node_modules/react/jsx-dev-runtime.js");
var _react = /*#__PURE__*/ _interop_require_default._(__mako_require__("node_modules/@umijs/preset-umi/node_modules/react/index.js"));
var _title = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/title.tsx"));
var _text = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/text.tsx"));
var prevRefreshReg;
var prevRefreshSig;
prevRefreshReg = self.$RefreshReg$;
prevRefreshSig = self.$RefreshSig$;
self.$RefreshReg$ = (type, id)=>{
    _reactrefresh.register(type, module.id + id);
};
self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
function Page() {
    document.title = "关于";
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_title.default, {
                    title: "关于"
                }, void 0, false, {
                    fileName: "src/pages/about/index.tsx",
                    lineNumber: 10,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/pages/about/index.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {}, void 0, false, {
                fileName: "src/pages/about/index.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_text.default, {
                    textKey: "about"
                }, void 0, false, {
                    fileName: "src/pages/about/index.tsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/pages/about/index.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/pages/about/index.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = Page;
var _c;
$RefreshReg$(_c, "Page");
if (prevRefreshReg) self.$RefreshReg$ = prevRefreshReg;
if (prevRefreshSig) self.$RefreshSig$ = prevRefreshSig;
function $RefreshIsReactComponentLike$(moduleExports) {
    if (_reactrefresh.isLikelyComponentType(moduleExports.default || moduleExports)) return true;
    for(var key in moduleExports)try {
        if (_reactrefresh.isLikelyComponentType(moduleExports[key])) return true;
    } catch (e) {}
    return false;
}
if ($RefreshIsReactComponentLike$(module.exports)) {
    module.meta.hot.accept();
    _reactrefresh.performReactRefresh();
}

},
 }]);
//# sourceMappingURL=src_pages_about_index_tsx-async.js.map