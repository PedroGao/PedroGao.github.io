import{N as m,d as h}from"./network-55f51cec.js";import{I as c,V as u,r as _}from"./op-fac60542.js";import{o as g,c as f,d as I,N as w,P as y,a,r as p,e as d}from"./app-c1430808.js";import{_ as v}from"./plugin-vue_export-helper-c27b6911.js";class D{constructor(t){const n=t??_(6),s={content:null,id:[n,0],isDeleted:!1,children:[],parent:null};this.root=s.id,this.length=0,this.vector={[n]:0},this.clientId=n,this.store=new Map([[c.hash(s.id),s]])}getContent(){const t=this,n=[],s=[];for(s.push(t.root);s.length>0;){const r=s.shift(),e=t.store.get(c.hash(r));!e.isDeleted&&e.content!==null&&n.push(e.content),s.push(...e.children)}return n}insert(t,n){const s=this.findItemByIndex(t-1);if(!s)throw new Error("Item not found");const r={content:n,id:[this.clientId,this.vector[this.clientId]+1],isDeleted:!1,children:[],parent:s.id};this.integrate(r)}delete(t){const n=this.findItemByIndex(t);if(!n)throw new Error("Item not found");n.isDeleted=!0,this.length-=1}integrate(t){const n=this.vector[t.id[0]]??0,s=t.id[1];if(n>=s)return;if(n+1!==s)throw new Error("Clock not match");this.vector[t.id[0]]=s;const r=t.parent[1]===0?this.store.get(c.hash(this.root)):this.store.get(c.hash(t.parent));if(!r)throw new Error("Parent not found");let e=0;for(;e<r.children.length;e++){const i=r.children[e];if(t.id[0]<=i[0])break}r.children.splice(e,0,t.id),this.store.set(c.hash(t.id),t),!t.isDeleted&&t.content!==null&&(this.length+=1)}getVector(){return this.vector}getMissing(t){const n=[],s=[];for(s.push(this.root);s.length>0;){const r=s.shift(),e=this.store.get(c.hash(r));e.content!==null&&!u.in(e.id,t)&&n.push(r),s.push(...e.children)}return n.map(r=>{const e=this.store.get(c.hash(r));return{content:e.content,id:e.id,isDeleted:e.isDeleted,parent:e.parent,children:[]}})}getDeleteSet(){const t=new Set;for(const n of this.store.values())n.isDeleted&&(t.has(n.id)||t.add(n.id));return Array.from(t)}merge(t,n){t=t.filter(e=>{if(e===null)return!1;const i=this.vector[e.id[0]]??0,l=e.id[1];return!(i>=l)});let s=t.length;if(s===0){console.log("Nothing to merge"),this.mergeDeleteSet(n);return}let r=5;for(;s>0&&r>0;){for(let e=0;e<t.length;e++){const i=t[e];i!==null&&this.canInsert(i)&&(this.integrate(i),t.splice(e,1),s--)}r--}if(this.mergeDeleteSet(n),r===0&&s>0)throw console.error(t),new Error("Merge failed")}mergeDeleteSet(t){const n=[],s=r=>{for(const e of t.values())if(c.equals(e,r))return!0;return!1};for(n.push(this.root);n.length>0;){const r=n.shift(),e=this.store.get(c.hash(r));e.content!==null&&!e.isDeleted&&s(e.id)&&(e.isDeleted=!0),n.push(...e.children)}}canInsert(t){var n;return!u.in(t.id,this.vector)&&(((n=t.parent)==null?void 0:n[1])===0||u.in(t.parent,this.vector))}findItemByIndex(t){if(t===-1)return this.store.get(c.hash(this.root));const n=[];let s=t;for(n.push(this.root);n.length>0;){const r=n.shift(),e=this.store.get(c.hash(r));if(e.content===null){n.push(...e.children);continue}if(s===0&&!e.isDeleted)return e;e.isDeleted||s--,n.push(...e.children)}return null}}const S={data(){return{doc:new D,value:""}},mounted(){},methods:{trigger(){this.value=this.doc.getContent().join(""),this.$emit("output",{value:this.value})},getVector(){return this.doc.getVector()},getMissing(o){return this.doc.getMissing(o)},getDeleteSet(){return this.doc.getDeleteSet()},merge(o,t){this.doc.merge(o,t),this.value=this.doc.getContent().join("")},input(o){const{data:t,inputType:n,srcElement:s}=o,{selectionStart:r,selectionEnd:e}=s;switch(n){case"insertText":this.doc.insert(r-1,t),this.trigger();break;case"deleteContentBackward":this.doc.delete(r),this.trigger();break;default:console.log("unsupport Operation: ",t,n,r,e)}}}},k={class:"container"};function N(o,t,n,s,r,e){return g(),f("div",k,[I(' <p class="text">{{ value }}</p> '),w(a("input",{class:"editor","onUpdate:modelValue":t[0]||(t[0]=i=>r.value=i),onInput:t[1]||(t[1]=(...i)=>e.input&&e.input(...i))},null,544),[[y,r.value]])])}const x=v(S,[["render",N],["__file","RGA.vue"]]);const $={components:{NetworkSetting:m,RGA:x},data(){return{channel1:null,channel2:null}},mounted(){this.channel1=h.createChannel("rgaInput1"),this.channel1.receive(o=>{const{type:t,vector:n,items:s,ds:r}=JSON.parse(o);if(t==="step1"){const e=this.$refs.rgaInput1.getVector();this.channel1.send("rgaInput2",JSON.stringify({type:"step2",vector:e}))}else if(t==="step2"){const e=this.$refs.rgaInput1.getMissing(n),i=this.$refs.rgaInput1.getDeleteSet(),l=this.$refs.rgaInput1.getVector();this.channel1.send("rgaInput2",JSON.stringify({type:"step3",vector:l,items:e,ds:i}))}else t==="step3"&&this.$refs.rgaInput1.merge(s,r)}),this.channel2=h.createChannel("rgaInput2"),this.channel2.receive(o=>{const{type:t,vector:n,items:s,ds:r}=JSON.parse(o);if(t==="step1"){const e=this.$refs.rgaInput2.getVector();this.channel2.send("rgaInput1",JSON.stringify({type:"step2",vector:e}))}else if(t==="step2"){const e=this.$refs.rgaInput2.getMissing(n),i=this.$refs.rgaInput2.getDeleteSet(),l=this.$refs.rgaInput2.getVector();this.channel2.send("rgaInput1",JSON.stringify({type:"step3",vector:l,items:e,ds:i}))}else t==="step3"&&this.$refs.rgaInput2.merge(s,r)})},methods:{networkTrigger({online:o,delay:t}){const n=parseInt(t);h.setDelay(n),h.setEnable(o)},output1({value:o}){const t={type:"step1"};this.channel1.send("rgaInput2",JSON.stringify(t))},output2({value:o}){const t={type:"step1"};this.channel2.send("rgaInput1",JSON.stringify(t))}}},O={class:"flex-list"},V={class:"flex-list-item"},C={class:"flex-list-item"};function A(o,t,n,s,r,e){const i=p("network-setting"),l=p("RGA");return g(),f("div",null,[d(i,{onNetwork:e.networkTrigger},null,8,["onNetwork"]),a("div",O,[a("div",V,[d(l,{ref:"rgaInput1",onOutput:e.output1},null,8,["onOutput"])]),a("div",C,[d(l,{ref:"rgaInput2",onOutput:e.output2},null,8,["onOutput"])])])])}const R=v($,[["render",A],["__file","RGADemo.vue"]]);export{R as default};
