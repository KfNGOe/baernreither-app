(window.webpackJsonp=window.webpackJsonp||[]).push([[55,143,321,323],{137:function(e,t){function n(e){return{restrict:"E",scope:{fieldName:"@",source:"=",onSave:"&",onCancel:"&",onClick:"&",onDblclick:"&",isEditing:"="},templateUrl:"js/angular/core/directives/inline-editable-text/templates/inline-editable-text.template.html",link:function(t,n){t.editableModel={};const a=[];let i;t.onKeydown=e=>{"Enter"===e.key?(c(),t.editableModel.text!==t.text&&t.onSave({newText:t.editableModel.text,source:t.source})):"Escape"===e.key&&o()},t.onCancelEditing=()=>{o()},t.onSelect=()=>{i?(c(),t.onDblclick({source:t.source})):i=e((function(){t.onClick({source:t.source}),c()}),250)};const o=()=>{c(),t.onCancel()},c=()=>{e.cancel(i),i=void 0};a.push(t.$watch("isEditing",a=>{a&&(t.editableModel.text=t.source[t.fieldName],e(()=>{const e=n.find("input")[0];e.focus(),e.select()},0))}));t.$on("$destroy",()=>{a.forEach(e=>e()),c()})}}}angular.module("graphdb.framework.core.directives.inline-editable-text",[]).directive("inlineEditableText",n),n.$inject=["$timeout"]},146:function(e,t,n){"use strict";n.r(t),n.d(t,"getHumanReadableTimestamp",(function(){return a}));const a=(e,t,n,a={})=>{if(!n)return"";const i=new Date(n),o=new Date,c=new Date(o.getFullYear(),o.getMonth(),o.getDate()),E=new Date(c);E.setDate(c.getDate()-1);const d=new Date(i.getFullYear(),i.getMonth(),i.getDate()),l=a.timeFormat?t("date")(i,a.timeFormat):"";if(d.getTime()===c.getTime())return e.instant("common.dates.today")+l;if(d.getTime()===E.getTime())return e.instant("common.dates.yesterday")+l;{const e=a.dateFormat||"yyyy-MM-dd";return t("date")(i,e)+l}}},198:function(e,t,n){"use strict";n.r(t);n(137);var a=n(87),i=n(146),o=n(0);function c(e,t,n,c){return{restrict:"E",templateUrl:"js/angular/ttyg/templates/chat-list.html",link:E=>{E.selectedChat=void 0,E.renamedChat=void 0,E.deletingChat=void 0,E.onSelectChatForRenaming=e=>{E.renamedChat=e},E.onSelectChat=t=>{if(!E.selectedChat||E.selectedChat.id!==t.id){const n=e.getChats().getNonPersistedChat();n&&e.deleteChat(n),e.selectChat(t),E.renamedChat=void 0}},E.onDeleteChat=i=>{const c=n.instant("ttyg.dialog.delete.title"),E=Object(o.decodeHTML)(n.instant("ttyg.dialog.delete.body",{chatName:i.name}));t.openConfirmation(c,E,()=>e.emit(a.TTYGEventName.DELETE_CHAT,i))},E.onRenameChat=(t,n)=>{n.name=t,E.renamedChat=void 0,e.emit(a.TTYGEventName.RENAME_CHAT,n)},E.onExportChat=t=>{e.emit(a.TTYGEventName.CHAT_EXPORT,t)},E.onCancelChatRenaming=()=>{E.renamedChat=void 0},E.getHumanReadableChatGroupTimestamp=e=>Object(i.getHumanReadableTimestamp)(n,c,e);const d=e=>{E.selectedChat=e},l=[];l.push(e.onSelectedChatChanged(d)),l.push(e.onSelectedChatUpdated(d)),l.push(e.onChatsListChanged(e=>{E.chatList=e})),l.push(e.subscribe(a.TTYGEventName.DELETING_CHAT,e=>{E.deletingChat=e})),E.$on("$destroy",()=>{l.forEach(e=>e())})}}}angular.module("graphdb.framework.ttyg.directives.chat-list",["graphdb.framework.core.directives.inline-editable-text"]).directive("chatList",c),c.$inject=["TTYGContextService","ModalService","$translate","$filter"]},87:function(e,t,n){"use strict";n.r(t),n.d(t,"TTYGEventName",(function(){return o}));var a=n(18);function i(e){let t=void 0,n=void 0,i=void 0,c=void 0,E={},d=void 0,l=!1;const C=()=>Object(a.cloneDeep)(t),s=()=>Object(a.cloneDeep)(n),T=e=>{n=Object(a.cloneDeep)(e),u(o.CHAT_LIST_UPDATED,s())},r=()=>Object(a.cloneDeep)(i),A=()=>Object(a.cloneDeep)(c),_=()=>Object(a.cloneDeep)(E),g=e=>!!E[e],h=()=>l,u=(t,n)=>{e.emitSync(t,Object(a.cloneDeep)(n))},D=(t,n)=>e.subscribeSync(t,e=>n(e));return{resetContext:()=>{t=void 0,n=void 0,i=void 0,c=void 0,E={},d=void 0,l=!1},emit:u,subscribe:D,getChats:s,updateChats:T,addChat:e=>{n.appendChat(e),T(n)},replaceChat:(e,t)=>{n.replaceChat(e,t),T(n)},onChatsListChanged:e=>(n&&angular.isFunction(e)&&e(s()),D(o.CHAT_LIST_UPDATED,t=>e(t))),getSelectedChat:r,selectChat:e=>{i&&i.id===e.id||(i=Object(a.cloneDeep)(e),u(o.SELECT_CHAT,r()))},deselectChat:()=>{i=void 0,u(o.SELECT_CHAT,r())},deleteChat:e=>{n.deleteChat(e),T(n)},onSelectedChatChanged:e=>(angular.isFunction(e)&&e(r()),D(o.SELECT_CHAT,t=>e(t))),updateSelectedChat:e=>{i&&i.id&&e&&i.id!==e.id||(i=Object(a.cloneDeep)(e),u(o.SELECTED_CHAT_UPDATED,r()))},onSelectedChatUpdated:e=>(i&&angular.isFunction(e)&&e(r()),D(o.SELECTED_CHAT_UPDATED,t=>e(t))),onLastMessageReceived:e=>(i&&angular.isFunction(e)&&e(r()),D(o.LAST_MESSAGE_RECEIVED,t=>e(t))),updateAgents:e=>{t=Object(a.cloneDeep)(e),u(o.AGENT_LIST_UPDATED,C())},onAgentsListChanged:e=>(t&&angular.isFunction(e)&&e(C()),D(o.AGENT_LIST_UPDATED,t=>e(t))),getAgents:C,getAgent:e=>{if(t)return Object(a.cloneDeep)(t.getAgent(e))},selectAgent:e=>{c=Object(a.cloneDeep)(e),u(o.AGENT_SELECTED,A())},getSelectedAgent:A,onSelectedAgentChanged:e=>(c&&angular.isFunction(e)&&e(A()),D(o.AGENT_SELECTED,t=>e(t))),getDefaultAgent:()=>Object(a.cloneDeep)(d),setDefaultAgent:e=>{d=e},setCanModifyAgent:e=>{l=Object(a.cloneDeep)(e),u(o.CAN_MODIFY_AGENT_UPDATED,h())},getCanModifyAgent:h,onCanUpdateAgentUpdated:e=>(angular.isFunction(e)&&e(h()),D(o.CAN_MODIFY_AGENT_UPDATED,t=>e(t))),hasExplainResponse:g,toggleExplainResponse:e=>{g(e)&&(E[e].expanded=!E[e].expanded,u(o.EXPLAIN_RESPONSE_CACHE_UPDATED,_()))},getExplainResponse:e=>Object(a.cloneDeep)(E[e]),addExplainResponseCache:e=>{E[e.answerId]=Object(a.cloneDeep)(e),u(o.EXPLAIN_RESPONSE_CACHE_UPDATED,_())},onExplainResponseCacheUpdated:e=>(angular.isFunction(e)&&e(_()),D(o.EXPLAIN_RESPONSE_CACHE_UPDATED,t=>e(t)))}}angular.module("graphdb.framework.ttyg.services.ttygcontext",[]).factory("TTYGContextService",i),i.$inject=["EventEmitterService","TTYGService"];const o={CREATE_CHAT:"createChat",CREATE_CHAT_SUCCESSFUL:"chatCreated",CREATE_CHAT_FAILURE:"chatCreationFailed",RENAME_CHAT:"renameChat",RENAME_CHAT_SUCCESSFUL:"chatRenamed",RENAME_CHAT_FAILURE:"chatRenamedFailure",SELECT_CHAT:"selectChat",SELECTED_CHAT_UPDATED:"selectChatUpdated",LAST_MESSAGE_RECEIVED:"lastMessageReceived",DELETING_CHAT:"deletingChat",DELETE_CHAT:"deleteChat",DELETE_CHAT_SUCCESSFUL:"chatDeleted",DELETE_CHAT_FAILURE:"chatDeletedFailure",CHAT_EXPORT:"chatExport",CHAT_EXPORT_SUCCESSFUL:"chatExportSuccess",CHAT_EXPORT_FAILURE:"chatExportFailure",CHAT_LIST_UPDATED:"chatListUpdated",ASK_QUESTION:"askQuestion",ASK_QUESTION_FAILURE:"askQuestionFailure",CONTINUE_CHAT_RUN:"continueChatRun",LOAD_CHATS:"loadChats",LOAD_CHAT_SUCCESSFUL:"loadChatSuccess",LOAD_CHAT_FAILURE:"loadChatFailure",AGENT_LIST_UPDATED:"agentListUpdated",OPEN_AGENT_SETTINGS:"openAgentSettings",EDIT_AGENT:"editAgent",CLONE_AGENT:"cloneAgent",DELETE_AGENT:"deleteAgent",AGENT_DELETED:"agentDeleted",DELETING_AGENT:"deletingAgent",AGENT_SELECTED:"agentSelected",GO_TO_CREATE_SIMILARITY_VIEW:"goToCreateSimilarityView",GO_TO_CONNECTORS_VIEW:"goToConnectorsView",EXPLAIN_RESPONSE:"explainResponse",EXPLAIN_RESPONSE_CACHE_UPDATED:"explainResponseCacheUpdated",GO_TO_SPARQL_EDITOR:"openQueryInSparqlEditor",CAN_MODIFY_AGENT_UPDATED:"canModifyAgentUpdated"}}}]);