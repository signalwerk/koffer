(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{247:function(t,e,r){var content=r(256);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(51).default)("1d2ef59b",content,!0,{sourceMap:!1})},248:function(t,e,r){var content=r(258);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(51).default)("2055ed35",content,!0,{sourceMap:!1})},255:function(t,e,r){"use strict";var n=r(247);r.n(n).a},256:function(t,e,r){(e=r(50)(!1)).push([t.i,"*[data-v-722949b1]{box-sizing:border-box}.Card[data-v-722949b1]{position:absolute;width:250px;height:250px;padding:20px}.Card--inner[data-v-722949b1]{height:100%;background-color:#fefac7}input[data-v-722949b1]{width:auto;margin:20px;display:block}",""]),t.exports=e},257:function(t,e,r){"use strict";var n=r(248);r.n(n).a},258:function(t,e,r){(e=r(50)(!1)).push([t.i,"*[data-v-54f8d357]{box-sizing:border-box}.Board[data-v-54f8d357]{height:100vh;width:100vw;background-color:#f8f8fc}.Board[data-v-54f8d357],.CardList[data-v-54f8d357]{position:relative}.CardList[data-v-54f8d357]{transform:translate(50vw,50vh)}.Button--addCard[data-v-54f8d357]{position:absolute;font-size:21px;left:0;top:0}",""]),t.exports=e},300:function(t,e,r){"use strict";r.r(e);r(72),r(17),r(18),r(11),r(52);var n=r(30),o=r(88),d=r(254),c={components:{Moveable:r.n(d).a},props:{value:{type:Object,default:function(){return{}}}},data:function(){return{initialPos:{x:0,y:0},moveable:{draggable:!0,throttleDrag:0}}},methods:{handleInput:function(){this.$store.dispatch("cards/updateContent",{id:this.value.id,text:this.$refs.inputText.value})},handleDrag:function(t){var e=t.target,r=t.top,n=t.left,o=t.transform;e.style.transform=o,this.$store.dispatch("cards/updateCardPosition",{id:this.value.id,x:r,y:n})}}},l=(r(255),r(31));function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var v={components:{Card:Object(l.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("Moveable",t._b({staticClass:"moveable Card",on:{drag:t.handleDrag}},"Moveable",t.moveable,!1),[r("div",{staticClass:"Card--inner"},[r("button",{on:{click:function(e){return t.$emit("delete")}}},[t._v("Delete")]),t._v(" "),r("div",[r("label",[t._v("\n        Text:\n        "),r("input",{ref:"inputText",domProps:{value:t.value.text},on:{input:t.handleInput}})])]),t._v(" "),r("details",[r("summary",[t._v("info")]),t._v(" "),r("code",[r("pre",[t._v(t._s(JSON.stringify(t.value,null,2)))])])])])])}),[],!1,null,"722949b1",null).exports},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},(0,Object(o.a)("cards").mapState)(["cards"])),methods:{addCard:function(){this.$store.dispatch("cards/addCard")},updateCardContent:function(t,text){this.$store.dispatch("cards/updateCardContent",{id:t,text:text})},updateCardPosition:function(t,e,r){this.$store.dispatch("cards/updateCardPosition",{id:t,x:e,y:r})},deleteCard:function(t){this.$store.dispatch("cards/deleteCard",t)}}},h=(r(257),{components:{Board:Object(l.a)(v,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"Board"},[r("div",{staticClass:"CardList"},t._l(t.cards,(function(e,n){return r("div",{staticClass:"CardList-item"},[r("card",{key:n,attrs:{value:e},on:{drag:function(e){return t.updateCardPosition(n,e)},input:function(e){return t.updateCardContent(n,e)},delete:function(e){return t.deleteCard(n)}}})],1)})),0),t._v(" "),r("button",{staticClass:"Button--addCard",on:{click:t.addCard}},[t._v("Add new card")])])}),[],!1,null,"54f8d357",null).exports}}),C=Object(l.a)(h,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("board")],1)}),[],!1,null,null,null);e.default=C.exports}}]);