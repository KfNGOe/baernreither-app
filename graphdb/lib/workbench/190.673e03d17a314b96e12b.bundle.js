(window.webpackJsonp=window.webpackJsonp||[]).push([[190],{276:function(e,i,s){"use strict";s.r(i),s.d(i,"FilePrefixRegistry",(function(){return n}));var t=s(25);class n{constructor(){this.filesPrefixRegistry={}}buildPrefixesRegistry(e){e.filter(e=>"file"===e.type).forEach(e=>{const i=t.FileUtils.getFilenameAndExtension(e.name).filename,s=i.lastIndexOf("-");let n=s<0?0:i.substring(s+1),r=i.substring(0,s);if(s<0?(n=0,r=i):(n=i.substring(s+1),r=i.substring(0,s)),n){n=parseInt(n);const e=this.filesPrefixRegistry[r]||0;this.filesPrefixRegistry[r]=e<n?n:e}else this.filesPrefixRegistry[r]=0})}prefixDuplicates(e){return e.map(e=>{const{filename:i,extension:s}=t.FileUtils.getFilenameAndExtension(e.name),n=`${i}-${this.getIndexForFile(i)}.${s}`;return new File([e],n,{type:e.type,lastModified:e.lastModified})})}getIndexForFile(e){let i=this.filesPrefixRegistry[e];return void 0!==i?i++:i=0,this.filesPrefixRegistry[e]=i,i}}}}]);