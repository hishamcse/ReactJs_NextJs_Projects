(this["webpackJsonpreact-complete-guide"]=this["webpackJsonpreact-complete-guide"]||[]).push([[4],{46:function(e,t,c){e.exports={card:"Card_card__GQVkt"}},47:function(e,t,c){e.exports={form:"QuoteForm_form__3C4Bt",loading:"QuoteForm_loading__2GtG-",control:"QuoteForm_control__C9EKW",actions:"QuoteForm_actions__gT1of"}},55:function(e,t,c){"use strict";c.r(t);var n=c(21),o=c(1),s=c(46),r=c.n(s),a=c(0),i=function(e){return Object(a.jsx)("div",{className:r.a.card,children:e.children})},u=c(14),l=c(47),d=c.n(l),j=c(2),b=function(e){var t=Object(o.useState)(!1),c=Object(n.a)(t,2),s=c[0],r=c[1],l=Object(o.useRef)(),b=Object(o.useRef)();return Object(a.jsxs)(o.Fragment,{children:[Object(a.jsx)(j.a,{when:s,message:function(e){return"Are you sure to exit? All inputs will be lost"}}),Object(a.jsx)(i,{children:Object(a.jsxs)("form",{className:d.a.form,onFocus:function(){r(!0)},onSubmit:function(t){t.preventDefault();var c=l.current.value,n=b.current.value;e.onAddQuote({author:c,text:n})},children:[e.isLoading&&Object(a.jsx)("div",{className:d.a.loading,children:Object(a.jsx)(u.a,{})}),Object(a.jsxs)("div",{className:d.a.control,children:[Object(a.jsx)("label",{htmlFor:"author",children:"Author"}),Object(a.jsx)("input",{type:"text",id:"author",ref:l})]}),Object(a.jsxs)("div",{className:d.a.control,children:[Object(a.jsx)("label",{htmlFor:"text",children:"Text"}),Object(a.jsx)("textarea",{id:"text",rows:"5",ref:b})]}),Object(a.jsx)("div",{className:d.a.actions,children:Object(a.jsx)("button",{className:"btn",onClick:function(){r(!1)},children:"Add Quote"})})]})})]})},f=c(19),x=c(20);t.default=function(){var e=Object(f.a)(x.b),t=e.sendRequest,c=e.status,n=Object(j.h)();Object(o.useEffect)((function(){"completed"===c&&n.push("/quotes")}),[c,n]);return Object(a.jsx)(b,{isLoading:"pending"===c,onAddQuote:function(e){t(e)}})}}}]);
//# sourceMappingURL=4.b8fad1ae.chunk.js.map