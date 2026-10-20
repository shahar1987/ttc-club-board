(()=>{var eo=()=>{};var ro=function(t){let e=[],n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},hu=function(t){let e=[],n=0,r=0;for(;n<t.length;){let i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){let s=t[n++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){let s=t[n++],o=t[n++],a=t[n++],c=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{let s=t[n++],o=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},io={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();let n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){let s=t[i],o=i+1<t.length,a=o?t[i+1]:0,c=i+2<t.length,h=c?t[i+2]:0,g=s>>2,v=(s&3)<<4|a>>4,y=(a&15)<<2|h>>6,b=h&63;c||(b=64,o||(y=64)),r.push(n[g],n[v],n[y],n[b])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(ro(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):hu(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();let n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){let s=n[t.charAt(i++)],a=i<t.length?n[t.charAt(i)]:0;++i;let h=i<t.length?n[t.charAt(i)]:64;++i;let v=i<t.length?n[t.charAt(i)]:64;if(++i,s==null||a==null||h==null||v==null)throw new Or;let y=s<<2|a>>4;if(r.push(y),h!==64){let b=a<<4&240|h>>2;if(r.push(b),v!==64){let T=h<<6&192|v;r.push(T)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},Or=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},fu=function(t){let e=ro(t);return io.encodeByteArray(e,!0)},_t=function(t){return fu(t).replace(/\./g,"")},rn=function(t){try{return io.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function pu(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var mu=()=>pu().__FIREBASE_DEFAULTS__,gu=()=>{if(typeof process>"u"||typeof process.env>"u")return;let t=process.env.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},_u=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=t&&rn(t[1]);return e&&JSON.parse(e)},Nr=()=>{try{return eo()||mu()||gu()||_u()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Dr=t=>{var e,n;return(n=(e=Nr())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},so=t=>{let e=Dr(t);if(!e)return;let n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);let r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},Lr=()=>{var t;return(t=Nr())===null||t===void 0?void 0:t.config},Vr=t=>{var e;return(e=Nr())===null||e===void 0?void 0:e[`_${t}`]};var nn=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}};function ye(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function sn(t){return(await fetch(t,{credentials:"include"})).ok}function oo(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let n={alg:"none",type:"JWT"},r=e||"demo-project",i=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},t);return[_t(JSON.stringify(n)),_t(JSON.stringify(o)),""].join(".")}var gt={};function yu(){let t={prod:[],emulator:[]};for(let e of Object.keys(gt))gt[e]?t.emulator.push(e):t.prod.push(e);return t}function vu(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}var to=!1;function on(t,e){if(typeof window>"u"||typeof document>"u"||!ye(window.location.host)||gt[t]===e||gt[t]||to)return;gt[t]=e;function n(y){return`__firebase__banner__${y}`}let r="__firebase__banner",s=yu().prod.length>0;function o(){let y=document.getElementById(r);y&&y.remove()}function a(y){y.style.display="flex",y.style.background="#7faaf0",y.style.position="fixed",y.style.bottom="5px",y.style.left="5px",y.style.padding=".5em",y.style.borderRadius="5px",y.style.alignItems="center"}function c(y,b){y.setAttribute("width","24"),y.setAttribute("id",b),y.setAttribute("height","24"),y.setAttribute("viewBox","0 0 24 24"),y.setAttribute("fill","none"),y.style.marginLeft="-6px"}function h(){let y=document.createElement("span");return y.style.cursor="pointer",y.style.marginLeft="16px",y.style.fontSize="24px",y.innerHTML=" &times;",y.onclick=()=>{to=!0,o()},y}function g(y,b){y.setAttribute("id",b),y.innerText="Learn more",y.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",y.setAttribute("target","__blank"),y.style.paddingLeft="5px",y.style.textDecoration="underline"}function v(){let y=vu(r),b=n("text"),T=document.getElementById(b)||document.createElement("span"),R=n("learnmore"),P=document.getElementById(R)||document.createElement("a"),ie=n("preprendIcon"),Q=document.getElementById(ie)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(y.created){let G=y.element;a(G),g(P,R);let fe=h();c(Q,ie),G.append(Q,T,P,fe),document.body.appendChild(G)}s?(T.innerText="Preview backend disconnected.",Q.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(Q.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,T.innerText="Preview backend running in this workspace."),T.setAttribute("id",b)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",v):v()}function F(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ao(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(F())}function co(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function uo(){let t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function lo(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function ho(){let t=F();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function an(){try{return typeof indexedDB=="object"}catch{return!1}}function cn(){return new Promise((t,e)=>{try{let n=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(n){e(n)}})}function fo(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}var wu="FirebaseError",q=class t extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=wu,Object.setPrototypeOf(this,t.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,K.prototype.create)}},K=class{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){let r=n[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?Iu(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new q(i,a,r)}};function Iu(t,e){return t.replace(Eu,(n,r)=>{let i=e[r];return i!=null?String(i):`<${r}?>`})}var Eu=/\{\$([^}]+)}/g;function po(t){for(let e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function oe(t,e){if(t===e)return!0;let n=Object.keys(t),r=Object.keys(e);for(let i of n){if(!r.includes(i))return!1;let s=t[i],o=e[i];if(no(s)&&no(o)){if(!oe(s,o))return!1}else if(s!==o)return!1}for(let i of r)if(!n.includes(i))return!1;return!0}function no(t){return t!==null&&typeof t=="object"}function Ze(t){let e=[];for(let[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function et(t){let e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){let[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function tt(t){let e=t.indexOf("?");if(!e)return"";let n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function mo(t,e){let n=new Cr(t,e);return n.subscribe.bind(n)}var Cr=class{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let i;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");Tu(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:r},i.next===void 0&&(i.next=Rr),i.error===void 0&&(i.error=Rr),i.complete===void 0&&(i.complete=Rr);let s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function Tu(t,e){if(typeof t!="object"||t===null)return!1;for(let n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Rr(){}var Lp=4*60*60*1e3;function k(t){return t&&t._delegate?t._delegate:t}var V=class{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var De="[DEFAULT]";var Mr=class{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){let r=new nn;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;let r=this.normalizeInstanceIdentifier(e?.identifier),i=(n=e?.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Au(e))try{this.getOrInitializeService({instanceIdentifier:De})}catch{}for(let[n,r]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(n);try{let s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=De){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=De){return this.instances.has(e)}getOptions(e=De){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(let[s,o]of this.instancesDeferred.entries()){let a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(e,n){var r;let i=this.normalizeInstanceIdentifier(n),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);let o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){let r=this.onInitCallbacks.get(n);if(r)for(let i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:bu(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=De){return this.component?this.component.multipleInstances?e:De:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function bu(t){return t===De?void 0:t}function Au(t){return t.instantiationMode==="EAGER"}var un=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let n=new Mr(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}};var Su=[],S;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(S||(S={}));var Pu={debug:S.DEBUG,verbose:S.VERBOSE,info:S.INFO,warn:S.WARN,error:S.ERROR,silent:S.SILENT},ku=S.INFO,Ru={[S.DEBUG]:"log",[S.VERBOSE]:"log",[S.INFO]:"info",[S.WARN]:"warn",[S.ERROR]:"error"},Ou=(t,e,...n)=>{if(e<t.logLevel)return;let r=new Date().toISOString(),i=Ru[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},ve=class{constructor(e){this.name=e,this._logLevel=ku,this._logHandler=Ou,this._userLogHandler=null,Su.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in S))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Pu[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,S.DEBUG,...e),this._logHandler(this,S.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,S.VERBOSE,...e),this._logHandler(this,S.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,S.INFO,...e),this._logHandler(this,S.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,S.WARN,...e),this._logHandler(this,S.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,S.ERROR,...e),this._logHandler(this,S.ERROR,...e)}};var Cu=(t,e)=>e.some(n=>t instanceof n),go,_o;function Nu(){return go||(go=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Du(){return _o||(_o=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var yo=new WeakMap,Fr=new WeakMap,vo=new WeakMap,xr=new WeakMap,jr=new WeakMap;function Lu(t){let e=new Promise((n,r)=>{let i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(te(t.result)),i()},o=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&yo.set(n,t)}).catch(()=>{}),jr.set(e,t),e}function Vu(t){if(Fr.has(t))return;let e=new Promise((n,r)=>{let i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});Fr.set(t,e)}var Ur={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Fr.get(t);if(e==="objectStoreNames")return t.objectStoreNames||vo.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return te(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function wo(t){Ur=t(Ur)}function Mu(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){let r=t.call(ln(this),e,...n);return vo.set(r,e.sort?e.sort():[e]),te(r)}:Du().includes(t)?function(...e){return t.apply(ln(this),e),te(yo.get(this))}:function(...e){return te(t.apply(ln(this),e))}}function xu(t){return typeof t=="function"?Mu(t):(t instanceof IDBTransaction&&Vu(t),Cu(t,Nu())?new Proxy(t,Ur):t)}function te(t){if(t instanceof IDBRequest)return Lu(t);if(xr.has(t))return xr.get(t);let e=xu(t);return e!==t&&(xr.set(t,e),jr.set(e,t)),e}var ln=t=>jr.get(t);function Le(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){let o=indexedDB.open(t,e),a=te(o);return r&&o.addEventListener("upgradeneeded",c=>{r(te(o.result),c.oldVersion,c.newVersion,te(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",h=>i(h.oldVersion,h.newVersion,h))}).catch(()=>{}),a}function dn(t,{blocked:e}={}){let n=indexedDB.deleteDatabase(t);return e&&n.addEventListener("blocked",r=>e(r.oldVersion,r)),te(n).then(()=>{})}var Fu=["get","getKey","getAll","getAllKeys","count"],Uu=["put","add","delete","clear"],qr=new Map;function Io(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(qr.get(e))return qr.get(e);let n=e.replace(/FromIndex$/,""),r=e!==n,i=Uu.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Fu.includes(n)))return;let s=async function(o,...a){let c=this.transaction(o,i?"readwrite":"readonly"),h=c.store;return r&&(h=h.index(a.shift())),(await Promise.all([h[n](...a),i&&c.done]))[0]};return qr.set(e,s),s}wo(t=>({...t,get:(e,n,r)=>Io(e,n)||t.get(e,n,r),has:(e,n)=>!!Io(e,n)||t.has(e,n)}));var $r=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(ju(n)){let r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}};function ju(t){let e=t.getComponent();return e?.type==="VERSION"}var Hr="@firebase/app",Eo="0.13.2";var pe=new ve("@firebase/app"),qu="@firebase/app-compat",Bu="@firebase/analytics-compat",$u="@firebase/analytics",Hu="@firebase/app-check-compat",Wu="@firebase/app-check",zu="@firebase/auth",Gu="@firebase/auth-compat",Ku="@firebase/database",Ju="@firebase/data-connect",Yu="@firebase/database-compat",Qu="@firebase/functions",Xu="@firebase/functions-compat",Zu="@firebase/installations",el="@firebase/installations-compat",tl="@firebase/messaging",nl="@firebase/messaging-compat",rl="@firebase/performance",il="@firebase/performance-compat",sl="@firebase/remote-config",ol="@firebase/remote-config-compat",al="@firebase/storage",cl="@firebase/storage-compat",ul="@firebase/firestore",ll="@firebase/ai",dl="@firebase/firestore-compat",hl="firebase",fl="11.10.0";var Wr="[DEFAULT]",pl={[Hr]:"fire-core",[qu]:"fire-core-compat",[$u]:"fire-analytics",[Bu]:"fire-analytics-compat",[Wu]:"fire-app-check",[Hu]:"fire-app-check-compat",[zu]:"fire-auth",[Gu]:"fire-auth-compat",[Ku]:"fire-rtdb",[Ju]:"fire-data-connect",[Yu]:"fire-rtdb-compat",[Qu]:"fire-fn",[Xu]:"fire-fn-compat",[Zu]:"fire-iid",[el]:"fire-iid-compat",[tl]:"fire-fcm",[nl]:"fire-fcm-compat",[rl]:"fire-perf",[il]:"fire-perf-compat",[sl]:"fire-rc",[ol]:"fire-rc-compat",[al]:"fire-gcs",[cl]:"fire-gcs-compat",[ul]:"fire-fst",[dl]:"fire-fst-compat",[ll]:"fire-vertex","fire-js":"fire-js",[hl]:"fire-js-all"};var hn=new Map,ml=new Map,zr=new Map;function To(t,e){try{t.container.addComponent(e)}catch(n){pe.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function W(t){let e=t.name;if(zr.has(e))return pe.debug(`There were multiple attempts to register component ${e}.`),!1;zr.set(e,t);for(let n of hn.values())To(n,t);for(let n of ml.values())To(n,t);return!0}function ae(t,e){let n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function J(t){return t==null?!1:t.settings!==void 0}var gl={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},we=new K("app","Firebase",gl);var Gr=class{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new V("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw we.create("app-deleted",{appName:this._name})}};var Ie=fl;function Yr(t,e={}){let n=t;typeof e!="object"&&(e={name:e});let r=Object.assign({name:Wr,automaticDataCollectionEnabled:!0},e),i=r.name;if(typeof i!="string"||!i)throw we.create("bad-app-name",{appName:String(i)});if(n||(n=Lr()),!n)throw we.create("no-options");let s=hn.get(i);if(s){if(oe(n,s.options)&&oe(r,s.config))return s;throw we.create("duplicate-app",{appName:i})}let o=new un(i);for(let c of zr.values())o.addComponent(c);let a=new Gr(n,r,o);return hn.set(i,a),a}function Ve(t=Wr){let e=hn.get(t);if(!e&&t===Wr&&Lr())return Yr();if(!e)throw we.create("no-app",{appName:t});return e}function x(t,e,n){var r;let i=(r=pl[t])!==null&&r!==void 0?r:t;n&&(i+=`-${n}`);let s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){let a=[`Unable to register library "${i}" with version "${e}":`];s&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),pe.warn(a.join(" "));return}W(new V(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}var _l="firebase-heartbeat-database",yl=1,yt="firebase-heartbeat-store",Br=null;function Po(){return Br||(Br=Le(_l,yl,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(yt)}catch(n){console.warn(n)}}}}).catch(t=>{throw we.create("idb-open",{originalErrorMessage:t.message})})),Br}async function vl(t){try{let n=(await Po()).transaction(yt),r=await n.objectStore(yt).get(ko(t));return await n.done,r}catch(e){if(e instanceof q)pe.warn(e.message);else{let n=we.create("idb-get",{originalErrorMessage:e?.message});pe.warn(n.message)}}}async function bo(t,e){try{let r=(await Po()).transaction(yt,"readwrite");await r.objectStore(yt).put(e,ko(t)),await r.done}catch(n){if(n instanceof q)pe.warn(n.message);else{let r=we.create("idb-set",{originalErrorMessage:n?.message});pe.warn(r.message)}}}function ko(t){return`${t.name}!${t.options.appId}`}var wl=1024,Il=30,Kr=class{constructor(e){this.container=e,this._heartbeatsCache=null;let n=this.container.getProvider("app").getImmediate();this._storage=new Jr(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{let i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Ao();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>Il){let o=Tl(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){pe.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let n=Ao(),{heartbeatsToSend:r,unsentEntries:i}=El(this._heartbeatsCache.heartbeats),s=_t(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(n){return pe.warn(n),""}}};function Ao(){return new Date().toISOString().substring(0,10)}function El(t,e=wl){let n=[],r=t.slice();for(let i of t){let s=n.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),So(n)>e){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),So(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}var Jr=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return an()?cn().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let n=await vl(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){let i=await this.read();return bo(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){let i=await this.read();return bo(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}};function So(t){return _t(JSON.stringify({version:2,heartbeats:t})).length}function Tl(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}function bl(t){W(new V("platform-logger",e=>new $r(e),"PRIVATE")),W(new V("heartbeat",e=>new Kr(e),"PRIVATE")),x(Hr,Eo,t),x(Hr,Eo,"esm2017"),x("fire-js","")}bl("");var Al="firebase",Sl="11.10.0";x(Al,Sl,"app");var Co="@firebase/installations",ei="0.6.18";var No=1e4,Do=`w:${ei}`,Lo="FIS_v2",Pl="https://firebaseinstallations.googleapis.com/v1",kl=60*60*1e3,Rl="installations",Ol="Installations";var Cl={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},xe=new K(Rl,Ol,Cl);function Vo(t){return t instanceof q&&t.code.includes("request-failed")}function Mo({projectId:t}){return`${Pl}/projects/${t}/installations`}function xo(t){return{token:t.token,requestStatus:2,expiresIn:Dl(t.expiresIn),creationTime:Date.now()}}async function Fo(t,e){let r=(await e.json()).error;return xe.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function Uo({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function Nl(t,{refreshToken:e}){let n=Uo(t);return n.append("Authorization",Ll(e)),n}async function jo(t){let e=await t();return e.status>=500&&e.status<600?t():e}function Dl(t){return Number(t.replace("s","000"))}function Ll(t){return`${Lo} ${t}`}async function Vl({appConfig:t,heartbeatServiceProvider:e},{fid:n}){let r=Mo(t),i=Uo(t),s=e.getImmediate({optional:!0});if(s){let h=await s.getHeartbeatsHeader();h&&i.append("x-firebase-client",h)}let o={fid:n,authVersion:Lo,appId:t.appId,sdkVersion:Do},a={method:"POST",headers:i,body:JSON.stringify(o)},c=await jo(()=>fetch(r,a));if(c.ok){let h=await c.json();return{fid:h.fid||n,registrationStatus:2,refreshToken:h.refreshToken,authToken:xo(h.authToken)}}else throw await Fo("Create Installation",c)}function qo(t){return new Promise(e=>{setTimeout(e,t)})}function Ml(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}var xl=/^[cdef][\w-]{21}$/,Zr="";function Fl(){try{let t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;let n=Ul(t);return xl.test(n)?n:Zr}catch{return Zr}}function Ul(t){return Ml(t).substr(0,22)}function pn(t){return`${t.appName}!${t.appId}`}var Bo=new Map;function $o(t,e){let n=pn(t);Ho(n,e),jl(n,e)}function Ho(t,e){let n=Bo.get(t);if(n)for(let r of n)r(e)}function jl(t,e){let n=ql();n&&n.postMessage({key:t,fid:e}),Bl()}var Me=null;function ql(){return!Me&&"BroadcastChannel"in self&&(Me=new BroadcastChannel("[Firebase] FID Change"),Me.onmessage=t=>{Ho(t.data.key,t.data.fid)}),Me}function Bl(){Bo.size===0&&Me&&(Me.close(),Me=null)}var $l="firebase-installations-database",Hl=1,Fe="firebase-installations-store",Qr=null;function ti(){return Qr||(Qr=Le($l,Hl,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Fe)}}})),Qr}async function fn(t,e){let n=pn(t),i=(await ti()).transaction(Fe,"readwrite"),s=i.objectStore(Fe),o=await s.get(n);return await s.put(e,n),await i.done,(!o||o.fid!==e.fid)&&$o(t,e.fid),e}async function Wo(t){let e=pn(t),r=(await ti()).transaction(Fe,"readwrite");await r.objectStore(Fe).delete(e),await r.done}async function mn(t,e){let n=pn(t),i=(await ti()).transaction(Fe,"readwrite"),s=i.objectStore(Fe),o=await s.get(n),a=e(o);return a===void 0?await s.delete(n):await s.put(a,n),await i.done,a&&(!o||o.fid!==a.fid)&&$o(t,a.fid),a}async function ni(t){let e,n=await mn(t.appConfig,r=>{let i=Wl(r),s=zl(t,i);return e=s.registrationPromise,s.installationEntry});return n.fid===Zr?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function Wl(t){let e=t||{fid:Fl(),registrationStatus:0};return zo(e)}function zl(t,e){if(e.registrationStatus===0){if(!navigator.onLine){let i=Promise.reject(xe.create("app-offline"));return{installationEntry:e,registrationPromise:i}}let n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=Gl(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:Kl(t)}:{installationEntry:e}}async function Gl(t,e){try{let n=await Vl(t,e);return fn(t.appConfig,n)}catch(n){throw Vo(n)&&n.customData.serverCode===409?await Wo(t.appConfig):await fn(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function Kl(t){let e=await Ro(t.appConfig);for(;e.registrationStatus===1;)await qo(100),e=await Ro(t.appConfig);if(e.registrationStatus===0){let{installationEntry:n,registrationPromise:r}=await ni(t);return r||n}return e}function Ro(t){return mn(t,e=>{if(!e)throw xe.create("installation-not-found");return zo(e)})}function zo(t){return Jl(t)?{fid:t.fid,registrationStatus:0}:t}function Jl(t){return t.registrationStatus===1&&t.registrationTime+No<Date.now()}async function Yl({appConfig:t,heartbeatServiceProvider:e},n){let r=Ql(t,n),i=Nl(t,n),s=e.getImmediate({optional:!0});if(s){let h=await s.getHeartbeatsHeader();h&&i.append("x-firebase-client",h)}let o={installation:{sdkVersion:Do,appId:t.appId}},a={method:"POST",headers:i,body:JSON.stringify(o)},c=await jo(()=>fetch(r,a));if(c.ok){let h=await c.json();return xo(h)}else throw await Fo("Generate Auth Token",c)}function Ql(t,{fid:e}){return`${Mo(t)}/${e}/authTokens:generate`}async function ri(t,e=!1){let n,r=await mn(t.appConfig,s=>{if(!Go(s))throw xe.create("not-registered");let o=s.authToken;if(!e&&ed(o))return s;if(o.requestStatus===1)return n=Xl(t,e),s;{if(!navigator.onLine)throw xe.create("app-offline");let a=nd(s);return n=Zl(t,a),a}});return n?await n:r.authToken}async function Xl(t,e){let n=await Oo(t.appConfig);for(;n.authToken.requestStatus===1;)await qo(100),n=await Oo(t.appConfig);let r=n.authToken;return r.requestStatus===0?ri(t,e):r}function Oo(t){return mn(t,e=>{if(!Go(e))throw xe.create("not-registered");let n=e.authToken;return rd(n)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function Zl(t,e){try{let n=await Yl(t,e),r=Object.assign(Object.assign({},e),{authToken:n});return await fn(t.appConfig,r),n}catch(n){if(Vo(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await Wo(t.appConfig);else{let r=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await fn(t.appConfig,r)}throw n}}function Go(t){return t!==void 0&&t.registrationStatus===2}function ed(t){return t.requestStatus===2&&!td(t)}function td(t){let e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+kl}function nd(t){let e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}function rd(t){return t.requestStatus===1&&t.requestTime+No<Date.now()}async function id(t){let e=t,{installationEntry:n,registrationPromise:r}=await ni(e);return r?r.catch(console.error):ri(e).catch(console.error),n.fid}async function sd(t,e=!1){let n=t;return await od(n),(await ri(n,e)).token}async function od(t){let{registrationPromise:e}=await ni(t);e&&await e}function ad(t){if(!t||!t.options)throw Xr("App Configuration");if(!t.name)throw Xr("App Name");let e=["projectId","apiKey","appId"];for(let n of e)if(!t.options[n])throw Xr(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function Xr(t){return xe.create("missing-app-config-values",{valueName:t})}var Ko="installations",cd="installations-internal",ud=t=>{let e=t.getProvider("app").getImmediate(),n=ad(e),r=ae(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},ld=t=>{let e=t.getProvider("app").getImmediate(),n=ae(e,Ko).getImmediate();return{getId:()=>id(n),getToken:i=>sd(n,i)}};function dd(){W(new V(Ko,ud,"PUBLIC")),W(new V(cd,ld,"PRIVATE"))}dd();x(Co,ei);x(Co,ei,"esm2017");var hd="/firebase-messaging-sw.js",fd="/firebase-cloud-messaging-push-scope",na="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",pd="https://fcmregistrations.googleapis.com/v1",ra="google.c.a.c_id",md="google.c.a.c_l",gd="google.c.a.ts",_d="google.c.a.e",Jo=1e4,Yo;(function(t){t[t.DATA_MESSAGE=1]="DATA_MESSAGE",t[t.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(Yo||(Yo={}));var vt;(function(t){t.PUSH_RECEIVED="push-received",t.NOTIFICATION_CLICKED="notification-clicked"})(vt||(vt={}));function me(t){let e=new Uint8Array(t);return btoa(String.fromCharCode(...e)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function yd(t){let e="=".repeat((4-t.length%4)%4),n=(t+e).replace(/\-/g,"+").replace(/_/g,"/"),r=atob(n),i=new Uint8Array(r.length);for(let s=0;s<r.length;++s)i[s]=r.charCodeAt(s);return i}var ii="fcm_token_details_db",vd=5,Qo="fcm_token_object_Store";async function wd(t){if("databases"in indexedDB&&!(await indexedDB.databases()).map(s=>s.name).includes(ii))return null;let e=null;return(await Le(ii,vd,{upgrade:async(r,i,s,o)=>{var a;if(i<2||!r.objectStoreNames.contains(Qo))return;let c=o.objectStore(Qo),h=await c.index("fcmSenderId").get(t);if(await c.clear(),!!h){if(i===2){let g=h;if(!g.auth||!g.p256dh||!g.endpoint)return;e={token:g.fcmToken,createTime:(a=g.createTime)!==null&&a!==void 0?a:Date.now(),subscriptionOptions:{auth:g.auth,p256dh:g.p256dh,endpoint:g.endpoint,swScope:g.swScope,vapidKey:typeof g.vapidKey=="string"?g.vapidKey:me(g.vapidKey)}}}else if(i===3){let g=h;e={token:g.fcmToken,createTime:g.createTime,subscriptionOptions:{auth:me(g.auth),p256dh:me(g.p256dh),endpoint:g.endpoint,swScope:g.swScope,vapidKey:me(g.vapidKey)}}}else if(i===4){let g=h;e={token:g.fcmToken,createTime:g.createTime,subscriptionOptions:{auth:me(g.auth),p256dh:me(g.p256dh),endpoint:g.endpoint,swScope:g.swScope,vapidKey:me(g.vapidKey)}}}}}})).close(),await dn(ii),await dn("fcm_vapid_details_db"),await dn("undefined"),Id(e)?e:null}function Id(t){if(!t||!t.subscriptionOptions)return!1;let{subscriptionOptions:e}=t;return typeof t.createTime=="number"&&t.createTime>0&&typeof t.token=="string"&&t.token.length>0&&typeof e.auth=="string"&&e.auth.length>0&&typeof e.p256dh=="string"&&e.p256dh.length>0&&typeof e.endpoint=="string"&&e.endpoint.length>0&&typeof e.swScope=="string"&&e.swScope.length>0&&typeof e.vapidKey=="string"&&e.vapidKey.length>0}var Ed="firebase-messaging-database",Td=1,wt="firebase-messaging-store",si=null;function ia(){return si||(si=Le(Ed,Td,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(wt)}}})),si}async function bd(t){let e=sa(t),r=await(await ia()).transaction(wt).objectStore(wt).get(e);if(r)return r;{let i=await wd(t.appConfig.senderId);if(i)return await ci(t,i),i}}async function ci(t,e){let n=sa(t),i=(await ia()).transaction(wt,"readwrite");return await i.objectStore(wt).put(e,n),await i.done,e}function sa({appConfig:t}){return t.appId}var Ad={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},B=new K("messaging","Messaging",Ad);async function Sd(t,e){let n=await li(t),r=oa(e),i={method:"POST",headers:n,body:JSON.stringify(r)},s;try{s=await(await fetch(ui(t.appConfig),i)).json()}catch(o){throw B.create("token-subscribe-failed",{errorInfo:o?.toString()})}if(s.error){let o=s.error.message;throw B.create("token-subscribe-failed",{errorInfo:o})}if(!s.token)throw B.create("token-subscribe-no-token");return s.token}async function Pd(t,e){let n=await li(t),r=oa(e.subscriptionOptions),i={method:"PATCH",headers:n,body:JSON.stringify(r)},s;try{s=await(await fetch(`${ui(t.appConfig)}/${e.token}`,i)).json()}catch(o){throw B.create("token-update-failed",{errorInfo:o?.toString()})}if(s.error){let o=s.error.message;throw B.create("token-update-failed",{errorInfo:o})}if(!s.token)throw B.create("token-update-no-token");return s.token}async function kd(t,e){let r={method:"DELETE",headers:await li(t)};try{let s=await(await fetch(`${ui(t.appConfig)}/${e}`,r)).json();if(s.error){let o=s.error.message;throw B.create("token-unsubscribe-failed",{errorInfo:o})}}catch(i){throw B.create("token-unsubscribe-failed",{errorInfo:i?.toString()})}}function ui({projectId:t}){return`${pd}/projects/${t}/registrations`}async function li({appConfig:t,installations:e}){let n=await e.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function oa({p256dh:t,auth:e,endpoint:n,vapidKey:r}){let i={web:{endpoint:n,auth:e,p256dh:t}};return r!==na&&(i.web.applicationPubKey=r),i}var Rd=7*24*60*60*1e3;async function Od(t){let e=await Nd(t.swRegistration,t.vapidKey),n={vapidKey:t.vapidKey,swScope:t.swRegistration.scope,endpoint:e.endpoint,auth:me(e.getKey("auth")),p256dh:me(e.getKey("p256dh"))},r=await bd(t.firebaseDependencies);if(r){if(Dd(r.subscriptionOptions,n))return Date.now()>=r.createTime+Rd?Cd(t,{token:r.token,createTime:Date.now(),subscriptionOptions:n}):r.token;try{await kd(t.firebaseDependencies,r.token)}catch(i){console.warn(i)}return Xo(t.firebaseDependencies,n)}else return Xo(t.firebaseDependencies,n)}async function Cd(t,e){try{let n=await Pd(t.firebaseDependencies,e),r=Object.assign(Object.assign({},e),{token:n,createTime:Date.now()});return await ci(t.firebaseDependencies,r),n}catch(n){throw n}}async function Xo(t,e){let r={token:await Sd(t,e),createTime:Date.now(),subscriptionOptions:e};return await ci(t,r),r.token}async function Nd(t,e){let n=await t.pushManager.getSubscription();return n||t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:yd(e)})}function Dd(t,e){let n=e.vapidKey===t.vapidKey,r=e.endpoint===t.endpoint,i=e.auth===t.auth,s=e.p256dh===t.p256dh;return n&&r&&i&&s}function Zo(t){let e={from:t.from,collapseKey:t.collapse_key,messageId:t.fcmMessageId};return Ld(e,t),Vd(e,t),Md(e,t),e}function Ld(t,e){if(!e.notification)return;t.notification={};let n=e.notification.title;n&&(t.notification.title=n);let r=e.notification.body;r&&(t.notification.body=r);let i=e.notification.image;i&&(t.notification.image=i);let s=e.notification.icon;s&&(t.notification.icon=s)}function Vd(t,e){e.data&&(t.data=e.data)}function Md(t,e){var n,r,i,s,o;if(!e.fcmOptions&&!(!((n=e.notification)===null||n===void 0)&&n.click_action))return;t.fcmOptions={};let a=(i=(r=e.fcmOptions)===null||r===void 0?void 0:r.link)!==null&&i!==void 0?i:(s=e.notification)===null||s===void 0?void 0:s.click_action;a&&(t.fcmOptions.link=a);let c=(o=e.fcmOptions)===null||o===void 0?void 0:o.analytics_label;c&&(t.fcmOptions.analyticsLabel=c)}function xd(t){return typeof t=="object"&&!!t&&ra in t}Fd("AzSCbw63g1R0nCw85jG8","Iaya3yLKwmgvh7cF0q4");function Fd(t,e){let n=[];for(let r=0;r<t.length;r++)n.push(t.charAt(r)),r<e.length&&n.push(e.charAt(r));return n.join("")}function Ud(t){if(!t||!t.options)throw oi("App Configuration Object");if(!t.name)throw oi("App Name");let e=["projectId","apiKey","appId","messagingSenderId"],{options:n}=t;for(let r of e)if(!n[r])throw oi(r);return{appName:t.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function oi(t){return B.create("missing-app-config-values",{valueName:t})}var ai=class{constructor(e,n,r){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;let i=Ud(e);this.firebaseDependencies={app:e,appConfig:i,installations:n,analyticsProvider:r}}_delete(){return Promise.resolve()}};async function jd(t){try{t.swRegistration=await navigator.serviceWorker.register(hd,{scope:fd}),t.swRegistration.update().catch(()=>{}),await qd(t.swRegistration)}catch(e){throw B.create("failed-service-worker-registration",{browserErrorMessage:e?.message})}}async function qd(t){return new Promise((e,n)=>{let r=setTimeout(()=>n(new Error(`Service worker not registered after ${Jo} ms`)),Jo),i=t.installing||t.waiting;t.active?(clearTimeout(r),e()):i?i.onstatechange=s=>{var o;((o=s.target)===null||o===void 0?void 0:o.state)==="activated"&&(i.onstatechange=null,clearTimeout(r),e())}:(clearTimeout(r),n(new Error("No incoming service worker found.")))})}async function Bd(t,e){if(!e&&!t.swRegistration&&await jd(t),!(!e&&t.swRegistration)){if(!(e instanceof ServiceWorkerRegistration))throw B.create("invalid-sw-registration");t.swRegistration=e}}async function $d(t,e){e?t.vapidKey=e:t.vapidKey||(t.vapidKey=na)}async function aa(t,e){if(!navigator)throw B.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw B.create("permission-blocked");return await $d(t,e?.vapidKey),await Bd(t,e?.serviceWorkerRegistration),Od(t)}async function Hd(t,e,n){let r=Wd(e);(await t.firebaseDependencies.analyticsProvider.get()).logEvent(r,{message_id:n[ra],message_name:n[md],message_time:n[gd],message_device_time:Math.floor(Date.now()/1e3)})}function Wd(t){switch(t){case vt.NOTIFICATION_CLICKED:return"notification_open";case vt.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}async function zd(t,e){let n=e.data;if(!n.isFirebaseMessaging)return;t.onMessageHandler&&n.messageType===vt.PUSH_RECEIVED&&(typeof t.onMessageHandler=="function"?t.onMessageHandler(Zo(n)):t.onMessageHandler.next(Zo(n)));let r=n.data;xd(r)&&r[_d]==="1"&&await Hd(t,n.messageType,r)}var ea="@firebase/messaging",ta="0.12.22";var Gd=t=>{let e=new ai(t.getProvider("app").getImmediate(),t.getProvider("installations-internal").getImmediate(),t.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",n=>zd(e,n)),e},Kd=t=>{let e=t.getProvider("messaging").getImmediate();return{getToken:r=>aa(e,r)}};function Jd(){W(new V("messaging",Gd,"PUBLIC")),W(new V("messaging-internal",Kd,"PRIVATE")),x(ea,ta),x(ea,ta,"esm2017")}async function di(){try{await cn()}catch{return!1}return typeof window<"u"&&an()&&fo()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}function ca(t=Ve()){return di().then(e=>{if(!e)throw B.create("unsupported-browser")},e=>{throw B.create("indexed-db-unsupported")}),ae(k(t),"messaging").getImmediate()}async function ua(t,e){return t=k(t),aa(t,e)}Jd();function gn(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(t);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(n[r[i]]=t[r[i]]);return n}function ka(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var Ra=ka,Oa=new K("auth","Firebase",ka());var Tn=new ve("@firebase/auth");function Yd(t,...e){Tn.logLevel<=S.WARN&&Tn.warn(`Auth (${Ie}): ${t}`,...e)}function yn(t,...e){Tn.logLevel<=S.ERROR&&Tn.error(`Auth (${Ie}): ${t}`,...e)}function X(t,...e){throw Mi(t,...e)}function ne(t,...e){return Mi(t,...e)}function Vi(t,e,n){let r=Object.assign(Object.assign({},Ra()),{[e]:n});return new K("auth","Firebase",r).create(e,{appName:t.name})}function Ue(t){return Vi(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Qd(t,e,n){let r=n;if(!(e instanceof r))throw r.name!==e.constructor.name&&X(t,"argument-error"),Vi(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Mi(t,...e){if(typeof t!="string"){let n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Oa.create(t,...e)}function w(t,e,...n){if(!t)throw Mi(e,...n)}function ce(t){let e="INTERNAL ASSERTION FAILED: "+t;throw yn(e),new Error(e)}function _e(t,e){t||ce(e)}function _i(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function Xd(){return la()==="http:"||la()==="https:"}function la(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}function Zd(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Xd()||uo()||"connection"in navigator)?navigator.onLine:!0}function eh(){if(typeof navigator>"u")return null;let t=navigator;return t.languages&&t.languages[0]||t.language||null}var je=class{constructor(e,n){this.shortDelay=e,this.longDelay=n,_e(n>e,"Short delay should be less than long delay!"),this.isMobile=ao()||lo()}get(){return Zd()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};function xi(t,e){_e(t.emulator,"Emulator should always be set here");let{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}var bn=class{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ce("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ce("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ce("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};var th={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};var nh=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],rh=new je(3e4,6e4);function M(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function U(t,e,n,r,i={}){return Ca(t,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});let a=Ze(Object.assign({key:t.config.apiKey},o)).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);let h=Object.assign({method:e,headers:c},s);return co()||(h.referrerPolicy="no-referrer"),t.emulatorConfig&&ye(t.emulatorConfig.host)&&(h.credentials="include"),bn.fetch()(await Na(t,t.config.apiHost,n,a),h)})}async function Ca(t,e,n){t._canInitEmulator=!1;let r=Object.assign(Object.assign({},th),e);try{let i=new yi(t),s=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();let o=await s.json();if("needConfirmation"in o)throw Et(t,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{let a=s.ok?o.errorMessage:o.error.message,[c,h]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Et(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Et(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw Et(t,"user-disabled",o);let g=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Vi(t,g,h);X(t,g)}}catch(i){if(i instanceof q)throw i;X(t,"network-request-failed",{message:String(i)})}}async function ze(t,e,n,r,i={}){let s=await U(t,e,n,r,i);return"mfaPendingCredential"in s&&X(t,"multi-factor-auth-required",{_serverResponse:s}),s}async function Na(t,e,n,r){let i=`${e}${n}?${r}`,s=t,o=s.config.emulator?xi(t.config,i):`${t.config.apiScheme}://${i}`;return nh.includes(n)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(o).toString():o}function ih(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}var yi=class{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(ne(this.auth,"network-request-failed")),rh.get())})}};function Et(t,e,n){let r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);let i=ne(t,e,r);return i.customData._tokenResponse=n,i}function da(t){return t!==void 0&&t.enterprise!==void 0}var An=class{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(let n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return ih(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}};async function Da(t,e){return U(t,"GET","/v2/recaptchaConfig",M(t,e))}async function sh(t,e){return U(t,"POST","/v1/accounts:delete",e)}async function Sn(t,e){return U(t,"POST","/v1/accounts:lookup",e)}function Tt(t){if(t)try{let e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function La(t,e=!1){let n=k(t),r=await n.getIdToken(e),i=Fi(r);w(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");let s=typeof i.firebase=="object"?i.firebase:void 0,o=s?.sign_in_provider;return{claims:i,token:r,authTime:Tt(hi(i.auth_time)),issuedAtTime:Tt(hi(i.iat)),expirationTime:Tt(hi(i.exp)),signInProvider:o||null,signInSecondFactor:s?.sign_in_second_factor||null}}function hi(t){return Number(t)*1e3}function Fi(t){let[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return yn("JWT malformed, contained fewer than 3 sections"),null;try{let i=rn(n);return i?JSON.parse(i):(yn("Failed to decode base64 JWT payload"),null)}catch(i){return yn("Caught error parsing JWT payload as JSON",i?.toString()),null}}function ha(t){let e=Fi(t);return w(e,"internal-error"),w(typeof e.exp<"u","internal-error"),w(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}async function Pt(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof q&&oh(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function oh({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}var vi=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){let r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;let i=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;let n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};var kt=class{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Tt(this.lastLoginAt),this.creationTime=Tt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};async function Pn(t){var e;let n=t.auth,r=await t.getIdToken(),i=await Pt(t,Sn(n,{idToken:r}));w(i?.users.length,n,"internal-error");let s=i.users[0];t._notifyReloadListener(s);let o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?Ma(s.providerUserInfo):[],a=ah(t.providerData,o),c=t.isAnonymous,h=!(t.email&&s.passwordHash)&&!a?.length,g=c?h:!1,v={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new kt(s.createdAt,s.lastLoginAt),isAnonymous:g};Object.assign(t,v)}async function Va(t){let e=k(t);await Pn(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function ah(t,e){return[...t.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function Ma(t){return t.map(e=>{var{providerId:n}=e,r=gn(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}async function ch(t,e){let n=await Ca(t,{},async()=>{let r=Ze({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=t.config,o=await Na(t,i,"/v1/token",`key=${s}`),a=await t._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";let c={method:"POST",headers:a,body:r};return t.emulatorConfig&&ye(t.emulatorConfig.host)&&(c.credentials="include"),bn.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function uh(t,e){return U(t,"POST","/v2/accounts:revokeToken",M(t,e))}var bt=class t{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){w(e.idToken,"internal-error"),w(typeof e.idToken<"u","internal-error"),w(typeof e.refreshToken<"u","internal-error");let n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):ha(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){w(e.length!==0,"internal-error");let n=ha(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(w(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){let{accessToken:r,refreshToken:i,expiresIn:s}=await ch(e,n);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){let{refreshToken:r,accessToken:i,expirationTime:s}=n,o=new t;return r&&(w(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(w(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(w(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new t,this.toJSON())}_performRefresh(){return ce("not implemented")}};function Ee(t,e){w(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}var Te=class t{constructor(e){var{uid:n,auth:r,stsTokenManager:i}=e,s=gn(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new vi(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new kt(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){let n=await Pt(this,this.stsTokenManager.getToken(this.auth,e));return w(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return La(this,e)}reload(){return Va(this)}_assign(e){this!==e&&(w(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let n=new t(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){w(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Pn(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(J(this.auth.app))return Promise.reject(Ue(this.auth));let e=await this.getIdToken();return await Pt(this,sh(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,i,s,o,a,c,h,g;let v=(r=n.displayName)!==null&&r!==void 0?r:void 0,y=(i=n.email)!==null&&i!==void 0?i:void 0,b=(s=n.phoneNumber)!==null&&s!==void 0?s:void 0,T=(o=n.photoURL)!==null&&o!==void 0?o:void 0,R=(a=n.tenantId)!==null&&a!==void 0?a:void 0,P=(c=n._redirectEventId)!==null&&c!==void 0?c:void 0,ie=(h=n.createdAt)!==null&&h!==void 0?h:void 0,Q=(g=n.lastLoginAt)!==null&&g!==void 0?g:void 0,{uid:G,emailVerified:fe,isAnonymous:mt,providerData:se,stsTokenManager:m}=n;w(G&&m,e,"internal-error");let u=bt.fromJSON(this.name,m);w(typeof G=="string",e,"internal-error"),Ee(v,e.name),Ee(y,e.name),w(typeof fe=="boolean",e,"internal-error"),w(typeof mt=="boolean",e,"internal-error"),Ee(b,e.name),Ee(T,e.name),Ee(R,e.name),Ee(P,e.name),Ee(ie,e.name),Ee(Q,e.name);let d=new t({uid:G,auth:e,email:y,emailVerified:fe,displayName:v,isAnonymous:mt,photoURL:T,phoneNumber:b,tenantId:R,stsTokenManager:u,createdAt:ie,lastLoginAt:Q});return se&&Array.isArray(se)&&(d.providerData=se.map(f=>Object.assign({},f))),P&&(d._redirectEventId=P),d}static async _fromIdTokenResponse(e,n,r=!1){let i=new bt;i.updateFromServerResponse(n);let s=new t({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Pn(s),s}static async _fromGetAccountInfoResponse(e,n,r){let i=n.users[0];w(i.localId!==void 0,"internal-error");let s=i.providerUserInfo!==void 0?Ma(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!s?.length,a=new bt;a.updateFromIdToken(r);let c=new t({uid:i.localId,auth:e,stsTokenManager:a,isAnonymous:o}),h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new kt(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!s?.length};return Object.assign(c,h),c}};var fa=new Map;function ge(t){_e(t instanceof Function,"Expected a class definition");let e=fa.get(t);return e?(_e(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,fa.set(t,e),e)}var kn=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){let n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}};kn.type="NONE";var wi=kn;function vn(t,e,n){return`firebase:${t}:${e}:${n}`}var Rn=class t{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;let{config:i,name:s}=this.auth;this.fullUserKey=vn(this.userKey,i.apiKey,s),this.fullPersistenceKey=vn("persistence",i.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){let n=await Sn(this.auth,{idToken:e}).catch(()=>{});return n?Te._fromGetAccountInfoResponse(this.auth,n,e):null}return Te._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new t(ge(wi),e,r);let i=(await Promise.all(n.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h),s=i[0]||ge(wi),o=vn(r,e.config.apiKey,e.name),a=null;for(let h of n)try{let g=await h._get(o);if(g){let v;if(typeof g=="string"){let y=await Sn(e,{idToken:g}).catch(()=>{});if(!y)break;v=await Te._fromGetAccountInfoResponse(e,y,g)}else v=Te._fromJSON(e,g);h!==s&&(a=v),s=h;break}}catch{}let c=i.filter(h=>h._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new t(s,e,r):(s=c[0],a&&await s._set(o,a.toJSON()),await Promise.all(n.map(async h=>{if(h!==s)try{await h._remove(o)}catch{}})),new t(s,e,r))}};function pa(t){let e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(ja(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(xa(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Ba(e))return"Blackberry";if($a(e))return"Webos";if(Fa(e))return"Safari";if((e.includes("chrome/")||Ua(e))&&!e.includes("edge/"))return"Chrome";if(qa(e))return"Android";{let n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if(r?.length===2)return r[1]}return"Other"}function xa(t=F()){return/firefox\//i.test(t)}function Fa(t=F()){let e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Ua(t=F()){return/crios\//i.test(t)}function ja(t=F()){return/iemobile/i.test(t)}function qa(t=F()){return/android/i.test(t)}function Ba(t=F()){return/blackberry/i.test(t)}function $a(t=F()){return/webos/i.test(t)}function Ui(t=F()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function lh(t=F()){var e;return Ui(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function dh(){return ho()&&document.documentMode===10}function Ha(t=F()){return Ui(t)||qa(t)||$a(t)||Ba(t)||/windows phone/i.test(t)||ja(t)}function Wa(t,e=[]){let n;switch(t){case"Browser":n=pa(F());break;case"Worker":n=`${pa(F())}-${t}`;break;default:n=t}let r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Ie}/${r}`}var Ii=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){let r=s=>new Promise((o,a)=>{try{let c=e(s);o(c)}catch(c){a(c)}});r.onAbort=n,this.queue.push(r);let i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let n=[];try{for(let r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(let i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}};async function hh(t,e={}){return U(t,"GET","/v2/passwordPolicy",M(t,e))}var fh=6,Ei=class{constructor(e){var n,r,i,s;let o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:fh,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,i,s,o,a;let c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(n=c.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),c.isValid&&(c.isValid=(r=c.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),c.isValid&&(c.isValid=(i=c.containsLowercaseLetter)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(s=c.containsUppercaseLetter)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(o=c.containsNumericCharacter)!==null&&o!==void 0?o:!0),c.isValid&&(c.isValid=(a=c.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),c}validatePasswordLengthOptions(e,n){let r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),i&&(n.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}};var Ti=class{constructor(e,n,r,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new On(this),this.idTokenSubscription=new On(this),this.beforeStateQueue=new Ii(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Oa,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=ge(n)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted&&(this.persistenceManager=await Rn.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let n=await Sn(this,{idToken:e}),r=await Te._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(J(this.app)){let o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}let r=await this.assertedPersistence.getCurrentUser(),i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,a=i?._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===a)&&c?.user&&(i=c.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return w(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Pn(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=eh()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(J(this.app))return Promise.reject(Ue(this));let n=e?k(e):null;return n&&w(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&w(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return J(this.app)?Promise.reject(Ue(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return J(this.app)?Promise.reject(Ue(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ge(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await hh(this),n=new Ei(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new K("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{let r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){let n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await uh(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){let r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let n=e&&ge(e)||this._popupRedirectResolver;w(n,this,"argument-error"),this.redirectPersistenceManager=await Rn.create(this,[ge(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,i){if(this._deleted)return()=>{};let s=typeof n=="function"?n:n.next.bind(n),o=!1,a=this._isInitialized?Promise.resolve():this._initializationPromise;if(w(a,this,"internal-error"),a.then(()=>{o||s(this.currentUser)}),typeof n=="function"){let c=e.addObserver(n,r,i);return()=>{o=!0,c()}}else{let c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return w(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Wa(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;let n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);let r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);let i=await this._getAppCheckToken();return i&&(n["X-Firebase-AppCheck"]=i),n}async _getAppCheckToken(){var e;if(J(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;let n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n?.error&&Yd(`Error while retrieving App Check token: ${n.error}`),n?.token}};function be(t){return k(t)}var On=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=mo(n=>this.observer=n)}get next(){return w(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};var Kn={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function ph(t){Kn=t}function za(t){return Kn.loadJS(t)}function mh(){return Kn.recaptchaEnterpriseScript}function gh(){return Kn.gapiScript}function Ga(t){return`__${t}${Math.floor(Math.random()*1e6)}`}var bi=class{constructor(){this.enterprise=new Ai}ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}},Ai=class{ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}};var _h="recaptcha-enterprise",At="NO_RECAPTCHA",Cn=class{constructor(e){this.type=_h,this.auth=be(e)}async verify(e="verify",n=!1){async function r(s){if(!n){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,a)=>{Da(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{let h=new An(c);return s.tenantId==null?s._agentRecaptchaConfig=h:s._tenantRecaptchaConfigs[s.tenantId]=h,o(h.siteKey)}}).catch(c=>{a(c)})})}function i(s,o,a){let c=window.grecaptcha;da(c)?c.enterprise.ready(()=>{c.enterprise.execute(s,{action:e}).then(h=>{o(h)}).catch(()=>{o(At)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new bi().execute("siteKey",{action:"verify"}):new Promise((s,o)=>{r(this.auth).then(a=>{if(!n&&da(window.grecaptcha))i(a,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=mh();c.length!==0&&(c+=a),za(c).then(()=>{i(a,s,o)}).catch(h=>{o(h)})}}).catch(a=>{o(a)})})}};async function It(t,e,n,r=!1,i=!1){let s=new Cn(t),o;if(i)o=At;else try{o=await s.verify(n)}catch{o=await s.verify(n,!0)}let a=Object.assign({},e);if(n==="mfaSmsEnrollment"||n==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in a){let c=a.phoneEnrollmentInfo.phoneNumber,h=a.phoneEnrollmentInfo.recaptchaToken;Object.assign(a,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:h,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in a){let c=a.phoneSignInInfo.recaptchaToken;Object.assign(a,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return a}return r?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function St(t,e,n,r,i){var s,o;if(i==="EMAIL_PASSWORD_PROVIDER")if(!((s=t._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){let a=await It(t,e,n,n==="getOobCode");return r(t,a)}else return r(t,e).catch(async a=>{if(a.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let c=await It(t,e,n,n==="getOobCode");return r(t,c)}else return Promise.reject(a)});else if(i==="PHONE_PROVIDER")if(!((o=t._getRecaptchaConfig())===null||o===void 0)&&o.isProviderEnabled("PHONE_PROVIDER")){let a=await It(t,e,n);return r(t,a).catch(async c=>{var h;if(((h=t._getRecaptchaConfig())===null||h===void 0?void 0:h.getProviderEnforcementState("PHONE_PROVIDER"))==="AUDIT"&&(c.code==="auth/missing-recaptcha-token"||c.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${n} flow.`);let g=await It(t,e,n,!1,!0);return r(t,g)}return Promise.reject(c)})}else{let a=await It(t,e,n,!1,!0);return r(t,a)}else return Promise.reject(i+" provider is not supported.")}async function yh(t){let e=be(t),n=await Da(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new An(n);e.tenantId==null?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,r.isAnyProviderEnabled()&&new Cn(e).verify()}function Ka(t,e){let n=ae(t,"auth");if(n.isInitialized()){let i=n.getImmediate(),s=n.getOptions();if(oe(s,e??{}))return i;X(i,"already-initialized")}return n.initialize({options:e})}function vh(t,e){let n=e?.persistence||[],r=(Array.isArray(n)?n:[n]).map(ge);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e?.popupRedirectResolver)}function Ja(t,e,n){let r=be(t);w(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");let i=!!n?.disableWarnings,s=Ya(e),{host:o,port:a}=wh(e),c=a===null?"":`:${a}`,h={url:`${s}//${o}${c}/`},g=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){w(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),w(oe(h,r.config.emulator)&&oe(g,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=g,r.settings.appVerificationDisabledForTesting=!0,ye(o)?(sn(`${s}//${o}${c}`),on("Auth",!0)):i||Ih()}function Ya(t){let e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function wh(t){let e=Ya(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};let r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){let s=i[1];return{host:s,port:ma(r.substr(s.length+1))}}else{let[s,o]=r.split(":");return{host:s,port:ma(o)}}}function ma(t){if(!t)return null;let e=Number(t);return isNaN(e)?null:e}function Ih(){function t(){let e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}var qe=class{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return ce("not implemented")}_getIdTokenResponse(e){return ce("not implemented")}_linkToIdToken(e,n){return ce("not implemented")}_getReauthenticationResolver(e){return ce("not implemented")}};async function Eh(t,e){return U(t,"POST","/v1/accounts:signUp",e)}async function Th(t,e){return ze(t,"POST","/v1/accounts:signInWithPassword",M(t,e))}async function bh(t,e){return ze(t,"POST","/v1/accounts:signInWithEmailLink",M(t,e))}async function Ah(t,e){return ze(t,"POST","/v1/accounts:signInWithEmailLink",M(t,e))}var Rt=class t extends qe{constructor(e,n,r,i=null){super("password",r),this._email=e,this._password=n,this._tenantId=i}static _fromEmailAndPassword(e,n){return new t(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new t(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let n=typeof e=="string"?JSON.parse(e):e;if(n?.email&&n?.password){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":let n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return St(e,n,"signInWithPassword",Th,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return bh(e,{email:this._email,oobCode:this._password});default:X(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":let r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return St(e,r,"signUpPassword",Eh,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return Ah(e,{idToken:n,email:this._email,oobCode:this._password});default:X(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};async function nt(t,e){return ze(t,"POST","/v1/accounts:signInWithIdp",M(t,e))}var Sh="http://localhost",Be=class t extends qe{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let n=new t(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):X("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=n,s=gn(n,["providerId","signInMethod"]);if(!r||!i)return null;let o=new t(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){let n=this.buildRequest();return nt(e,n)}_linkToIdToken(e,n){let r=this.buildRequest();return r.idToken=n,nt(e,r)}_getReauthenticationResolver(e){let n=this.buildRequest();return n.autoCreate=!1,nt(e,n)}buildRequest(){let e={requestUri:Sh,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Ze(n)}return e}};async function ga(t,e){return U(t,"POST","/v1/accounts:sendVerificationCode",M(t,e))}async function Ph(t,e){return ze(t,"POST","/v1/accounts:signInWithPhoneNumber",M(t,e))}async function kh(t,e){let n=await ze(t,"POST","/v1/accounts:signInWithPhoneNumber",M(t,e));if(n.temporaryProof)throw Et(t,"account-exists-with-different-credential",n);return n}var Rh={USER_NOT_FOUND:"user-not-found"};async function Oh(t,e){let n=Object.assign(Object.assign({},e),{operation:"REAUTH"});return ze(t,"POST","/v1/accounts:signInWithPhoneNumber",M(t,n),Rh)}var Ot=class t extends qe{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,n){return new t({verificationId:e,verificationCode:n})}static _fromTokenResponse(e,n){return new t({phoneNumber:e,temporaryProof:n})}_getIdTokenResponse(e){return Ph(e,this._makeVerificationRequest())}_linkToIdToken(e,n){return kh(e,Object.assign({idToken:n},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return Oh(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:n,verificationId:r,verificationCode:i}=this.params;return e&&n?{temporaryProof:e,phoneNumber:n}:{sessionInfo:r,code:i}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));let{verificationId:n,verificationCode:r,phoneNumber:i,temporaryProof:s}=e;return!r&&!n&&!i&&!s?null:new t({verificationId:n,verificationCode:r,phoneNumber:i,temporaryProof:s})}};function Ch(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Nh(t){let e=et(tt(t)).link,n=e?et(tt(e)).deep_link_id:null,r=et(tt(t)).deep_link_id;return(r?et(tt(r)).link:null)||r||n||e||t}var Nn=class t{constructor(e){var n,r,i,s,o,a;let c=et(tt(e)),h=(n=c.apiKey)!==null&&n!==void 0?n:null,g=(r=c.oobCode)!==null&&r!==void 0?r:null,v=Ch((i=c.mode)!==null&&i!==void 0?i:null);w(h&&g&&v,"argument-error"),this.apiKey=h,this.operation=v,this.code=g,this.continueUrl=(s=c.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=c.lang)!==null&&o!==void 0?o:null,this.tenantId=(a=c.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){let n=Nh(e);try{return new t(n)}catch{return null}}};var rt=class t{constructor(){this.providerId=t.PROVIDER_ID}static credential(e,n){return Rt._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){let r=Nn.parseLink(n);return w(r,"argument-error"),Rt._fromEmailAndCode(e,r.code,r.tenantId)}};rt.PROVIDER_ID="password";rt.EMAIL_PASSWORD_SIGN_IN_METHOD="password";rt.EMAIL_LINK_SIGN_IN_METHOD="emailLink";var Ct=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}};var $e=class extends Ct{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}};var Nt=class t extends $e{constructor(){super("facebook.com")}static credential(e){return Be._fromParams({providerId:t.PROVIDER_ID,signInMethod:t.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return t.credentialFromTaggedObject(e)}static credentialFromError(e){return t.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return t.credential(e.oauthAccessToken)}catch{return null}}};Nt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Nt.PROVIDER_ID="facebook.com";var He=class t extends $e{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Be._fromParams({providerId:t.PROVIDER_ID,signInMethod:t.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return t.credentialFromTaggedObject(e)}static credentialFromError(e){return t.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return t.credential(n,r)}catch{return null}}};He.GOOGLE_SIGN_IN_METHOD="google.com";He.PROVIDER_ID="google.com";var Dt=class t extends $e{constructor(){super("github.com")}static credential(e){return Be._fromParams({providerId:t.PROVIDER_ID,signInMethod:t.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return t.credentialFromTaggedObject(e)}static credentialFromError(e){return t.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return t.credential(e.oauthAccessToken)}catch{return null}}};Dt.GITHUB_SIGN_IN_METHOD="github.com";Dt.PROVIDER_ID="github.com";var Lt=class t extends $e{constructor(){super("twitter.com")}static credential(e,n){return Be._fromParams({providerId:t.PROVIDER_ID,signInMethod:t.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return t.credentialFromTaggedObject(e)}static credentialFromError(e){return t.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return t.credential(n,r)}catch{return null}}};Lt.TWITTER_SIGN_IN_METHOD="twitter.com";Lt.PROVIDER_ID="twitter.com";var Vt=class t{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,i=!1){let s=await Te._fromIdTokenResponse(e,r,i),o=_a(r);return new t({user:s,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);let i=_a(r);return new t({user:e,providerId:i,_tokenResponse:r,operationType:n})}};function _a(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}var Si=class t extends q{constructor(e,n,r,i){var s;super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,t.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,i){return new t(e,n,r,i)}};function Qa(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Si._fromErrorAndOperation(t,s,e,r):s})}async function Dh(t,e,n=!1){let r=await Pt(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Vt._forOperation(t,"link",r)}async function Lh(t,e,n=!1){let{auth:r}=t;if(J(r.app))return Promise.reject(Ue(r));let i="reauthenticate";try{let s=await Pt(t,Qa(r,i,e,t),n);w(s.idToken,r,"internal-error");let o=Fi(s.idToken);w(o,r,"internal-error");let{sub:a}=o;return w(t.uid===a,r,"user-mismatch"),Vt._forOperation(t,i,s)}catch(s){throw s?.code==="auth/user-not-found"&&X(r,"user-mismatch"),s}}async function Vh(t,e,n=!1){if(J(t.app))return Promise.reject(Ue(t));let r="signIn",i=await Qa(t,r,e),s=await Vt._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(s.user),s}function ji(t,e){return k(t).setPersistence(e)}function Xa(t,e,n,r){return k(t).onIdTokenChanged(e,n,r)}function Za(t,e,n){return k(t).beforeAuthStateChanged(e,n)}function qi(t,e,n,r){return k(t).onAuthStateChanged(e,n,r)}function Jn(t){return k(t).signOut()}function ya(t,e){return U(t,"POST","/v2/accounts/mfaEnrollment:start",M(t,e))}function Mh(t,e){return U(t,"POST","/v2/accounts/mfaEnrollment:finalize",M(t,e))}function xh(t,e){return U(t,"POST","/v2/accounts/mfaEnrollment:start",M(t,e))}function Fh(t,e){return U(t,"POST","/v2/accounts/mfaEnrollment:finalize",M(t,e))}var Dn="__sak";var Ln=class{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Dn,"1"),this.storage.removeItem(Dn),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){let n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}};var Uh=1e3,jh=10,Vn=class extends Ln{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Ha(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let n of Object.keys(this.listeners)){let r=this.storage.getItem(n),i=this.localCache[n];r!==i&&e(n,i,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}let r=e.key;n?this.detachListener():this.stopPolling();let i=()=>{let o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);dh()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,jh):i()}notifyListeners(e,n){this.localCache[e]=n;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},Uh)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){let n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}};Vn.type="LOCAL";var Yn=Vn;var qh=1e3;function fi(t){var e,n;let r=t.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),i=RegExp(`${r}=([^;]+)`);return(n=(e=document.cookie.match(i))===null||e===void 0?void 0:e[1])!==null&&n!==void 0?n:null}function pi(t){return`${window.location.protocol==="http:"?"__dev_":"__HOST-"}FIREBASE_${t.split(":")[3]}`}var Pi=class{constructor(){this.type="COOKIE",this.listenerUnsubscribes=new Map}_getFinalTarget(e){if(typeof window===void 0)return e;let n=new URL(`${window.location.origin}/__cookies__`);return n.searchParams.set("finalTarget",e),n}async _isAvailable(){var e;return typeof isSecureContext=="boolean"&&!isSecureContext||typeof navigator>"u"||typeof document>"u"?!1:(e=navigator.cookieEnabled)!==null&&e!==void 0?e:!0}async _set(e,n){}async _get(e){if(!this._isAvailable())return null;let n=pi(e);if(window.cookieStore){let r=await window.cookieStore.get(n);return r?.value}return fi(n)}async _remove(e){if(!this._isAvailable()||!await this._get(e))return;let r=pi(e);document.cookie=`${r}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`,await fetch("/__cookies__",{method:"DELETE"}).catch(()=>{})}_addListener(e,n){if(!this._isAvailable())return;let r=pi(e);if(window.cookieStore){let a=h=>{let g=h.changed.find(y=>y.name===r);g&&n(g.value),h.deleted.find(y=>y.name===r)&&n(null)},c=()=>window.cookieStore.removeEventListener("change",a);return this.listenerUnsubscribes.set(n,c),window.cookieStore.addEventListener("change",a)}let i=fi(r),s=setInterval(()=>{let a=fi(r);a!==i&&(n(a),i=a)},qh),o=()=>clearInterval(s);this.listenerUnsubscribes.set(n,o)}_removeListener(e,n){let r=this.listenerUnsubscribes.get(n);r&&(r(),this.listenerUnsubscribes.delete(n))}};Pi.type="COOKIE";var Mn=class extends Ln{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}};Mn.type="SESSION";var Bi=Mn;function Bh(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}var xn=class t{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;let r=new t(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let n=e,{eventId:r,eventType:i,data:s}=n.data,o=this.handlersMap[i];if(!o?.size)return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});let a=Array.from(o).map(async h=>h(n.origin,s)),c=await Bh(a);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};xn.receivers=[];function $i(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}var ki=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){let i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((a,c)=>{let h=$i("",20);i.port1.start();let g=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(v){let y=v;if(y.data.eventId===h)switch(y.data.status){case"ack":clearTimeout(g),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(y.data.response);break;default:clearTimeout(g),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}};function ue(){return window}function $h(t){ue().location.href=t}function ec(){return typeof ue().WorkerGlobalScope<"u"&&typeof ue().importScripts=="function"}async function Hh(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Wh(){var t;return((t=navigator?.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function zh(){return ec()?self:null}var tc="firebaseLocalStorageDb",Gh=1,Fn="firebaseLocalStorage",nc="fbase_key",We=class{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}};function Qn(t,e){return t.transaction([Fn],e?"readwrite":"readonly").objectStore(Fn)}function Kh(){let t=indexedDB.deleteDatabase(tc);return new We(t).toPromise()}function Ri(){let t=indexedDB.open(tc,Gh);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{let r=t.result;try{r.createObjectStore(Fn,{keyPath:nc})}catch(i){n(i)}}),t.addEventListener("success",async()=>{let r=t.result;r.objectStoreNames.contains(Fn)?e(r):(r.close(),await Kh(),e(await Ri()))})})}async function va(t,e,n){let r=Qn(t,!0).put({[nc]:e,value:n});return new We(r).toPromise()}async function Jh(t,e){let n=Qn(t,!1).get(e),r=await new We(n).toPromise();return r===void 0?null:r.value}function wa(t,e){let n=Qn(t,!0).delete(e);return new We(n).toPromise()}var Yh=800,Qh=3,Un=class{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ri(),this.db)}async _withRetries(e){let n=0;for(;;)try{let r=await this._openDb();return await e(r)}catch(r){if(n++>Qh)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ec()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=xn._getInstance(zh()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await Hh(),!this.activeServiceWorker)return;this.sender=new ki(this.activeServiceWorker);let r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Wh()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await Ri();return await va(e,Dn,"1"),await wa(e,Dn),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>va(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){let n=await this._withRetries(r=>Jh(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>wa(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(i=>{let s=Qn(i,!1).getAll();return new We(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];let n=[],r=new Set;if(e.length!==0)for(let{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),n.push(i));for(let i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Yh)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}};Un.type="LOCAL";var rc=Un;function Ia(t,e){return U(t,"POST","/v2/accounts/mfaSignIn:start",M(t,e))}function Xh(t,e){return U(t,"POST","/v2/accounts/mfaSignIn:finalize",M(t,e))}function Zh(t,e){return U(t,"POST","/v2/accounts/mfaSignIn:finalize",M(t,e))}var Im=Ga("rcb"),Em=new je(3e4,6e4);var wn="recaptcha";async function ef(t,e,n){var r;if(!t._getRecaptchaConfig())try{await yh(t)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let i;if(typeof e=="string"?i={phoneNumber:e}:i=e,"session"in i){let s=i.session;if("phoneNumber"in i){w(s.type==="enroll",t,"internal-error");let o={idToken:s.credential,phoneEnrollmentInfo:{phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await St(t,o,"mfaSmsEnrollment",async(g,v)=>{if(v.phoneEnrollmentInfo.captchaResponse===At){w(n?.type===wn,g,"argument-error");let y=await mi(g,v,n);return ya(g,y)}return ya(g,v)},"PHONE_PROVIDER").catch(g=>Promise.reject(g))).phoneSessionInfo.sessionInfo}else{w(s.type==="signin",t,"internal-error");let o=((r=i.multiFactorHint)===null||r===void 0?void 0:r.uid)||i.multiFactorUid;w(o,t,"missing-multi-factor-info");let a={mfaPendingCredential:s.credential,mfaEnrollmentId:o,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await St(t,a,"mfaSmsSignIn",async(v,y)=>{if(y.phoneSignInInfo.captchaResponse===At){w(n?.type===wn,v,"argument-error");let b=await mi(v,y,n);return Ia(v,b)}return Ia(v,y)},"PHONE_PROVIDER").catch(v=>Promise.reject(v))).phoneResponseInfo.sessionInfo}}else{let s={phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await St(t,s,"sendVerificationCode",async(h,g)=>{if(g.captchaResponse===At){w(n?.type===wn,h,"argument-error");let v=await mi(h,g,n);return ga(h,v)}return ga(h,g)},"PHONE_PROVIDER").catch(h=>Promise.reject(h))).sessionInfo}}finally{n?._reset()}}async function mi(t,e,n){w(n.type===wn,t,"argument-error");let r=await n.verify();w(typeof r=="string",t,"argument-error");let i=Object.assign({},e);if("phoneEnrollmentInfo"in i){let s=i.phoneEnrollmentInfo.phoneNumber,o=i.phoneEnrollmentInfo.captchaResponse,a=i.phoneEnrollmentInfo.clientType,c=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:s,recaptchaToken:r,captchaResponse:o,clientType:a,recaptchaVersion:c}}),i}else if("phoneSignInInfo"in i){let s=i.phoneSignInInfo.captchaResponse,o=i.phoneSignInInfo.clientType,a=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:s,clientType:o,recaptchaVersion:a}}),i}else return Object.assign(i,{recaptchaToken:r}),i}var Mt=class t{constructor(e){this.providerId=t.PROVIDER_ID,this.auth=be(e)}verifyPhoneNumber(e,n){return ef(this.auth,e,k(n))}static credential(e,n){return Ot._fromVerification(e,n)}static credentialFromResult(e){let n=e;return t.credentialFromTaggedObject(n)}static credentialFromError(e){return t.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:n,temporaryProof:r}=e;return n&&r?Ot._fromTokenResponse(n,r):null}};Mt.PROVIDER_ID="phone";Mt.PHONE_SIGN_IN_METHOD="phone";function ic(t,e){return e?ge(e):(w(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}var xt=class extends qe{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return nt(e,this._buildIdpRequest())}_linkToIdToken(e,n){return nt(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return nt(e,this._buildIdpRequest())}_buildIdpRequest(e){let n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}};function tf(t){return Vh(t.auth,new xt(t),t.bypassAuthState)}function nf(t){let{auth:e,user:n}=t;return w(n,e,"internal-error"),Lh(n,new xt(t),t.bypassAuthState)}async function rf(t){let{auth:e,user:n}=t;return w(n,e,"internal-error"),Dh(n,new xt(t),t.bypassAuthState)}var jn=class{constructor(e,n,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){let{urlResponse:n,sessionId:r,postBody:i,tenantId:s,error:o,type:a}=e;if(o){this.reject(o);return}let c={auth:this.auth,requestUri:n,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return tf;case"linkViaPopup":case"linkViaRedirect":return rf;case"reauthViaPopup":case"reauthViaRedirect":return nf;default:X(this.auth,"internal-error")}}resolve(e){_e(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){_e(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};var sf=new je(2e3,1e4);async function Hi(t,e,n){if(J(t.app))return Promise.reject(ne(t,"operation-not-supported-in-this-environment"));let r=be(t);Qd(t,e,Ct);let i=ic(r,n);return new qn(r,"signInViaPopup",e,i).executeNotNull()}var qn=class t extends jn{constructor(e,n,r,i,s){super(e,n,i,s),this.provider=r,this.authWindow=null,this.pollId=null,t.currentPopupAction&&t.currentPopupAction.cancel(),t.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return w(e,this.auth,"internal-error"),e}async onExecution(){_e(this.filter.length===1,"Popup operations only handle one event");let e=$i();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(ne(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(ne(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,t.currentPopupAction=null}pollUserCancellation(){let e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ne(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,sf.get())};e()}};qn.currentPopupAction=null;var of="pendingRedirect",In=new Map,Oi=class extends jn{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=In.get(this.auth._key());if(!e){try{let r=await af(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}In.set(this.auth._key(),e)}return this.bypassAuthState||In.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){let n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function af(t,e){let n=lf(e),r=uf(t);if(!await r._isAvailable())return!1;let i=await r._get(n)==="true";return await r._remove(n),i}function cf(t,e){In.set(t._key(),e)}function uf(t){return ge(t._redirectPersistence)}function lf(t){return vn(of,t.config.apiKey,t.name)}async function Wi(t,e){return await be(t)._initializationPromise,sc(t,e,!1)}async function sc(t,e,n=!1){if(J(t.app))return Promise.reject(Ue(t));let r=be(t),i=ic(r,e),o=await new Oi(r,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}var df=10*60*1e3,Ci=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!hf(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!oc(e)){let i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(ne(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){let r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=df&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ea(e))}saveEventToCache(e){this.cachedEventUids.add(Ea(e)),this.lastProcessedEventTime=Date.now()}};function Ea(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function oc({type:t,error:e}){return t==="unknown"&&e?.code==="auth/no-auth-event"}function hf(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return oc(t);default:return!1}}async function ff(t,e={}){return U(t,"GET","/v1/projects",e)}var pf=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,mf=/^https?/;async function gf(t){if(t.config.emulator)return;let{authorizedDomains:e}=await ff(t);for(let n of e)try{if(_f(n))return}catch{}X(t,"unauthorized-domain")}function _f(t){let e=_i(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){let o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!mf.test(n))return!1;if(pf.test(t))return r===t;let i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}var yf=new je(3e4,6e4);function Ta(){let t=ue().___jsl;if(t?.H){for(let e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function vf(t){return new Promise((e,n)=>{var r,i,s;function o(){Ta(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ta(),n(ne(t,"network-request-failed"))},timeout:yf.get()})}if(!((i=(r=ue().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=ue().gapi)===null||s===void 0)&&s.load)o();else{let a=Ga("iframefcb");return ue()[a]=()=>{gapi.load?o():n(ne(t,"network-request-failed"))},za(`${gh()}?onload=${a}`).catch(c=>n(c))}}).catch(e=>{throw En=null,e})}var En=null;function wf(t){return En=En||vf(t),En}var If=new je(5e3,15e3),Ef="__/auth/iframe",Tf="emulator/auth/iframe",bf={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Af=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Sf(t){let e=t.config;w(e.authDomain,t,"auth-domain-config-required");let n=e.emulator?xi(e,Tf):`https://${t.config.authDomain}/${Ef}`,r={apiKey:e.apiKey,appName:t.name,v:Ie},i=Af.get(t.config.apiHost);i&&(r.eid=i);let s=t._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${Ze(r).slice(1)}`}async function Pf(t){let e=await wf(t),n=ue().gapi;return w(n,t,"internal-error"),e.open({where:document.body,url:Sf(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:bf,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});let o=ne(t,"network-request-failed"),a=ue().setTimeout(()=>{s(o)},If.get());function c(){ue().clearTimeout(a),i(r)}r.ping(c).then(c,()=>{s(o)})}))}var kf={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Rf=500,Of=600,Cf="_blank",Nf="http://localhost",Bn=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function Df(t,e,n,r=Rf,i=Of){let s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString(),a="",c=Object.assign(Object.assign({},kf),{width:r.toString(),height:i.toString(),top:s,left:o}),h=F().toLowerCase();n&&(a=Ua(h)?Cf:n),xa(h)&&(e=e||Nf,c.scrollbars="yes");let g=Object.entries(c).reduce((y,[b,T])=>`${y}${b}=${T},`,"");if(lh(h)&&a!=="_self")return Lf(e||"",a),new Bn(null);let v=window.open(e||"",a,g);w(v,t,"popup-blocked");try{v.focus()}catch{}return new Bn(v)}function Lf(t,e){let n=document.createElement("a");n.href=t,n.target=e;let r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}var Vf="__/auth/handler",Mf="emulator/auth/handler",xf=encodeURIComponent("fac");async function ba(t,e,n,r,i,s){w(t.config.authDomain,t,"auth-domain-config-required"),w(t.config.apiKey,t,"invalid-api-key");let o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Ie,eventId:i};if(e instanceof Ct){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",po(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(let[g,v]of Object.entries(s||{}))o[g]=v}if(e instanceof $e){let g=e.getScopes().filter(v=>v!=="");g.length>0&&(o.scopes=g.join(","))}t.tenantId&&(o.tid=t.tenantId);let a=o;for(let g of Object.keys(a))a[g]===void 0&&delete a[g];let c=await t._getAppCheckToken(),h=c?`#${xf}=${encodeURIComponent(c)}`:"";return`${Ff(t)}?${Ze(a).slice(1)}${h}`}function Ff({config:t}){return t.emulator?xi(t,Mf):`https://${t.authDomain}/${Vf}`}var gi="webStorageSupport",Ni=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Bi,this._completeRedirectFn=sc,this._overrideRedirectResult=cf}async _openPopup(e,n,r,i){var s;_e((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");let o=await ba(e,n,r,_i(),i);return Df(e,o,$i())}async _openRedirect(e,n,r,i){await this._originValidation(e);let s=await ba(e,n,r,_i(),i);return $h(s),new Promise(()=>{})}_initialize(e){let n=e._key();if(this.eventManagers[n]){let{manager:i,promise:s}=this.eventManagers[n];return i?Promise.resolve(i):(_e(s,"If manager is not set, promise should be"),s)}let r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){let n=await Pf(e),r=new Ci(e);return n.register("authEvent",i=>(w(i?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(gi,{type:gi},i=>{var s;let o=(s=i?.[0])===null||s===void 0?void 0:s[gi];o!==void 0&&n(!!o),X(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=gf(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Ha()||Fa()||Ui()}},ac=Ni,$n=class{constructor(e){this.factorId=e}_process(e,n,r){switch(n.type){case"enroll":return this._finalizeEnroll(e,n.credential,r);case"signin":return this._finalizeSignIn(e,n.credential);default:return ce("unexpected MultiFactorSessionType")}}},Di=class t extends $n{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new t(e)}_finalizeEnroll(e,n,r){return Mh(e,{idToken:n,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,n){return Xh(e,{mfaPendingCredential:n,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},Hn=class{constructor(){}static assertion(e){return Di._fromCredential(e)}};Hn.FACTOR_ID="phone";var Wn=class{static assertionForEnrollment(e,n){return zn._fromSecret(e,n)}static assertionForSignIn(e,n){return zn._fromEnrollmentId(e,n)}static async generateSecret(e){var n;let r=e;w(typeof((n=r.user)===null||n===void 0?void 0:n.auth)<"u","internal-error");let i=await xh(r.user.auth,{idToken:r.credential,totpEnrollmentInfo:{}});return Gn._fromStartTotpMfaEnrollmentResponse(i,r.user.auth)}};Wn.FACTOR_ID="totp";var zn=class t extends $n{constructor(e,n,r){super("totp"),this.otp=e,this.enrollmentId=n,this.secret=r}static _fromSecret(e,n){return new t(n,void 0,e)}static _fromEnrollmentId(e,n){return new t(n,e)}async _finalizeEnroll(e,n,r){return w(typeof this.secret<"u",e,"argument-error"),Fh(e,{idToken:n,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,n){w(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");let r={verificationCode:this.otp};return Zh(e,{mfaPendingCredential:n,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}},Gn=class t{constructor(e,n,r,i,s,o,a){this.sessionInfo=o,this.auth=a,this.secretKey=e,this.hashingAlgorithm=n,this.codeLength=r,this.codeIntervalSeconds=i,this.enrollmentCompletionDeadline=s}static _fromStartTotpMfaEnrollmentResponse(e,n){return new t(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,n)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,n){var r;let i=!1;return(_n(e)||_n(n))&&(i=!0),i&&(_n(e)&&(e=((r=this.auth.currentUser)===null||r===void 0?void 0:r.email)||"unknownuser"),_n(n)&&(n=this.auth.name)),`otpauth://totp/${n}:${e}?secret=${this.secretKey}&issuer=${n}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function _n(t){return typeof t>"u"||t?.length===0}var Aa="@firebase/auth",Sa="1.10.8";var Li=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let n=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){w(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};function Uf(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function jf(t){W(new V("auth",(e,{options:n})=>{let r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;w(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});let c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Wa(t)},h=new Ti(r,i,s,c);return vh(h,n),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),W(new V("auth-internal",e=>{let n=be(e.getProvider("auth").getImmediate());return(r=>new Li(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),x(Aa,Sa,Uf(t)),x(Aa,Sa,"esm2017")}var qf=5*60,Bf=Vr("authIdTokenMaxAge")||qf,Pa=null,$f=t=>async e=>{let n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>Bf)return;let i=n?.token;Pa!==i&&(Pa=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function zi(t=Ve()){let e=ae(t,"auth");if(e.isInitialized())return e.getImmediate();let n=Ka(t,{popupRedirectResolver:ac,persistence:[rc,Yn,Bi]}),r=Vr("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){let s=new URL(r,location.origin);if(location.origin===s.origin){let o=$f(s.toString());Za(n,o,()=>o(n.currentUser)),Xa(n,a=>o(a))}}let i=Dr("auth");return i&&Ja(n,`http://${i}`),n}function Hf(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}ph({loadJS(t){return new Promise((e,n)=>{let r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{let s=ne("internal-error");s.customData=i,n(s)},r.type="text/javascript",r.charset="UTF-8",Hf().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});jf("Browser");var cc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},uc={};var Gi,Wf;(function(){var t;function e(m,u){function d(){}d.prototype=u.prototype,m.D=u.prototype,m.prototype=new d,m.prototype.constructor=m,m.C=function(f,p,_){for(var l=Array(arguments.length-2),Ne=2;Ne<arguments.length;Ne++)l[Ne-2]=arguments[Ne];return u.prototype[p].apply(f,l)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(m,u,d){d||(d=0);var f=Array(16);if(typeof u=="string")for(var p=0;16>p;++p)f[p]=u.charCodeAt(d++)|u.charCodeAt(d++)<<8|u.charCodeAt(d++)<<16|u.charCodeAt(d++)<<24;else for(p=0;16>p;++p)f[p]=u[d++]|u[d++]<<8|u[d++]<<16|u[d++]<<24;u=m.g[0],d=m.g[1],p=m.g[2];var _=m.g[3],l=u+(_^d&(p^_))+f[0]+3614090360&4294967295;u=d+(l<<7&4294967295|l>>>25),l=_+(p^u&(d^p))+f[1]+3905402710&4294967295,_=u+(l<<12&4294967295|l>>>20),l=p+(d^_&(u^d))+f[2]+606105819&4294967295,p=_+(l<<17&4294967295|l>>>15),l=d+(u^p&(_^u))+f[3]+3250441966&4294967295,d=p+(l<<22&4294967295|l>>>10),l=u+(_^d&(p^_))+f[4]+4118548399&4294967295,u=d+(l<<7&4294967295|l>>>25),l=_+(p^u&(d^p))+f[5]+1200080426&4294967295,_=u+(l<<12&4294967295|l>>>20),l=p+(d^_&(u^d))+f[6]+2821735955&4294967295,p=_+(l<<17&4294967295|l>>>15),l=d+(u^p&(_^u))+f[7]+4249261313&4294967295,d=p+(l<<22&4294967295|l>>>10),l=u+(_^d&(p^_))+f[8]+1770035416&4294967295,u=d+(l<<7&4294967295|l>>>25),l=_+(p^u&(d^p))+f[9]+2336552879&4294967295,_=u+(l<<12&4294967295|l>>>20),l=p+(d^_&(u^d))+f[10]+4294925233&4294967295,p=_+(l<<17&4294967295|l>>>15),l=d+(u^p&(_^u))+f[11]+2304563134&4294967295,d=p+(l<<22&4294967295|l>>>10),l=u+(_^d&(p^_))+f[12]+1804603682&4294967295,u=d+(l<<7&4294967295|l>>>25),l=_+(p^u&(d^p))+f[13]+4254626195&4294967295,_=u+(l<<12&4294967295|l>>>20),l=p+(d^_&(u^d))+f[14]+2792965006&4294967295,p=_+(l<<17&4294967295|l>>>15),l=d+(u^p&(_^u))+f[15]+1236535329&4294967295,d=p+(l<<22&4294967295|l>>>10),l=u+(p^_&(d^p))+f[1]+4129170786&4294967295,u=d+(l<<5&4294967295|l>>>27),l=_+(d^p&(u^d))+f[6]+3225465664&4294967295,_=u+(l<<9&4294967295|l>>>23),l=p+(u^d&(_^u))+f[11]+643717713&4294967295,p=_+(l<<14&4294967295|l>>>18),l=d+(_^u&(p^_))+f[0]+3921069994&4294967295,d=p+(l<<20&4294967295|l>>>12),l=u+(p^_&(d^p))+f[5]+3593408605&4294967295,u=d+(l<<5&4294967295|l>>>27),l=_+(d^p&(u^d))+f[10]+38016083&4294967295,_=u+(l<<9&4294967295|l>>>23),l=p+(u^d&(_^u))+f[15]+3634488961&4294967295,p=_+(l<<14&4294967295|l>>>18),l=d+(_^u&(p^_))+f[4]+3889429448&4294967295,d=p+(l<<20&4294967295|l>>>12),l=u+(p^_&(d^p))+f[9]+568446438&4294967295,u=d+(l<<5&4294967295|l>>>27),l=_+(d^p&(u^d))+f[14]+3275163606&4294967295,_=u+(l<<9&4294967295|l>>>23),l=p+(u^d&(_^u))+f[3]+4107603335&4294967295,p=_+(l<<14&4294967295|l>>>18),l=d+(_^u&(p^_))+f[8]+1163531501&4294967295,d=p+(l<<20&4294967295|l>>>12),l=u+(p^_&(d^p))+f[13]+2850285829&4294967295,u=d+(l<<5&4294967295|l>>>27),l=_+(d^p&(u^d))+f[2]+4243563512&4294967295,_=u+(l<<9&4294967295|l>>>23),l=p+(u^d&(_^u))+f[7]+1735328473&4294967295,p=_+(l<<14&4294967295|l>>>18),l=d+(_^u&(p^_))+f[12]+2368359562&4294967295,d=p+(l<<20&4294967295|l>>>12),l=u+(d^p^_)+f[5]+4294588738&4294967295,u=d+(l<<4&4294967295|l>>>28),l=_+(u^d^p)+f[8]+2272392833&4294967295,_=u+(l<<11&4294967295|l>>>21),l=p+(_^u^d)+f[11]+1839030562&4294967295,p=_+(l<<16&4294967295|l>>>16),l=d+(p^_^u)+f[14]+4259657740&4294967295,d=p+(l<<23&4294967295|l>>>9),l=u+(d^p^_)+f[1]+2763975236&4294967295,u=d+(l<<4&4294967295|l>>>28),l=_+(u^d^p)+f[4]+1272893353&4294967295,_=u+(l<<11&4294967295|l>>>21),l=p+(_^u^d)+f[7]+4139469664&4294967295,p=_+(l<<16&4294967295|l>>>16),l=d+(p^_^u)+f[10]+3200236656&4294967295,d=p+(l<<23&4294967295|l>>>9),l=u+(d^p^_)+f[13]+681279174&4294967295,u=d+(l<<4&4294967295|l>>>28),l=_+(u^d^p)+f[0]+3936430074&4294967295,_=u+(l<<11&4294967295|l>>>21),l=p+(_^u^d)+f[3]+3572445317&4294967295,p=_+(l<<16&4294967295|l>>>16),l=d+(p^_^u)+f[6]+76029189&4294967295,d=p+(l<<23&4294967295|l>>>9),l=u+(d^p^_)+f[9]+3654602809&4294967295,u=d+(l<<4&4294967295|l>>>28),l=_+(u^d^p)+f[12]+3873151461&4294967295,_=u+(l<<11&4294967295|l>>>21),l=p+(_^u^d)+f[15]+530742520&4294967295,p=_+(l<<16&4294967295|l>>>16),l=d+(p^_^u)+f[2]+3299628645&4294967295,d=p+(l<<23&4294967295|l>>>9),l=u+(p^(d|~_))+f[0]+4096336452&4294967295,u=d+(l<<6&4294967295|l>>>26),l=_+(d^(u|~p))+f[7]+1126891415&4294967295,_=u+(l<<10&4294967295|l>>>22),l=p+(u^(_|~d))+f[14]+2878612391&4294967295,p=_+(l<<15&4294967295|l>>>17),l=d+(_^(p|~u))+f[5]+4237533241&4294967295,d=p+(l<<21&4294967295|l>>>11),l=u+(p^(d|~_))+f[12]+1700485571&4294967295,u=d+(l<<6&4294967295|l>>>26),l=_+(d^(u|~p))+f[3]+2399980690&4294967295,_=u+(l<<10&4294967295|l>>>22),l=p+(u^(_|~d))+f[10]+4293915773&4294967295,p=_+(l<<15&4294967295|l>>>17),l=d+(_^(p|~u))+f[1]+2240044497&4294967295,d=p+(l<<21&4294967295|l>>>11),l=u+(p^(d|~_))+f[8]+1873313359&4294967295,u=d+(l<<6&4294967295|l>>>26),l=_+(d^(u|~p))+f[15]+4264355552&4294967295,_=u+(l<<10&4294967295|l>>>22),l=p+(u^(_|~d))+f[6]+2734768916&4294967295,p=_+(l<<15&4294967295|l>>>17),l=d+(_^(p|~u))+f[13]+1309151649&4294967295,d=p+(l<<21&4294967295|l>>>11),l=u+(p^(d|~_))+f[4]+4149444226&4294967295,u=d+(l<<6&4294967295|l>>>26),l=_+(d^(u|~p))+f[11]+3174756917&4294967295,_=u+(l<<10&4294967295|l>>>22),l=p+(u^(_|~d))+f[2]+718787259&4294967295,p=_+(l<<15&4294967295|l>>>17),l=d+(_^(p|~u))+f[9]+3951481745&4294967295,m.g[0]=m.g[0]+u&4294967295,m.g[1]=m.g[1]+(p+(l<<21&4294967295|l>>>11))&4294967295,m.g[2]=m.g[2]+p&4294967295,m.g[3]=m.g[3]+_&4294967295}r.prototype.u=function(m,u){u===void 0&&(u=m.length);for(var d=u-this.blockSize,f=this.B,p=this.h,_=0;_<u;){if(p==0)for(;_<=d;)i(this,m,_),_+=this.blockSize;if(typeof m=="string"){for(;_<u;)if(f[p++]=m.charCodeAt(_++),p==this.blockSize){i(this,f),p=0;break}}else for(;_<u;)if(f[p++]=m[_++],p==this.blockSize){i(this,f),p=0;break}}this.h=p,this.o+=u},r.prototype.v=function(){var m=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);m[0]=128;for(var u=1;u<m.length-8;++u)m[u]=0;var d=8*this.o;for(u=m.length-8;u<m.length;++u)m[u]=d&255,d/=256;for(this.u(m),m=Array(16),u=d=0;4>u;++u)for(var f=0;32>f;f+=8)m[d++]=this.g[u]>>>f&255;return m};function s(m,u){var d=a;return Object.prototype.hasOwnProperty.call(d,m)?d[m]:d[m]=u(m)}function o(m,u){this.h=u;for(var d=[],f=!0,p=m.length-1;0<=p;p--){var _=m[p]|0;f&&_==u||(d[p]=_,f=!1)}this.g=d}var a={};function c(m){return-128<=m&&128>m?s(m,function(u){return new o([u|0],0>u?-1:0)}):new o([m|0],0>m?-1:0)}function h(m){if(isNaN(m)||!isFinite(m))return v;if(0>m)return P(h(-m));for(var u=[],d=1,f=0;m>=d;f++)u[f]=m/d|0,d*=4294967296;return new o(u,0)}function g(m,u){if(m.length==0)throw Error("number format error: empty string");if(u=u||10,2>u||36<u)throw Error("radix out of range: "+u);if(m.charAt(0)=="-")return P(g(m.substring(1),u));if(0<=m.indexOf("-"))throw Error('number format error: interior "-" character');for(var d=h(Math.pow(u,8)),f=v,p=0;p<m.length;p+=8){var _=Math.min(8,m.length-p),l=parseInt(m.substring(p,p+_),u);8>_?(_=h(Math.pow(u,_)),f=f.j(_).add(h(l))):(f=f.j(d),f=f.add(h(l)))}return f}var v=c(0),y=c(1),b=c(16777216);t=o.prototype,t.m=function(){if(R(this))return-P(this).m();for(var m=0,u=1,d=0;d<this.g.length;d++){var f=this.i(d);m+=(0<=f?f:4294967296+f)*u,u*=4294967296}return m},t.toString=function(m){if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(T(this))return"0";if(R(this))return"-"+P(this).toString(m);for(var u=h(Math.pow(m,6)),d=this,f="";;){var p=fe(d,u).g;d=ie(d,p.j(u));var _=((0<d.g.length?d.g[0]:d.h)>>>0).toString(m);if(d=p,T(d))return _+f;for(;6>_.length;)_="0"+_;f=_+f}},t.i=function(m){return 0>m?0:m<this.g.length?this.g[m]:this.h};function T(m){if(m.h!=0)return!1;for(var u=0;u<m.g.length;u++)if(m.g[u]!=0)return!1;return!0}function R(m){return m.h==-1}t.l=function(m){return m=ie(this,m),R(m)?-1:T(m)?0:1};function P(m){for(var u=m.g.length,d=[],f=0;f<u;f++)d[f]=~m.g[f];return new o(d,~m.h).add(y)}t.abs=function(){return R(this)?P(this):this},t.add=function(m){for(var u=Math.max(this.g.length,m.g.length),d=[],f=0,p=0;p<=u;p++){var _=f+(this.i(p)&65535)+(m.i(p)&65535),l=(_>>>16)+(this.i(p)>>>16)+(m.i(p)>>>16);f=l>>>16,_&=65535,l&=65535,d[p]=l<<16|_}return new o(d,d[d.length-1]&-2147483648?-1:0)};function ie(m,u){return m.add(P(u))}t.j=function(m){if(T(this)||T(m))return v;if(R(this))return R(m)?P(this).j(P(m)):P(P(this).j(m));if(R(m))return P(this.j(P(m)));if(0>this.l(b)&&0>m.l(b))return h(this.m()*m.m());for(var u=this.g.length+m.g.length,d=[],f=0;f<2*u;f++)d[f]=0;for(f=0;f<this.g.length;f++)for(var p=0;p<m.g.length;p++){var _=this.i(f)>>>16,l=this.i(f)&65535,Ne=m.i(p)>>>16,Zs=m.i(p)&65535;d[2*f+2*p]+=l*Zs,Q(d,2*f+2*p),d[2*f+2*p+1]+=_*Zs,Q(d,2*f+2*p+1),d[2*f+2*p+1]+=l*Ne,Q(d,2*f+2*p+1),d[2*f+2*p+2]+=_*Ne,Q(d,2*f+2*p+2)}for(f=0;f<u;f++)d[f]=d[2*f+1]<<16|d[2*f];for(f=u;f<2*u;f++)d[f]=0;return new o(d,0)};function Q(m,u){for(;(m[u]&65535)!=m[u];)m[u+1]+=m[u]>>>16,m[u]&=65535,u++}function G(m,u){this.g=m,this.h=u}function fe(m,u){if(T(u))throw Error("division by zero");if(T(m))return new G(v,v);if(R(m))return u=fe(P(m),u),new G(P(u.g),P(u.h));if(R(u))return u=fe(m,P(u)),new G(P(u.g),u.h);if(30<m.g.length){if(R(m)||R(u))throw Error("slowDivide_ only works with positive integers.");for(var d=y,f=u;0>=f.l(m);)d=mt(d),f=mt(f);var p=se(d,1),_=se(f,1);for(f=se(f,2),d=se(d,2);!T(f);){var l=_.add(f);0>=l.l(m)&&(p=p.add(d),_=l),f=se(f,1),d=se(d,1)}return u=ie(m,p.j(u)),new G(p,u)}for(p=v;0<=m.l(u);){for(d=Math.max(1,Math.floor(m.m()/u.m())),f=Math.ceil(Math.log(d)/Math.LN2),f=48>=f?1:Math.pow(2,f-48),_=h(d),l=_.j(u);R(l)||0<l.l(m);)d-=f,_=h(d),l=_.j(u);T(_)&&(_=y),p=p.add(_),m=ie(m,l)}return new G(p,m)}t.A=function(m){return fe(this,m).h},t.and=function(m){for(var u=Math.max(this.g.length,m.g.length),d=[],f=0;f<u;f++)d[f]=this.i(f)&m.i(f);return new o(d,this.h&m.h)},t.or=function(m){for(var u=Math.max(this.g.length,m.g.length),d=[],f=0;f<u;f++)d[f]=this.i(f)|m.i(f);return new o(d,this.h|m.h)},t.xor=function(m){for(var u=Math.max(this.g.length,m.g.length),d=[],f=0;f<u;f++)d[f]=this.i(f)^m.i(f);return new o(d,this.h^m.h)};function mt(m){for(var u=m.g.length+1,d=[],f=0;f<u;f++)d[f]=m.i(f)<<1|m.i(f-1)>>>31;return new o(d,m.h)}function se(m,u){var d=u>>5;u%=32;for(var f=m.g.length-d,p=[],_=0;_<f;_++)p[_]=0<u?m.i(_+d)>>>u|m.i(_+d+1)<<32-u:m.i(_+d);return new o(p,m.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Wf=uc.Md5=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=g,Gi=uc.Integer=o}).apply(typeof cc<"u"?cc:typeof self<"u"?self:typeof window<"u"?window:{});var lc="4.8.0";var j=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};j.UNAUTHENTICATED=new j(null),j.GOOGLE_CREDENTIALS=new j("google-credentials-uid"),j.FIRST_PARTY=new j("first-party-uid"),j.MOCK_USER=new j("mock-user");var ht="11.10.0";var ot=new ve("@firebase/firestore");function er(t,...e){if(ot.logLevel<=S.DEBUG){let n=e.map($s);ot.debug(`Firestore (${ht}): ${t}`,...n)}}function Bs(t,...e){if(ot.logLevel<=S.ERROR){let n=e.map($s);ot.error(`Firestore (${ht}): ${t}`,...n)}}function Cc(t,...e){if(ot.logLevel<=S.WARN){let n=e.map($s);ot.warn(`Firestore (${ht}): ${t}`,...n)}}function $s(t){if(typeof t=="string")return t;try{return function(n){return JSON.stringify(n)}(t)}catch{return t}}function C(t,e,n){let r="Unexpected state";typeof e=="string"?r=e:n=e,Nc(t,r,n)}function Nc(t,e,n){let r=`FIRESTORE (${ht}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(n!==void 0)try{r+=" CONTEXT: "+JSON.stringify(n)}catch{r+=" CONTEXT: "+n}throw Bs(r),new Error(r)}function Y(t,e,n,r){let i="Unexpected state";typeof n=="string"?i=n:r=n,t||Nc(e,i,r)}function Qt(t,e){return t}var dc="ok",zf="cancelled",Ft="unknown",E="invalid-argument",Gf="deadline-exceeded",Kf="not-found";var Jf="permission-denied",Qi="unauthenticated",Yf="resource-exhausted",Ge="failed-precondition",Qf="aborted",Xf="out-of-range",Dc="unimplemented",Zf="internal",ep="unavailable";var I=class extends q{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};var tr=class{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}},Xi=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(j.UNAUTHENTICATED))}shutdown(){}},Zi=class{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}},es=class{constructor(e){this.auth=null,e.onInit(n=>{this.auth=n})}getToken(){return this.auth?this.auth.getToken().then(e=>e?(Y(typeof e.accessToken=="string",42297,{t:e}),new tr(e.accessToken,new j(this.auth.getUid()))):null):Promise.resolve(null)}invalidateToken(){}start(e,n){}shutdown(){}},ts=class{constructor(e,n,r){this.i=e,this.o=n,this.u=r,this.type="FirstParty",this.user=j.FIRST_PARTY,this.l=new Map}h(){return this.u?this.u():null}get headers(){this.l.set("X-Goog-AuthUser",this.i);let e=this.h();return e&&this.l.set("Authorization",e),this.o&&this.l.set("X-Goog-Iam-Authorization-Token",this.o),this.l}},ns=class{constructor(e,n,r){this.i=e,this.o=n,this.u=r}getToken(){return Promise.resolve(new ts(this.i,this.o,this.u))}start(e,n){e.enqueueRetryable(()=>n(j.FIRST_PARTY))}shutdown(){}invalidateToken(){}},nr=class{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},rs=class{constructor(e,n){this.m=n,this.appCheck=null,this.T=null,J(e)&&e.settings.appCheckToken&&(this.T=e.settings.appCheckToken),n.onInit(r=>{this.appCheck=r})}getToken(){return this.T?Promise.resolve(new nr(this.T)):this.appCheck?this.appCheck.getToken().then(e=>e?(Y(typeof e.token=="string",3470,{tokenResult:e}),new nr(e.token)):null):Promise.resolve(null)}invalidateToken(){}start(e,n){}shutdown(){}};var is=class{constructor(e,n,r,i,s,o,a,c,h,g){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=c,this.useFetchStreams=h,this.isUsingEmulator=g}},ss="(default)",rr=class t{constructor(e,n){this.projectId=e,this.database=n||ss}static empty(){return new t("","")}get isDefaultDatabase(){return this.database===ss}isEqual(e){return e instanceof t&&e.projectId===this.projectId&&e.database===this.database}};function tp(t){let e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}var os=class{static newId(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=62*Math.floor(4.129032258064516),r="";for(;r.length<20;){let i=tp(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<n&&(r+=e.charAt(i[s]%62))}return r}};function O(t,e){return t<e?-1:t>e?1:0}function as(t,e){let n=0;for(;n<t.length&&n<e.length;){let r=t.codePointAt(n),i=e.codePointAt(n);if(r!==i){if(r<128&&i<128)return O(r,i);{let s=new TextEncoder,o=np(s.encode(hc(t,n)),s.encode(hc(e,n)));return o!==0?o:O(r,i)}}n+=r>65535?2:1}return O(t.length,e.length)}function hc(t,e){return t.codePointAt(e)>65535?t.substring(e,e+2):t.substring(e,e+1)}function np(t,e){for(let n=0;n<t.length&&n<e.length;++n)if(t[n]!==e[n])return O(t[n],e[n]);return O(t.length,e.length)}function Lc(t,e,n){return t.length===e.length&&t.every((r,i)=>n(r,e[i]))}var fc="__name__",ir=class t{constructor(e,n,r){n===void 0?n=0:n>e.length&&C(637,{offset:n,range:e.length}),r===void 0?r=e.length-n:r>e.length-n&&C(1746,{length:r,range:e.length-n}),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return t.comparator(this,e)===0}child(e){let n=this.segments.slice(this.offset,this.limit());return e instanceof t?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){let r=Math.min(e.length,n.length);for(let i=0;i<r;i++){let s=t.compareSegments(e.get(i),n.get(i));if(s!==0)return s}return O(e.length,n.length)}static compareSegments(e,n){let r=t.isNumericId(e),i=t.isNumericId(n);return r&&!i?-1:!r&&i?1:r&&i?t.extractNumericId(e).compare(t.extractNumericId(n)):as(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Gi.fromString(e.substring(4,e.length-2))}},D=class t extends ir{construct(e,n,r){return new t(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let n=[];for(let r of e){if(r.indexOf("//")>=0)throw new I(E,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(i=>i.length>0))}return new t(n)}static emptyPath(){return new t([])}},rp=/^[_a-zA-Z][_a-zA-Z0-9]*$/,le=class t extends ir{construct(e,n,r){return new t(e,n,r)}static isValidIdentifier(e){return rp.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),t.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===fc}static keyField(){return new t([fc])}static fromServerFormat(e){let n=[],r="",i=0,s=()=>{if(r.length===0)throw new I(E,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""},o=!1;for(;i<e.length;){let a=e[i];if(a==="\\"){if(i+1===e.length)throw new I(E,"Path has trailing escape character: "+e);let c=e[i+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new I(E,"Path has invalid escape sequence: "+e);r+=c,i+=2}else a==="`"?(o=!o,i++):a!=="."||o?(r+=a,i++):(s(),i++)}if(s(),o)throw new I(E,"Unterminated ` in path: "+e);return new t(n)}static emptyPath(){return new t([])}};var H=class t{constructor(e){this.path=e}static fromPath(e){return new t(D.fromString(e))}static fromName(e){return new t(D.fromString(e).popFirst(5))}static empty(){return new t(D.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&D.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return D.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new t(new D(e.slice()))}};function Vc(t,e,n){if(!n)throw new I(E,`Function ${t}() cannot be called with an empty ${e}.`)}function pc(t){if(!H.isDocumentKey(t))throw new I(E,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function mc(t){if(H.isDocumentKey(t))throw new I(E,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function Mc(t){return typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Object.getPrototypeOf(t)===null)}function Ar(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{let e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":C(12329,{type:typeof t})}function Xe(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new I(E,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let n=Ar(t);throw new I(E,`Expected type '${e.name}', but it was: ${n}`)}}return t}function xc(t){let e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}var Xn=null;function ip(){return Xn===null?Xn=function(){return 268435456+Math.round(2147483648*Math.random())}():Xn++,"0x"+Xn.toString(16)}function sp(t){return t==null}function sr(t){return t===0&&1/t==-1/0}var Ki="RestConnection",op={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"},cs=class{get P(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let n=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.A=n+"://"+e.host,this.R=`projects/${r}/databases/${i}`,this.V=this.databaseId.database===ss?`project_id=${r}`:`project_id=${r}&database_id=${i}`}I(e,n,r,i,s){let o=ip(),a=this.p(e,n.toUriEncodedString());er(Ki,`Sending RPC '${e}' ${o}:`,a,r);let c={"google-cloud-resource-prefix":this.R,"x-goog-request-params":this.V};this.v(c,i,s);let{host:h}=new URL(a),g=ye(h);return this.F(e,a,c,r,g).then(v=>(er(Ki,`Received RPC '${e}' ${o}: `,v),v),v=>{throw Cc(Ki,`RPC '${e}' ${o} failed with error: `,v,"url: ",a,"request:",r),v})}D(e,n,r,i,s,o){return this.I(e,n,r,i,s)}v(e,n,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+ht}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((i,s)=>e[s]=i),r&&r.headers.forEach((i,s)=>e[s]=i)}p(e,n){let r=op[e];return`${this.A}/v1/${n}:${r}`}terminate(){}};var gc,A;function _c(t){if(t===void 0)return Bs("RPC_ERROR","HTTP error has no status"),Ft;switch(t){case 200:return dc;case 400:return Ge;case 401:return Qi;case 403:return Jf;case 404:return Kf;case 409:return Qf;case 416:return Xf;case 429:return Yf;case 499:return zf;case 500:return Ft;case 501:return Dc;case 503:return ep;case 504:return Gf;default:return t>=200&&t<300?dc:t>=400&&t<500?Ge:t>=500&&t<600?Zf:Ft}}(A=gc||(gc={}))[A.OK=0]="OK",A[A.CANCELLED=1]="CANCELLED",A[A.UNKNOWN=2]="UNKNOWN",A[A.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",A[A.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",A[A.NOT_FOUND=5]="NOT_FOUND",A[A.ALREADY_EXISTS=6]="ALREADY_EXISTS",A[A.PERMISSION_DENIED=7]="PERMISSION_DENIED",A[A.UNAUTHENTICATED=16]="UNAUTHENTICATED",A[A.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",A[A.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",A[A.ABORTED=10]="ABORTED",A[A.OUT_OF_RANGE=11]="OUT_OF_RANGE",A[A.UNIMPLEMENTED=12]="UNIMPLEMENTED",A[A.INTERNAL=13]="INTERNAL",A[A.UNAVAILABLE=14]="UNAVAILABLE",A[A.DATA_LOSS=15]="DATA_LOSS";var us=class extends cs{S(e,n){throw new Error("Not supported by FetchConnection")}async F(e,n,r,i,s){var o;let a=JSON.stringify(i),c;try{let h={method:"POST",headers:r,body:a};s&&(h.credentials="include"),c=await fetch(n,h)}catch(h){let g=h;throw new I(_c(g.status),"Request failed with error: "+g.statusText)}if(!c.ok){let h=await c.json();Array.isArray(h)&&(h=h[0]);let g=(o=h?.error)===null||o===void 0?void 0:o.message;throw new I(_c(c.status),`Request failed with error: ${g??c.statusText}`)}return c.json()}};function yc(t){let e=0;for(let n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Xt(t,e){for(let n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}var ls=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};var Oe=class t{constructor(e){this.binaryString=e}static fromBase64String(e){let n=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new ls("Invalid base64 string: "+s):s}}(e);return new t(n)}static fromUint8Array(e){let n=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new t(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){let r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return O(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};Oe.EMPTY_BYTE_STRING=new Oe("");var ap=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ke(t){if(Y(!!t,39018),typeof t=="string"){let e=0,n=ap.exec(t);if(Y(!!n,46558,{timestamp:t}),n[1]){let i=n[1];i=(i+"000000000").substr(0,9),e=Number(i)}let r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:N(t.seconds),nanos:N(t.nanos)}}function N(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function Bt(t){return typeof t=="string"?Oe.fromBase64String(t):Oe.fromUint8Array(t)}function ee(t,e){let n={typeString:t};return e&&(n.value=e),n}function Zt(t,e){if(!Mc(t))throw new I(E,"JSON must be an object");let n;for(let r in e)if(e[r]){let i=e[r].typeString,s="value"in e[r]?{value:e[r].value}:void 0;if(!(r in t)){n=`JSON missing required field: '${r}'`;break}let o=t[r];if(i&&typeof o!==i){n=`JSON field '${r}' must be a ${i}.`;break}if(s!==void 0&&o!==s.value){n=`Expected '${r}' field to equal '${s.value}'`;break}}if(n)throw new I(E,n);return!0}var vc=-62135596800,wc=1e6,z=class t{static now(){return t.fromMillis(Date.now())}static fromDate(e){return t.fromMillis(e.getTime())}static fromMillis(e){let n=Math.floor(e/1e3),r=Math.floor((e-1e3*n)*wc);return new t(n,r)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new I(E,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new I(E,"Timestamp nanoseconds out of range: "+n);if(e<vc)throw new I(E,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new I(E,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/wc}_compareTo(e){return this.seconds===e.seconds?O(this.nanoseconds,e.nanoseconds):O(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:t._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Zt(e,t._jsonSchema))return new t(e.seconds,e.nanoseconds)}valueOf(){let e=this.seconds-vc;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};z._jsonSchemaVersion="firestore/timestamp/1.0",z._jsonSchema={type:ee("string",z._jsonSchemaVersion),seconds:ee("number"),nanoseconds:ee("number")};function Fc(t){var e,n;return((n=(((e=t?.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function Uc(t){let e=t.mapValue.fields.__previous_value__;return Fc(e)?Uc(e):e}function $t(t){let e=Ke(t.mapValue.fields.__local_write_time__.timestampValue);return new z(e.seconds,e.nanos)}var jc="__type__",qc="__max__",Zn={fields:{__type__:{stringValue:qc}}},Bc="__vector__",or="value";function Je(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Fc(t)?4:function(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===qc}(t)?9007199254740991:function(n){var r,i;return((i=(((r=n?.mapValue)===null||r===void 0?void 0:r.fields)||{})[jc])===null||i===void 0?void 0:i.stringValue)===Bc}(t)?10:11:C(28295,{value:t})}function ar(t,e){if(t===e)return!0;let n=Je(t);if(n!==Je(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return $t(t).isEqual($t(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;let o=Ke(i.timestampValue),a=Ke(s.timestampValue);return o.seconds===a.seconds&&o.nanos===a.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(i,s){return Bt(i.bytesValue).isEqual(Bt(s.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(i,s){return N(i.geoPointValue.latitude)===N(s.geoPointValue.latitude)&&N(i.geoPointValue.longitude)===N(s.geoPointValue.longitude)}(t,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return N(i.integerValue)===N(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){let o=N(i.doubleValue),a=N(s.doubleValue);return o===a?sr(o)===sr(a):isNaN(o)&&isNaN(a)}return!1}(t,e);case 9:return Lc(t.arrayValue.values||[],e.arrayValue.values||[],ar);case 10:case 11:return function(i,s){let o=i.mapValue.fields||{},a=s.mapValue.fields||{};if(yc(o)!==yc(a))return!1;for(let c in o)if(o.hasOwnProperty(c)&&(a[c]===void 0||!ar(o[c],a[c])))return!1;return!0}(t,e);default:return C(52216,{left:t})}}function Ht(t,e){return(t.values||[]).find(n=>ar(n,e))!==void 0}function cr(t,e){if(t===e)return 0;let n=Je(t),r=Je(e);if(n!==r)return O(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return O(t.booleanValue,e.booleanValue);case 2:return function(s,o){let a=N(s.integerValue||s.doubleValue),c=N(o.integerValue||o.doubleValue);return a<c?-1:a>c?1:a===c?0:isNaN(a)?isNaN(c)?0:-1:1}(t,e);case 3:return Ic(t.timestampValue,e.timestampValue);case 4:return Ic($t(t),$t(e));case 5:return as(t.stringValue,e.stringValue);case 6:return function(s,o){let a=Bt(s),c=Bt(o);return a.compareTo(c)}(t.bytesValue,e.bytesValue);case 7:return function(s,o){let a=s.split("/"),c=o.split("/");for(let h=0;h<a.length&&h<c.length;h++){let g=O(a[h],c[h]);if(g!==0)return g}return O(a.length,c.length)}(t.referenceValue,e.referenceValue);case 8:return function(s,o){let a=O(N(s.latitude),N(o.latitude));return a!==0?a:O(N(s.longitude),N(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return Ec(t.arrayValue,e.arrayValue);case 10:return function(s,o){var a,c,h,g;let v=s.fields||{},y=o.fields||{},b=(a=v[or])===null||a===void 0?void 0:a.arrayValue,T=(c=y[or])===null||c===void 0?void 0:c.arrayValue,R=O(((h=b?.values)===null||h===void 0?void 0:h.length)||0,((g=T?.values)===null||g===void 0?void 0:g.length)||0);return R!==0?R:Ec(b,T)}(t.mapValue,e.mapValue);case 11:return function(s,o){if(s===Zn&&o===Zn)return 0;if(s===Zn)return 1;if(o===Zn)return-1;let a=s.fields||{},c=Object.keys(a),h=o.fields||{},g=Object.keys(h);c.sort(),g.sort();for(let v=0;v<c.length&&v<g.length;++v){let y=as(c[v],g[v]);if(y!==0)return y;let b=cr(a[c[v]],h[g[v]]);if(b!==0)return b}return O(c.length,g.length)}(t.mapValue,e.mapValue);default:throw C(23264,{C:n})}}function Ic(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return O(t,e);let n=Ke(t),r=Ke(e),i=O(n.seconds,r.seconds);return i!==0?i:O(n.nanos,r.nanos)}function Ec(t,e){let n=t.values||[],r=e.values||[];for(let i=0;i<n.length&&i<r.length;++i){let s=cr(n[i],r[i]);if(s)return s}return O(n.length,r.length)}function Tc(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function $c(t){return!!t&&"arrayValue"in t}function bc(t){return!!t&&"nullValue"in t}function Ac(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Ji(t){return!!t&&"mapValue"in t}function Ut(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){let e={mapValue:{fields:{}}};return Xt(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=Ut(r)),e}if(t.arrayValue){let e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Ut(t.arrayValue.values[n]);return e}return Object.assign({},t)}var ur=class{constructor(e,n){this.position=e,this.inclusive=n}};var lr=class{},re=class t extends lr{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new ds(e,n,r):n==="array-contains"?new ps(e,r):n==="in"?new ms(e,r):n==="not-in"?new gs(e,r):n==="array-contains-any"?new _s(e,r):new t(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new hs(e,r):new fs(e,r)}matches(e){let n=e.data.field(this.field);return this.op==="!="?n!==null&&n.nullValue===void 0&&this.matchesComparison(cr(n,this.value)):n!==null&&Je(this.value)===Je(n)&&this.matchesComparison(cr(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return C(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},Wt=class t extends lr{constructor(e,n){super(),this.filters=e,this.op=n,this.N=null}static create(e,n){return new t(e,n)}matches(e){return function(r){return r.op==="and"}(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.N!==null||(this.N=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.N}getFilters(){return Object.assign([],this.filters)}};var ds=class extends re{constructor(e,n,r){super(e,n,r),this.key=H.fromName(r.referenceValue)}matches(e){let n=H.comparator(e.key,this.key);return this.matchesComparison(n)}},hs=class extends re{constructor(e,n){super(e,"in",n),this.keys=Hc("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}},fs=class extends re{constructor(e,n){super(e,"not-in",n),this.keys=Hc("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}};function Hc(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>H.fromName(r.referenceValue))}var ps=class extends re{constructor(e,n){super(e,"array-contains",n)}matches(e){let n=e.data.field(this.field);return $c(n)&&Ht(n.arrayValue,this.value)}},ms=class extends re{constructor(e,n){super(e,"in",n)}matches(e){let n=e.data.field(this.field);return n!==null&&Ht(this.value.arrayValue,n)}},gs=class extends re{constructor(e,n){super(e,"not-in",n)}matches(e){if(Ht(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let n=e.data.field(this.field);return n!==null&&n.nullValue===void 0&&!Ht(this.value.arrayValue,n)}},_s=class extends re{constructor(e,n){super(e,"array-contains-any",n)}matches(e){let n=e.data.field(this.field);return!(!$c(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>Ht(this.value.arrayValue,r))}};var zt=class{constructor(e,n="asc"){this.field=e,this.dir=n}};var $=class t{static fromTimestamp(e){return new t(e)}static min(){return new t(new z(0,0))}static max(){return new t(new z(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};var ys=class t{constructor(e,n){this.comparator=e,this.root=n||de.EMPTY}insert(e,n){return new t(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,de.BLACK,null,null))}remove(e){return new t(this.comparator,this.root.remove(e,this.comparator).copy(null,null,de.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){let r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){let i=this.comparator(e,r.key);if(i===0)return n+r.left.size;i<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){let e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new st(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new st(this.root,e,this.comparator,!1)}getReverseIterator(){return new st(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new st(this.root,e,this.comparator,!0)}},st=class{constructor(e,n,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=n?r(e.key,n):1,n&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},de=class t{constructor(e,n,r,i,s){this.key=e,this.value=n,this.color=r??t.RED,this.left=i??t.EMPTY,this.right=s??t.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,i,s){return new t(e??this.key,n??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let i=this,s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,n,r),null):s===0?i.copy(null,n,null,null,null):i.copy(null,null,null,null,i.right.insert(e,n,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return t.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,i=this;if(n(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),n(e,i.key)===0){if(i.right.isEmpty())return t.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let e=this.copy(null,null,t.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,t.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw C(43730,{key:this.key,value:this.value});if(this.right.isRed())throw C(14113,{key:this.key,value:this.value});let e=this.left.check();if(e!==this.right.check())throw C(27949);return e+(this.isRed()?0:1)}};de.EMPTY=null,de.RED=!0,de.BLACK=!1;de.EMPTY=new class{constructor(){this.size=0}get key(){throw C(57766)}get value(){throw C(16141)}get color(){throw C(16727)}get left(){throw C(29726)}get right(){throw C(36894)}copy(e,n,r,i,s){return this}insert(e,n,r){return new de(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};var dr=class t{constructor(e){this.comparator=e,this.data=new ys(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;n(i.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new hr(this.data.getIterator())}getIteratorFrom(e){return new hr(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof t)||this.size!==e.size)return!1;let n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){let i=n.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){let e=[];return this.forEach(n=>{e.push(n)}),e}toString(){let e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){let n=new t(this.comparator);return n.data=e,n}},hr=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};var at=class t{constructor(e){this.fields=e,e.sort(le.comparator)}static empty(){return new t([])}unionWith(e){let n=new dr(le.comparator);for(let r of this.fields)n=n.add(r);for(let r of e)n=n.add(r);return new t(n.toArray())}covers(e){for(let n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return Lc(this.fields,e.fields,(n,r)=>n.isEqual(r))}};var Z=class t{constructor(e){this.value=e}static empty(){return new t({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!Ji(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ut(n)}setAll(e){let n=le.emptyPath(),r={},i=[];e.forEach((o,a)=>{if(!n.isImmediateParentOf(a)){let c=this.getFieldsMap(n);this.applyChanges(c,r,i),r={},i=[],n=a.popLast()}o?r[a.lastSegment()]=Ut(o):i.push(a.lastSegment())});let s=this.getFieldsMap(n);this.applyChanges(s,r,i)}delete(e){let n=this.field(e.popLast());Ji(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return ar(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=n.mapValue.fields[e.get(r)];Ji(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=i),n=i}return n.mapValue.fields}applyChanges(e,n,r){Xt(n,(i,s)=>e[i]=s);for(let i of r)delete e[i]}clone(){return new t(Ut(this.value))}};var Gt=class t{constructor(e,n,r,i,s,o,a){this.key=e,this.documentType=n,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=a}static newInvalidDocument(e){return new t(e,0,$.min(),$.min(),$.min(),Z.empty(),0)}static newFoundDocument(e,n,r,i){return new t(e,1,n,$.min(),r,i,0)}static newNoDocument(e,n){return new t(e,2,n,$.min(),$.min(),Z.empty(),0)}static newUnknownDocument(e,n){return new t(e,3,n,$.min(),$.min(),Z.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual($.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Z.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Z.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=$.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof t&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new t(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};var vs=class{constructor(e,n=null,r=[],i=[],s=null,o=null,a=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=a,this.O=null}};function Sc(t,e=null,n=[],r=[],i=null,s=null,o=null){return new vs(t,e,n,r,i,s,o)}var fr=class{constructor(e,n=null,r=[],i=[],s=null,o="F",a=null,c=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=a,this.endAt=c,this.q=null,this.B=null,this.$=null,this.startAt,this.endAt}};function cp(t){return t.collectionGroup!==null}function up(t){let e=Qt(t);if(e.q===null){e.q=[];let n=new Set;for(let s of e.explicitOrderBy)e.q.push(s),n.add(s.field.canonicalString());let r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let a=new dr(le.comparator);return o.filters.forEach(c=>{c.getFlattenedFilters().forEach(h=>{h.isInequality()&&(a=a.add(h.field))})}),a})(e).forEach(s=>{n.has(s.canonicalString())||s.isKeyField()||e.q.push(new zt(s,r))}),n.has(le.keyField().canonicalString())||e.q.push(new zt(le.keyField(),r))}return e.q}function lp(t){let e=Qt(t);return e.B||(e.B=dp(e,up(t))),e.B}function dp(t,e){if(t.limitType==="F")return Sc(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(i=>{let s=i.dir==="desc"?"asc":"desc";return new zt(i.field,s)});let n=t.endAt?new ur(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new ur(t.startAt.position,t.startAt.inclusive):null;return Sc(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function ws(t,e){let n=t.filters.concat([e]);return new fr(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function Wc(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:sr(e)?"-0":e}}function hp(t,e){return function(r){return typeof r=="number"&&Number.isInteger(r)&&!sr(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}(e)?function(r){return{integerValue:""+r}}(e):Wc(t,e)}var ct=class{constructor(){this._=void 0}},pr=class extends ct{},Is=class extends ct{constructor(e){super(),this.elements=e}},Es=class extends ct{constructor(e){super(),this.elements=e}},Ts=class extends ct{constructor(e,n){super(),this.serializer=e,this.k=n}};var bs=class{constructor(e,n){this.field=e,this.transform=n}},Ae=class t{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new t}static exists(e){return new t(void 0,e)}static updateTime(e){return new t(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}},ut=class{},mr=class extends ut{constructor(e,n,r,i=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}},Kt=class extends ut{constructor(e,n,r,i,s=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}},Jt=class extends ut{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},As=class extends ut{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};var fp={asc:"ASCENDING",desc:"DESCENDING"},pp={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},mp={and:"AND",or:"OR"},Ss=class{constructor(e,n){this.databaseId=e,this.useProto3Json=n}};function Ps(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function gp(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function _p(t,e){return Ps(t,e.toTimestamp())}function jt(t){return Y(!!t,49232),$.fromTimestamp(function(n){let r=Ke(n);return new z(r.seconds,r.nanos)}(t))}function Hs(t,e){return ks(t,e).canonicalString()}function ks(t,e){let n=function(i){return new D(["projects",i.projectId,"databases",i.database])}(t).child("documents");return e===void 0?n:n.child(e)}function gr(t,e){return Hs(t.databaseId,e.path)}function Rs(t,e){let n=function(i){let s=D.fromString(i);return Y(Gc(s),10190,{key:s.toString()}),s}(e);if(n.get(1)!==t.databaseId.projectId)throw new I(E,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new I(E,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new H(function(i){return Y(i.length>4&&i.get(4)==="documents",29091,{key:i.toString()}),i.popFirst(5)}(n))}function Pc(t,e,n){return{name:gr(t,e),fields:n.value.mapValue.fields}}function yp(t,e){return"found"in e?function(r,i){Y(!!i.found,43571),i.found.name,i.found.updateTime;let s=Rs(r,i.found.name),o=jt(i.found.updateTime),a=i.found.createTime?jt(i.found.createTime):$.min(),c=new Z({mapValue:{fields:i.found.fields}});return Gt.newFoundDocument(s,o,a,c)}(t,e):"missing"in e?function(r,i){Y(!!i.missing,3894),Y(!!i.readTime,22933);let s=Rs(r,i.missing),o=jt(i.readTime);return Gt.newNoDocument(s,o)}(t,e):C(7234,{result:e})}function vp(t,e){let n;if(e instanceof mr)n={update:Pc(t,e.key,e.value)};else if(e instanceof Jt)n={delete:gr(t,e.key)};else if(e instanceof Kt)n={update:Pc(t,e.key,e.data),updateMask:bp(e.fieldMask)};else{if(!(e instanceof As))return C(16599,{L:e.type});n={verify:gr(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(s,o){let a=o.transform;if(a instanceof pr)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(a instanceof Is)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:a.elements}};if(a instanceof Es)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:a.elements}};if(a instanceof Ts)return{fieldPath:o.field.canonicalString(),increment:a.k};throw C(20930,{transform:o.transform})}(0,r))),e.precondition.isNone||(n.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:_p(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:C(27497)}(t,e.precondition)),n}function wp(t,e){let n={structuredQuery:{}},r=e.path,i;e.collectionGroup!==null?(i=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=function(h,g){return Hs(h.databaseId,g)}(t,i);let s=function(h){if(h.length!==0)return zc(Wt.create(h,"and"))}(e.filters);s&&(n.structuredQuery.where=s);let o=function(h){if(h.length!==0)return h.map(g=>function(y){return{field:it(y.field),direction:Ip(y.dir)}}(g))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);let a=function(h,g){return h.useProto3Json||sp(g)?g:{value:g}}(t,e.limit);return a!==null&&(n.structuredQuery.limit=a),e.startAt&&(n.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{M:n,parent:i}}function Ip(t){return fp[t]}function Ep(t){return pp[t]}function Tp(t){return mp[t]}function it(t){return{fieldPath:t.canonicalString()}}function zc(t){return t instanceof re?function(n){if(n.op==="=="){if(Ac(n.value))return{unaryFilter:{field:it(n.field),op:"IS_NAN"}};if(bc(n.value))return{unaryFilter:{field:it(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(Ac(n.value))return{unaryFilter:{field:it(n.field),op:"IS_NOT_NAN"}};if(bc(n.value))return{unaryFilter:{field:it(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:it(n.field),op:Ep(n.op),value:n.value}}}(t):t instanceof Wt?function(n){let r=n.getFilters().map(i=>zc(i));return r.length===1?r[0]:{compositeFilter:{op:Tp(n.op),filters:r}}}(t):C(54877,{filter:t})}function bp(t){let e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function Gc(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}function Ws(t){return new Ss(t,!0)}var Os=class{},Cs=class extends Os{constructor(e,n,r,i){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=i,this.et=!1}rt(){if(this.et)throw new I(Ge,"The client has already been terminated.")}I(e,n,r,i){return this.rt(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.I(e,ks(n,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===Qi&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new I(Ft,s.toString())})}D(e,n,r,i,s){return this.rt(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.D(e,ks(n,r),i,o,a,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===Qi&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new I(Ft,o.toString())})}terminate(){this.et=!0,this.connection.terminate()}};async function Sr(t,e){let n=Qt(t),r={writes:e.map(i=>vp(n.serializer,i))};await n.I("Commit",n.serializer.databaseId,D.emptyPath(),r)}async function Ap(t,e){let n=Qt(t),r={documents:e.map(a=>gr(n.serializer,a))},i=await n.D("BatchGetDocuments",n.serializer.databaseId,D.emptyPath(),r,e.length),s=new Map;i.forEach(a=>{let c=yp(n.serializer,a);s.set(c.key.toString(),c)});let o=[];return e.forEach(a=>{let c=s.get(a.toString());Y(!!c,55234,{key:a}),o.push(c)}),o}async function Sp(t,e){let n=Qt(t),{M:r,parent:i}=wp(n.serializer,lp(e));return(await n.D("RunQuery",n.serializer.databaseId,i,{structuredQuery:r.structuredQuery})).filter(s=>!!s.document).map(s=>function(a,c,h){let g=Rs(a,c.name),v=jt(c.updateTime),y=c.createTime?jt(c.createTime):$.min(),b=new Z({mapValue:{fields:c.fields}}),T=Gt.newFoundDocument(g,v,y,b);return h&&T.setHasCommittedMutations(),h?T.setHasCommittedMutations():T}(n.serializer,s.document,void 0))}var Kc="ComponentProvider",qt=new Map;function ft(t){if(t._terminated)throw new I(Ge,"The client has already been terminated.");if(!qt.has(t)){er(Kc,"Initializing Datastore");let e=function(s){return new us(s)}(function(s,o,a,c){return new is(s,o,a,c.host,c.ssl,c.experimentalForceLongPolling,c.experimentalAutoDetectLongPolling,xc(c.experimentalLongPollingOptions),c.useFetchStreams,c.isUsingEmulator)}(t._databaseId,t.app.options.appId||"",t._persistenceKey,t._freezeSettings())),n=Ws(t._databaseId),r=function(s,o,a,c){return new Cs(s,o,a,c)}(t._authCredentials,t._appCheckCredentials,e,n);qt.set(t,r)}return qt.get(t)}var Pp=1048576,Jc="firestore.googleapis.com",kc=!0;var _r=class{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new I(E,"Can't provide ssl option if host option is not set");this.host=Jc,this.ssl=kc}else this.host=e.host,this.ssl=(n=e.ssl)!==null&&n!==void 0?n:kc;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Pp)throw new I(E,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}(function(s,o,a,c){if(o===!0&&c===!0)throw new I(E,`${s} and ${a} cannot be used together.`)})("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=xc((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new I(E,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new I(E,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new I(E,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}},Ye=class{constructor(e,n,r,i){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new _r({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new I(Ge,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new I(Ge,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new _r(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Xi;switch(r.type){case"firstParty":return new ns(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new I(E,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){let r=qt.get(n);r&&(er(Kc,"Removing Datastore"),qt.delete(n),r.terminate())}(this),Promise.resolve()}};function Yc(t,e){let n=typeof t=="object"?t:Ve(),r=typeof t=="string"?t:e||"(default)",i=ae(n,"firestore/lite").getImmediate({identifier:r});if(!i._initialized){let s=so("firestore");s&&kp(i,...s)}return i}function kp(t,e,n,r={}){var i;t=Xe(t,Ye);let s=ye(e),o=t._getSettings(),a=Object.assign(Object.assign({},o),{emulatorOptions:t._getEmulatorOptions()}),c=`${e}:${n}`;s&&(sn(`https://${c}`),on("Firestore",!0)),o.host!==Jc&&o.host!==c&&Cc("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");let h=Object.assign(Object.assign({},o),{host:c,ssl:s,emulatorOptions:r});if(!oe(h,a)&&(t._setSettings(h),r.mockUserToken)){let g,v;if(typeof r.mockUserToken=="string")g=r.mockUserToken,v=j.MOCK_USER;else{g=oo(r.mockUserToken,(i=t._app)===null||i===void 0?void 0:i.options.projectId);let y=r.mockUserToken.sub||r.mockUserToken.user_id;if(!y)throw new I(E,"mockUserToken must contain 'sub' or 'user_id' field!");v=new j(y)}t._authCredentials=new Zi(new tr(g,v))}}var lt=class t{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new t(this.firestore,e,this._query)}},L=class t{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Se(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new t(this.firestore,e,this._key)}toJSON(){return{type:t._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,n,r){if(Zt(n,t._jsonSchema))return new t(e,r||null,new H(D.fromString(n.referencePath)))}};L._jsonSchemaVersion="firestore/documentReference/1.0",L._jsonSchema={type:ee("string",L._jsonSchemaVersion),referencePath:ee("string")};var Se=class t extends lt{constructor(e,n,r){super(e,n,function(s){return new fr(s)}(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new L(this.firestore,null,new H(e))}withConverter(e){return new t(this.firestore,e,this._path)}};function Qc(t,e,...n){if(t=k(t),Vc("collection","path",e),t instanceof Ye){let r=D.fromString(e,...n);return mc(r),new Se(t,null,r)}{if(!(t instanceof L||t instanceof Se))throw new I(E,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=t._path.child(D.fromString(e,...n));return mc(r),new Se(t.firestore,null,r)}}function pt(t,e,...n){if(t=k(t),arguments.length===1&&(e=os.newId()),Vc("doc","path",e),t instanceof Ye){let r=D.fromString(e,...n);return pc(r),new L(t,null,new H(r))}{if(!(t instanceof L||t instanceof Se))throw new I(E,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=t._path.child(D.fromString(e,...n));return pc(r),new L(t.firestore,t instanceof Se?t.converter:null,new H(r))}}var Pe=class t{constructor(e){this._byteString=e}static fromBase64String(e){try{return new t(Oe.fromBase64String(e))}catch(n){throw new I(E,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new t(Oe.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:t._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Zt(e,t._jsonSchema))return t.fromBase64String(e.bytes)}};Pe._jsonSchemaVersion="firestore/bytes/1.0",Pe._jsonSchema={type:ee("string",Pe._jsonSchemaVersion),bytes:ee("string")};var Qe=class{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new I(E,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new le(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};var dt=class{constructor(e){this._methodName=e}};var ke=class t{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new I(E,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new I(E,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return O(this._lat,e._lat)||O(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:t._jsonSchemaVersion}}static fromJSON(e){if(Zt(e,t._jsonSchema))return new t(e.latitude,e.longitude)}};ke._jsonSchemaVersion="firestore/geoPoint/1.0",ke._jsonSchema={type:ee("string",ke._jsonSchemaVersion),latitude:ee("number"),longitude:ee("number")};var Re=class t{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}toJSON(){return{type:t._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Zt(e,t._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(n=>typeof n=="number"))return new t(e.vectorValues);throw new I(E,"Expected 'vectorValues' field to be a number array")}}};Re._jsonSchemaVersion="firestore/vectorValue/1.0",Re._jsonSchema={type:ee("string",Re._jsonSchemaVersion),vectorValues:ee("object")};var Rp=/^__.*__$/,Ns=class{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new Kt(e,this.data,this.fieldMask,n,this.fieldTransforms):new mr(e,this.data,n,this.fieldTransforms)}},yr=class{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new Kt(e,this.data,this.fieldMask,n,this.fieldTransforms)}};function Xc(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw C(40011,{it:t})}}var Ds=class t{constructor(e,n,r,i,s,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.st(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get it(){return this.settings.it}ot(e){return new t(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}ut(e){var n;let r=(n=this.path)===null||n===void 0?void 0:n.child(e),i=this.ot({path:r,_t:!1});return i.ct(e),i}lt(e){var n;let r=(n=this.path)===null||n===void 0?void 0:n.child(e),i=this.ot({path:r,_t:!1});return i.st(),i}ht(e){return this.ot({path:void 0,_t:!0})}ft(e){return wr(e,this.settings.methodName,this.settings.dt||!1,this.path,this.settings.Et)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}st(){if(this.path)for(let e=0;e<this.path.length;e++)this.ct(this.path.get(e))}ct(e){if(e.length===0)throw this.ft("Document fields must not be empty");if(Xc(this.it)&&Rp.test(e))throw this.ft('Document fields cannot begin and end with "__"')}},Ls=class{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||Ws(e)}Tt(e,n,r,i=!1){return new Ds({it:e,methodName:n,Et:r,path:le.emptyPath(),_t:!1,dt:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function Pr(t){let e=t._freezeSettings(),n=Ws(t._databaseId);return new Ls(t._databaseId,!!e.ignoreUndefinedProperties,n)}function Zc(t,e,n,r,i,s={}){let o=t.Tt(s.merge||s.mergeFields?2:0,e,n,i);zs("Data must be an object, but it was:",o,r);let a=nu(r,o),c,h;if(s.merge)c=new at(o.fieldMask),h=o.fieldTransforms;else if(s.mergeFields){let g=[];for(let v of s.mergeFields){let y=Ms(e,v,n);if(!o.contains(y))throw new I(E,`Field '${y}' is specified in your field mask but missing from your input data.`);iu(g,y)||g.push(y)}c=new at(g),h=o.fieldTransforms.filter(v=>c.covers(v.field))}else c=null,h=o.fieldTransforms;return new Ns(new Z(a),c,h)}var vr=class t extends dt{_toFieldTransform(e){if(e.it!==2)throw e.it===1?e.ft(`${this._methodName}() can only appear at the top level of your update data`):e.ft(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof t}};var Vs=class t extends dt{_toFieldTransform(e){return new bs(e.path,new pr)}isEqual(e){return e instanceof t}};function eu(t,e,n,r){let i=t.Tt(1,e,n);zs("Data must be an object, but it was:",i,r);let s=[],o=Z.empty();Xt(r,(c,h)=>{let g=Gs(e,c,n);h=k(h);let v=i.lt(g);if(h instanceof vr)s.push(g);else{let y=en(h,v);y!=null&&(s.push(g),o.set(g,y))}});let a=new at(s);return new yr(o,a,i.fieldTransforms)}function tu(t,e,n,r,i,s){let o=t.Tt(1,e,n),a=[Ms(e,r,n)],c=[i];if(s.length%2!=0)throw new I(E,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let y=0;y<s.length;y+=2)a.push(Ms(e,s[y])),c.push(s[y+1]);let h=[],g=Z.empty();for(let y=a.length-1;y>=0;--y)if(!iu(h,a[y])){let b=a[y],T=c[y];T=k(T);let R=o.lt(b);if(T instanceof vr)h.push(b);else{let P=en(T,R);P!=null&&(h.push(b),g.set(b,P))}}let v=new at(h);return new yr(g,v,o.fieldTransforms)}function Op(t,e,n,r=!1){return en(n,t.Tt(r?4:3,e))}function en(t,e){if(ru(t=k(t)))return zs("Unsupported field value:",e,t),nu(t,e);if(t instanceof dt)return function(r,i){if(!Xc(i.it))throw i.ft(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.ft(`${r._methodName}() is not currently supported inside arrays`);let s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings._t&&e.it!==4)throw e.ft("Nested arrays are not supported");return function(r,i){let s=[],o=0;for(let a of r){let c=en(a,i.ht(o));c==null&&(c={nullValue:"NULL_VALUE"}),s.push(c),o++}return{arrayValue:{values:s}}}(t,e)}return function(r,i){if((r=k(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return hp(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){let s=z.fromDate(r);return{timestampValue:Ps(i.serializer,s)}}if(r instanceof z){let s=new z(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Ps(i.serializer,s)}}if(r instanceof ke)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Pe)return{bytesValue:gp(i.serializer,r._byteString)};if(r instanceof L){let s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.ft(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Hs(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof Re)return function(o,a){return{mapValue:{fields:{[jc]:{stringValue:Bc},[or]:{arrayValue:{values:o.toArray().map(h=>{if(typeof h!="number")throw a.ft("VectorValues must only contain numeric values.");return Wc(a.serializer,h)})}}}}}}(r,i);throw i.ft(`Unsupported field value: ${Ar(r)}`)}(t,e)}function nu(t,e){let n={};return function(i){for(let s in i)if(Object.prototype.hasOwnProperty.call(i,s))return!1;return!0}(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Xt(t,(r,i)=>{let s=en(i,e.ut(r));s!=null&&(n[r]=s)}),{mapValue:{fields:n}}}function ru(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof z||t instanceof ke||t instanceof Pe||t instanceof L||t instanceof dt||t instanceof Re)}function zs(t,e,n){if(!ru(n)||!Mc(n)){let r=Ar(n);throw r==="an object"?e.ft(t+" a custom object"):e.ft(t+" "+r)}}function Ms(t,e,n){if((e=k(e))instanceof Qe)return e._internalPath;if(typeof e=="string")return Gs(t,e);throw wr("Field path arguments must be of type string or ",t,!1,void 0,n)}var Cp=new RegExp("[~\\*/\\[\\]]");function Gs(t,e,n){if(e.search(Cp)>=0)throw wr(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new Qe(...e.split("."))._internalPath}catch{throw wr(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function wr(t,e,n,r,i){let s=r&&!r.isEmpty(),o=i!==void 0,a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(s||o)&&(c+=" (found",s&&(c+=` in field ${r}`),o&&(c+=` in document ${i}`),c+=")"),new I(E,a+t+c)}function iu(t,e){return t.some(n=>n.isEqual(e))}var Ir=class{constructor(e,n,r,i,s){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new L(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let e=new Er(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let n=this._document.data.field(su("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}},Er=class extends Ir{data(){return super.data()}},xs=class{constructor(e,n){this._docs=n,this.query=e}get docs(){return[...this._docs]}get size(){return this.docs.length}get empty(){return this.docs.length===0}forEach(e,n){this._docs.forEach(e,n)}};function su(t,e){return typeof e=="string"?Gs(t,e):e instanceof Qe?e._internalPath:e._delegate._internalPath}var Yt=class{},Fs=class extends Yt{};function ou(t,e,...n){let r=[];e instanceof Yt&&r.push(e),r=r.concat(n),function(s){let o=s.filter(c=>c instanceof Us).length,a=s.filter(c=>c instanceof Tr).length;if(o>1||o>0&&a>0)throw new I(E,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(let i of r)t=i._apply(t);return t}var Tr=class t extends Fs{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new t(e,n,r)}_apply(e){let n=this._parse(e);return au(e._query,n),new lt(e.firestore,e.converter,ws(e._query,n))}_parse(e){let n=Pr(e.firestore);return function(s,o,a,c,h,g,v){let y;if(h.isKeyField()){if(g==="array-contains"||g==="array-contains-any")throw new I(E,`Invalid Query. You can't perform '${g}' queries on documentId().`);if(g==="in"||g==="not-in"){Oc(v,g);let T=[];for(let R of v)T.push(Rc(c,s,R));y={arrayValue:{values:T}}}else y=Rc(c,s,v)}else g!=="in"&&g!=="not-in"&&g!=="array-contains-any"||Oc(v,g),y=Op(a,o,v,g==="in"||g==="not-in");return re.create(h,g,y)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}};function Ks(t,e,n){let r=e,i=su("where",t);return Tr._create(i,r,n)}var Us=class t extends Yt{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new t(e,n)}_parse(e){let n=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return n.length===1?n[0]:Wt.create(n,this._getOperator())}_apply(e){let n=this._parse(e);return n.getFilters().length===0?e:(function(i,s){let o=i,a=s.getFlattenedFilters();for(let c of a)au(o,c),o=ws(o,c)}(e._query,n),new lt(e.firestore,e.converter,ws(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}};function Rc(t,e,n){if(typeof(n=k(n))=="string"){if(n==="")throw new I(E,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!cp(e)&&n.indexOf("/")!==-1)throw new I(E,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);let r=e.path.child(D.fromString(n));if(!H.isDocumentKey(r))throw new I(E,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Tc(t,new H(r))}if(n instanceof L)return Tc(t,n._key);throw new I(E,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ar(n)}.`)}function Oc(t,e){if(!Array.isArray(t)||t.length===0)throw new I(E,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function au(t,e){let n=function(i,s){for(let o of i)for(let a of o.getFlattenedFilters())if(s.indexOf(a.op)>=0)return a.op;return null}(t.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new I(E,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new I(E,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}var js=class{convertValue(e,n="none"){switch(Je(e)){case 0:return null;case 1:return e.booleanValue;case 2:return N(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(Bt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw C(62114,{value:e})}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){let r={};return Xt(e,(i,s)=>{r[i]=this.convertValue(s,n)}),r}convertVectorValue(e){var n,r,i;let s=(i=(r=(n=e.fields)===null||n===void 0?void 0:n[or].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(o=>N(o.doubleValue));return new Re(s)}convertGeoPoint(e){return new ke(N(e.latitude),N(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":let r=Uc(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp($t(e));default:return null}}convertTimestamp(e){let n=Ke(e);return new z(n.seconds,n.nanos)}convertDocumentKey(e,n){let r=D.fromString(e);Y(Gc(r),9688,{name:e});let i=new rr(r.get(1),r.get(3)),s=new H(r.popFirst(5));return i.isEqual(n)||Bs(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),s}};function cu(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}var br=class extends js{constructor(e){super(),this.firestore=e}convertBytes(e){return new Pe(e)}convertReference(e){let n=this.convertDocumentKey(e,this.firestore._databaseId);return new L(this.firestore,null,n)}};function Js(t){let e=ft((t=Xe(t,L)).firestore),n=new br(t.firestore);return Ap(e,[t._key]).then(r=>{Y(r.length===1,15618);let i=r[0];return new Ir(t.firestore,n,t._key,i.isFoundDocument()?i:null,t.converter)})}function uu(t){(function(i){if(i.limitType==="L"&&i.explicitOrderBy.length===0)throw new I(Dc,"limitToLast() queries require specifying at least one orderBy() clause")})((t=Xe(t,lt))._query);let e=ft(t.firestore),n=new br(t.firestore);return Sp(e,t._query).then(r=>{let i=r.map(s=>new Er(t.firestore,n,s.key,s,t.converter));return t._query.limitType==="L"&&i.reverse(),new xs(t,i)})}function Ys(t,e,n){let r=cu((t=Xe(t,L)).converter,e,n),i=Zc(Pr(t.firestore),"setDoc",t._key,r,t.converter!==null,n);return Sr(ft(t.firestore),[i.toMutation(t._key,Ae.none())])}function lu(t,e,n,...r){let i=Pr((t=Xe(t,L)).firestore),s;return s=typeof(e=k(e))=="string"||e instanceof Qe?tu(i,"updateDoc",t._key,e,n,r):eu(i,"updateDoc",t._key,e),Sr(ft(t.firestore),[s.toMutation(t._key,Ae.exists(!0))])}function du(t){return Sr(ft((t=Xe(t,L)).firestore),[new Jt(t._key,Ae.none())])}function tn(){return new Vs("serverTimestamp")}var qs=class{constructor(e,n){this._firestore=e,this._commitHandler=n,this._mutations=[],this._committed=!1,this._dataReader=Pr(e)}set(e,n,r){this._verifyNotCommitted();let i=Yi(e,this._firestore),s=cu(i.converter,n,r),o=Zc(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,r);return this._mutations.push(o.toMutation(i._key,Ae.none())),this}update(e,n,r,...i){this._verifyNotCommitted();let s=Yi(e,this._firestore),o;return o=typeof(n=k(n))=="string"||n instanceof Qe?tu(this._dataReader,"WriteBatch.update",s._key,n,r,i):eu(this._dataReader,"WriteBatch.update",s._key,n),this._mutations.push(o.toMutation(s._key,Ae.exists(!0))),this}delete(e){this._verifyNotCommitted();let n=Yi(e,this._firestore);return this._mutations=this._mutations.concat(new Jt(n._key,Ae.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new I(Ge,"A write batch can no longer be used after commit() has been called.")}};function Yi(t,e){if((t=k(t)).firestore!==e)throw new I(E,"Provided document reference is from a different Firestore instance.");return t}function Qs(t){let e=ft(t=Xe(t,Ye));return new qs(t,n=>Sr(e,n))}(function(){(function(n){ht=n})(`${Ie}_lite`),W(new V("firestore/lite",(e,{instanceIdentifier:n,options:r})=>{let i=e.getProvider("app").getImmediate(),s=new Ye(new es(e.getProvider("auth-internal")),new rs(i,e.getProvider("app-check-internal")),function(a,c){if(!Object.prototype.hasOwnProperty.apply(a.options,["projectId"]))throw new I(E,'"projectId" not provided in firebase.initializeApp.');return new rr(a.options.projectId,c)}(i,n),i);return r&&s._setSettings(r),s},"PUBLIC").setMultipleInstances(!0)),x("firestore-lite",lc,""),x("firestore-lite",lc,"esm2017")})();var Xs=Yr({apiKey:"AIzaSyCmEVnBSkODaCZyrdEdO0vNQtvOnvgsQiA",authDomain:"ttcmh-2a752.firebaseapp.com",projectId:"ttcmh-2a752",appId:"1:198162387540:web:f4c4728a39aed9468c13c1"}),he=zi(Xs),Ce=Yc(Xs);ji(he,Yn).catch(()=>{});Wi(he).catch(()=>{});var kr=()=>pt(Ce,"boardMembers",he.currentUser.uid);window.TTCAuth={async enablePush(t,e){if(!await di())throw new Error("unsupported");let n=await navigator.serviceWorker.ready,r=await ua(ca(Xs),{vapidKey:t,serviceWorkerRegistration:n});try{await Ys(pt(Ce,"pushTokens",r),{createdAt:tn(),platform:e})}catch{}return r},onUser:t=>qi(he,e=>t(e?{uid:e.uid,name:e.displayName||"",email:e.email||""}:null)),async signIn(){let t=new He;t.setCustomParameters({prompt:"select_account"}),await Hi(he,t)},signOut:()=>Jn(he),async getMember(){let t=await Js(kr());return t.exists()?t.data():null},async saveMember({name:t,phone:e,referrer:n},r){let i=he.currentUser,s={name:t,phone:e,consent:!0,updatedAt:tn()};return i.email&&(s.email=i.email),r?Ys(kr(),{...s,...n&&n!==i.uid?{ref:n}:{},createdAt:tn()}):lu(kr(),s)},async referrals(){let t=await Js(pt(Ce,"boardPublic","referrals"));return t.exists()?t.data():null},async deleteMember(){await du(kr()),await Jn(he)},async mySignups(t){let e=ou(Qc(Ce,"eventSignups"),Ks("uid","==",he.currentUser.uid),Ks("event","==",t));return(await uu(e)).docs.map(n=>({id:n.id,...n.data()}))},async signUp(t,e,n){let r=he.currentUser,i=Qs(Ce);return e.forEach((s,o)=>{let a=o+1,c={event:t,uid:r.uid,n:a,firstName:s.firstName,lastName:s.lastName,heat:s.heat,gender:s.gender,birth:s.birth,city:s.city,phone:s.phone,shirt:s.shirt,byName:n,createdAt:tn()};r.email&&(c.email=r.email),i.set(pt(Ce,"eventSignups",`${t}_${r.uid}_${a}`),c)}),i.commit()},async cancelSignups(t){let e=await window.TTCAuth.mySignups(t),n=Qs(Ce);return e.forEach(r=>n.delete(pt(Ce,"eventSignups",r.id))),n.commit()}};window.dispatchEvent(new Event("ttc-auth-ready"));})();
/*! Bundled license information:

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/logger/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/messaging/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
   * in compliance with the License. You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under the License
   * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
   * or implied. See the License for the specific language governing permissions and limitations under
   * the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/messaging/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/messaging/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/messaging/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/messaging/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/webchannel-wrapper/dist/bloom-blob/esm/bloom_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)
  (** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
  * @license
  * Copyright 2020 Google LLC
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *   http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
  * @license
  * Copyright 2017 Google LLC
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *   http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
