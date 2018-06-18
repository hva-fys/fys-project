webpackJsonp([6],{"UZ/T":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e("WT6e"),l=e("bfOx"),s=e("yK/u"),a=function(){function t(t){this.$wikipedia=t,this.games=[{name:"Tic tac toe",route:"../tic-tac-toe",description:this.$wikipedia.getIntro("Tic-tac-toe")},{name:"Snake",route:"snake",description:this.$wikipedia.getIntro("Snake (video game genre)")},{name:"Pong",route:"pong",description:this.$wikipedia.getIntro("pong")}]}return t.prototype.ngOnInit=function(){},t}(),o=function(){function t(){var t=this;this.grid=16,this.snake=new Proxy({x:160,y:160,dx:this.grid,dy:0,cells:[],maxCells:4},{set:function(n,e,i){return"maxCells"===e&&(t.score=i-4),n[e]=i,!0}}),this.count=0,this.apple={x:320,y:320},this._score=0,this.loop=function(){requestAnimationFrame(t.loop),++t.count<4||(t.count=0,t.context.clearRect(0,0,t.canvas.width,t.canvas.height),t.snake.x+=t.snake.dx,t.snake.y+=t.snake.dy,t.snake.x<0?t.snake.x=t.canvas.width-t.grid:t.snake.x>=t.canvas.width&&(t.snake.x=0),t.snake.y<0?t.snake.y=t.canvas.height-t.grid:t.snake.y>=t.canvas.height&&(t.snake.y=0),t.snake.cells.unshift({x:t.snake.x,y:t.snake.y}),t.snake.cells.length>t.snake.maxCells&&t.snake.cells.pop(),t.context.fillStyle="red",t.context.fillRect(t.apple.x,t.apple.y,t.grid-1,t.grid-1),t.context.fillStyle="green",t.snake.cells.forEach(function(n,e){t.context.fillRect(n.x,n.y,t.grid-1,t.grid-1),n.x===t.apple.x&&n.y===t.apple.y&&(t.snake.maxCells++,t.apple.x=t.getRandomInt(0,25)*t.grid,t.apple.y=t.getRandomInt(0,25)*t.grid);for(var i=e+1;i<t.snake.cells.length;i++)n.x===t.snake.cells[i].x&&n.y===t.snake.cells[i].y&&(t.snake.x=160,t.snake.y=160,t.snake.cells=[],t.snake.maxCells=4,t.snake.dx=t.grid,t.snake.dy=0,t.apple.x=t.getRandomInt(0,25)*t.grid,t.apple.y=t.getRandomInt(0,25)*t.grid)}))}}return Object.defineProperty(t.prototype,"canvas",{get:function(){return this.canvasElementRef.nativeElement},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"score",{get:function(){return this._score},set:function(t){var n=this;this._score=t,this.animateScore=!0,setTimeout(function(){return n.animateScore=!1},350),t>(this.highscore||0)&&(this.highscore=t)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"canvasWidth",{get:function(){return screen.width>400?400:screen.width-10},enumerable:!0,configurable:!0}),t.prototype.moveSnake=function(t){t instanceof KeyboardEvent&&t.preventDefault(),"ArrowLeft"===t.code&&0===this.snake.dx?(this.snake.dx=-this.grid,this.snake.dy=0):"ArrowUp"===t.code&&0===this.snake.dy?(this.snake.dy=-this.grid,this.snake.dx=0):"ArrowRight"===t.code&&0===this.snake.dx?(this.snake.dx=this.grid,this.snake.dy=0):"ArrowDown"===t.code&&0===this.snake.dy&&(this.snake.dy=this.grid,this.snake.dx=0)},t.prototype.ngAfterViewInit=function(){this.context=this.canvas.getContext("2d"),requestAnimationFrame(this.loop)},t.prototype.getRandomInt=function(t,n){return Math.floor(Math.random()*(n-t))+t},t}(),r=e("TToO"),h=function(){function t(){}return t.prototype.ngAfterViewInit=function(){new y("root").run()},t}(),u=function(){function t(t,n,e,i){this.x=t,this.y=n,this.width=e,this.height=i,this.x_speed=0,this.y_speed=0,this.ctx=null,this.canvas=null}return t.prototype.render=function(){this.ctx.fillStyle="#ee453d",this.ctx.fillRect(this.x,this.y,this.width,this.height)},t.prototype.move=function(t,n){this.x+=t,this.y+=n,this.y_speed=n,this.y<0?(this.y=0,this.y_speed=0):this.y+this.height>this.canvas.height&&(this.y=this.canvas.height-this.height,this.y_speed=0)},t}(),c=function(t){function n(n,e,i,l){var s=t.call(this,n,e,i,l)||this;return s.score=0,s.mode=0,s}return Object(r.c)(n,t),n.prototype.setMode=function(t){this.mode=parseInt(t,10),this.height=0===this.mode?70:40,this.y=this.canvas.height/2-this.height/2},n.prototype.reset=function(){this.score=0,this.y=this.canvas.height/2-this.height/2},n.prototype.checkCollision=function(t){if(!(t.x+t.width<this.x||t.x-t.width>this.x+this.width||t.y+t.width<=this.y||t.y-t.width>=this.y+this.height||t.x>this.x+this.width/2&&t.x_speed>0||t.x<this.x+this.width/2&&t.x_speed<0)){if(++t.hits%3==0&&t.hits<30){var n=Math.sign(t.x_speed);1===n?t.x_speed++:-1===n&&t.x_speed--}var e=0;t.y<this.y+this.height/2?e=-(this.y+this.height/2-t.y)/6:t.y>this.y+this.height/2&&(e=(t.y-(this.y+this.height/2))/6),t.x_speed=-t.x_speed,t.y_speed=e}},n}(u),d=function(t){function n(n,e){var i=t.call(this,10,n.height/2-25,10,50)||this;return i.canvas=n,i.ctx=e,i}return Object(r.c)(n,t),n.prototype.reset=function(){t.prototype.reset.call(this),this.x=10},n.prototype.update=function(t){var n=null;for(var e in t)t.hasOwnProperty(e)&&(n?t[e].x<n.x&&(n=t[e]):n=t[e]);if(n){var i=this.y+this.height/2-(n.y+n.height/2);if(-8<i&&i>8){var l=Math.sign(i);this.move(0,1===l?-8/3:-1===l?8/3:0)}else i<4&&this.move(0,16/3)}},n}(c),p=function(t){function n(n,e){var i=t.call(this,n.width-20,n.height/2-25,10,50)||this;return i.canvas=n,i.ctx=e,i.keys={},window.addEventListener("keydown",function(t){i.keys[t.keyCode]=t.key}),window.addEventListener("keyup",function(t){delete i.keys[t.keyCode]}),i}return Object(r.c)(n,t),n.prototype.reset=function(){t.prototype.reset.call(this),this.x=this.canvas.width-20},n.prototype.move=function(n,e){this.x>this.canvas.width-(10+this.width)-n||this.x<this.canvas.width-(this.canvas.width/2-this.width)-n||t.prototype.move.call(this,n,e)},n.prototype.update=function(){for(var t in this.move(0,0),this.keys){var n=parseInt(t,10);38===n?this.move(0,-4):40===n?this.move(0,4):37===n?this.move(-4,0):39===n&&this.move(4,0)}},n}(c),m=function(t){function n(n,e){var i=t.call(this,n.width/2-10,n.height/2-10,10,0)||this;return i.canvas=n,i.ctx=e,i.x_speed=3,i.hits=0,i.unit=0,i}return Object(r.c)(n,t),n.prototype.render=function(){this.ctx.beginPath(),this.ctx.arc(this.x,this.y,this.width,2*Math.PI,0),this.ctx.fillStyle="#ee453d",this.ctx.fill()},n.prototype.reset=function(){this.x=this.canvas.width/2+(0===this.mode?10:5),this.y=this.canvas.height/2,this.x_speed=3,this.y_speed=0,this.hits=0,this.unit=0},n.prototype.setMode=function(t){this.mode=parseInt(t,10),this.width=this.height=0===this.mode?10:5,this.y=this.canvas.height/2-this.height/2,this.x=this.canvas.width/2-this.width/2},n.prototype.update=function(t,n,e){if(this.x+=this.x_speed,this.y+=this.y_speed,this.x<0||this.x>this.canvas.width)return this.x<0&&n.score++,this.x>this.canvas.width&&t.score++,void this.reset();this.y-5<0?(this.y=5,this.y_speed<0&&(this.y_speed=-this.y_speed)):this.y+5>this.canvas.height&&(this.y=this.canvas.height-5,this.y_speed>0&&(this.y_speed=-this.y_speed)),e.checkCollision(this),this.x<this.canvas.width/2?t.checkCollision(this):n.checkCollision(this)},n}(u),f=function(t){function n(n,e){var i=t.call(this,n.width/2-15,n.height/2-15,30,30)||this;return i.canvas=n,i.ctx=e,i.x_speed=1,i.alive=!1,i.walk_x=0,i.walk_y=0,i}return Object(r.c)(n,t),n.prototype.reset=function(){this.alive=!1},n.prototype.render=function(){this.alive&&(this.ctx.beginPath(),this.ctx.arc(this.x,this.y,this.width,2*Math.PI,0),this.ctx.fillStyle="#00FF00",this.ctx.fill())},n.prototype.checkCollision=function(t){if(this.alive&&!(t.x+t.width<this.x||t.x-t.width>this.x+this.width||t.y+t.width<=this.y||t.y-t.width>=this.y+this.height)){var n=t.x-this.x,e=t.y-this.y;Math.sqrt(n*n+e*e)<t.width+this.width&&(this.alive=!1,t.y_speed=-t.y_speed,t.x_speed=-t.x_speed)}},n.prototype.walkX=function(){var t=Math.sign(this.x+this.width/2-this.walk_x);this.move(1===t?-8/3:-1===t?8/3:0,0)},n.prototype.walkY=function(){var t=Math.sign(this.y+this.height/2-this.walk_y);this.move(0,1===t?-8/3:-1===t?8/3:0)},n.prototype.update=function(){var t;0!==this.walk_x&&this.walk_x!==this.x||((t=Math.floor(Math.random()*Math.floor(this.canvas.width)))<this.width&&(t+=this.width),this.walk_x=t),0!==this.walk_y&&this.walk_y!==this.y||((t=Math.floor(Math.random()*Math.floor(this.canvas.height)))<this.height&&(t+=this.height),this.walk_y=t),this.walkX(),this.walkY()},n}(u),y=function(){function t(t){var n=this,e=document.getElementById(t);if(e){var i=document.createElement("canvas");i.width=600,i.height=400;var l=i.getContext("2d");this.elemRoot=e,this.elemCanvas=i,this.ctx=l,this.cheat=!1,this.balls=[],this.player=new p(this.elemCanvas,this.ctx),this.computer=new d(this.elemCanvas,this.ctx),this.monster=new f(this.elemCanvas,this.ctx),this.balls.push(new m(this.elemCanvas,this.ctx));var s=document.createElement("button");s.innerHTML="Start Pong",s.onclick=function(t){return n.startHandle(t)};var a=document.createElement("button");a.innerHTML="Stop Pong",a.onclick=function(t){return n.stopHandle(t)};var o=document.createElement("div");o.className="score",o.innerHTML=this.computeScore();var r=document.createElement("input");r.id="easy",r.type="radio",r.name="mode",r.checked=!0,r.value="0",r.onclick=function(t){return n.changeMode(t)};var h=document.createElement("input");h.id="hard",h.type="radio",h.name="mode",h.value="1",h.onclick=function(t){return n.changeMode(t)};var u=document.createElement("div");u.className="winner",this.elemStart=s,this.elemStop=a,this.elemScore=o,this.elemOptionEasy=r,this.elemOptionHard=h,this.elemWinner=u,window.addEventListener("keydown",function(t){if(t.key)switch(t.key){case"g":n.cheat=!1;break;case"p":n.cheat=!0;break;case"i":n.player.height=n.elemCanvas.height;break;case"o":n.balls.push(new m(n.elemCanvas,n.ctx));break;case"m":n.monster.alive=!0}})}else console.error("Pong root element not found.")}return t.prototype.render=function(){for(var t in this.ctx.rect(0,0,this.elemCanvas.width,this.elemCanvas.height),this.ctx.fillStyle="#584bb3",this.ctx.fill(),this.player.render(),this.computer.render(),this.monster.render(),this.balls)this.balls.hasOwnProperty(t)&&this.balls[t].render()},t.prototype.computeScore=function(){return this.computer.score+" - "+this.player.score},t.prototype.updateScore=function(){this.elemScore.innerHTML=this.computeScore(),!this.elemWinner.classList.contains("open")&&(this.computer.score>=5||this.player.score>=5)&&(this.computer.score>=5?this.elemWinner.innerHTML="Computer wins":this.player.score>=5&&(this.elemWinner.innerHTML="Player wins"),this.elemWinner.classList.add("open"),this.stopHandle(null))},t.prototype.update=function(){if(this.updateScore(),this.player.update(),!this.cheat)for(var t in this.computer.update(this.balls),this.balls)if(this.balls.hasOwnProperty(t)){var n=this.balls[t];n&&(n.update(this.computer,this.player,this.monster),1===this.balls.length&&7===n.hits&&n.hits%7==0&&this.balls.push(new m(this.elemCanvas,this.ctx)),10!==n.hits||this.monster.alive||(this.monster.alive=!0))}},t.prototype.run=function(){var t=document.createElement("div");t.className="header";var n=document.createElement("div");n.className="buttons",n.appendChild(this.elemStart),n.appendChild(this.elemStop);var e=document.createElement("div");e.className="tools";var i=document.createElement("label");i.innerHTML="Gemakkelijk",i.setAttribute("for","easy");var l=document.createElement("label");l.innerHTML="Moeilijk",l.setAttribute("for","hard"),e.appendChild(this.elemOptionEasy),e.appendChild(i),e.appendChild(this.elemOptionHard),e.appendChild(l),t.appendChild(n),t.appendChild(this.elemScore),t.appendChild(e),this.elemRoot.appendChild(t),this.elemRoot.appendChild(this.elemWinner),this.elemRoot.appendChild(this.elemCanvas),this.render()},t.prototype.reset=function(){for(var t in this.balls)this.balls.hasOwnProperty(t)&&(this.balls[t].reset(),0!==parseInt(t,10)&&delete this.balls[t]);this.computer.reset(),this.player.reset(),this.monster.reset(),this.elemOptionEasy.disabled=!1,this.elemOptionHard.disabled=!1,this.elemWinner.classList.contains("open")&&this.elemWinner.classList.remove("open")},t.prototype.changeMode=function(t){if(t.target){var n=t.target;if(n)for(var e in this.player.setMode(n.value||0),this.balls)this.balls.hasOwnProperty(e)&&this.balls[e].setMode(n.value||0);this.render()}},t.prototype.stopHandle=function(t){clearInterval(this.interval),clearInterval(this.slowInterval)},t.prototype.startHandle=function(t){var n=this;this.stopHandle(t),this.reset(),this.elemOptionEasy.disabled=!0,this.elemOptionHard.disabled=!0,this.interval=setInterval(function(){n.render(),n.update()},15),this.slowInterval=setInterval(function(){n.monster.update()},50)},t}(),g=(l.n.forChild([{path:"",component:a},{path:"snake",component:o},{path:"pong",component:h}]),function(){}),_=e("1OzB"),b=e("Xjw4"),x=e("mu/C"),k=e("BTH+"),v=e("gsbp"),w=e("XHgV"),C=e("U/+3"),O=i._3({encapsulation:0,styles:[["[_nghost-%COMP%]{display:block;padding:16px}"]],data:{animation:[{type:7,name:"fadeInOut",definitions:[{type:1,expr:":enter",animation:[{type:6,styles:{opacity:0},offset:null},{type:4,styles:{type:6,styles:{opacity:1},offset:null},timings:"350ms cubic-bezier(0.4, 0.0, 1, 1)"}],options:null},{type:1,expr:":leave",animation:[{type:4,styles:{type:6,styles:{opacity:0},offset:null},timings:"350ms cubic-bezier(0.190, 1.000, 0.220, 1.000)"}],options:null}],options:{}}]}});function M(t){return i._27(0,[(t()(),i._5(0,0,null,null,6,"mat-card-content",[["class","mat-card-content"]],[[24,"@fadeInOut",0]],null,null,null,null)),i._4(1,16384,null,0,_.d,[],null,null),(t()(),i._25(-1,null,["\n    "])),(t()(),i._5(3,0,null,null,2,"p",[],null,null,null,null,null)),(t()(),i._25(4,null,["\n      ","\n    "])),i._20(131072,b.b,[i.h]),(t()(),i._25(-1,null,["\n  "]))],null,function(t,n){t(n,0,0,void 0),t(n,4,0,i._26(n,4,0,i._17(n,5).transform(n.parent.context.$implicit.description)))})}function I(t){return i._27(0,[(t()(),i._5(0,0,null,null,18,"mat-card",[["class","my-2 mat-card"]],null,null,null,x.d,x.a)),i._4(1,49152,null,0,_.a,[],null,null),(t()(),i._25(-1,0,["\n  "])),(t()(),i._5(3,0,null,0,10,"mat-card-title",[["class","d-flex justify-content-between mat-card-title"]],null,null,null,null,null)),i._4(4,16384,null,0,_.i,[],null,null),(t()(),i._25(-1,null,["\n    "])),(t()(),i._5(6,0,null,null,1,"span",[],null,null,null,null,null)),(t()(),i._25(7,null,["",""])),(t()(),i._25(-1,null,["\n\n    "])),(t()(),i._5(9,0,null,null,3,"button",[["color","primary"],["mat-button",""]],[[8,"disabled",0]],[[null,"click"]],function(t,n,e){var l=!0;return"click"===n&&(l=!1!==i._17(t,10).onClick()&&l),l},k.b,k.a)),i._4(10,16384,null,0,l.l,[l.k,l.a,[8,null],i.D,i.k],{routerLink:[0,"routerLink"]},null),i._4(11,180224,null,0,v.b,[i.k,w.a,C.g],{color:[0,"color"]},null),(t()(),i._25(-1,0,["\n      Play\n    "])),(t()(),i._25(-1,null,["\n  "])),(t()(),i._25(-1,0,["\n  "])),(t()(),i._0(16777216,null,0,2,null,M)),i._4(16,16384,null,0,b.j,[i.O,i.L],{ngIf:[0,"ngIf"]},null),i._20(131072,b.b,[i.h]),(t()(),i._25(-1,0,["\n"]))],function(t,n){t(n,10,0,n.context.$implicit.route),t(n,11,0,"primary"),t(n,16,0,i._26(n,16,0,i._17(n,17).transform(n.context.$implicit.description)))},function(t,n){t(n,7,0,n.context.$implicit.name),t(n,9,0,i._17(n,11).disabled||null)})}function P(t){return i._27(0,[(t()(),i._0(16777216,null,null,1,null,I)),i._4(1,802816,null,0,b.i,[i.O,i.L,i.r],{ngForOf:[0,"ngForOf"]},null),(t()(),i._25(-1,null,["\n"]))],function(t,n){t(n,1,0,n.component.games)},null)}var S=i._1("fys-gaming-home",a,function(t){return i._27(0,[(t()(),i._5(0,0,null,null,1,"fys-gaming-home",[],null,null,null,P,O)),i._4(1,114688,null,0,a,[s.a],null,null)],function(t,n){t(n,1,0)},null)},{},{},[]),E=e("RoIQ"),j=e("z7Rf"),H=function(){function t(){this.change=new i.n}return t.prototype.onChange=function(t){this.change.emit(t)},t}(),L=i._3({encapsulation:0,styles:[[".button-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100px;height:100px}"]],data:{}});function R(t){return i._27(0,[(t()(),i._5(0,0,null,null,36,"div",[["class","button-controls d-flex flex-column"]],null,null,null,null,null)),(t()(),i._25(-1,null,["\n  "])),(t()(),i._5(2,0,null,null,6,"button",[["class","mx-auto"],["mat-button",""]],[[8,"disabled",0]],[[null,"click"]],function(t,n,e){var i=!0;return"click"===n&&(i=!1!==t.component.onChange({code:"ArrowUp"})&&i),i},k.b,k.a)),i._4(3,180224,null,0,v.b,[i.k,w.a,C.g],null,null),(t()(),i._25(-1,0,["\n    "])),(t()(),i._5(5,0,null,0,2,"mat-icon",[["class","mat-icon"],["role","img"]],null,null,null,E.b,E.a)),i._4(6,638976,null,0,j.b,[i.k,j.d,[8,null]],null,null),(t()(),i._25(-1,0,["arrow_upward"])),(t()(),i._25(-1,0,["\n  "])),(t()(),i._25(-1,null,["\n  "])),(t()(),i._5(10,0,null,null,25,"div",[["class","mx-auto"]],null,null,null,null,null)),(t()(),i._25(-1,null,["\n    "])),(t()(),i._5(12,0,null,null,6,"button",[["mat-button",""]],[[8,"disabled",0]],[[null,"click"]],function(t,n,e){var i=!0;return"click"===n&&(i=!1!==t.component.onChange({code:"ArrowLeft"})&&i),i},k.b,k.a)),i._4(13,180224,null,0,v.b,[i.k,w.a,C.g],null,null),(t()(),i._25(-1,0,["\n      "])),(t()(),i._5(15,0,null,0,2,"mat-icon",[["class","mat-icon"],["role","img"]],null,null,null,E.b,E.a)),i._4(16,638976,null,0,j.b,[i.k,j.d,[8,null]],null,null),(t()(),i._25(-1,0,["arrow_back"])),(t()(),i._25(-1,0,["\n    "])),(t()(),i._25(-1,null,["\n    "])),(t()(),i._5(20,0,null,null,6,"button",[["mat-button",""]],[[8,"disabled",0]],[[null,"click"]],function(t,n,e){var i=!0;return"click"===n&&(i=!1!==t.component.onChange({code:"ArrowDown"})&&i),i},k.b,k.a)),i._4(21,180224,null,0,v.b,[i.k,w.a,C.g],null,null),(t()(),i._25(-1,0,["\n      "])),(t()(),i._5(23,0,null,0,2,"mat-icon",[["class","mat-icon"],["role","img"]],null,null,null,E.b,E.a)),i._4(24,638976,null,0,j.b,[i.k,j.d,[8,null]],null,null),(t()(),i._25(-1,0,["arrow_downward"])),(t()(),i._25(-1,0,["\n    "])),(t()(),i._25(-1,null,["\n    "])),(t()(),i._5(28,0,null,null,6,"button",[["mat-button",""]],[[8,"disabled",0]],[[null,"click"]],function(t,n,e){var i=!0;return"click"===n&&(i=!1!==t.component.onChange({code:"ArrowRight"})&&i),i},k.b,k.a)),i._4(29,180224,null,0,v.b,[i.k,w.a,C.g],null,null),(t()(),i._25(-1,0,["\n      "])),(t()(),i._5(31,0,null,0,2,"mat-icon",[["class","mat-icon"],["role","img"]],null,null,null,E.b,E.a)),i._4(32,638976,null,0,j.b,[i.k,j.d,[8,null]],null,null),(t()(),i._25(-1,0,["arrow_forward"])),(t()(),i._25(-1,0,["\n    "])),(t()(),i._25(-1,null,["\n  "])),(t()(),i._25(-1,null,["\n"])),(t()(),i._25(-1,null,["\n"]))],function(t,n){t(n,6,0),t(n,16,0),t(n,24,0),t(n,32,0)},function(t,n){t(n,2,0,i._17(n,3).disabled||null),t(n,12,0,i._17(n,13).disabled||null),t(n,20,0,i._17(n,21).disabled||null),t(n,28,0,i._17(n,29).disabled||null)})}var T=i._3({encapsulation:0,styles:[["[_ngcontent-%COMP%]:root{--primary:#ee453d;--secondary:#c51788;--purple-dark:#5a105d;--purple-light:#463c8f}@-webkit-keyframes gradient-animation{0%,100%{background-position:0 50%}50%{background-position:100% 50%}}@keyframes gradient-animation{0%,100%{background-position:0 50%}50%{background-position:100% 50%}}.playground[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}canvas[_ngcontent-%COMP%]{display:block;background:-webkit-gradient(linear,right top,left top,from(#c51788),color-stop(#5a105d),to(#463c8f));background:linear-gradient(270deg,#c51788,#5a105d,#463c8f);-webkit-animation:30s infinite gradient-animation;animation:30s infinite gradient-animation;background-size:800% 800%}.score[_ngcontent-%COMP%]{color:#fff;position:absolute;top:-24px;width:100%;display:-webkit-box;display:-ms-flexbox;display:flex}.score[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#fff;padding:0 8px;background-color:#ee453d}@media (max-width:450px){.playground[_ngcontent-%COMP%]{margin-top:135px}}"]],data:{animation:[{type:7,name:"scaleUp",definitions:[{type:0,name:"true",styles:{type:6,styles:{transform:"scale(1.2)"},offset:null},options:void 0},{type:0,name:"false",styles:{type:6,styles:{transform:"scale(1)"},offset:null},options:void 0},{type:1,expr:"* <=> *",animation:{type:4,styles:null,timings:"350ms cubic-bezier(0.4, 0.0, 1, 1)"},options:null}],options:{}},{type:7,name:"fadeInOut",definitions:[{type:1,expr:":enter",animation:[{type:6,styles:{opacity:0},offset:null},{type:4,styles:{type:6,styles:{opacity:1},offset:null},timings:"350ms cubic-bezier(0.4, 0.0, 1, 1)"}],options:null},{type:1,expr:":leave",animation:[{type:4,styles:{type:6,styles:{opacity:0},offset:null},timings:"350ms cubic-bezier(0.190, 1.000, 0.220, 1.000)"}],options:null}],options:{}}]}});function A(t){return i._27(0,[(t()(),i._5(0,0,null,null,1,"span",[],[[24,"@fadeInOut",0]],null,null,null,null)),(t()(),i._25(1,null,["Highscore ",""]))],null,function(t,n){var e=n.component;t(n,0,0,void 0),t(n,1,0,e.highscore)})}function W(t){return i._27(0,[i._23(402653184,1,{canvasElementRef:0}),(t()(),i._5(1,0,null,null,1,"div",[["class","top-card"]],null,null,null,null,null)),(t()(),i._25(-1,null,["\n  Snake\n"])),(t()(),i._25(-1,null,["\n\n"])),(t()(),i._5(4,0,null,null,15,"div",[["class","playground"]],null,null,null,null,null)),(t()(),i._25(-1,null,["\n  "])),(t()(),i._5(6,0,null,null,7,"div",[["class","score"]],null,null,null,null,null)),(t()(),i._25(-1,null,["\n\n    "])),(t()(),i._0(16777216,null,null,1,null,A)),i._4(9,16384,null,0,b.j,[i.O,i.L],{ngIf:[0,"ngIf"]},null),(t()(),i._25(-1,null,["\n    "])),(t()(),i._5(11,0,null,null,1,"span",[["class","ml-auto"]],[[24,"@scaleUp",0]],null,null,null,null)),(t()(),i._25(12,null,["Points ",""])),(t()(),i._25(-1,null,["\n  "])),(t()(),i._25(-1,null,["\n  "])),(t()(),i._5(15,0,[[1,0],["canvas",1]],null,0,"canvas",[["height","400"]],[[1,"width",0]],null,null,null,null)),(t()(),i._25(-1,null,["\n\n   "])),(t()(),i._5(17,0,null,null,1,"fys-mobile-controls",[],null,[[null,"change"]],function(t,n,e){var i=!0;return"change"===n&&(i=!1!==t.component.moveSnake(e)&&i),i},R,L)),i._4(18,49152,null,0,H,[],null,{change:"change"}),(t()(),i._25(-1,null,["\n\n"])),(t()(),i._25(-1,null,["\n"]))],function(t,n){t(n,9,0,n.component.highscore)},function(t,n){var e=n.component;t(n,11,0,e.animateScore),t(n,12,0,e.score),t(n,15,0,e.canvasWidth)})}var z=i._1("fys-snake",o,function(t){return i._27(0,[(t()(),i._5(0,0,null,null,1,"fys-snake",[],null,[["window","keydown"]],function(t,n,e){var l=!0;return"window:keydown"===n&&(l=!1!==i._17(t,1).moveSnake(e)&&l),l},W,T)),i._4(1,4243456,null,0,o,[],null,null)],null,null)},{},{},[]),$=i._3({encapsulation:2,styles:[[":root{--primary:#ee453d;--secondary:#c51788;--purple-dark:#5a105d;--purple-light:#463c8f}@-webkit-keyframes gradient-animation{0%,100%{background-position:0 50%}50%{background-position:100% 50%}}@keyframes gradient-animation{0%,100%{background-position:0 50%}50%{background-position:100% 50%}}#root{width:610px;height:456px;background:-webkit-gradient(linear,right top,left top,from(#c51788),color-stop(#5a105d),to(#463c8f));background:linear-gradient(270deg,#c51788,#5a105d,#463c8f);-webkit-animation:30s infinite gradient-animation;animation:30s infinite gradient-animation;background-size:800% 800%;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}#root .header{position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;height:50px;padding-left:15px;padding-right:15px;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;text-align:center}#root .header .score{position:absolute;width:200px;left:50%;top:50%;color:#fff;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}#root .header .buttons button{border:none;padding:0 8px;background:#fff;margin-right:15px;font-family:Roboto;border-radius:4px}#root .header .buttons button:last-child{margin-right:0}#root .header .tools label{padding-left:5px;padding-right:5px;color:#fff;margin:0}#root .winner{position:absolute;display:none;width:200px;height:50px;left:50%;top:calc(50% + 50px/2);background:#ee453d;color:#fff;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}#root .winner.open{display:-webkit-box;display:-ms-flexbox;display:flex;border-radius:4px}canvas{margin:0 auto;display:block;border-radius:4px}"]],data:{}});function F(t){return i._27(0,[(t()(),i._5(0,0,null,null,1,"div",[["class","top-card"]],null,null,null,null,null)),(t()(),i._25(-1,null,["\n  Pong\n"])),(t()(),i._25(-1,null,["\n\n"])),(t()(),i._5(3,0,null,null,0,"div",[["id","root"]],null,null,null,null,null)),(t()(),i._25(-1,null,["\n"]))],null,null)}var U=i._1("fys-pong",h,function(t){return i._27(0,[(t()(),i._5(0,0,null,null,1,"fys-pong",[],null,null,null,F,$)),i._4(1,4243456,null,0,h,[],null,null)],null,null)},{},{},[]),N=e("9Sd6"),D=e("ItHS"),X=e("OE0E"),q=e("Uo70");e.d(n,"GamingModuleNgFactory",function(){return B});var B=i._2(g,[],function(t){return i._13([i._14(512,i.j,i.Y,[[8,[S,z,U]],[3,i.j],i.w]),i._14(4608,b.l,b.k,[i.t,[2,b.r]]),i._14(6144,N.b,null,[b.d]),i._14(4608,N.c,N.c,[[2,N.b]]),i._14(4608,w.a,w.a,[]),i._14(4608,C.i,C.i,[w.a]),i._14(4608,C.h,C.h,[C.i,i.y,b.d]),i._14(136192,C.d,C.b,[[3,C.d],b.d]),i._14(5120,C.l,C.k,[[3,C.l],[2,C.j],b.d]),i._14(5120,C.g,C.e,[[3,C.g],i.y,w.a]),i._14(5120,j.d,j.a,[[3,j.d],[2,D.c],X.c,[2,b.d]]),i._14(512,b.c,b.c,[]),i._14(512,l.n,l.n,[[2,l.s],[2,l.k]]),i._14(512,N.a,N.a,[]),i._14(256,q.f,!0,[]),i._14(512,q.n,q.n,[[2,q.f]]),i._14(512,_.g,_.g,[]),i._14(512,w.b,w.b,[]),i._14(512,q.y,q.y,[]),i._14(512,C.a,C.a,[]),i._14(512,v.c,v.c,[]),i._14(512,j.c,j.c,[]),i._14(512,g,g,[]),i._14(1024,l.i,function(){return[[{path:"",component:a},{path:"snake",component:o},{path:"pong",component:h}]]},[])])})}});