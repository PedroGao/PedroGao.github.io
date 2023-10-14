import{N as j,d as h}from"./network-55f51cec.js";import{V as u,I as g,r as k}from"./op-fac60542.js";import{o as v,c as I,N as D,P as w,a as d,r as y,e as f}from"./app-c1430808.js";import{_}from"./plugin-vue_export-helper-c27b6911.js";class S{constructor(t){const e=t??k(6);this.content=[],this.length=0,this.vector={},this.clientId=e}insert(t,e){var o,c;const n=this.vector[this.clientId]??-1,s=this.findPositionByIndex(t),i={content:e,id:[this.clientId,n+1],isDeleted:!1,originLeft:((o=this.content[s-1])==null?void 0:o.id)??null,originRight:((c=this.content[s])==null?void 0:c.id)??null};this.integrate(i)}delete(t){const e=this.findPositionByIndex(t),n=this.content[e];if(!n)throw new Error("Item not found");n.isDeleted=!0,this.length-=1}getContent(){return this.content.filter(t=>!t.isDeleted&&t.content!==null).map(t=>t.content)}getVector(){return this.vector}getMissing(t){return this.content.filter(e=>!u.in(e.id,t))}getDeleteSet(){const t=new Set;for(const e of this.content.values())e.isDeleted&&(t.has(e.id)||t.add(e.id));return Array.from(t)}apply(t,e){t=t.filter(s=>{if(s===null)return!1;const i=this.vector[s.id[0]]??-1,o=s.id[1];return!(i>=o)});let n=t.length;if(n===0){console.log("Nothing to merge"),this.mergeDeleteSet(e);return}for(;n>0;)for(let s=0;s<t.length;s++){const i=t[s];i===null||!this.canInsert(i)||(this.integrate(i),t.splice(s,1),n--)}}merge(t){const e=t.getMissing(this.vector),n=t.getDeleteSet();this.apply(e,n)}mergeDeleteSet(t){const e=n=>{for(const s of t.values())if(g.equals(s,n))return!0;return!1};for(const n of this.content.values())n.content!==null&&!n.isDeleted&&e(n.id)&&(n.isDeleted=!0)}integrate(t){const e=this.vector[t.id[0]]??-1,n=t.id[1];if(e+1!==n)throw new Error("Clock not match");this.vector[t.id[0]]=n;let s=this.findItemById(t.originLeft),i=this.findItemById(t.originRight),o=s+1,c=!1;for(let l=o;c||(o=l),!(l===this.content.length||l===i);l++){const p=this.content[l],a=this.findItemById(t.originLeft),m=this.findItemById(t.originRight);if(a<s||a===s&&m==i&&t.id[0]<=p.id[0])break;a===s&&(c=t.id[0]<=p.id[0])}t.isDeleted||(this.length+=1),this.content.splice(o,0,t)}canInsert(t){return!u.in(t.id,this.vector)&&(t.id[1]===0||u.in([t.id[0],t.id[1]-1],this.vector))&&u.in(t.originLeft,this.vector)&&u.in(t.originRight,this.vector)}findItemById(t){if(t===null)return-1;let e=0;for(;e<this.content.length;e++){const n=this.content[e];if(g.equals(n.id,t))return e}return-1}findPositionByIndex(t){if(t<0)throw new Error("Index out of range");if(this.content.length===0){if(t===0)return 0;throw new Error("Index out of range")}let e=t,n=0;for(;n<this.content.length;n++)if(!this.content[n].isDeleted){if(e===0)break;e--}return n}}const N={data(){return{doc:new S,value:""}},mounted(){},methods:{trigger(){this.value=this.doc.getContent().join(""),this.$emit("output",{value:this.value})},getVector(){return this.doc.getVector()},getMissing(r){return this.doc.getMissing(r)},getDeleteSet(){return this.doc.getDeleteSet()},merge(r,t){this.doc.apply(r,t),this.value=this.doc.getContent().join("")},input(r){const{data:t,inputType:e,srcElement:n}=r,{selectionStart:s,selectionEnd:i}=n;switch(e){case"insertText":this.doc.insert(s-1,t),this.trigger();break;case"deleteContentBackward":this.doc.delete(s),this.trigger();break;default:console.log("unsupport Operation: ",t,e,s,i)}}}},x={class:"container"};function $(r,t,e,n,s,i){return v(),I("div",x,[D(d("input",{class:"editor","onUpdate:modelValue":t[0]||(t[0]=o=>s.value=o),onInput:t[1]||(t[1]=(...o)=>i.input&&i.input(...o))},null,544),[[w,s.value]])])}const O=_(N,[["render",$],["__file","Yjs.vue"]]);const B={components:{NetworkSetting:j,Yjs:O},data(){return{channel1:null,channel2:null}},mounted(){this.channel1=h.createChannel("yjsInput1"),this.channel1.receive(r=>{const{type:t,vector:e,items:n,ds:s}=JSON.parse(r);if(t==="step1"){const i=this.$refs.yjsInput1.getVector();this.channel1.send("yjsInput2",JSON.stringify({type:"step2",vector:i}))}else if(t==="step2"){const i=this.$refs.yjsInput1.getMissing(e),o=this.$refs.yjsInput1.getDeleteSet(),c=this.$refs.yjsInput1.getVector();this.channel1.send("yjsInput2",JSON.stringify({type:"step3",vector:c,items:i,ds:o}))}else t==="step3"&&this.$refs.yjsInput1.merge(n,s)}),this.channel2=h.createChannel("yjsInput2"),this.channel2.receive(r=>{const{type:t,vector:e,items:n,ds:s}=JSON.parse(r);if(t==="step1"){const i=this.$refs.yjsInput2.getVector();this.channel2.send("yjsInput1",JSON.stringify({type:"step2",vector:i}))}else if(t==="step2"){const i=this.$refs.yjsInput2.getMissing(e),o=this.$refs.yjsInput2.getDeleteSet(),c=this.$refs.yjsInput2.getVector();this.channel2.send("yjsInput1",JSON.stringify({type:"step3",vector:c,items:i,ds:o}))}else t==="step3"&&this.$refs.yjsInput2.merge(n,s)})},methods:{networkTrigger({online:r,delay:t}){const e=parseInt(t);h.setDelay(e),h.setEnable(r)},output1({value:r}){const t={type:"step1"};this.channel1.send("yjsInput2",JSON.stringify(t))},output2({value:r}){const t={type:"step1"};this.channel2.send("yjsInput1",JSON.stringify(t))}}},V={class:"flex-list"},C={class:"flex-list-item"},E={class:"flex-list-item"};function J(r,t,e,n,s,i){const o=y("network-setting"),c=y("yjs");return v(),I("div",null,[f(o,{onNetwork:i.networkTrigger},null,8,["onNetwork"]),d("div",V,[d("div",C,[f(c,{ref:"yjsInput1",onOutput:i.output1},null,8,["onOutput"])]),d("div",E,[f(c,{ref:"yjsInput2",onOutput:i.output2},null,8,["onOutput"])])])])}const L=_(B,[["render",J],["__file","YjsDemo.vue"]]);export{L as default};
