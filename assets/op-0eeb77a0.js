const s=r=>{let t="";const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",a=e.length;for(let n=0;n<r;n++)t+=e.charAt(Math.floor(Math.random()*a));return t};var c=(r=>(r.Increment="increment",r.Decrement="decrement",r.Set="set",r.KV="kv",r))(c||{});const o={equals(r,t){return r===t||r[0]===t[0]&&r[1]===t[1]},hash(r){return`${r[0]}:${r[1]}`}};export{o as I,c as O,s as r};
