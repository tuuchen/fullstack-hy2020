(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(13),u=t.n(c),o=(t(19),t(2)),l=function(e){var n=e.filterName,t=e.handleFilterChange;return r.a.createElement("div",null,"filter by name ",r.a.createElement("input",{value:n,onChange:t}))},i=function(e){var n=e.header;return r.a.createElement("h2",null,n)},m=function(e){var n=e.addPerson,t=e.newName,a=e.newNumber,c=e.handlePersonChange,u=e.handleNumberChange;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"Add a new"),r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:c})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:a,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},s=function(e){var n=e.handleClick,t=e.text;return r.a.createElement("button",{onClick:n},t)},d=function(e){var n=e.namesToShow,t=e.deletePerson;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"Numbers"),r.a.createElement("div",null,n.map((function(e){return e.number||(e.number="(no number)"),r.a.createElement("p",{key:e.id},e.name,", ",e.number," ",r.a.createElement(s,{handleClick:t(e.id,e.name),text:"delete"}))}))))},f=function(e){var n=e.message,t=e.className;return null===n?null:r.a.createElement("div",{className:t},n)},h=t(3),b=t.n(h),v="/api/persons",E=function(){return b.a.get(v).then((function(e){return e.data}))},p=function(e){return b.a.post(v,e).then((function(e){return e.data}))},g=function(e,n){return b.a.put("".concat(v,"/").concat(e),n).then((function(e){return e.data}))},j=function(e){return b.a.delete("".concat(v,"/").concat(e))},O=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],c=n[1],u=Object(a.useState)(""),s=Object(o.a)(u,2),h=s[0],b=s[1],v=Object(a.useState)(""),O=Object(o.a)(v,2),w=O[0],C=O[1],N=Object(a.useState)(""),S=Object(o.a)(N,2),k=S[0],F=S[1],P=Object(a.useState)(t),x=Object(o.a)(P,2),y=x[0],T=x[1],D=Object(a.useState)(""),I=Object(o.a)(D,2),J=I[0],L=I[1],R=Object(a.useState)(""),A=Object(o.a)(R,2),B=A[0],M=A[1],U=Object(a.useState)(""),q=Object(o.a)(U,2),z=q[0],G=q[1];Object(a.useEffect)((function(){E().then((function(e){console.log(e),K(e)}))}),[]);var H=function(e,n){var t=setTimeout((function(){M(null),L(null)}),8e3);clearTimeout(z),G(t),M(n),L(e)},K=function(e){c(e),T(e)},Q=function(){b(""),C("")};return r.a.createElement("div",null,r.a.createElement(i,{header:"Phonebook"}),r.a.createElement(f,{className:B,message:J}),r.a.createElement(l,{filterName:k,handleFilterChange:function(e){F(e.target.value),T(t.filter((function(n){return n.name.toLowerCase().includes(e.target.value.toLowerCase())})))}}),r.a.createElement(m,{addPerson:function(e){e.preventDefault();var n={name:h,number:w},a=t.some((function(e){return e.name===h}));if(h)if(a){if(window.confirm("".concat(h," already exists, update phone number?"))){var r=t.findIndex((function(e){return e.name===h})),c=t[r].id;g(c,n).then((function(e){H("Updated ".concat(e.name,"!"),"success");var n=t.map((function(n){return n.id!==c?n:e}));K(n),Q()})).catch((function(e){console.log("Failure! ",e.response),H(e.response.data.error,"error")}))}}else p(n).then((function(e){H("".concat(e.name," added to phonebook!"),"success"),console.log(e),K(t.concat(e)),Q()})).catch((function(e){console.log("Failure! ",e.response),H(e.response.data.error,"error")}))},newName:h,newNumber:w,handlePersonChange:function(e){b(e.target.value)},handleNumberChange:function(e){C(e.target.value)}}),r.a.createElement(d,{namesToShow:y,deletePerson:function(e,n){return function(a){window.confirm("Delete ".concat(n,"?"))&&j(e).then((function(){console.log("Removed ".concat(n)),H("Removed ".concat(n),"success"),K(t.filter((function(n){return n.id!==e}))),Q()})).catch((function(e){console.log("Failure! ",e)}))}}}))};u.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(O,null)),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.8ff8d330.chunk.js.map