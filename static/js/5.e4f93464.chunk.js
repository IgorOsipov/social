(this.webpackJsonpsocial=this.webpackJsonpsocial||[]).push([[5],{268:function(e,t,a){"use strict";a.d(t,"b",(function(){return n})),a.d(t,"a",(function(){return i}));var n=function(e){if(!e)return"Field is required"},i=function(e){return function(t){if(t&&t.length>e)return"Maximum length of post is ".concat(e," symbols")}}},270:function(e,t,a){"use strict";a.d(t,"a",(function(){return f}));var n=a(6),i=a(40),r=a(57),s=a(59),c=a(58),o=a(0),l=a.n(o),u=a(39),d=a(14),b=a(3),j=function(e){return{isAuth:e.auth.isAuth}},f=function(e){var t=function(t){Object(s.a)(o,t);var a=Object(c.a)(o);function o(){return Object(i.a)(this,o),a.apply(this,arguments)}return Object(r.a)(o,[{key:"render",value:function(){return this.props.isAuth?Object(b.jsx)(e,Object(n.a)({},this.props)):Object(b.jsx)(d.c,{to:"/login"})}}]),o}(l.a.Component);return Object(u.b)(j,{})(t)}},272:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var n=a(6),i=(a(0),a(342)),r=a(3),s=function(e){var t=e.input,a=e.meta;return Object(r.jsxs)(i.a.Group,{controlId:t.name,children:[Object(r.jsx)(i.a.Label,{children:"New Post"}),Object(r.jsx)(i.a.Control,Object(n.a)(Object(n.a)({as:"textarea",className:!a.valid&&a.touched&&"is-invalid"},t),{},{style:{resize:"none"},rows:3})),Object(r.jsxs)(i.a.Control.Feedback,{type:"invalid",children:[" ",a.error," "]})]})}},336:function(e,t,a){"use strict";var n=a(4),i=a(7),r=a(10),s=a.n(r),c=a(0),o=a.n(c),l=a(11),u=["bsPrefix","className","noGutters","as"],d=["xl","lg","md","sm","xs"],b=o.a.forwardRef((function(e,t){var a=e.bsPrefix,r=e.className,c=e.noGutters,b=e.as,j=void 0===b?"div":b,f=Object(i.a)(e,u),m=Object(l.a)(a,"row"),v=m+"-cols",O=[];return d.forEach((function(e){var t,a=f[e];delete f[e];var n="xs"!==e?"-"+e:"";null!=(t=null!=a&&"object"===typeof a?a.cols:a)&&O.push(""+v+n+"-"+t)})),o.a.createElement(j,Object(n.a)({ref:t},f,{className:s.a.apply(void 0,[r,m,c&&"no-gutters"].concat(O))}))}));b.displayName="Row",b.defaultProps={noGutters:!1},t.a=b},344:function(e,t,a){"use strict";a.r(t);var n=a(97),i=a(39),r=a(84),s=a(0),c=a.n(s),o=a(336),l=a(293),u=a(4),d=a(7),b=a(10),j=a.n(b),f=(a(60),a(29)),m=a(11),v=a(107),O=a(96),h=["bsPrefix","active","disabled","className","variant","action","as","onClick"],p={variant:void 0,active:!1,disabled:!1},x=c.a.forwardRef((function(e,t){var a=e.bsPrefix,n=e.active,i=e.disabled,r=e.className,o=e.variant,l=e.action,b=e.as,f=e.onClick,v=Object(d.a)(e,h);a=Object(m.a)(a,"list-group-item");var p=Object(s.useCallback)((function(e){if(i)return e.preventDefault(),void e.stopPropagation();f&&f(e)}),[i,f]);return i&&void 0===v.tabIndex&&(v.tabIndex=-1,v["aria-disabled"]=!0),c.a.createElement(O.a,Object(u.a)({ref:t},v,{as:b||(l?v.href?"a":"button":"div"),onClick:p,className:j()(r,a,n&&"active",i&&"disabled",o&&a+"-"+o,l&&a+"-action")}))}));x.defaultProps=p,x.displayName="ListGroupItem";var g=x,y=["className","bsPrefix","variant","horizontal","as"],N={variant:void 0,horizontal:void 0},P=c.a.forwardRef((function(e,t){var a,n=Object(f.a)(e,{activeKey:"onSelect"}),i=n.className,r=n.bsPrefix,s=n.variant,o=n.horizontal,l=n.as,b=void 0===l?"div":l,O=Object(d.a)(n,y),h=Object(m.a)(r,"list-group");return a=o?!0===o?"horizontal":"horizontal-"+o:null,c.a.createElement(v.a,Object(u.a)({ref:t},O,{as:b,className:j()(i,h,s&&h+"-"+s,a&&h+"-"+a)}))}));P.defaultProps=N,P.displayName="ListGroup",P.Item=g;var w,k,C=P,z=a(85),G=a(56),I=a(3),R=function(e){return Object(I.jsx)(G.NavLink,{style:{color:"inherit"},to:"/dialogs/"+e.id,children:e.name})},S=function(e){return Object(I.jsx)("li",{children:e.message})},E=a(342),L=a(111),A=a(142),D=a(143),M=a(272),F=a(268),J=Object(F.a)(100),q=Object(D.a)({form:"dialog"})((function(e){return Object(I.jsxs)(E.a,{onSubmit:e.handleSubmit,children:[Object(I.jsx)(A.a,{validate:[F.b,J],component:M.a,name:"newPost"}),Object(I.jsx)(L.a,{variant:"primary",type:"submit",children:"Send"}),Object(I.jsx)(L.a,{className:"ml-2",variant:"outline-primary",type:"reset",children:"Clear"})]})})),K=z.a.ul(w||(w=Object(r.a)(["\n    list-style: none;\n"]))),B=z.a.div(k||(k=Object(r.a)(["\n    border-right: 1px solid gray;\n    min-height: 100vh;\n"]))),H=function(e){return Object(I.jsxs)(o.a,{children:[Object(I.jsx)(l.a,{xs:3,children:Object(I.jsx)(B,{children:Object(I.jsx)(C,{as:"ul",children:e.state.dialogsData.map((function(e){return Object(I.jsx)(C.Item,{as:"li",children:Object(I.jsx)(R,{name:e.name,id:e.id})},e.id)}))})})}),Object(I.jsxs)(l.a,{xs:9,style:{paddingRight:"45px"},children:[Object(I.jsx)(K,{children:e.state.messagesData.map((function(e){return Object(I.jsx)(S,{message:e.message},e.id)}))}),Object(I.jsx)(q,{onSubmit:function(t){e.sendMessage(t.newPost)},state:e.state})]})]})},Q=a(270),T=a(52);t.default=Object(T.d)(Object(i.b)((function(e){return{state:e.dialogsPage}}),(function(e){return{sendMessage:function(t){e(Object(n.a)(t))}}})),Q.a)(H)}}]);
//# sourceMappingURL=5.e4f93464.chunk.js.map