((typeof globalThis !== 'undefined' ? globalThis : self)['makoChunk_global'] = (typeof globalThis !== 'undefined' ? globalThis : self)['makoChunk_global'] || []).push([
['src/pages/links/index.tsx'],
{ "src/components/input_error_label.tsx": function (module, exports, __mako_require__){
"use strict";
__mako_require__.d(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
__mako_require__.e(exports, {
    InputErrorClass: function() {
        return InputErrorClass;
    },
    default: function() {
        return InputErrorLabel;
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
function InputErrorLabel(message) {
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_jsxdevruntime.Fragment, {
        children: message && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
            className: 'label',
            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                className: 'label-text-alt',
                children: message
            }, void 0, false, {
                fileName: "src/components/input_error_label.tsx",
                lineNumber: 9,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "src/components/input_error_label.tsx",
            lineNumber: 8,
            columnNumber: 13
        }, this)
    }, void 0, false);
}
_c = InputErrorLabel;
function InputErrorClass(message) {
    return message ? 'input-error' : '';
}
_c1 = InputErrorClass;
var _c;
var _c1;
$RefreshReg$(_c, "InputErrorLabel");
$RefreshReg$(_c1, "InputErrorClass");
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
"src/components/link_item_layout.tsx": function (module, exports, __mako_require__){
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
///
const LinkItemLayout = ({ link })=>{
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_jsxdevruntime.Fragment, {
        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
            className: 'card shadow bg-base-100',
            children: [
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("figure", {
                    className: 'aspect-[1/1] ',
                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("img", {
                        alt: link.name,
                        src: link.logo,
                        className: 'aspect-[1/1] object-cover'
                    }, void 0, false, {
                        fileName: "src/components/link_item_layout.tsx",
                        lineNumber: 10,
                        columnNumber: 49
                    }, this)
                }, void 0, false, {
                    fileName: "src/components/link_item_layout.tsx",
                    lineNumber: 10,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    className: 'card-body',
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("h2", {
                            className: 'card-title',
                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("a", {
                                href: link.url,
                                target: '_blank',
                                rel: 'noreferrer',
                                className: 'link',
                                children: link.name
                            }, void 0, false, {
                                fileName: "src/components/link_item_layout.tsx",
                                lineNumber: 12,
                                columnNumber: 46
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/link_item_layout.tsx",
                            lineNumber: 12,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("p", {
                            children: link.intro
                        }, void 0, false, {
                            fileName: "src/components/link_item_layout.tsx",
                            lineNumber: 13,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                            className: 'card-actions justify-end'
                        }, void 0, false, {
                            fileName: "src/components/link_item_layout.tsx",
                            lineNumber: 14,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/link_item_layout.tsx",
                    lineNumber: 11,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/components/link_item_layout.tsx",
            lineNumber: 9,
            columnNumber: 9
        }, this)
    }, void 0, false);
};
_c = LinkItemLayout;
var _default = LinkItemLayout;
var _c;
$RefreshReg$(_c, "LinkItemLayout");
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
"src/pages/links/index.tsx": function (module, exports, __mako_require__){
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
var _reacthookform = __mako_require__("node_modules/react-hook-form/dist/index.esm.mjs");
var _links = __mako_require__("src/providers/links.ts");
var _shallow = __mako_require__("node_modules/zustand/esm/react/shallow.mjs");
var _fun = __mako_require__("src/tools/fun.ts");
var _input_error_label = /*#__PURE__*/ _interop_require_wildcard._(__mako_require__("src/components/input_error_label.tsx"));
var _link_item_layout = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/link_item_layout.tsx"));
var _text = /*#__PURE__*/ _interop_require_default._(__mako_require__("src/components/text.tsx"));
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
    const [useEmail, setUseEmail] = _react.default.useState(false);
    const [isLoading, setIsLoading] = _react.default.useState(false);
    const { register, handleSubmit, control, formState: { errors, disabled }, reset } = (0, _reacthookform.useForm)();
    const [list, add] = (0, _links.linkStore)((0, _shallow.useShallow)((state)=>[
            state.data,
            state.add
        ]));
    const onSubmit = async (values)=>{
        setIsLoading(true);
        try {
            await add(values);
        } catch (e) {}
        setIsLoading(false);
    };
    return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
        children: [
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                className: 'flex justify-between mb-4',
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_title.default, {
                        title: "友链"
                    }, void 0, false, {
                        fileName: "src/pages/links/index.tsx",
                        lineNumber: 36,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        className: 'flex gap-2',
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("button", {
                                type: 'button',
                                className: 'btn',
                                onClick: ()=>(0, _fun.showDialogModal)('my-info-dialog'),
                                children: "我的信息"
                            }, void 0, false, {
                                fileName: "src/pages/links/index.tsx",
                                lineNumber: 39,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("button", {
                                className: 'btn btn-primary',
                                color: "primary",
                                type: 'button',
                                onClick: ()=>(0, _fun.showDialogModal)("request-link"),
                                children: "申请友链"
                            }, void 0, false, {
                                fileName: "src/pages/links/index.tsx",
                                lineNumber: 40,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/links/index.tsx",
                        lineNumber: 38,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/pages/links/index.tsx",
                lineNumber: 35,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                className: "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4",
                children: [
                    list.map((value)=>{
                        return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_link_item_layout.default, {
                            link: value
                        }, value.id, false, {
                            fileName: "src/pages/links/index.tsx",
                            lineNumber: 53,
                            columnNumber: 25
                        }, this);
                    }),
                    list.length === 0 && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                        className: "text-default-500 text-sm",
                        children: "暂无友链"
                    }, void 0, false, {
                        fileName: "src/pages/links/index.tsx",
                        lineNumber: 58,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/pages/links/index.tsx",
                lineNumber: 46,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("dialog", {
                id: 'my-info-dialog',
                className: 'modal',
                children: [
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                        className: 'modal-box',
                        children: [
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("h3", {
                                className: 'font-bold text-lg mb-5',
                                children: "我的信息"
                            }, void 0, false, {
                                fileName: "src/pages/links/index.tsx",
                                lineNumber: 65,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_text.default, {
                                isShadow: false,
                                textKey: 'my-info'
                            }, void 0, false, {
                                fileName: "src/pages/links/index.tsx",
                                lineNumber: 66,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/pages/links/index.tsx",
                        lineNumber: 64,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("form", {
                        method: "dialog",
                        className: "modal-backdrop",
                        children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("button", {
                            type: 'submit',
                            children: "close"
                        }, void 0, false, {
                            fileName: "src/pages/links/index.tsx",
                            lineNumber: 69,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "src/pages/links/index.tsx",
                        lineNumber: 68,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/pages/links/index.tsx",
                lineNumber: 63,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("dialog", {
                className: 'modal',
                id: 'request-link',
                children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                    className: "modal-box",
                    children: [
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("h3", {
                            className: "font-bold text-lg mb-5",
                            children: "申请友链"
                        }, void 0, false, {
                            fileName: "src/pages/links/index.tsx",
                            lineNumber: 76,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("form", {
                            onSubmit: handleSubmit(onSubmit),
                            className: 'flex flex-col justify-center gap-4',
                            children: [
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_reacthookform.Controller, {
                                    control: control,
                                    render: ({ field, fieldState: { error } })=>{
                                        return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("label", {
                                            className: 'form-control',
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("input", {
                                                    ...field,
                                                    className: `input w-full input-bordered ${(0, _input_error_label.InputErrorClass)(error === null || error === void 0 ? void 0 : error.message)}`,
                                                    autoFocus: true,
                                                    placeholder: "请输入站点名称",
                                                    ...register("name", {
                                                        required: "请输入站点名称"
                                                    })
                                                }, void 0, false, void 0, void 0),
                                                (0, _input_error_label.default)(error === null || error === void 0 ? void 0 : error.message)
                                            ]
                                        }, void 0, true, void 0, void 0);
                                    },
                                    name: "name"
                                }, void 0, false, {
                                    fileName: "src/pages/links/index.tsx",
                                    lineNumber: 78,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_reacthookform.Controller, {
                                    control: control,
                                    render: ({ field })=>{
                                        var _errors_url;
                                        const errorMsg = (_errors_url = errors.url) === null || _errors_url === void 0 ? void 0 : _errors_url.message;
                                        return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("label", {
                                            className: 'form-control',
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("input", {
                                                    className: `input w-full input-bordered ${(0, _input_error_label.InputErrorClass)(errorMsg)}`,
                                                    ...field,
                                                    type: "url",
                                                    placeholder: "请输入URL",
                                                    ...register("url", {
                                                        required: "请输入URL"
                                                    })
                                                }, void 0, false, void 0, void 0),
                                                (0, _input_error_label.default)(errorMsg)
                                            ]
                                        }, void 0, true, void 0, void 0);
                                    },
                                    name: "url",
                                    rules: {
                                        required: "请输入访问URL",
                                        pattern: {
                                            value: /^(ftp|http|https):\/\/[^ "]+$/,
                                            message: "请输入有效的URL"
                                        }
                                    }
                                }, void 0, false, {
                                    fileName: "src/pages/links/index.tsx",
                                    lineNumber: 90,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_reacthookform.Controller, {
                                    control: control,
                                    render: ({ field, fieldState: { error } })=>{
                                        return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("label", {
                                            className: 'form-control',
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("input", {
                                                    className: `input w-full input-bordered ${(0, _input_error_label.InputErrorClass)(error === null || error === void 0 ? void 0 : error.message)}`,
                                                    ...field,
                                                    placeholder: "请输入LOGO直链",
                                                    ...register("logo", {
                                                        required: "请输入logo"
                                                    })
                                                }, void 0, false, void 0, void 0),
                                                (0, _input_error_label.default)(error === null || error === void 0 ? void 0 : error.message)
                                            ]
                                        }, void 0, true, void 0, void 0);
                                    },
                                    name: "logo",
                                    rules: {
                                        required: "请输入站点logo"
                                    }
                                }, void 0, false, {
                                    fileName: "src/pages/links/index.tsx",
                                    lineNumber: 117,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("textarea", {
                                    className: 'textarea w-full textarea-bordered',
                                    placeholder: "(可选)输入网站介绍",
                                    ...register("intro")
                                }, void 0, false, {
                                    fileName: "src/pages/links/index.tsx",
                                    lineNumber: 137,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    className: "form-control",
                                    children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("label", {
                                        className: "label cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                className: "label-text",
                                                children: "接收审核通过通知"
                                            }, void 0, false, {
                                                fileName: "src/pages/links/index.tsx",
                                                lineNumber: 145,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("input", {
                                                type: "checkbox",
                                                className: "toggle",
                                                checked: useEmail,
                                                onChange: (e)=>setUseEmail(e.target.checked)
                                            }, void 0, false, {
                                                fileName: "src/pages/links/index.tsx",
                                                lineNumber: 146,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/pages/links/index.tsx",
                                        lineNumber: 144,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/pages/links/index.tsx",
                                    lineNumber: 143,
                                    columnNumber: 25
                                }, this),
                                useEmail && /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_reacthookform.Controller, {
                                    shouldUnregister: !useEmail,
                                    control: control,
                                    render: ({ field, fieldState: { error } })=>{
                                        return /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("label", {
                                            className: 'form-control',
                                            children: [
                                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("input", {
                                                    className: `input w-full input-bordered ${(0, _input_error_label.InputErrorClass)(error === null || error === void 0 ? void 0 : error.message)}`,
                                                    type: 'email',
                                                    placeholder: '输入接收通知邮箱',
                                                    ...field,
                                                    ...register("email", {
                                                        required: useEmail ? '请输入邮箱' : undefined
                                                    })
                                                }, void 0, false, void 0, void 0),
                                                (0, _input_error_label.default)(error === null || error === void 0 ? void 0 : error.message)
                                            ]
                                        }, void 0, true, void 0, void 0);
                                    },
                                    name: "email",
                                    rules: {
                                        required: useEmail
                                    }
                                }, void 0, false, {
                                    fileName: "src/pages/links/index.tsx",
                                    lineNumber: 152,
                                    columnNumber: 41
                                }, this),
                                /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("div", {
                                    className: "modal-action",
                                    children: [
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("button", {
                                            disabled: disabled,
                                            type: 'submit',
                                            className: 'btn btn-primary',
                                            children: [
                                                " ",
                                                isLoading ? /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("span", {
                                                    className: "loading loading-spinner"
                                                }, void 0, false, {
                                                    fileName: "src/pages/links/index.tsx",
                                                    lineNumber: 169,
                                                    columnNumber: 33
                                                }, this) : /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)(_jsxdevruntime.Fragment, {
                                                    children: "提交申请"
                                                }, void 0, false)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/pages/links/index.tsx",
                                            lineNumber: 168,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("form", {
                                            method: "dialog",
                                            children: /*#__PURE__*/ (0, _jsxdevruntime.jsxDEV)("button", {
                                                type: 'submit',
                                                className: "btn",
                                                onClick: ()=>reset(),
                                                children: "取消"
                                            }, void 0, false, {
                                                fileName: "src/pages/links/index.tsx",
                                                lineNumber: 173,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "src/pages/links/index.tsx",
                                            lineNumber: 172,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/pages/links/index.tsx",
                                    lineNumber: 167,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/pages/links/index.tsx",
                            lineNumber: 77,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/pages/links/index.tsx",
                    lineNumber: 75,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "src/pages/links/index.tsx",
                lineNumber: 74,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/pages/links/index.tsx",
        lineNumber: 34,
        columnNumber: 9
    }, this);
}
_s(Page, "Yjm/Gb6fMvyMUjIW0bNb1W0lBUM=", false, function() {
    return [
        _reacthookform.useForm,
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
"src/providers/links.ts": function (module, exports, __mako_require__){
"use strict";
__mako_require__.d(exports, "__esModule", {
    value: true
});
__mako_require__.d(exports, "linkStore", {
    enumerable: true,
    get: function() {
        return linkStore;
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
async function fetchData() {
    const response = await _api.default.get(_api.friendApi);
    return response.data;
}
async function saveFriendLink(link) {
    const response = await _api.default.post(_api.friendAddApi, link);
    return response.data;
}
const linkStore = (0, _zustand.create)((set)=>{
    return {
        data: [],
        fetchAll: ()=>{
            fetchData().then(({ data })=>{
                set((v)=>({
                        ...v,
                        data: data
                    }));
            });
        },
        add: async (friend)=>{
            await saveFriendLink(friend);
        }
    };
});
linkStore.getState().fetchAll();
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
//# sourceMappingURL=src_pages_links_index_tsx-async.js.map