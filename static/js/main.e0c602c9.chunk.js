(this["webpackJsonpreact-reversi"]=this["webpackJsonpreact-reversi"]||[]).push([[0],{11:function(t,e,s){"use strict";s.r(e);var i=s(9),r=s(6),n=s(3),h=s(4),a=s(7),l=s(5),o=s(1),c=s.n(o),u=s(10),y=s.n(u),d=(s(16),s(0)),b=function(t){Object(a.a)(s,t);var e=Object(l.a)(s);function s(){return Object(n.a)(this,s),e.apply(this,arguments)}return Object(h.a)(s,[{key:"render",value:function(){return"W"===this.props.board[this.props.index]?Object(d.jsx)("button",{className:"square",onClick:this.props.onClick,children:Object(d.jsx)("svg",{width:"40",height:"40",children:Object(d.jsx)("circle",{cx:"20",cy:"20",r:"15",fill:"white"})})}):"B"===this.props.board[this.props.index]?Object(d.jsx)("button",{className:"square",onClick:this.props.onClick,children:Object(d.jsx)("svg",{width:"40",height:"40",children:Object(d.jsx)("circle",{cx:"20",cy:"20",r:"15",fill:"black"})})}):this.props.validMovesIndices.includes(this.props.index)?Object(d.jsx)("button",{className:"square",onClick:this.props.onClick,children:Object(d.jsx)("svg",{width:"20",height:"20",children:Object(d.jsx)("circle",{cx:"10",cy:"10",r:"8",fill:"#ee6941"})})}):Object(d.jsx)("button",{className:"square",onClick:this.props.onClick})}}]),s}(c.a.Component),j=function(t){Object(a.a)(s,t);var e=Object(l.a)(s);function s(){var t;Object(n.a)(this,s);for(var i=arguments.length,r=new Array(i),h=0;h<i;h++)r[h]=arguments[h];return(t=e.call.apply(e,[this].concat(r))).createBoard=function(){for(var e=[],s=0;s<8;s++){for(var i=[],r=0;r<8;r++)i.push(t.renderSquare(s,r));e.push(Object(d.jsx)("div",{className:"board-row",children:i},s))}return e},t}return Object(h.a)(s,[{key:"renderSquare",value:function(t,e){var s=this;return Object(d.jsx)(b,{validMovesIndices:this.props.validMovesIndices,onClick:function(){return s.props.onClick(e,t)},board:this.props.board,index:8*t+e},8*t+e)}},{key:"render",value:function(){return Object(d.jsx)("div",{className:"board",children:this.createBoard()})}}]),s}(c.a.Component),v=function(t){Object(a.a)(s,t);var e=Object(l.a)(s);function s(t){var i;return Object(n.a)(this,s),(i=e.call(this,t)).state={history:[{board:g(),turn:"B",blackScore:2,whiteScore:2,winner:null,tie:null,gameOver:!1}],singlePlayer:!1,playerColor:null,machineColor:null},i}return Object(h.a)(s,[{key:"componentDidUpdate",value:function(){var t=this;this.state.singlePlayer&&this.state.history[this.state.history.length-1].turn===this.state.machineColor&&setTimeout((function(){t.machineMove()}),1e3)}},{key:"machineMove",value:function(){if(this.state.history[this.state.history.length-1].turn===this.state.machineColor&&null===this.state.history[this.state.history.length-1].winner&&null===this.state.history[this.state.history.length-1].tie){var t=p(this.state.history[this.state.history.length-1].board,this.state.history[this.state.history.length-1].turn),e=t[Math.floor(Math.random()*t.length)];this.handleClick(e[0],e[1],!0)}}},{key:"singlePlayerMode",value:function(){var t=this;this.setState({history:[{board:g(),turn:"B",blackScore:2,whiteScore:2,winner:null,tie:null,gameOver:!1}],singlePlayer:!0,playerColor:"B",machineColor:"W"}),document.getElementById("one-player").disabled=!0,document.getElementById("two-players").disabled=!1,document.getElementById("two-players").addEventListener("click",(function(){t.twoPlayerMode()}))}},{key:"twoPlayerMode",value:function(){this.setState({history:[{board:g(),turn:"B",blackScore:2,whiteScore:2,winner:null,tie:null,gameOver:!1}],singlePlayer:!1,playerColor:null,machineColor:null}),document.getElementById("one-player").disabled=!1,document.getElementById("two-players").disabled=!0}},{key:"restart",value:function(){this.state.singlePlayer?this.singlePlayerMode():this.twoPlayerMode()}},{key:"handleClick",value:function(t,e){var s=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(s||this.state.history[this.state.history.length-1].turn!==this.state.machineColor){var i=this.state.history[this.state.history.length-1].board.slice();if(f(i,this.state.history[this.state.history.length-1].turn,[t,e])){O(i,this.state.history[this.state.history.length-1].turn,[t,e]);var r="B"===this.state.history[this.state.history.length-1].turn?"W":"B",n=this.state.history[this.state.history.length-1].turn;p(i,r).length>0&&(n=r);var h=k(i,"B"),a=k(i,"W"),l=null,o=null,c=!1;0===p(i,r).length&&0===p(i,this.state.history[this.state.history.length-1].turn).length&&(c=!0,k(i,this.state.history[this.state.history.length-1].turn)===k(i,r)?(o=!0,l=null):(o=!1,l=k(i,this.state.history[this.state.history.length-1].turn)>k(i,r)?this.state.history[this.state.history.length-1].turn:r)),this.setState({history:this.state.history.concat({board:i,turn:n,blackScore:h,whiteScore:a,winner:l,tie:o,gameOver:c})})}}}},{key:"moveBack",value:function(){if(this.state.history.length>1&&!this.state.singlePlayer)this.setState({history:this.state.history.slice(0,this.state.history.length-1)});else if(this.state.history.length>1&&this.state.singlePlayer)if(this.state.history[this.state.history.length-1].gameOver||this.state.history[this.state.history.length-1].turn!==this.state.playerColor){if(this.state.history[this.state.history.length-1].gameOver){var t,e=0;for(t=this.state.history.length-2;t>=0&&1!==e;t--)this.state.history[t].turn===this.state.playerColor&&e++;t++,this.setState({history:this.state.history.slice(0,t+1)})}}else{var s,i=0;for(s=this.state.history.length-1;s>=0&&2!==i;s--)this.state.history[s].turn===this.state.playerColor&&i++;s++,this.setState({history:this.state.history.slice(0,s+1)})}}},{key:"render",value:function(){var t=this,e="B"===this.state.history[this.state.history.length-1].turn?"black":"white",s="No winner yet";return null!==this.state.history[this.state.history.length-1].winner?s="B"===this.state.history[this.state.history.length-1].winner?"Black wins":"White wins":!0===this.state.history[this.state.history.length-1].tie&&(s="Tie In Game"),Object(d.jsxs)("div",{children:[Object(d.jsxs)("p",{id:"status",children:["Turn",Object(d.jsx)("svg",{width:"40",height:"40",children:Object(d.jsx)("circle",{cx:"20",cy:"20",r:"15",fill:e})})]}),Object(d.jsx)("p",{id:"winner-status",children:s}),Object(d.jsx)(j,{board:this.state.history[this.state.history.length-1].board,onClick:function(e,s){return t.handleClick(e,s)},validMovesIndices:p(this.state.history[this.state.history.length-1].board,this.state.history[this.state.history.length-1].turn).map((function(t){var e=Object(r.a)(t,2),s=e[0];return 8*e[1]+s}))}),Object(d.jsxs)("div",{className:"select-mode",children:[Object(d.jsx)("button",{id:"one-player",onClick:this.singlePlayerMode.bind(this),children:"Single Player"}),Object(d.jsx)("button",{id:"two-players",disabled:!0,children:"Two Players"}),Object(d.jsx)("button",{id:"restart",onClick:this.restart.bind(this),children:"Restart"})]}),Object(d.jsxs)("div",{className:"scores",children:[Object(d.jsxs)("div",{className:"black-score",children:[Object(d.jsx)("svg",{width:"40",height:"40",children:Object(d.jsx)("circle",{cx:"20",cy:"20",r:"15",fill:"black"})}),Object(d.jsx)("p",{children:this.state.history[this.state.history.length-1].blackScore})]}),Object(d.jsxs)("div",{className:"white-score",children:[Object(d.jsx)("svg",{width:"40",height:"40",children:Object(d.jsx)("circle",{cx:"20",cy:"20",r:"15",fill:"white"})}),Object(d.jsx)("p",{children:this.state.history[this.state.history.length-1].whiteScore})]})]}),Object(d.jsx)("button",{id:"undo",onClick:this.moveBack.bind(this),children:"Undo"})]})}}]),s}(c.a.Component);function g(){for(var t=Array(64).fill(null),e=0;e<8;e++)for(var s=0;s<8;s++)3===e&&3===s?t[8*e+s]="W":3===e&&4===s||4===e&&3===s?t[8*e+s]="B":4===e&&4===s&&(t[8*e+s]="W");return t}function f(t,e,s){var i=Object(r.a)(s,2),n=i[0],h=i[1];if(!(0<=n<=7)||!(0<=h<=7)||null!==t[8*h+n])return!1;for(var a=!1,l="B"===e?"W":"B",o=0,c=[[1,0],[-1,0],[0,-1],[0,1],[1,-1],[-1,1],[-1,-1],[1,1]];o<c.length;o++){var u=c[o],y=u[0],d=u[1];if(0<=n+y&&n+y<=7&&0<=h+d&&h+d<=7&&t[8*(h+d)+(n+y)]===l)for(var b=2;0<=n+y*b&&n+y*b<=7&&0<=h+d*b&&h+d*b<=7;){var j=8*(h+d*b)+(n+y*b);if(t[j]!==l){if(t[j]===e){a=!0;break}if(null===t[j])break}else b++}if(a)return a}return a}function p(t,e){for(var s=[],i=0;i<8;i++)for(var r=0;r<8;r++)f(t,e,[r,i])&&s.push([r,i]);return s}function O(t,e,s){var n=Object(r.a)(s,2),h=n[0],a=n[1];if(f(t,e,[h,a]))for(var l="B"===e?"W":"B",o=0,c=[[1,0],[-1,0],[0,-1],[0,1],[1,-1],[-1,1],[-1,-1],[1,1]];o<c.length;o++){var u=c[o],y=u[0],d=u[1],b=[];if(0<=h+y&&h+y<=7&&0<=a+d&&a+d<=7&&t[8*(a+d)+(h+y)]===l){b.push(8*(a+d)+(h+y));for(var j=2;0<=h+y*j&&h+y*j<=7&&0<=a+d*j&&a+d*j<=7;){var v=8*(a+d*j)+(h+y*j);if(t[v]!==l){if(t[v]===e){t[8*a+h]=e;var g,p=Object(i.a)(b);try{for(p.s();!(g=p.n()).done;){t[g.value]=e}}catch(O){p.e(O)}finally{p.f()}break}if(null===t[v])break}else b.push(v),j++}}}}function k(t,e){var s,r=0,n=Object(i.a)(t);try{for(n.s();!(s=n.n()).done;){s.value===e&&(r+=1)}}catch(h){n.e(h)}finally{n.f()}return r}y.a.render(Object(d.jsx)(v,{}),document.getElementById("root"))},16:function(t,e,s){}},[[11,1,2]]]);
//# sourceMappingURL=main.e0c602c9.chunk.js.map