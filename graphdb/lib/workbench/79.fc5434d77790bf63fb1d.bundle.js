(window.webpackJsonp=window.webpackJsonp||[]).push([[79,105,272],{110:function(t,s,e){"use strict";e.r(s),e.d(s,"ChatModel",(function(){return h})),e.d(s,"ChatByDayModel",(function(){return n})),e.d(s,"ChatsListModel",(function(){return r}));var i=e(95),a=e(20);class h{static getEmptyChat(){const t={name:"· · ·",timestamp:Math.floor(Date.now()/1e3)};return new h(t,Object(a.md5HashGenerator)())}constructor(t,s){this.hashGenerator=s,this._id=t.id,this._name=t.name,this._timestamp=t.timestamp,this._chatHistory=t.chatHistory||new i.ChatItemsListModel,this.hash=this.generateHash()}generateHash(){return this.hashGenerator(JSON.stringify(this))}get id(){return this._id}set id(t){this._id=t}get name(){return this._name}set name(t){this.generateHash(),this._name=t}get timestamp(){return this._timestamp}set timestamp(t){this._timestamp=t}get chatHistory(){return this._chatHistory}set chatHistory(t){this._chatHistory=t||new i.ChatItemsListModel}toRenameRequestPayload(){return{name:this._name}}}class n{constructor(t){this._day=t.day,this._timestamp=t.timestamp,this._chats=t.chats}get day(){return this._day}set day(t){this._day=t}get timestamp(){return this._timestamp}set timestamp(t){this._timestamp=t}get chats(){return this._chats}set chats(t){this._chats=t}}class r{constructor(t){this._chats=t||[],this._chatsByDay=[],this.sortByTime(),this.updateChatsByDay()}sortByTime(){this._chats.sort((t,s)=>s.timestamp-t.timestamp)}updateChatTimestamp(t,s){const e=this._chats.find(s=>s.id===t);e&&(e.timestamp=s,this.sortByTime(),this.updateChatsByDay())}updateChatName(t,s){const e=this._chats.find(s=>s.id===t);e&&(e.name=s)}deleteChat(t){this._chats=this._chats.filter(s=>s.id!==t.id),this.sortByTime(),this.updateChatsByDay()}updateChatsByDay(){this._chatsByDay=[],this._chats.forEach(t=>{const s=new Date(1e3*t.timestamp).toDateString(),e=this._chatsByDay.find(t=>t.day===s);e?e.chats.push(t):this._chatsByDay.push(new n({day:s,timestamp:1e3*t.timestamp,chats:[t]}))})}appendChat(t){this._chats.push(t),this.sortByTime(),this.updateChatsByDay()}replaceChat(t,s){this._chats=this._chats.map(e=>e.id===s.id?t:e),this.sortByTime(),this.updateChatsByDay()}isEmpty(){return 0===this._chats.length}getFirstChat(){return this._chats[0]}deselectAll(){this._chats.forEach(t=>{t.selected=!1})}selectChat(t){this.deselectAll(),this._chats.forEach(s=>{s.selected=s.id===t.id})}getChat(t){return this._chats.find(s=>s.id===t)}getNonPersistedChat(){return this._chats.find(t=>!t.id)}renameChat(t){const s=this._chats.find(s=>s.id===t.id);s&&(s.name=t.name)}get chats(){return this._chats}set chats(t){this._chats=t}get chatsByDay(){return this._chatsByDay}set chatsByDay(t){this._chatsByDay=t}}},88:function(t,s,e){"use strict";e.r(s),e.d(s,"ChatMessageModel",(function(){return i})),e.d(s,"CHAT_MESSAGE_ROLE",(function(){return a}));class i{constructor(t){this._id=t.id,this._role=t.role,this._message=t.message,this._timestamp=1e3*t.timestamp}get id(){return this._id}set id(t){this._id=t}get role(){return this._role}set role(t){this._role=t}get message(){return this._message}set message(t){this._message=t}get timestamp(){return this._timestamp}set timestamp(t){this._timestamp=t}}const a={USER:"user",ASSISTANT:"assistant"}},95:function(t,s,e){"use strict";e.r(s),e.d(s,"ChatItemModel",(function(){return a})),e.d(s,"ChatItemsListModel",(function(){return h}));var i=e(88);class a{constructor(t,s){this._chatId=t,this._agentId=void 0,this._question=s,this._answers=[]}get chatId(){return this._chatId}set chatId(t){this._chatId=t}get agentId(){return this._agentId}set agentId(t){this._agentId=t}get question(){return this._question}set question(t){this._question=t}get answers(){return this._answers}set answers(t){this._answers=t}setQuestionMessage(t){this._question||(this._question=new i.ChatMessageModel({role:i.CHAT_MESSAGE_ROLE.USER})),this._question.message=t}getQuestionMessage(){return this._question.message}toCreateChatRequestPayload(){return{agentId:this._agentId,question:this._question.message}}toAskRequestPayload(){return{conversationId:this._chatId,agentId:this._agentId,question:this._question.message,tzOffset:-(new Date).getTimezoneOffset()}}toExplainResponsePayload(t){return{conversationId:this._chatId,answerId:t}}}class h{constructor(t=[]){this._items=t}isEmpty(){return 0===this._items.length}appendItem(t){this._items.push(t)}get items(){return this._items}set items(t){this._items=t||[]}getLast(){if(!this.isEmpty())return this._items[this._items.length-1]}}}}]);