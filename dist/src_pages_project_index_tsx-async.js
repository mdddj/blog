((typeof globalThis !== 'undefined' ? globalThis : self)['makoChunk_global'] = (typeof globalThis !== 'undefined' ? globalThis : self)['makoChunk_global'] || []).push([
['src/pages/project/index.tsx'],
{ "src/components/project_card.tsx": function (module, exports, __mako_require__){
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
var prevRefreshReg;
var prevRefreshSig;
prevRefreshReg = self.$RefreshReg$;
prevRefreshSig = self.$RefreshSig$;
self.$RefreshReg$ = (type, id)=>{
    _reactrefresh.register(type, module.id + id);
};
self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
const ProjectCard = ({ project })=>{
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        className: "card shadow-xl",
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("figure", {
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("img", {
                    alt: project.logo,
                    src: project.logo,
                    className: "object-cover aspect-[1/1]"
                }, void 0, false, {
                    fileName: "src/components/project_card.tsx",
                    lineNumber: 8,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "src/components/project_card.tsx",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                className: "card-body",
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        className: "card-title",
                        children: project.name
                    }, void 0, false, {
                        fileName: "src/components/project_card.tsx",
                        lineNumber: 15,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("p", {
                        children: project.description
                    }, void 0, false, {
                        fileName: "src/components/project_card.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        className: "card-actions justify-end",
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("a", {
                                className: "link link-hover",
                                href: project.github,
                                children: "Github"
                            }, void 0, false, {
                                fileName: "src/components/project_card.tsx",
                                lineNumber: 18,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("a", {
                                className: "link link-hover",
                                href: project.downloadUrl,
                                children: "下载"
                            }, void 0, false, {
                                fileName: "src/components/project_card.tsx",
                                lineNumber: 21,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("a", {
                                className: "link link-hover",
                                href: project.previewUrl,
                                children: "预览"
                            }, void 0, false, {
                                fileName: "src/components/project_card.tsx",
                                lineNumber: 24,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/project_card.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/project_card.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {}, void 0, false, {
                fileName: "src/components/project_card.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/components/project_card.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
};
_c = ProjectCard;
var _default = ProjectCard;
var _c;
$RefreshReg$(_c, "ProjectCard");
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
"src/pages/project/index.tsx": function (module, exports, __mako_require__){
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
var _project = __mako_require__("src/providers/project.ts");
var _shallow = __mako_require__("node_modules/zustand/esm/react/shallow.mjs");
var _project_card = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/project_card.tsx"));
var _title = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/title.tsx"));
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
    const [projects] = (0, _project.projectStore)((0, _shallow.useShallow)((state)=>[
            state.data
        ]));
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_jsxdevruntime.Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_title.default, {
                title: '项目'
            }, void 0, false, {
                fileName: "src/pages/project/index.tsx",
                lineNumber: 13,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                className: 'grid lg:grid-cols-3 gap-2 mt-5',
                children: [
                    projects.length === 0 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                        children: "暂无项目"
                    }, void 0, false, {
                        fileName: "src/pages/project/index.tsx",
                        lineNumber: 17,
                        columnNumber: 46
                    }, this),
                    projects.map((value)=>{
                        return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_project_card.default, {
                            project: value
                        }, value.id, false, {
                            fileName: "src/pages/project/index.tsx",
                            lineNumber: 21,
                            columnNumber: 33
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "src/pages/project/index.tsx",
                lineNumber: 14,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
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
"src/providers/project.ts": function (module, exports, __mako_require__){
"use strict";
__mako_require__.d(exports, "__esModule", {
    value: true
});
__mako_require__.d(exports, "projectStore", {
    enumerable: true,
    get: function() {
        return projectStore;
    }
});
var _interop_require_wildcard = __mako_require__("@swc/helpers/_/_interop_require_wildcard");
var _reactrefresh = /*#__PURE__*/ _interop_require_wildcard._(__mako_require__("node_modules/react-refresh/runtime.js"));
var _zustand = __mako_require__("node_modules/zustand/esm/index.mjs");
var _api = /*#__PURE__*/ _interop_require_wildcard._(__mako_require__("src/tools/api.ts"));
var prevRefreshReg;
var prevRefreshSig;
prevRefreshReg = self.$RefreshReg$;
prevRefreshSig = self.$RefreshSig$;
self.$RefreshReg$ = (type, id)=>{
    _reactrefresh.register(type, module.id + id);
};
self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
const projectStore = (0, _zustand.create)((set)=>{
    return {
        data: [],
        fetchData: async ()=>{
            try {
                const { data: { data } } = await _api.default.get(_api.projectListApi);
                set((state)=>({
                        ...state,
                        data: data
                    }));
            } catch (error) {
                set((state)=>({
                        ...state,
                        data: []
                    }));
            }
        }
    };
});
projectStore.getState().fetchData();
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
//# sourceMappingURL=src_pages_project_index_tsx-async.js.map