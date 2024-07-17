((typeof globalThis !== 'undefined' ? globalThis : self)['makoChunk_global'] = (typeof globalThis !== 'undefined' ? globalThis : self)['makoChunk_global'] || []).push([
['src/pages/group/index.tsx'],
{ "src/pages/group/index.tsx": function (module, exports, __mako_require__){
"use strict";
__mako_require__.d(exports, "__esModule", {
    value: true
});
__mako_require__.d(exports, ///
"default", {
    enumerable: true,
    get: function() {
        return Page;
    }
});
var _interop_require_default = __mako_require__("@swc/helpers/_/_interop_require_default");
var _interop_require_wildcard = __mako_require__("@swc/helpers/_/_interop_require_wildcard");
var _reactrefresh = /*#__PURE__*/ _interop_require_wildcard._(__mako_require__("node_modules/react-refresh/runtime.js"));
var _jsxdevruntime = __mako_require__("node_modules/@umijs/preset-umi/node_modules/react/jsx-dev-runtime.js");
var _axioshooks = /*#__PURE__*/ _interop_require_default._(__mako_require__("node_modules/axios-hooks/es/index.js"));
var _api = __mako_require__("src/tools/api.ts");
var _loading = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/loading.tsx"));
var _umi = __mako_require__("src/.umi/exports.ts");
var _exports = __mako_require__("src/.umi/exports.ts");
var prevRefreshReg;
var prevRefreshSig;
prevRefreshReg = self.$RefreshReg$;
prevRefreshSig = self.$RefreshSig$;
self.$RefreshReg$ = (type, id)=>{
    _reactrefresh.register(type, module.id + id);
};
self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
var _s = $RefreshSig$();
function Page() {
    _s();
    const match = (0, _exports.useMatch)('/g/:id');
    const [{ loading, data }] = (0, _axioshooks.default)({
        url: _api.groupListApi
    });
    console.log(match);
    if (loading) return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_loading.default, {}, void 0, false, {
        fileName: "src/pages/group/index.tsx",
        lineNumber: 16,
        columnNumber: 16
    }, this);
    if (!data) return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_jsxdevruntime.Fragment, {
        children: "error data!"
    }, void 0, false);
    const { data: list } = data;
    const selectId = match === null || match === void 0 ? void 0 : match.params.id;
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        className: 'flex flex-row gap-10 relative',
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("ul", {
                className: 'menu flex-none bg-base-200 w-56 rounded-box',
                children: list.map((value)=>{
                    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("li", {
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_umi.Link, {
                            className: `${selectId === `${value.id}` ? 'active' : ''}`,
                            to: `/g/${value.id}`,
                            children: value.name
                        }, void 0, false, {
                            fileName: "src/pages/group/index.tsx",
                            lineNumber: 30,
                            columnNumber: 51
                        }, this)
                    }, value.id, false, {
                        fileName: "src/pages/group/index.tsx",
                        lineNumber: 30,
                        columnNumber: 32
                    }, this);
                })
            }, void 0, false, {
                fileName: "src/pages/group/index.tsx",
                lineNumber: 27,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                className: 'grow',
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_umi.Outlet, {}, void 0, false, {
                    fileName: "src/pages/group/index.tsx",
                    lineNumber: 35,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "src/pages/group/index.tsx",
                lineNumber: 34,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/pages/group/index.tsx",
        lineNumber: 26,
        columnNumber: 9
    }, this);
}
_s(Page, "/kSTr0Iqob00wwwh2Ltu0ZjkcOs=", false, function() {
    return [
        _exports.useMatch,
        _axioshooks.default
    ];
});
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
//# sourceMappingURL=src_pages_group_index_tsx-async.js.map