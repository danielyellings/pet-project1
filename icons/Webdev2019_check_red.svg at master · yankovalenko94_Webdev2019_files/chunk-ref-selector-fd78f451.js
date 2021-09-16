System.register(["./chunk-vendor.js","./chunk-frameworks.js"],(function(){"use strict";var e,t,i,n,r,s,o,a;return{setters:[function(o){e=o._,t=o.t,i=o.g,n=o.c,r=o.i,s=o.p},function(e){o=e.s,a=e.b}],execute:function(){let h=class InputDemuxElement extends HTMLElement{connectedCallback(){this.control&&(this.storedInput=Array(this.control.children.length).fill("")),this.addEventListener("input",this.relayInput.bind(this)),this.addEventListener("keydown",this.relayKeydown.bind(this));const e=this.closest("details");e&&e.addEventListener("toggle",(()=>{e.open&&this.source.focus()}))}relayKeydown(e){if(!this.isControlTab(e.target)&&e.target!==this.source||"ArrowDown"!==e.key&&"Tab"!==e.key){if("Escape"===e.key){const e=this.closest("details");e&&e.removeAttribute("open")}}else e.preventDefault(),e.stopPropagation(),this.routeCustomEvent(new CustomEvent("focus-list"))}isControlTab(e){return!!e&&(!!this.control&&Array.from(this.control.children).includes(e))}relayInput(e){if(!e.target)return;const t=e.target.value;this.routeCustomEvent(new CustomEvent("input-entered",{detail:t}))}routeCustomEvent(e){this.sinks[this.selectedIndex].dispatchEvent(e)}get selectedIndex(){if(!this.control)return 0;const e=this.control.querySelector('[aria-selected="true"]');if(!e)throw new Error("no selected element");return Array.from(this.control.children).indexOf(e)}storeInput(){this.storedInput[this.selectedIndex]=this.source.value}updateInput(e){this.source.value=this.storedInput[this.selectedIndex];const t=e.detail.relatedTarget.getAttribute("data-filter-placeholder");this.source.placeholder=t,this.source.setAttribute("aria-label",t),this.notifySelected()}notifySelected(){const e=this.sinks[this.selectedIndex],t=new CustomEvent("tab-selected");e.dispatchEvent(t)}};e([t],h.prototype,"source",void 0),e([i],h.prototype,"sinks",void 0),e([t],h.prototype,"control",void 0),h=e([n],h);const{getItem:d,setItem:c,removeItem:l}=o("localStorage",{throwQuotaErrorsOnSet:!0});var u,f;!function(e){e.Branch="branch",e.Tag="tag"}(u||(u={}));class SearchIndex{constructor(e,t,i,n,r){this.knownItems=[],this.currentSearchResult=[],this.exactMatchFound=!1,this.isLoading=!0,this.fetchInProgress=!1,this.fetchFailed=!1,this.refType=e,this.selector=t,this.refEndpoint=i,this.cacheKey=n,this.nameWithOwner=r}render(){this.selector.render()}async fetchData(){if(this.isLoading&&!this.fetchInProgress){if(!this.bootstrapFromLocalStorage()){this.fetchInProgress=!0,this.fetchFailed=!1;const e=await fetch(`${this.refEndpoint}?type=${this.refType}`,{headers:{Accept:"application/json"}});await this.processResponse(e)}this.isLoading=!1,this.fetchInProgress=!1,this.render()}}async processResponse(e){if(this.emitStats(e),!e.ok)return void(this.fetchFailed=!0);const t=e.clone(),i=await e.json();this.knownItems=i.refs,this.cacheKey=i.cacheKey,this.flushToLocalStorage(await t.text())}emitStats(e){if(e.ok)switch(e.status){case 200:a({incrementKey:"REF_SELECTOR_BOOTED_FROM_UNCACHED_HTTP"});break;case 304:a({incrementKey:"REF_SELECTOR_BOOTED_FROM_HTTP_CACHE"});break;default:a({incrementKey:"REF_SELECTOR_UNEXPECTED_RESPONSE"})}else a({incrementKey:"REF_SELECTOR_BOOT_FAILED"},!0)}search(e){if(""===e)return void(this.currentSearchResult=this.knownItems);const t=[],i=[];let n;this.exactMatchFound=!1;for(const r of this.knownItems)n=r.indexOf(e),n<0||(0!==n?t.push(r):(i.push(r),e===r&&(this.exactMatchFound=!0)));this.currentSearchResult=[...i,...t]}bootstrapFromLocalStorage(){const e=d(this.localStorageKey);if(!e)return!1;const t=JSON.parse(e);return t.cacheKey===this.cacheKey&&"refs"in t?(this.knownItems=t.refs,this.isLoading=!1,a({incrementKey:"REF_SELECTOR_BOOTED_FROM_LOCALSTORAGE"}),!0):(l(this.localStorageKey),!1)}async flushToLocalStorage(e){try{c(this.localStorageKey,e)}catch(t){if(!t.message.toLowerCase().includes("quota"))throw t;this.clearSiblingLocalStorage(),a({incrementKey:"REF_SELECTOR_LOCALSTORAGE_OVERFLOWED"});try{c(this.localStorageKey,e)}catch(i){i.message.toLowerCase().includes("quota")&&a({incrementKey:"REF_SELECTOR_LOCALSTORAGE_GAVE_UP"})}}}clearSiblingLocalStorage(){for(const e of Object.keys(localStorage))e.startsWith(SearchIndex.LocalStoragePrefix)&&l(e)}get localStorageKey(){return`${SearchIndex.LocalStoragePrefix}:${this.nameWithOwner}:${this.refType}`}}SearchIndex.LocalStoragePrefix="ref-selector";var p="undefined"==typeof document?void 0:document;function m(e,t){var i=e.nodeName,n=t.nodeName;return i===n||!!(t.actualize&&i.charCodeAt(0)<91&&n.charCodeAt(0)>90)&&i===n.toUpperCase()}function g(e,t,i){e[i]!==t[i]&&(e[i]=t[i],e[i]?e.setAttribute(i,""):e.removeAttribute(i))}var v={OPTION:function(e,t){var i=e.parentNode;if(i){var n=i.nodeName.toUpperCase();"OPTGROUP"===n&&(n=(i=i.parentNode)&&i.nodeName.toUpperCase()),"SELECT"!==n||i.hasAttribute("multiple")||(e.hasAttribute("selected")&&!t.selected&&(e.setAttribute("selected","selected"),e.removeAttribute("selected")),i.selectedIndex=-1)}g(e,t,"selected")},INPUT:function(e,t){g(e,t,"checked"),g(e,t,"disabled"),e.value!==t.value&&(e.value=t.value),t.hasAttribute("value")||e.removeAttribute("value")},TEXTAREA:function(e,t){var i=t.value;e.value!==i&&(e.value=i);var n=e.firstChild;if(n){var r=n.nodeValue;if(r==i||!i&&r==e.placeholder)return;n.nodeValue=i}},SELECT:function(e,t){if(!t.hasAttribute("multiple")){for(var i,n,r=-1,s=0,o=e.firstChild;o;)if("OPTGROUP"===(n=o.nodeName&&o.nodeName.toUpperCase()))o=(i=o).firstChild;else{if("OPTION"===n){if(o.hasAttribute("selected")){r=s;break}s++}!(o=o.nextSibling)&&i&&(o=i.nextSibling,i=null)}e.selectedIndex=r}}};function x(){}function S(e){return e.id}var I=function(e){return function(t,i,n){if(n||(n={}),"string"==typeof i)if("#document"===t.nodeName||"HTML"===t.nodeName){var r=i;(i=p.createElement("html")).innerHTML=r}else s=i,!f&&p.createRange&&(f=p.createRange()).selectNode(p.body),f&&f.createContextualFragment?o=f.createContextualFragment(s):(o=p.createElement("body")).innerHTML=s,i=o.childNodes[0];var s,o,a,h=n.getNodeKey||S,d=n.onBeforeNodeAdded||x,c=n.onNodeAdded||x,l=n.onBeforeElUpdated||x,u=n.onElUpdated||x,g=n.onBeforeNodeDiscarded||x,I=n.onNodeDiscarded||x,y=n.onBeforeElChildrenUpdated||x,C=!0===n.childrenOnly,E={};function w(e){a?a.push(e):a=[e]}function b(e,t){if(1===e.nodeType)for(var i=e.firstChild;i;){var n=void 0;t&&(n=h(i))?w(n):(I(i),i.firstChild&&b(i,t)),i=i.nextSibling}}function A(e,t,i){!1!==g(e)&&(t&&t.removeChild(e),I(e),b(e,i))}function T(e){c(e);for(var t=e.firstChild;t;){var i=t.nextSibling,n=h(t);if(n){var r=E[n];r&&m(t,r)&&(t.parentNode.replaceChild(r,t),R(r,t))}T(t),t=i}}function R(n,r,s){var o=h(r);if(o&&delete E[o],!i.isSameNode||!i.isSameNode(t)){if(!s){if(!1===l(n,r))return;if(e(n,r),u(n),!1===y(n,r))return}"TEXTAREA"!==n.nodeName?function(e,t){var i,n,r,s,o,a=t.firstChild,c=e.firstChild;e:for(;a;){for(s=a.nextSibling,i=h(a);c;){if(r=c.nextSibling,a.isSameNode&&a.isSameNode(c)){a=s,c=r;continue e}n=h(c);var l=c.nodeType,u=void 0;if(l===a.nodeType&&(1===l?(i?i!==n&&((o=E[i])?r===o?u=!1:(e.insertBefore(o,c),n?w(n):A(c,e,!0),c=o):u=!1):n&&(u=!1),(u=!1!==u&&m(c,a))&&R(c,a)):3!==l&&8!=l||(u=!0,c.nodeValue!==a.nodeValue&&(c.nodeValue=a.nodeValue))),u){a=s,c=r;continue e}n?w(n):A(c,e,!0),c=r}if(i&&(o=E[i])&&m(o,a))e.appendChild(o),R(o,a);else{var f=d(a);!1!==f&&(f&&(a=f),a.actualize&&(a=a.actualize(e.ownerDocument||p)),e.appendChild(a),T(a))}a=s,c=r}!function(e,t,i){for(;t;){var n=t.nextSibling;(i=h(t))?w(i):A(t,e,!0),t=n}}(e,c,n);var g=v[e.nodeName];g&&g(e,t)}(n,r):v.TEXTAREA(n,r)}}!function e(t){if(1===t.nodeType||11===t.nodeType)for(var i=t.firstChild;i;){var n=h(i);n&&(E[n]=i),e(i),i=i.nextSibling}}(t);var L,_,z=t,M=z.nodeType,O=i.nodeType;if(!C)if(1===M)1===O?m(t,i)||(I(t),z=function(e,t){for(var i=e.firstChild;i;){var n=i.nextSibling;t.appendChild(i),i=n}return t}(t,(L=i.nodeName,(_=i.namespaceURI)&&"http://www.w3.org/1999/xhtml"!==_?p.createElementNS(_,L):p.createElement(L)))):z=i;else if(3===M||8===M){if(O===M)return z.nodeValue!==i.nodeValue&&(z.nodeValue=i.nodeValue),z;z=i}if(z===i)I(t);else if(R(z,i,C),a)for(var N=0,P=a.length;N<P;N++){var F=E[a[N]];F&&A(F,F.parentNode,!1)}return!C&&z!==t&&t.parentNode&&(z.actualize&&(z=z.actualize(t.ownerDocument||p)),t.parentNode.replaceChild(z,t)),z}}((function(e,t){var i,n,r,s,o,a=t.attributes;for(i=a.length-1;i>=0;--i)r=(n=a[i]).name,s=n.namespaceURI,o=n.value,s?(r=n.localName||r,e.getAttributeNS(s,r)!==o&&e.setAttributeNS(s,r,o)):e.getAttribute(r)!==o&&e.setAttribute(r,o);for(i=(a=e.attributes).length-1;i>=0;--i)!1!==(n=a[i]).specified&&(r=n.name,(s=n.namespaceURI)?(r=n.localName||r,t.hasAttributeNS(s,r)||e.removeAttributeNS(s,r)):t.hasAttribute(r)||e.removeAttribute(r))}));var y=function(){function e(t){var i=t.itemCount,n=t.itemSizeGetter,r=t.estimatedItemSize;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._itemSizeGetter=n,this._itemCount=i,this._estimatedItemSize=r,this._itemSizeAndPositionData={},this._lastMeasuredIndex=-1}return e.prototype.getLastMeasuredIndex=function(){return this._lastMeasuredIndex},e.prototype.getSizeAndPositionForIndex=function(e){if(e<0||e>=this._itemCount)throw Error("Requested index "+e+" is outside of range 0.."+this._itemCount);if(e>this._lastMeasuredIndex){for(var t=this.getSizeAndPositionOfLastMeasuredItem(),i=t.offset+t.size,n=this._lastMeasuredIndex+1;n<=e;n++){var r=this._itemSizeGetter({index:n});if(null==r||isNaN(r))throw Error("Invalid size returned for index "+n+" of value "+r);this._itemSizeAndPositionData[n]={offset:i,size:r},i+=r}this._lastMeasuredIndex=e}return this._itemSizeAndPositionData[e]},e.prototype.getSizeAndPositionOfLastMeasuredItem=function(){return this._lastMeasuredIndex>=0?this._itemSizeAndPositionData[this._lastMeasuredIndex]:{offset:0,size:0}},e.prototype.getTotalSize=function(){var e=this.getSizeAndPositionOfLastMeasuredItem();return e.offset+e.size+(this._itemCount-this._lastMeasuredIndex-1)*this._estimatedItemSize},e.prototype.getUpdatedOffsetForIndex=function(e){var t=e.align,i=void 0===t?"start":t,n=e.containerSize,r=e.targetIndex;if(n<=0)return 0;var s=this.getSizeAndPositionForIndex(r),o=s.offset,a=o-n+s.size,h=void 0;switch(i){case"end":h=a;break;case"center":h=o-(n-s.size)/2;break;default:h=o}var d=this.getTotalSize();return Math.max(0,Math.min(d-n,h))},e.prototype.getVisibleRange=function(e){var t=e.containerSize,i=e.offset,n=e.overscanCount;if(0===this.getTotalSize())return{};var r=i+t,s=this._findNearestItem(i),o=s,a=this.getSizeAndPositionForIndex(s);for(i=a.offset+a.size;i<r&&o<this._itemCount-1;)o++,i+=this.getSizeAndPositionForIndex(o).size;return n&&(s=Math.max(0,s-n),o=Math.min(o+n,this._itemCount)),{start:s,stop:o}},e.prototype.resetItem=function(e){this._lastMeasuredIndex=Math.min(this._lastMeasuredIndex,e-1)},e.prototype._binarySearch=function(e){for(var t=e.low,i=e.high,n=e.offset,r=void 0,s=void 0;t<=i;){if(r=t+Math.floor((i-t)/2),(s=this.getSizeAndPositionForIndex(r).offset)===n)return r;s<n?t=r+1:s>n&&(i=r-1)}if(t>0)return t-1},e.prototype._exponentialSearch=function(e){for(var t=e.index,i=e.offset,n=1;t<this._itemCount&&this.getSizeAndPositionForIndex(t).offset<i;)t+=n,n*=2;return this._binarySearch({high:Math.min(t,this._itemCount-1),low:Math.floor(t/2),offset:i})},e.prototype._findNearestItem=function(e){if(isNaN(e))throw Error("Invalid offset "+e+" specified");e=Math.max(0,e);var t=this.getSizeAndPositionOfLastMeasuredItem(),i=Math.max(0,this._lastMeasuredIndex);return t.offset>=e?this._binarySearch({high:i,low:0,offset:e}):this._exponentialSearch({index:i,offset:e})},e}();var C=function(){function e(t,i){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.getRowHeight=function(e){var t=e.index,i=n.options.rowHeight;return"function"==typeof i?i(t):Array.isArray(i)?i[t]:i},this.container=t,this.options=i,this.state={},this._initializeSizeAndPositionManager(i.rowCount),this.render=this.render.bind(this),this.handleScroll=this.handleScroll.bind(this),this.componentDidMount()}return e.prototype.componentDidMount=function(){var e=this,t=this.options,i=t.onMount,n=t.initialScrollTop,r=t.initialIndex,s=t.height,o=n||null!=r&&this.getRowOffset(r)||0,a=this.inner=document.createElement("div"),h=this.content=document.createElement("div");a.setAttribute("style","position:relative; overflow:hidden; width:100%; min-height:100%; will-change: transform;"),h.setAttribute("style","position:absolute; top:0; left:0; height:100%; width:100%; overflow:visible;"),a.appendChild(h),this.container.appendChild(a),this.setState({offset:o,height:s},(function(){o&&(e.container.scrollTop=o),e.container.addEventListener("scroll",e.handleScroll),"function"==typeof i&&i()}))},e.prototype._initializeSizeAndPositionManager=function(e){this._sizeAndPositionManager=new y({itemCount:e,itemSizeGetter:this.getRowHeight,estimatedItemSize:this.options.estimatedRowHeight||100})},e.prototype.setState=function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=arguments[1];this.state=Object.assign(this.state,t),requestAnimationFrame((function(){e.render(),"function"==typeof i&&i()}))},e.prototype.resize=function(e,t){this.setState({height:e},t)},e.prototype.handleScroll=function(e){var t=this.options.onScroll,i=this.container.scrollTop;this.setState({offset:i}),"function"==typeof t&&t(i,e)},e.prototype.getRowOffset=function(e){return this._sizeAndPositionManager.getSizeAndPositionForIndex(e).offset},e.prototype.scrollToIndex=function(e,t){var i=this.state.height,n=this._sizeAndPositionManager.getUpdatedOffsetForIndex({align:t,containerSize:i,targetIndex:e});this.container.scrollTop=n},e.prototype.setRowCount=function(e){this._initializeSizeAndPositionManager(e),this.render()},e.prototype.onRowsRendered=function(e){var t=this.options.onRowsRendered;"function"==typeof t&&t(e)},e.prototype.destroy=function(){this.container.removeEventListener("scroll",this.handleScroll),this.container.innerHTML=""},e.prototype.render=function(){for(var e=this.options,t=e.overscanCount,i=e.renderRow,n=this.state,r=n.height,s=n.offset,o=void 0===s?0:s,a=this._sizeAndPositionManager.getVisibleRange({containerSize:r,offset:o,overscanCount:t}),h=a.start,d=a.stop,c=document.createDocumentFragment(),l=h;l<=d;l++)c.appendChild(i(l));this.inner.style.height=this._sizeAndPositionManager.getTotalSize()+"px",this.content.style.top=this.getRowOffset(h)+"px",I(this.content,c,{childrenOnly:!0,getNodeKey:function(e){return e.nodeIndex}}),this.onRowsRendered({startIndex:h,stopIndex:d})},e}();function E(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function w(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}!function(e){function t(){return E(this,t),w(this,e.apply(this,arguments))}(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)})(t,e),t.prototype.onRowsRendered=function(e){var t=this,i=e.startIndex,n=e.stopIndex,r=this.options,s=r.isRowLoaded,o=r.loadMoreRows,a=r.minimumBatchSize,h=void 0===a?10:a,d=r.rowCount,c=void 0===d?0:d,l=r.threshold,u=void 0===l?15:l;(function(e){for(var t=e.isRowLoaded,i=e.minimumBatchSize,n=e.rowCount,r=e.startIndex,s=e.stopIndex,o=[],a=null,h=null,d=r;d<=s;d++){t(d)?null!==h&&(o.push({startIndex:a,stopIndex:h}),a=h=null):(h=d,null===a&&(a=d))}if(null!==h){for(var c=Math.min(Math.max(h,a+i-1),n-1),l=h+1;l<=c&&!t({index:l});l++)h=l;o.push({startIndex:a,stopIndex:h})}if(o.length)for(var u=o[0];u.stopIndex-u.startIndex+1<i&&u.startIndex>0;){var f=u.startIndex-1;if(t({index:f}))break;u.startIndex=f}return o})({isRowLoaded:s,minimumBatchSize:h,rowCount:c,startIndex:Math.max(0,i-u),stopIndex:Math.min(c-1,n+u)}).forEach((function(e){var r=o(e);r&&r.then((function(){(function(e){var t=e.lastRenderedStartIndex,i=e.lastRenderedStopIndex,n=e.startIndex,r=e.stopIndex;return!(n>i||r<t)})({lastRenderedStartIndex:i,lastRenderedStopIndex:n,startIndex:e.startIndex,stopIndex:e.stopIndex})&&t.render()}))}))}}(C);let b=class RefSelectorElement extends HTMLElement{constructor(){super(...arguments),this.isCurrentVisible=!1,this.currentSelectionIndex=null}connectedCallback(){this.refType="branch"===this.getRequiredAttr("type")?u.Branch:u.Tag;const e=this.getAttribute("current-committish");this.currentCommittish=e?atob(e):null,this.input=this.hasAttribute("initial-filter")&&this.currentCommittish||"",this.defaultBranch=atob(this.getRequiredAttr("default-branch")),this.nameWithOwner=atob(this.getRequiredAttr("name-with-owner")),this.canCreate=this.hasAttribute("can-create"),this.prefetchOnMouseover=this.hasAttribute("prefetch-on-mouseover");const t=this.getRequiredAttr("query-endpoint"),i=this.getRequiredAttr("cache-key");this.index=new SearchIndex(this.refType,this,t,i,this.nameWithOwner),this.setupFetchListeners()}inputEntered(e){this.input=e.detail,this.render()}tabSelected(){this.index.fetchData()}renderTemplate(e,t){return new r(e,t,s)}renderRow(e){const t=this.index.currentSearchResult[e];if(!t&&e>=this.listLength)return document.createElement("span");if(this.index.fetchFailed)return this.renderTemplate(this.fetchFailedTemplate,{index:e,refName:this.input});if(!t){const t=this.input===this.currentCommittish;return this.isCurrentVisible||(this.isCurrentVisible=t),this.renderTemplate(this.noMatchTemplate,{index:e,isCurrent:t,refName:this.input})}const i=this.input.length>0,n=i?"is-filtering":"",r=t===this.currentCommittish;this.isCurrentVisible||(this.isCurrentVisible=r);const s=this.renderTemplate(this.itemTemplate,{refName:t,index:e,isFilteringClass:n,urlEncodedRefName:this.urlEncodeRef(t),isCurrent:r,isNotDefault:t!==this.defaultBranch});if(i){const e=s.querySelector("span");e.textContent="";const i=t.split(this.input),n=i.length-1;for(let t=0;t<i.length;t++){const r=i[t];if(e.appendChild(document.createTextNode(r)),t<n){const t=document.createElement("b");t.textContent=this.input,e.appendChild(t)}}}return s}urlEncodeRef(e){return encodeURIComponent(e).replace("%2F","/").replace("%3A",":").replace("%2B","+")}render(){if(this.currentSelectionIndex=null,!this.index.isLoading){if(!this.virtualizedList)return this.index.search(this.input),void this.setupVirtualizedList();this.listContainer.scrollTop=0,this.index.search(this.input),this.virtualizedList.setRowCount(this.listLength)}}get listLength(){const e=this.index.currentSearchResult.length;return this.showCreateRow?e+1:e||1}get showCreateRow(){return!this.index.fetchFailed&&!this.index.exactMatchFound&&""!==this.input&&this.canCreate}getRequiredAttr(e,t=this){const i=t.getAttribute(e);if(!i)throw new Error(`Missing attribute for ${t}: ${e}`);return i}setupFetchListeners(){const e=this.closest("details");let t=!1;const i=()=>{t||(this.index.fetchData(),t=!0)};if(!e||e.open)return void i();this.prefetchOnMouseover&&e.addEventListener("mouseover",i,{once:!0}),this.addEventListener("keydown",this.keydown),this.addEventListener("change",this.updateCurrent);const n=e.querySelector("input[data-ref-filter]");n&&(n.addEventListener("input",(()=>{this.input=n.value,this.render()})),n.addEventListener("keydown",(e=>{"ArrowDown"!==e.key&&"Tab"!==e.key||(e.preventDefault(),e.stopPropagation(),this.focusFirstListMember())})))}focusFirstListMember(){this.virtualizedList&&(this.currentSelectionIndex=0,this.focusItemAtIndex(this.currentSelectionIndex))}updateCurrent(e){e.target instanceof HTMLInputElement&&e.target.checked&&e.target.value&&(this.currentCommittish=e.target.value)}keydown(e){if(null!==this.currentSelectionIndex){if("Enter"===e.key){const t=document.activeElement;if(!t)return;return t.click(),void e.preventDefault()}if(("Tab"!==e.key||!e.shiftKey)&&"Escape"!==e.key)switch(e.preventDefault(),e.stopPropagation(),e.key){case"ArrowUp":this.currentSelectionIndex--,this.currentSelectionIndex<0&&(this.currentSelectionIndex=this.listLength-1),this.focusItemAtIndex(this.currentSelectionIndex);break;case"Home":this.currentSelectionIndex=0,this.focusItemAtIndex(this.currentSelectionIndex);break;case"End":this.currentSelectionIndex=this.listLength-1,this.focusItemAtIndex(this.currentSelectionIndex);break;case"Tab":case"ArrowDown":this.currentSelectionIndex++,this.currentSelectionIndex>this.listLength-1&&(this.currentSelectionIndex=0),this.focusItemAtIndex(this.currentSelectionIndex)}}}focusItemAtIndex(e){this.virtualizedList.scrollToIndex(e,"center"),setTimeout((()=>{const t=this.listContainer.querySelector(`[data-index="${e}"]`);t&&t.focus()}),20)}setupVirtualizedList(){this.listContainer.innerHTML="",this.virtualizedList=new C(this.listContainer,{height:330,rowCount:this.listLength,renderRow:this.renderRow.bind(this),rowHeight:e=>this.showCreateRow&&e===this.listLength-1?51:33,onRowsRendered:()=>{var e;this.hiddenCurrentElement&&(this.listContainer.removeChild(this.hiddenCurrentElement),delete this.hiddenCurrentElement),this.isCurrentVisible?this.isCurrentVisible=!1:this.hiddenCurrentItemTemplate&&(this.hiddenCurrentElement=document.createElement("div"),null===(e=this.hiddenCurrentElement)||void 0===e||e.appendChild(this.renderTemplate(this.hiddenCurrentItemTemplate,{refName:this.currentCommittish})),this.listContainer.appendChild(this.hiddenCurrentElement))},initialIndex:0,overscanCount:6})}};e([t],b.prototype,"listContainer",void 0),e([t],b.prototype,"itemTemplate",void 0),e([t],b.prototype,"noMatchTemplate",void 0),e([t],b.prototype,"fetchFailedTemplate",void 0),e([t],b.prototype,"hiddenCurrentItemTemplate",void 0),b=e([n],b)}}}));
//# sourceMappingURL=chunk-ref-selector-b750bd67.js.map
