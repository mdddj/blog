((typeof globalThis !== 'undefined' ? globalThis : self)['makoChunk_global'] = (typeof globalThis !== 'undefined' ? globalThis : self)['makoChunk_global'] || []).push([
['src/pages/all/index.tsx'],
{ "src/pages/all/index.tsx": function (module, exports, __mako_require__){
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
var _category = __mako_require__("src/providers/category.ts");
var _umi = __mako_require__("src/.umi/exports.ts");
var _title = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/title.tsx"));
var _dayjs = /*#__PURE__*/ _interop_require_default._(__mako_require__("node_modules/dayjs/dayjs.min.js"));
var prevRefreshReg;
var prevRefreshSig;
prevRefreshReg = self.$RefreshReg$;
prevRefreshSig = self.$RefreshSig$;
self.$RefreshReg$ = (type, id)=>{
    _reactrefresh.register(type, module.id + id);
};
self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
function Page() {
    const archives = (0, _category.categoryStore)((state)=>{
        var _state_data;
        return (_state_data = state.data) === null || _state_data === void 0 ? void 0 : _state_data.archiveModels;
    }) ?? [];
    document.title = "归档";
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        children: archives.map((value)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                className: "mb-5",
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_title.default, {
                            title: value.months
                        }, void 0, false, {
                            fileName: "src/pages/all/index.tsx",
                            lineNumber: 15,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "src/pages/all/index.tsx",
                        lineNumber: 14,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        children: value.blogs.map((blog)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_umi.Link, {
                                to: `/detail/${blog.id}`,
                                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                            className: "mr-2 text-neutral",
                                            children: (0, _dayjs.default)(blog.createTime).format("YYYY-MM-DD")
                                        }, void 0, false, {
                                            fileName: "src/pages/all/index.tsx",
                                            lineNumber: 24,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                            className: "text-base link link-hover",
                                            children: blog.title
                                        }, void 0, false, {
                                            fileName: "src/pages/all/index.tsx",
                                            lineNumber: 27,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, blog.id, true, {
                                    fileName: "src/pages/all/index.tsx",
                                    lineNumber: 23,
                                    columnNumber: 33
                                }, this)
                            }, blog.id, false, {
                                fileName: "src/pages/all/index.tsx",
                                lineNumber: 19,
                                columnNumber: 29
                            }, this))
                    }, void 0, false, {
                        fileName: "src/pages/all/index.tsx",
                        lineNumber: 17,
                        columnNumber: 21
                    }, this)
                ]
            }, value.months, true, {
                fileName: "src/pages/all/index.tsx",
                lineNumber: 13,
                columnNumber: 17
            }, this))
    }, void 0, false, {
        fileName: "src/pages/all/index.tsx",
        lineNumber: 11,
        columnNumber: 9
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
//# sourceMappingURL=src_pages_all_index_tsx-async.js.map