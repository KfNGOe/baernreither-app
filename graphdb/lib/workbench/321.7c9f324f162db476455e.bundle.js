(window.webpackJsonp=window.webpackJsonp||[]).push([[321],{87:function(e,t,E){"use strict";E.r(t),E.d(t,"TTYGEventName",(function(){return A}));var n=E(18);function a(e){let t=void 0,E=void 0,a=void 0,T=void 0,C={},_=void 0,c=!1;const o=()=>Object(n.cloneDeep)(t),d=()=>Object(n.cloneDeep)(E),i=e=>{E=Object(n.cloneDeep)(e),g(A.CHAT_LIST_UPDATED,d())},D=()=>Object(n.cloneDeep)(a),S=()=>Object(n.cloneDeep)(T),l=()=>Object(n.cloneDeep)(C),s=e=>!!C[e],p=()=>c,g=(t,E)=>{e.emitSync(t,Object(n.cloneDeep)(E))},L=(t,E)=>e.subscribeSync(t,e=>E(e));return{resetContext:()=>{t=void 0,E=void 0,a=void 0,T=void 0,C={},_=void 0,c=!1},emit:g,subscribe:L,getChats:d,updateChats:i,addChat:e=>{E.appendChat(e),i(E)},replaceChat:(e,t)=>{E.replaceChat(e,t),i(E)},onChatsListChanged:e=>(E&&angular.isFunction(e)&&e(d()),L(A.CHAT_LIST_UPDATED,t=>e(t))),getSelectedChat:D,selectChat:e=>{a&&a.id===e.id||(a=Object(n.cloneDeep)(e),g(A.SELECT_CHAT,D()))},deselectChat:()=>{a=void 0,g(A.SELECT_CHAT,D())},deleteChat:e=>{E.deleteChat(e),i(E)},onSelectedChatChanged:e=>(angular.isFunction(e)&&e(D()),L(A.SELECT_CHAT,t=>e(t))),updateSelectedChat:e=>{a&&a.id&&e&&a.id!==e.id||(a=Object(n.cloneDeep)(e),g(A.SELECTED_CHAT_UPDATED,D()))},onSelectedChatUpdated:e=>(a&&angular.isFunction(e)&&e(D()),L(A.SELECTED_CHAT_UPDATED,t=>e(t))),onLastMessageReceived:e=>(a&&angular.isFunction(e)&&e(D()),L(A.LAST_MESSAGE_RECEIVED,t=>e(t))),updateAgents:e=>{t=Object(n.cloneDeep)(e),g(A.AGENT_LIST_UPDATED,o())},onAgentsListChanged:e=>(t&&angular.isFunction(e)&&e(o()),L(A.AGENT_LIST_UPDATED,t=>e(t))),getAgents:o,getAgent:e=>{if(t)return Object(n.cloneDeep)(t.getAgent(e))},selectAgent:e=>{T=Object(n.cloneDeep)(e),g(A.AGENT_SELECTED,S())},getSelectedAgent:S,onSelectedAgentChanged:e=>(T&&angular.isFunction(e)&&e(S()),L(A.AGENT_SELECTED,t=>e(t))),getDefaultAgent:()=>Object(n.cloneDeep)(_),setDefaultAgent:e=>{_=e},setCanModifyAgent:e=>{c=Object(n.cloneDeep)(e),g(A.CAN_MODIFY_AGENT_UPDATED,p())},getCanModifyAgent:p,onCanUpdateAgentUpdated:e=>(angular.isFunction(e)&&e(p()),L(A.CAN_MODIFY_AGENT_UPDATED,t=>e(t))),hasExplainResponse:s,toggleExplainResponse:e=>{s(e)&&(C[e].expanded=!C[e].expanded,g(A.EXPLAIN_RESPONSE_CACHE_UPDATED,l()))},getExplainResponse:e=>Object(n.cloneDeep)(C[e]),addExplainResponseCache:e=>{C[e.answerId]=Object(n.cloneDeep)(e),g(A.EXPLAIN_RESPONSE_CACHE_UPDATED,l())},onExplainResponseCacheUpdated:e=>(angular.isFunction(e)&&e(l()),L(A.EXPLAIN_RESPONSE_CACHE_UPDATED,t=>e(t)))}}angular.module("graphdb.framework.ttyg.services.ttygcontext",[]).factory("TTYGContextService",a),a.$inject=["EventEmitterService","TTYGService"];const A={CREATE_CHAT:"createChat",CREATE_CHAT_SUCCESSFUL:"chatCreated",CREATE_CHAT_FAILURE:"chatCreationFailed",RENAME_CHAT:"renameChat",RENAME_CHAT_SUCCESSFUL:"chatRenamed",RENAME_CHAT_FAILURE:"chatRenamedFailure",SELECT_CHAT:"selectChat",SELECTED_CHAT_UPDATED:"selectChatUpdated",LAST_MESSAGE_RECEIVED:"lastMessageReceived",DELETING_CHAT:"deletingChat",DELETE_CHAT:"deleteChat",DELETE_CHAT_SUCCESSFUL:"chatDeleted",DELETE_CHAT_FAILURE:"chatDeletedFailure",CHAT_EXPORT:"chatExport",CHAT_EXPORT_SUCCESSFUL:"chatExportSuccess",CHAT_EXPORT_FAILURE:"chatExportFailure",CHAT_LIST_UPDATED:"chatListUpdated",ASK_QUESTION:"askQuestion",ASK_QUESTION_FAILURE:"askQuestionFailure",CONTINUE_CHAT_RUN:"continueChatRun",LOAD_CHATS:"loadChats",LOAD_CHAT_SUCCESSFUL:"loadChatSuccess",LOAD_CHAT_FAILURE:"loadChatFailure",AGENT_LIST_UPDATED:"agentListUpdated",OPEN_AGENT_SETTINGS:"openAgentSettings",EDIT_AGENT:"editAgent",CLONE_AGENT:"cloneAgent",DELETE_AGENT:"deleteAgent",AGENT_DELETED:"agentDeleted",DELETING_AGENT:"deletingAgent",AGENT_SELECTED:"agentSelected",GO_TO_CREATE_SIMILARITY_VIEW:"goToCreateSimilarityView",GO_TO_CONNECTORS_VIEW:"goToConnectorsView",EXPLAIN_RESPONSE:"explainResponse",EXPLAIN_RESPONSE_CACHE_UPDATED:"explainResponseCacheUpdated",GO_TO_SPARQL_EDITOR:"openQueryInSparqlEditor",CAN_MODIFY_AGENT_UPDATED:"canModifyAgentUpdated"}}}]);