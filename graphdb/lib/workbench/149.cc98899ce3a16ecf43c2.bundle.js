(window.webpackJsonp=window.webpackJsonp||[]).push([[149],{138:function(e,t,n){"use strict";n.r(t),n.d(t,"markdownCodeCopyPlugin",(function(){return l}));const o={buttonStyle:"position: absolute; top: 0; right: 0;",buttonClass:""};function r(e,t){return t=_.merge({},o,t),(...n)=>{const[o,r]=n,l=o[r],c=o[r].content.replaceAll('"',"&quot;").replaceAll("'","&apos;"),s=e(...n);return"fence"===l.type&&s.trim()?`<div style="position: relative">\n                        ${s}\n                        <copy-to-clipboard\n                            style="${t.buttonStyle}"\n                            class="${t.buttonClass}"\n                            tooltip-text="ttyg.chat_panel.btn.copy_sparql.tooltip"\n                            text-to-copy="${c}">\n                        </copy-to-clipboard>\n                    </div>`:s}}const l=(e,t)=>{e.renderer.rules.code_block=r(e.renderer.rules.code_block,t),e.renderer.rules.fence=r(e.renderer.rules.fence,t)}}}]);