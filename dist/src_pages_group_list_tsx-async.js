((typeof globalThis !== 'undefined' ? globalThis : self)['makoChunk_global'] = (typeof globalThis !== 'undefined' ? globalThis : self)['makoChunk_global'] || []).push([
['src/pages/group/list.tsx'],
{ "src/components/resource_card.tsx": function (module, exports, __mako_require__){
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
var prevRefreshReg;
var prevRefreshSig;
prevRefreshReg = self.$RefreshReg$;
prevRefreshSig = self.$RefreshSig$;
self.$RefreshReg$ = (type, id)=>{
    _reactrefresh.register(type, module.id + id);
};
self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
const ResourceCard = ({ item })=>{
    const { content, category: { name }, user: { picture, nickName, enterprise }, createDate, images } = item;
    let enterpriseName = enterprise === null || enterprise === void 0 ? void 0 : enterprise.name;
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        className: 'card bg-base-100 shadow',
        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
            className: 'card-body',
            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                className: 'flex flex-row gap-5 items-start',
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        className: 'flex-none w-16',
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("img", {
                            className: 'avatar w-16 rounded-full',
                            src: picture,
                            alt: nickName
                        }, void 0, false, {
                            fileName: "src/components/resource_card.tsx",
                            lineNumber: 18,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "src/components/resource_card.tsx",
                        lineNumber: 17,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        className: 'grow flex flex-col gap-5',
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                className: 'h-16 flex flex-col items-start justify-evenly',
                                children: [
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("h2", {
                                        className: 'text-lg font-bold',
                                        children: nickName
                                    }, void 0, false, {
                                        fileName: "src/components/resource_card.tsx",
                                        lineNumber: 22,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                        className: 'text-base-content/60',
                                        children: [
                                            " ",
                                            enterpriseName ? `@${enterpriseName}` : '',
                                            " ",
                                            (0, _date.fromNow)(createDate)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/resource_card.tsx",
                                        lineNumber: 23,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/resource_card.tsx",
                                lineNumber: 21,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("p", {
                                className: 'prose',
                                children: content
                            }, void 0, false, {
                                fileName: "src/components/resource_card.tsx",
                                lineNumber: 25,
                                columnNumber: 21
                            }, this),
                            images.length !== 0 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                className: 'grid md:grid-cols-6 grid-cols-2 gap-2',
                                children: images.map((value)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("img", {
                                        className: 'rounded aspect-[1/1]',
                                        src: value.url,
                                        alt: value.url
                                    }, value.id, false, {
                                        fileName: "src/components/resource_card.tsx",
                                        lineNumber: 32,
                                        columnNumber: 53
                                    }, this))
                            }, void 0, false, {
                                fileName: "src/components/resource_card.tsx",
                                lineNumber: 30,
                                columnNumber: 48
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                className: "badge badge-outline badge-lg",
                                children: [
                                    "#",
                                    name
                                ]
                            }, void 0, true, {
                                fileName: "src/components/resource_card.tsx",
                                lineNumber: 37,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/resource_card.tsx",
                        lineNumber: 20,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/resource_card.tsx",
                lineNumber: 16,
                columnNumber: 13
            }, this)
        }, void 0, false, {
            fileName: "src/components/resource_card.tsx",
            lineNumber: 15,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "src/components/resource_card.tsx",
        lineNumber: 14,
        columnNumber: 12
    }, this);
};
_c = ResourceCard;
var _default = ResourceCard;
var _c;
$RefreshReg$(_c, "ResourceCard");
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
"src/pages/group/list.tsx": function (module, exports, __mako_require__){
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
var _exports = __mako_require__("src/.umi/exports.ts");
var _axioshooks = /*#__PURE__*/ _interop_require_default._(__mako_require__("node_modules/axios-hooks/es/index.js"));
var _api = __mako_require__("src/tools/api.ts");
var _loading = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/loading.tsx"));
var _resource_card = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/resource_card.tsx"));
var prevRefreshReg;
var prevRefreshSig;
prevRefreshReg = self.$RefreshReg$;
prevRefreshSig = self.$RefreshSig$;
self.$RefreshReg$ = (type, id)=>{
    _reactrefresh.register(type, module.id + id);
};
self.$RefreshSig$ = _reactrefresh.createSignatureFunctionForTransform;
var _s = $RefreshSig$();
const ResourceListWidget = ()=>{
    var _data_data;
    _s();
    const params = (0, _exports.useParams)();
    const id = params.id;
    const [{ data, loading }] = (0, _axioshooks.default)({
        url: _api.groupResourceList,
        params: {
            id
        }
    });
    if (!id) return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        children: "not found"
    }, void 0, false, {
        fileName: "src/pages/group/list.tsx",
        lineNumber: 15,
        columnNumber: 16
    }, this);
    if (loading) return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_loading.default, {}, void 0, false, {
        fileName: "src/pages/group/list.tsx",
        lineNumber: 18,
        columnNumber: 25
    }, this);
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        className: 'flex flex-col gap-5',
        children: [
            data === null || data === void 0 ? void 0 : (_data_data = data.data) === null || _data_data === void 0 ? void 0 : _data_data.map((value)=>/*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_resource_card.default, {
                    item: value
                }, value.id, false, {
                    fileName: "src/pages/group/list.tsx",
                    lineNumber: 21,
                    columnNumber: 38
                }, this)),
            data && data.data.length === 0 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                className: 'text-center h-max text-base-content/60',
                children: "正在创作中"
            }, void 0, false, {
                fileName: "src/pages/group/list.tsx",
                lineNumber: 24,
                columnNumber: 47
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/pages/group/list.tsx",
        lineNumber: 19,
        columnNumber: 12
    }, this);
};
_s(ResourceListWidget, "RScFk66ynmVPKz9mkdMib2GIX58=", false, function() {
    return [
        _exports.useParams,
        _axioshooks.default
    ];
});
_c = ResourceListWidget;
var _default = ResourceListWidget;
var _c;
$RefreshReg$(_c, "ResourceListWidget");
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
//# sourceMappingURL=src_pages_group_list_tsx-async.js.map