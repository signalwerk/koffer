(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{304:function(t,e,n){var content=n(318);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(21).default)("3c768ded",content,!0,{sourceMap:!1})},317:function(t,e,n){"use strict";var o=n(304);n.n(o).a},318:function(t,e,n){(e=n(20)(!1)).push([t.i,".page-section{width:100%;height:100vh;display:flex;align-items:center;justify-items:center;justify-content:center;flex-direction:column;position:absolute}",""]),t.exports=e},321:function(t,e,n){var content=n(353);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(21).default)("28eb920e",content,!0,{sourceMap:!1})},323:function(t,e,n){"use strict";n(317);var o=n(3),component=Object(o.a)({},(function(){var t=this.$createElement;return(this._self._c||t)("section",{staticClass:"page-section"},[this._t("default")],2)}),[],!1,null,null,null);e.a=component.exports},352:function(t,e,n){"use strict";var o=n(321);n.n(o).a},353:function(t,e,n){(e=n(20)(!1)).push([t.i,".page-progress{position:absolute}.lead{margin-bottom:40px}.done-button{margin-top:40px;width:100px}",""]),t.exports=e},360:function(t,e,n){"use strict";n.r(e);var o={components:{PageSection:n(323).a},transition:{name:"slide-fade",mode:"out-in"},data:function(){return{step:1,userName:"",sessionName:"Dummy name until hooked"}},methods:{persistSettings:function(){this.$store.dispatch("session/setSettings",{userName:this.userName,sessionName:this.sessionName})}}},r=(n(352),n(3)),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-section-container"},[n("header",{staticClass:"header"},[n("div",{staticClass:"bold"},[t._v("\n      "+t._s(t.sessionName)+"\n    ")])]),t._v(" "),n("transition",{attrs:{name:"slide",mode:"out-in"}},[n("page-section",[n("h1",{staticClass:"bold"},[t._v("\n        Signers Koffer\n      ")]),t._v(" "),n("p",{staticClass:"h2 lead"},[t._v("\n        👋 John invites you to his session.\n      ")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.userName,expression:"userName"}],attrs:{placeholder:"Name"},domProps:{value:t.userName},on:{input:function(e){e.target.composing||(t.userName=e.target.value)}}}),t._v(" "),n("nuxt-link",{staticClass:"button button--primary",attrs:{to:"/board",tag:"button"},on:{click:t.persistSettings}},[t._v("\n        Submit\n      ")])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);