"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[370],{85285:function(M,s,_){_.d(s,{Z:function(){return a}});var n=_(86074);function a(){return(0,n.jsx)("div",{className:"p-5 flex justify-center",children:(0,n.jsx)("span",{className:"loading loading-spinner loading-xs"})})}},55893:function(M,s,_){_.r(s),_.d(s,{default:function(){return p}});var n=_(5574),a=_.n(n),h=_(85404),E=_(78194),g=_(85285),u=_(50942),e=_(86074);function p(){var r=(0,u.bS)("/g/:id"),v=(0,h.ZP)({url:E.$e}),f=a()(v,1),m=f[0],j=m.loading,b=m.data;if(console.log(r),j)return(0,e.jsx)(g.Z,{});if(!b)return(0,e.jsx)(e.Fragment,{children:"error data!"});var P=b.data,D=r==null?void 0:r.params.id;return(0,e.jsxs)("div",{className:"flex flex-row gap-10 relative",children:[(0,e.jsx)("ul",{className:"menu flex-none bg-base-200 w-56 rounded-box",children:P.map(function(l){return(0,e.jsx)("li",{children:(0,e.jsx)(u.rU,{className:"".concat(D==="".concat(l.id)?"active":""),to:"/g/".concat(l.id),children:l.name})},l.id)})}),(0,e.jsx)("div",{className:"grow",children:(0,e.jsx)(u.j3,{})})]})}},78194:function(M,s,_){_.d(s,{$e:function(){return C},E7:function(){return A},GA:function(){return L},HN:function(){return P},WD:function(){return l},YF:function(){return T},aL:function(){return U},rj:function(){return D},sk:function(){return x}});var n=_(12444),a=_.n(n),h=_(72004),E=_.n(h),g=_(25098),u=_.n(g),e=_(31996),p=_.n(e),r=_(26037),v=_.n(r),f=_(12665),m=_.n(f),j=_(54683),b="https://api.itbug.shop",P="/api/blog/all",D="/api/blog/statistics",l="/api/public/friend/all",x="/api/friend/save",A="/api/blog/getTextAll",U="/api/blog/projects",C="/api/rc/cates",L="/api/app/resource/findByCateId",T="/api/public/directory/doc/",I=function(i){p()(t,i);var c=v()(t);function t(d){var o;return a()(this,t),o=c.call(this,d),o.name=o.constructor.name,Error.captureStackTrace(u()(o),o.constructor),o}return E()(t,[{key:"toString",value:function(){return this.message}}]),t}(m()(Error)),O=j.Z.create({baseURL:b,timeout:5e3});O.interceptors.response.use(function(i){var c=i.data,t=c.state,d=c.message;if(t!==200&&d!==void 0)throw new I(d);return i},function(i){return Promise.reject(i)}),s.ZP=O}}]);
