(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{101:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(54),c=a.n(r),o=(a(62),a(6)),i=a(7),l=a(8),u=a(9),d=(a(63),a(12)),h=a(16),m=function(e){Object(u.a)(a,e);var t=Object(l.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={},n}return Object(i.a)(a,[{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement(h.b,{to:"/app"},"Enter"))}}]),a}(n.Component),p=a(103),f=a(104),g=a(113),y=function(e){Object(u.a)(a,e);var t=Object(l.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={},n}return Object(i.a)(a,[{key:"redirectHandler",value:function(e){var t=Object(g.a)();localStorage.setItem("uid",t),localStorage.setItem("isCoach",e),e?this.props.history.push("/app/coach/"):this.props.history.push("/app/player/")}},{key:"render",value:function(){var e=this,t=localStorage.getItem("isCoach");return"false"===t?this.props.history.push("/app/player"):"true"===t&&this.props.history.push("/app/coach"),localStorage.getItem("uid"),s.a.createElement("div",null,s.a.createElement("h2",null,"App"),s.a.createElement(p.a,null,s.a.createElement(f.a,{outline:!0,color:"primary",onClick:function(){e.redirectHandler(!0)}},"Coach"),s.a.createElement(f.a,{outline:!0,color:"primary",onClick:function(){e.redirectHandler(!1)}},"Player")))}}]),a}(n.Component),v=a(105),E=function(e){Object(u.a)(a,e);var t=Object(l.a)(a);function a(e){var n;Object(o.a)(this,a),n=t.call(this,e);var s="/app/";return s+=e.isCoach?"coach/":"player/",s+=e.obj._id,n.state={game:e.obj,link:s},n}return Object(i.a)(a,[{key:"render",value:function(){return s.a.createElement(v.a,null,s.a.createElement(h.b,{to:{pathname:this.state.link,state:{game:this.state.game}}},s.a.createElement(f.a,null,this.props.obj._id," | ",this.props.obj.date)))}}]),a}(n.Component);function k(e){var t=Object.keys(e).map((function(t){return{_id:t,date:e[t].date,coachId:e[t].coachId}}));return t.sort((function(e,t){var a=new Date(e.date),n=new Date(t.date);return a>n?-1:a<n?1:0})),t}function b(e,t){return s.a.createElement(E,{obj:e,key:e._id,isCoach:t})}var C=a(106),j=function(e){Object(u.a)(a,e);var t=Object(l.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={games:{},games_sorted:[]},n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this;console.log("mounting"),fetch("/api/games",{credentials:"same-origin"}).then((function(e){return e.json()})).then((function(t){var a={};t.forEach((function(e){a[e._id]={date:e.date,coachId:e.coachId}}));var n=k(a);e.setState({games:a,games_sorted:n})}))}},{key:"render",value:function(){var e=this.state.games_sorted;return s.a.createElement("div",null,s.a.createElement("h2",null,"Player"),s.a.createElement("h3",null,"Games"),s.a.createElement(C.a,null,e.map((function(e){return b(e,!1)}))))}}]),a}(n.Component),O=function(e){Object(u.a)(a,e);var t=Object(l.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={games:{},games_sorted:[]},n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch("/api/games",{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(t){var a={};t.forEach((function(e){a[e._id]={date:e.date,coachId:e.coachId}}));var n=k(a);e.setState({games:a,games_sorted:n})})).catch((function(e){console.log(e)}))}},{key:"newGame",value:function(){var e=this,t=localStorage.getItem("uid");fetch("/api/games",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({coachId:t})}).then((function(e){return e.json()})).then((function(t){var a=e.state.games;a[t._id]={date:t.date,coachId:t.coachId};var n=k(a);e.setState({games:a,games_sorted:n}),e.props.history.push({pathname:"/app/coach/"+t._id,state:{game:t}})}))}},{key:"render",value:function(){var e=this,t=this.state.games_sorted;return s.a.createElement("div",null,s.a.createElement("h2",null,"Coach"),s.a.createElement(f.a,{color:"primary",onClick:function(){e.newGame()}},"Create Game"),s.a.createElement("h3",null,"Games"),s.a.createElement(C.a,null,t.map((function(e){return b(e,!0)}))))}}]),a}(n.Component),I=Object(d.f)(O),S=a(14),M=a(107),T=a(108),w=a(109),B=a(110),P=a(111),_=a(112),A=a(114),N=a(24),U=a.n(N),x=a(15),H=a.n(x),D=a(53),G=function(e){Object(u.a)(a,e);var t=Object(l.a)(a);function a(e){var n;if(Object(o.a)(this,a),(n=t.call(this,e)).audioRef=s.a.createRef(),n.state={chatTitle:"Current Chat",players:[],currentChat:[],broadcasts:[],currentMessage:"",selectedPlayer:null,showBroadcasts:!1,messages:{},game:null,socket:null,isActive:{},hasUnread:{}},"undefined"===typeof e.location.state){var r=e.match.params.gameId;fetch("/api/games/"+r,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){n.setState({game:e,players:e.players,messages:e.messages,broadcasts:e.broadcasts,isActive:e.isActive,hasUnread:e.hasUnread})}))}else{var c=e.location.state.game;n.state={game:c}}return n}return Object(i.a)(a,[{key:"exitHandler",value:function(){this.state.socket.emit("disconnect"),window.location.href="/app/coach"}},{key:"componentDidMount",value:function(){var e=this;this.state.socket=U()("https://vretta-demo.herokuapp.com/"),this.state.socket.on("connect",(function(t){e.state.socket.emit("storeCoachId",{userId:localStorage.getItem("uid"),gameId:e.props.match.params.gameId}),e.state.socket.on("receiveMessage",(function(t){e.audioRef.current.play().catch((function(e){console.log(e)}));var a=t.message,n=t.playerId;if(n===e.state.selectedPlayer){var s=e.state.currentChat.slice();s.push([a,!1]),e.setState({messages:H()(e.state.messages,Object(S.a)({},n,{$set:s})),currentChat:s,hasUnread:H()(e.state.hasUnread,Object(S.a)({},n,{$set:!1}))}),e.updateUnread(n,!1)}else{var r=e.state.messages[n];"undefined"===typeof r&&(r=[]),r.push([a,!1]),e.setState({messages:H()(e.state.messages,Object(S.a)({},n,{$set:r})),hasUnread:H()(e.state.hasUnread,Object(S.a)({},n,{$set:!0}))})}})),e.state.socket.on("newPlayerList",(function(t){e.setState({players:t.playerList})})),e.state.socket.on("playerChangeConnection",(function(t){console.log("disconnect");var a=t.playerId,n=t.isActive;e.setState({isActive:H()(e.state.isActive,Object(S.a)({},a,{$set:n}))})}))}));var t=this.props.match.params.gameId;fetch("/api/games/"+t,{method:"GET"}).then((function(e){return e.json()})).then((function(t){e.setState({players:t.players,messages:t.messages,broadcasts:t.broadcasts,isActive:t.isActive,hasUnread:t.hasUnread})}))}},{key:"updateUnread",value:function(e,t){fetch("/api/games/unread/"+this.state.game._id,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({playerId:e,unread:t})})}},{key:"playerOnClick",value:function(e){var t=this.state.messages[e];this.state.hasUnread[e]&&(console.log("update!!"),this.updateUnread(e,!1)),"undefined"===typeof t?this.setState({currentChat:[],selectedPlayer:e,showBroadcasts:!1,chatTitle:"Current Chat",hasUnread:H()(this.state.hasUnread,Object(S.a)({},e,{$set:!1}))}):this.setState({currentChat:t,selectedPlayer:e,showBroadcasts:!1,chatTitle:"Current Chat",hasUnread:H()(this.state.hasUnread,Object(S.a)({},e,{$set:!1}))})}},{key:"sendMessage",value:function(e){var t=this;e.preventDefault();var a=this.state.selectedPlayer,n=this.state.showBroadcasts;if(a||n)if(""!==this.state.currentMessage){var s=localStorage.getItem("uid"),r=this.state.currentMessage,c=this.state.game._id,o=this.state.currentChat.slice();if(n){var i=[r,!0,!0];o.push(i);var l=this.state.broadcasts.slice();l.push(i),this.setState({broadcasts:l})}else o.push([r,!0]);if(this.setState({messages:H()(this.state.messages,Object(S.a)({},a,{$set:o})),currentChat:o,currentMessage:""}),n){this.state.socket.emit("makeBroadcast",{message:r,gameId:c});var u={};this.state.players.forEach((function(e){var a=[];"undefined"!==typeof t.state.messages[e]&&(a=t.state.messages[e].slice());var n=[r,!0,!0];a.push(n),u[e]=a})),this.setState({messages:u}),console.log("UPDATE THE DB... for every player."),fetch("/api/messages/broadcast",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({s_message:r,gameId:c})})}else null!==this.state.socket&&this.state.socket.emit("messageFromCoach",{senderId:s,message:r,receiverId:a,gameId:c}),fetch("/api/messages/send",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({playerId:a,coachId:s,s_message:r,gameId:c,fromCoach:!0})})}else console.log("empty message, returning");else console.log("returning...")}},{key:"broadcastInitHandler",value:function(){this.setState({currentChat:this.state.broadcasts,selectedPlayer:"broadcast",showBroadcasts:!0,chatTitle:"Broadcast"})}},{key:"updateMessage",value:function(e){this.setState({currentMessage:e.target.value})}},{key:"renderMarginCol",value:function(e){if(e[1])return s.a.createElement(M.a,null)}},{key:"renderBroadcastBar",value:function(e){if(e[2])return s.a.createElement(v.a,{className:"my-broadcast-bar"})}},{key:"renderMsg",value:function(e,t){var a="secondary";return e[1]&&(a="info"),s.a.createElement(T.a,{key:t},this.renderMarginCol(e),s.a.createElement(M.a,{sm:"auto",className:"no-margin-message"},s.a.createElement(v.a,{color:a,key:t},e[0])),this.renderBroadcastBar(e))}},{key:"renderActiveIndicator",value:function(e){return this.state.isActive[e]?s.a.createElement(f.a,{color:"success",className:"active-button",outline:!0},"Active"):s.a.createElement(f.a,{color:"danger",className:"active-button",outline:!0},"Inactive")}},{key:"renderUnread",value:function(e){if(this.state.hasUnread[e])return s.a.createElement(M.a,null,s.a.createElement("h1",{className:"message-indicator"},"\u2022"))}},{key:"renderPlayer",value:function(e){var t=this,a="player-row";return this.state.selectedPlayer===e&&(a+=" selected"),s.a.createElement(T.a,{onClick:function(){return t.playerOnClick(e)},key:e,className:a},s.a.createElement(M.a,{xs:"6",key:e},e),s.a.createElement(M.a,{xs:"3"},this.renderActiveIndicator(e)),this.renderUnread(e))}},{key:"renderPlayers",value:function(){var e=this,t=[];return null!==this.state&&"undefined"!==typeof this.state&&(t=this.state.players),void 0===t||0===t.length?s.a.createElement("p",null,"Looking for players..."):s.a.createElement(w.a,null,t.map((function(t){return e.renderPlayer(t)})))}},{key:"renderBroadcastButton",value:function(){var e=this;return"broadcast"===this.state.selectedPlayer?s.a.createElement(f.a,{color:"info",onClick:function(){return e.broadcastInitHandler()}},"Broadcast"):s.a.createElement(f.a,{color:"info",onClick:function(){return e.broadcastInitHandler()},outline:!0},"Broadcast")}},{key:"render",value:function(){var e=this,t=this.state.currentChat;return"undefined"===typeof t&&(t=[]),s.a.createElement(w.a,{className:"outer-container"},s.a.createElement("audio",{id:"message-sound",ref:this.audioRef,src:D}),s.a.createElement(f.a,{className:"float-sm-left",color:"danger",onClick:function(){e.exitHandler()}},"EXIT"),s.a.createElement(T.a,{className:"outer-row"},s.a.createElement(M.a,{xs:"6"},s.a.createElement("h2",null,"Broadcast"),this.renderBroadcastButton(),s.a.createElement("h2",null,"Players"),this.renderPlayers()),s.a.createElement(M.a,{xs:"6",className:"chat-view"},s.a.createElement("h2",null,this.state.chatTitle),s.a.createElement("h6",null,this.state.selectedPlayer),t.map((function(t,a){return e.renderMsg(t,a)}))),s.a.createElement(M.a,{xs:{size:6,offset:6}},s.a.createElement(B.a,null,s.a.createElement(P.a,{for:"message",hidden:!0},"Type here..."),s.a.createElement(_.a,{type:"text",name:"message",id:"message",placeholder:"Type here...",value:this.state.currentMessage,onChange:function(t){return e.updateMessage(t)}}),s.a.createElement(A.a,{addonType:"append"},s.a.createElement(f.a,{onClick:function(t){return e.sendMessage(t)}},"Send"))))))}}]),a}(n.Component),R=a(53),$=function(e){Object(u.a)(a,e);var t=Object(l.a)(a);function a(e){var n;Object(o.a)(this,a),(n=t.call(this,e)).audioRef=s.a.createRef();var r=e.location.state.game;return n.state={currentChat:[],currentMessage:"",game:r,socket:null},n}return Object(i.a)(a,[{key:"exitHandler",value:function(){this.state.socket.emit("disconnect"),window.location.href="/app/player"}},{key:"componentDidMount",value:function(){var e=this;this.state.socket=U()("https://vretta-demo.herokuapp.com/");var t=localStorage.getItem("uid");this.state.socket.on("connect",(function(a){e.state.socket.emit("storePlayerId",{userId:t,gameId:e.state.game._id}),e.state.socket.on("receiveMessage",(function(t){e.audioRef.current.play().catch((function(e){console.log(e)}));var a=t.message,n=e.state.currentChat.slice();n.push([a,!0]),e.setState({currentChat:n})})),e.state.socket.on("receiveBroadcast",(function(t){e.audioRef.current.play().catch((function(e){console.log(e)}));var a=t.message,n=e.state.currentChat.slice();n.push([a,!0,!0]),e.setState({currentChat:n})}))})),fetch("/api/games/"+this.state.game._id,{method:"GET"}).then((function(e){return e.json()})).then((function(a){var n=a.messages[t],s=[];"undefined"!==typeof t&&"undefined"!==typeof n&&(s=n),e.setState({currentChat:s})}))}},{key:"sendMessage",value:function(e){if(e.preventDefault(),""!==this.state.currentMessage){var t=localStorage.getItem("uid"),a=this.state.currentMessage,n=this.state.game.coachId,s=this.state.game._id,r=this.state.currentChat.slice();r.push([a,!1]),this.setState({currentChat:r,currentMessage:""}),null!==this.state.socket&&this.state.socket.emit("messageFromPlayer",{senderId:t,message:a,gameId:s}),fetch("/api/messages/send",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({playerId:t,coachId:n,s_message:a,gameId:s,fromCoach:!1})})}else console.log("empty message, returning")}},{key:"updateMessage",value:function(e){this.setState({currentMessage:e.target.value})}},{key:"renderMarginCol",value:function(e){if(!e[1])return s.a.createElement(M.a,null)}},{key:"renderBroadcastBar",value:function(e){if(e[2])return s.a.createElement(v.a,{className:"not-my-broadcast-bar"})}},{key:"renderMsg",value:function(e,t){var a="secondary";return e[1]||(a="info"),s.a.createElement(T.a,{key:t},this.renderMarginCol(e),this.renderBroadcastBar(e),s.a.createElement(M.a,{sm:"auto",className:"no-margin-message"},s.a.createElement(v.a,{color:a,key:t},e[0])))}},{key:"render",value:function(){var e=this,t=this.state.currentChat;return s.a.createElement(w.a,{className:"outer-container"},s.a.createElement("audio",{id:"message-sound",ref:this.audioRef,src:R}),s.a.createElement(f.a,{className:"float-sm-left",color:"danger",onClick:function(){e.exitHandler()}},"EXIT"),s.a.createElement(T.a,{className:"outer-row"},s.a.createElement(M.a,{sm:{size:6,offset:3},className:"chat-view"},s.a.createElement("h2",null,"Current Chat"),t.map((function(t,a){return e.renderMsg(t,a)}))),s.a.createElement(M.a,{sm:{size:6,offset:3}},s.a.createElement(B.a,null,s.a.createElement(P.a,{for:"message",hidden:!0},"Type here..."),s.a.createElement(_.a,{type:"text",name:"message",id:"message",placeholder:"Type here...",value:this.state.currentMessage,onChange:function(t){return e.updateMessage(t)}}),s.a.createElement(A.a,{addonType:"append"},s.a.createElement(f.a,{onClick:function(t){return e.sendMessage(t)}},"Send"))))))}}]),a}(n.Component),J=function(e){Object(u.a)(a,e);var t=Object(l.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return s.a.createElement("div",{className:"App"},s.a.createElement(d.c,null,s.a.createElement(d.a,{exact:!0,path:"/",component:m}),s.a.createElement(d.a,{exact:!0,path:"/app",component:y}),s.a.createElement(d.a,{exact:!0,path:"/app/coach",component:I}),s.a.createElement(d.a,{path:"/app/coach/:gameId",component:G}),s.a.createElement(d.a,{exact:!0,path:"/app/player",component:j}),s.a.createElement(d.a,{path:"/app/player/:gameId",component:$})))}}]),a}(n.Component),z=Object(d.f)(J);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(100);c.a.render(s.a.createElement(h.a,null,s.a.createElement(z,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},53:function(e,t,a){e.exports=a.p+"static/media/when.6caba2fa.mp3"},57:function(e,t,a){e.exports=a(101)},62:function(e,t,a){},63:function(e,t,a){},96:function(e,t){}},[[57,1,2]]]);
//# sourceMappingURL=main.9885f6bf.chunk.js.map