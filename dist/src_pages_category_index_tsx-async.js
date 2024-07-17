((typeof globalThis !== 'undefined' ? globalThis : self)['makoChunk_global'] = (typeof globalThis !== 'undefined' ? globalThis : self)['makoChunk_global'] || []).push([
['src/pages/category/index.tsx'],
{ "src/pages/category/index.tsx": function (module, exports, __mako_require__){
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
var _category = __mako_require__("src/providers/category.ts");
var _title = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/title.tsx"));
var _filter_blogs = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/filter_blogs.tsx"));
var _filter_blog = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/providers/filter_blog.ts"));
var _shallow = __mako_require__("node_modules/zustand/esm/react/shallow.mjs");
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
    const categorys = (0, _category.categoryStore)((state)=>{
        var _state_data;
        return (_state_data = state.data) === null || _state_data === void 0 ? void 0 : _state_data.categoryList;
    }) ?? [];
    document.title = "分类";
    const [filter, label] = (0, _filter_blog.default)((0, _shallow.useShallow)((state)=>[
            state.doFilter,
            state.selectLabel
        ]));
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_title.default, {
                    title: "分类"
                }, void 0, false, {
                    fileName: "src/pages/category/index.tsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/pages/category/index.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {}, void 0, false, {
                fileName: "src/pages/category/index.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        className: "flex flex-wrap gap-5",
                        children: categorys.map((value)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                className: "cursor-pointer" + `${label === value.name ? "text-secondary link" : ""}`,
                                onClick: ()=>{
                                    filter.call(undefined, (b)=>b.filter((blog)=>blog.category.name === value.name));
                                    _filter_blog.default.setState({
                                        selectLabel: value.name
                                    });
                                },
                                children: value.name
                            }, value.id, false, {
                                fileName: "src/pages/category/index.tsx",
                                lineNumber: 22,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "src/pages/category/index.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_filter_blogs.default, {}, void 0, false, {
                        fileName: "src/pages/category/index.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/pages/category/index.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/pages/category/index.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_s(Page, "cfplsmNliQkD/fzzQKqhzRiWrSg=", false, function() {
    return [
        _shallow.useShallow
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
//# sourceMappingURL=src_pages_category_index_tsx-async.js.map