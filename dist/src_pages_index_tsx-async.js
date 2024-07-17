((typeof globalThis !== 'undefined' ? globalThis : self)['makoChunk_global'] = (typeof globalThis !== 'undefined' ? globalThis : self)['makoChunk_global'] || []).push([
['src/pages/index.tsx'],
{ "src/components/blog.tsx": function (module, exports, __mako_require__){
"use strict";
__mako_require__.d(exports, "__esModule", {
    value: true
});
__mako_require__.d(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
var _interop_require_default = __mako_require__("@swc/helpers/_/_interop_require_default");
var _interop_require_wildcard = __mako_require__("@swc/helpers/_/_interop_require_wildcard");
var _reactrefresh = /*#__PURE__*/ _interop_require_wildcard._(__mako_require__("node_modules/react-refresh/runtime.js"));
var _jsxdevruntime = __mako_require__("node_modules/@umijs/preset-umi/node_modules/react/jsx-dev-runtime.js");
var _react = /*#__PURE__*/ _interop_require_default._(__mako_require__("node_modules/@umijs/preset-umi/node_modules/react/index.js"));
var _date = __mako_require__("src/tools/date.ts");
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
const BlogCard = ({ blog })=>{
    _s();
    const nav = (0, _exports.useNavigate)();
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        onClick: ()=>nav(`/detail/${blog.id}`),
        className: "card hover:border-l-2 hover:border-l-primary bg-base cursor-pointer relative transition-transform duration-300  hover:transform hover:-translate-y-1 focus-within:border-green-500 focus-within:transform focus-within:-translate-y-1 focus-within:outline-none",
        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
            className: "card-body",
            children: [
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("h4", {
                    className: "font-bold text-xl hover:text-primary",
                    children: blog.title
                }, void 0, false, {
                    fileName: "src/components/blog.tsx",
                    lineNumber: 13,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    className: "text-xs text-default-500 mt-1",
                    children: [
                        "梁典典发布于",
                        (0, _date.fromNow)(blog.createTime)
                    ]
                }, void 0, true, {
                    fileName: "src/components/blog.tsx",
                    lineNumber: 14,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    className: "flex flex-wrap gap-2 items-center mt-3",
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            className: "badge badge-outline py-3",
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    className: "avatar",
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        className: "w-4 rounded",
                                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("img", {
                                            src: blog.category.logo,
                                            alt: blog.category.name
                                        }, void 0, false, {
                                            fileName: "src/components/blog.tsx",
                                            lineNumber: 21,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/components/blog.tsx",
                                        lineNumber: 20,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/components/blog.tsx",
                                    lineNumber: 19,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                    className: "ml-1",
                                    children: blog.category.name
                                }, void 0, false, {
                                    fileName: "src/components/blog.tsx",
                                    lineNumber: 24,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/blog.tsx",
                            lineNumber: 18,
                            columnNumber: 21
                        }, this),
                        blog.tags.map((tag)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                className: "text-default-500 text-sm",
                                children: [
                                    "#",
                                    tag.name
                                ]
                            }, tag.id, true, {
                                fileName: "src/components/blog.tsx",
                                lineNumber: 27,
                                columnNumber: 25
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "src/components/blog.tsx",
                    lineNumber: 17,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/components/blog.tsx",
            lineNumber: 12,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "src/components/blog.tsx",
        lineNumber: 10,
        columnNumber: 9
    }, this);
};
_s(BlogCard, "1lJpW1ZyBjjoZdLGgRu75VwkrM8=", false, function() {
    return [
        _exports.useNavigate
    ];
});
_c = BlogCard;
var _default = BlogCard;
var _c;
$RefreshReg$(_c, "BlogCard");
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
"src/pages/index.tsx": function (module, exports, __mako_require__){
"use strict";
__mako_require__.d(exports, "__esModule", {
    value: true
});
__mako_require__.d(exports, "default", {
    enumerable: true,
    get: function() {
        return HomePage;
    }
});
var _interop_require_default = __mako_require__("@swc/helpers/_/_interop_require_default");
var _interop_require_wildcard = __mako_require__("@swc/helpers/_/_interop_require_wildcard");
var _reactrefresh = /*#__PURE__*/ _interop_require_wildcard._(__mako_require__("node_modules/react-refresh/runtime.js"));
var _jsxdevruntime = __mako_require__("node_modules/@umijs/preset-umi/node_modules/react/jsx-dev-runtime.js");
var _blog = __mako_require__("src/providers/blog.ts");
var _shallow = __mako_require__("node_modules/zustand/esm/react/shallow.mjs");
var _blog1 = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/blog.tsx"));
var _loading = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/loading.tsx"));
var prevRefreshReg;
var prevRefreshSig;
prevRefreshReg = self.$RefreshReg$;
prevRefreshSig = self.$RefreshSig$;
self.$RefreshReg$ = (type, id)=>{
    _reactrefresh.register(type, module.id + id);
};
self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
var _s = $RefreshSig$();
function HomePage() {
    _s();
    document.title = "典典博客";
    const [blogs, isLoading] = (0, _blog.blogStore)((0, _shallow.useShallow)((state)=>[
            state.blogs,
            state.isLoading
        ]));
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_jsxdevruntime.Fragment, {
        children: [
            isLoading && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                className: "text-center",
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_loading.default, {}, void 0, false, {
                    fileName: "src/pages/index.tsx",
                    lineNumber: 16,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "src/pages/index.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, this),
            blogs.length > 0 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                className: "flex flex-col gap-4",
                children: blogs.map((v)=>{
                    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_blog1.default, {
                        blog: v
                    }, v.id, false, {
                        fileName: "src/pages/index.tsx",
                        lineNumber: 22,
                        columnNumber: 20
                    }, this);
                })
            }, void 0, false, {
                fileName: "src/pages/index.tsx",
                lineNumber: 20,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(HomePage, "cfplsmNliQkD/fzzQKqhzRiWrSg=", false, function() {
    return [
        _shallow.useShallow
    ];
});
_c = HomePage;
var _c;
$RefreshReg$(_c, "HomePage");
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
//# sourceMappingURL=src_pages_index_tsx-async.js.map