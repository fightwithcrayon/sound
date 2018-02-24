webpackJsonp([1],{100:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=c(r(23)),a=c(r(17)),i=c(r(101)),o=c(r(181)),u=r(182);function c(t){return t&&t.__esModule?t:{default:t}}n.default.use(a.default);var l={deviceId:(0,u.deviceId)()},s=new a.default.Store({state:l,getters:{library:function(t){return t.library.tracks||[]},getTrackFromLibrary:function(t,e){return function(e){return t.library.tracks.find(function(t){return t.uuid===e})||!1}},getTracksByAlbum:function(t,e){return function(e){return t.library.tracks.filter(function(t){return t.album.name===e})||!1}},deviceId:function(t){return t.deviceId}},mutations:{},actions:{},modules:{library:i.default,player:o.default}});e.default=s},101:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=l(r(60)),a=l(r(23)),i=l(r(17)),o=r(102),u=l(r(103)),c=l(r(121));function l(t){return t&&t.__esModule?t:{default:t}}r(122);r(125),r(164);var s=u.default.initializeApp({apiKey:"AIzaSyB6ozpHjiBNQx1OahIpcnFYGPIEHw_VxMc",authDomain:"soundplayer-55578.firebaseapp.com",databaseURL:"https://soundplayer-55578.firebaseio.com",projectId:"soundplayer-55578",storageBucket:"gs://soundplayer-55578.appspot.com",messagingSenderId:"506304420571"}),d=s.firestore(),f=s.storage(),p={tracks:d.collection("tracks"),albums:d.collection("albums"),artists:d.collection("artists")};a.default.use(i.default);var v=Object.assign({},o.firebaseMutations,{TOGGLE_CLOUD_LIBRARY:function(t,e){t.cloud=e},STORE_UPLOAD_WORKER:function(t,e){t.uploadWorker=e}}),y={setupCloudRefs:(0,o.firebaseAction)(function(t){var e=t.bindFirebaseRef;e("tracks",p.tracks),e("albums",p.albums),e("artists",p.artists)}),importItunesLibraryFile:function(t,e){t.commit;var r=new c.default;r.postMessage(e),r.addEventListener("message",function(t){var e=t.data,r=e.type,n=e.data;"update"===r?console.log("UPDATE",n):"error"===r?console.log("ERROR",n):"end"===r&&console.log("END",n)})},toggleCloudLibrary:function(t,e){(0,t.commit)("TOGGLE_CLOUD_LIBRARY",e)},uploadLibraryFiles:function(t){var e=t.dispatch,r=t.commit,n=t.getters,a=new c.default;return r("STORE_UPLOAD_WORKER",a),a.postMessage(n.uploadQueue),a.addEventListener("message",function(t){var r=t.data,n=r.type,a=r.data;"success"===n?e("updateTrack",a):"message"===n?console.log(a):"error"===n?console.log("ERROR",a):"end"===n&&console.log("END")}),!0},updateTrack:function(t,e){t.commit;p.tracks.doc(escape(e.name)).update({"src.cloud":!0})},getTrackCloudSrc:function(){var t,e=(t=n.default.mark(function t(e,r){e.commit;return n.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,f.ref(r).getDownloadURL();case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}},t,this)}),function(){var e=t.apply(this,arguments);return new Promise(function(t,r){return function n(a,i){try{var o=e[a](i),u=o.value}catch(t){return void r(t)}if(!o.done)return Promise.resolve(u).then(function(t){n("next",t)},function(t){n("throw",t)});t(u)}("next")})});return function(t,r){return e.apply(this,arguments)}}()};e.default={state:{queue:[],tracks:[],artists:[],albums:[],cloud:!1,uploadWorker:!1},getters:{tracks:function(t){return t.tracks},artists:function(t){return t.artists},albums:function(t){return t.albums},recordExists:function(t){return function(e,r){var n=t[e].filter(function(t){return t.name===r});return n.length>0&&n}},uploadQueue:function(t){return t.tracks.filter(function(t){return!0!==t.src.cloud})},uploadWorker:function(t){return t.uploadWorker}},mutations:v,actions:y}},121:function(t,e,r){"use strict";t.exports=function(){return new Worker(r.p+"b3ff83271d61385337da.worker.js")}},181:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(r(23)),a=i(r(17));function i(t){return t&&t.__esModule?t:{default:t}}function o(t){if(Array.isArray(t)){for(var e=0,r=Array(t.length);e<t.length;e++)r[e]=t[e];return r}return Array.from(t)}n.default.use(a.default);var u={audioObject:new Audio,currentPlaybackState:"stopped",pointer:!1,queue:[]},c={SET_PLAYBACK_SRC:function(t,e){t.audioObject.src=e},SET_AUDIO_STATE:function(t,e){"playing"===e&&t.audioObject.play().then(function(){t.currentPlaybackState=e}),"paused"===e&&(t.audioObject.pause(),t.currentPlaybackState=e),"stopped"===e&&(t.audioObject.pause(),t.audioObject.currentTime=0,t.currentPlaybackState=e)},ADD_TO_QUEUE:function(t,e){var r;Array.isArray(e)?(r=t.queue).push.apply(r,o(e)):t.queue.push(e)},ADD_TO_FRONT_OF_QUEUE:function(t,e){var r;Array.isArray(e)?(r=t.queue).unshift.apply(r,o(e)):t.queue.unshift(e)},REMOVE_FROM_QUEUE:function(t,e){t.queue=t.queue.splice(e,0)},CLEAR_QUEUE:function(t){t.queue=[]},SET_POINTER:function(t,e){t.pointer=e},POINTER_FORWARDS_ONE:function(t){t.pointer=t.pointer<=t.queue.length?t.pointer+1:t.queue.length},POINTER_BACKWARDS_ONE:function(t){t.pointer=t.pointer>0?t.pointer-1:0},CLEAR_POINTER:function(t){t.pointer=!1}},l={preparePlayback:function(t){var e=t.commit,r=t.dispatch,n=t.getters,a=t.rootState;return u.currentPlaybackState="loading",new Promise(function(t,i){n.currentTrack.src.hasOwnProperty(a.deviceId)?(e("SET_PLAYBACK_SRC",n.currentTrack.src[a.deviceId]),t()):!0===n.currentTrack.src.cloud?r("getTrackCloudSrc",n.currentTrack.uuid).then(function(r){e("SET_PLAYBACK_SRC",r),t()}):i("No source found")})},playTrack:function(t,e){var r=t.commit,n=t.dispatch;e&&(r("CLEAR_QUEUE"),r("ADD_TO_QUEUE",e),r("SET_POINTER",0)),n("preparePlayback").then(function(){r("SET_AUDIO_STATE","playing")}).catch(function(t){console.log(t),r("SET_AUDIO_STATE","stopped")})},pauseTrack:function(t){(0,t.commit)("SET_AUDIO_STATE","paused")},stopTrack:function(t){(0,t.commit)("SET_AUDIO_STATE","stopped")},addToQueue:function(t,e){(0,t.commit)("ADD_TO_QUEUE",e)},addToFrontOfQueue:function(t,e){(0,t.commit)("ADD_TO_FRONT_OF_QUEUE",e)},clearQueue:function(t){(0,t.commit)("CLEAR_QUEUE")},selectQueuedTrack:function(t,e){(0,t.commit)("SET_POINTER",e)},nextTrack:function(t){var e=t.commit,r=t.dispatch;e("POINTER_FORWARDS_ONE"),r("playTrack")},previousTrack:function(t){var e=t.commit,r=t.dispatch;e("POINTER_BACKWARDS_ONE"),r("playTrack")}};e.default={state:u,getters:{currentQueueId:function(t,e){return!1!==t.pointer&&t.queue[t.pointer]},currentTrack:function(t,e){return!!e.currentQueueId&&e.getTrackFromLibrary(e.currentQueueId)}},mutations:c,actions:l}},182:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.deviceId=function(){return device.uuid}},204:function(t,e,r){"use strict"},205:function(t,e){},207:function(t,e,r){"use strict";var n,a=r(208),i=(n=a)&&n.__esModule?n:{default:n};i.default.install({onUpdateReady:function(){console.log("update ready"),i.default.applyUpdate()},onUpdated:function(){console.log("updated"),location.reload()}})},82:function(t,e,r){"use strict";r(83);var n=r(85);r(205),r(206);var a=!!window.cordova;r(207),n.app.$mount("#app"),document.addEventListener("deviceready",function(){console.log("Device is ready!"),console.log(a)},!1),a&&(console.log("This is cordova"),document.addEventListener("deviceready",n.app.$mount("#app"),!1))},83:function(t,e,r){"use strict";var n,a=r(57),i=(n=a)&&n.__esModule?n:{default:n};window.Promise=window.Promise||i.default},85:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.store=e.router=e.app=void 0;var n=d(r(23)),a=r(86),i=d(r(87)),o=d(r(94)),u=d(r(100)),c=d(r(183)),l=d(r(202)),s=d(r(203));function d(t){return t&&t.__esModule?t:{default:t}}var f=r(204);(0,a.sync)(u.default,o.default),n.default.mixin({methods:{convertTimeHHMMSS:function(t){var e=new Date(1e3*t).toISOString().substr(11,8);return 0===e.indexOf("00:")?e.substr(3):e},formatMilliseconds:function(t){var e=t/6e4,r=Math.floor(e),n=Math.floor(60*(e-r));return(r>9?r:"0"+r)+":"+(n>9?n:"0"+n)}}}),n.default.use(l.default,c.default),n.default.use(s.default),n.default.use(f);var p=new n.default(Object.assign({router:o.default,store:u.default},i.default));e.app=p,e.router=o.default,e.store=u.default},87:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=u(r(32));r(88);var a=u(r(89)),i=u(r(90)),o=u(r(92));function u(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{open:!1}},components:{Sidebar:a.default,Footer:o.default},created:function(){this.$store.dispatch("setupCloudRefs")},render:function(t){var e=this;return t("v-app",{attrs:{id:"app"}},[t("v-navigation-drawer",(0,n.default)([{attrs:{id:"sidebar",fixed:!0,clipped:!0,app:!0,value:e.open},on:{input:function(t){e.open=t}}},{directives:[{name:"model",value:e.open}]}]),[t(a.default,null,[])]),this.header(),t("v-content",null,[t("v-container",{attrs:{fluid:!0,"fill-height":!0}},[t("router-view",null,[])])]),t(i.default,null,[]),t(o.default,null,[])])},methods:{_openDrawer:function(){this.open=!this.open},header:function(){var t=this,e=this.$createElement;return e("v-toolbar",{attrs:{id:"header",color:"blue darken-3",dark:!0,app:!0,"clipped-left":!0,fixed:!0}},[e("v-toolbar-title",{style:this.$vuetify.breakpoint.smAndUp?"width: 300px; min-width: 250px":"min-width: 72px",class:"ml-0 pl-3"},[e("v-toolbar-side-icon",{on:{click:function(e){for(var r=arguments.length,n=Array(r>1?r-1:0),a=1;a<r;a++)n[a-1]=arguments[a];(function(){return t._openDrawer()}).apply(void 0,[e].concat(n))}}},[]),e("span",{class:"hidden-xs-only"},[this.$route.name?this.$route.name:this.$route.path])])])}}}},88:function(t,e){},89:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,a=r(32),i=(n=a)&&n.__esModule?n:{default:n},o=r(17);e.default={name:"Sidebar",props:["open"],computed:Object.assign({},(0,o.mapGetters)(["currentTrack"])),render:function(){var t=this,e=arguments[0];return e("v-list",{attrs:{"two-line":!0,subheader:!0}},[e("v-subheader",null,["Music"]),e("v-list-tile",(0,i.default)([{attrs:{avatar:!0}},{on:{click:function(e){for(var r=arguments.length,n=Array(r>1?r-1:0),a=1;a<r;a++)n[a-1]=arguments[a];(function(){return t.$router.push({name:"Now Playing"})}).apply(void 0,[e].concat(n))}}}]),[e("v-list-tile-action",null,[e("v-icon",null,["play_arrow"])]),this.currentTrack?e("v-list-tile-content",null,[e("v-list-tile-title",null,["Now Playing"]),e("v-list-tile-sub-title",null,[this.currentTrack.name," - ",this.currentTrack.artist.name])]):e("v-list-tile-content",{style:"opacity:0.5"},[e("v-list-tile-title",null,["Now Playing"]),e("v-list-tile-sub-title",null,["Nothing playing"])])]),e("v-list-tile",(0,i.default)([{attrs:{avatar:!0}},{on:{click:function(e){for(var r=arguments.length,n=Array(r>1?r-1:0),a=1;a<r;a++)n[a-1]=arguments[a];(function(){return t.$router.push({name:"Library"})}).apply(void 0,[e].concat(n))}}}]),[e("v-list-tile-action",null,[e("v-icon",null,["library_music"])]),e("v-list-tile-content",null,[e("v-list-tile-title",null,["Library"]),e("v-list-tile-sub-title",null,["View music library"])])]),e("v-subheader",null,["Settings"]),e("v-list-tile",(0,i.default)([{attrs:{avatar:!0}},{on:{click:function(e){for(var r=arguments.length,n=Array(r>1?r-1:0),a=1;a<r;a++)n[a-1]=arguments[a];(function(){return t.$router.push({name:"Sync"})}).apply(void 0,[e].concat(n))}}}]),[e("v-list-tile-action",null,[e("v-icon",null,["import_export"])]),e("v-list-tile-content",null,[e("v-list-tile-title",null,["Cloud sync"]),e("v-list-tile-sub-title",null,["Cloud library settings"])])]),e("v-list-tile",(0,i.default)([{attrs:{avatar:!0}},{on:{click:function(e){for(var r=arguments.length,n=Array(r>1?r-1:0),a=1;a<r;a++)n[a-1]=arguments[a];(function(){return t.$router.push({name:"Import"})}).apply(void 0,[e].concat(n))}}}]),[e("v-list-tile-action",null,[e("v-icon",null,["library_add"])]),e("v-list-tile-content",null,[e("v-list-tile-title",null,["Import iTunes"]),e("v-list-tile-sub-title",null,["Import local iTunes library"])])])])}}},90:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,a=r(32),i=(n=a)&&n.__esModule?n:{default:n},o=r(17);r(91),e.default={data:function(){return{drawerOpen:!1,timings:{progress:0,currentTime:"0:00",totalDuration:{raw:0,pretty:"0:00"}}}},computed:Object.assign({},(0,o.mapState)({audioObject:function(t){return t.player.audioObject},currentPlaybackState:function(t){return t.player.currentPlaybackState}}),(0,o.mapGetters)(["deviceId","currentTrack"]),{track:function(){return this.currentTrack||{artist:{},album:{}}},renderRightActionButton:function(){var t=this,e=this.$createElement;return"playing"===this.currentPlaybackState?e("v-icon",(0,i.default)([{attrs:{"x-large":!0,color:"white"},class:"button"},{on:{click:function(e){for(var r=arguments.length,n=Array(r>1?r-1:0),a=1;a<r;a++)n[a-1]=arguments[a];t.togglePlay().apply(void 0,[e].concat(n))}}}]),["pause_circle_outline"]):"paused"===this.currentPlaybackState?e("v-icon",(0,i.default)([{attrs:{"x-large":!0,color:"white"},class:"button"},{on:{click:function(e){for(var r=arguments.length,n=Array(r>1?r-1:0),a=1;a<r;a++)n[a-1]=arguments[a];t.togglePlay().apply(void 0,[e].concat(n))}}}]),["play_circle_outline"]):"loading"===this.currentPlaybackState?e("v-progress-circular",{attrs:{indeterminate:!0,color:"white"},class:"button"},[]):e("v-icon",(0,i.default)([{attrs:{"x-large":!0,color:"white"},class:"button"},{on:{click:function(e){for(var r=arguments.length,n=Array(r>1?r-1:0),a=1;a<r;a++)n[a-1]=arguments[a];t.togglePlay().apply(void 0,[e].concat(n))}}}]),["play_circle_outline"])}}),methods:Object.assign({},(0,o.mapActions)(["nextTrack","previousTrack"]),{_handlePlayingUI:function(){var t=parseInt(this.audioObject.currentTime);this.timings.progress=(t/this.timings.totalDuration.raw*100).toFixed(1),this.timings.currentTime=this.convertTimeHHMMSS(t)},_handleLoaded:function(){var t=parseInt(this.audioObject.duration);this.timings.totalDuration={raw:t,pretty:this.convertTimeHHMMSS(t)}},_jumpToTime:function(t){var e=t.pageX/t.screenX*100,r=this.audioObject.duration/100*e;this.audioObject.currentTime=r},togglePlay:function(){"playing"===this.currentPlaybackState?this.$store.dispatch("pauseTrack"):this.$store.dispatch("playTrack")},openDrawer:function(){this.drawerOpen=!this.drawerOpen},renderOpenDrawerActions:function(){var t=this,e=this.$createElement;return e("div",{class:"playerDrawer__openActions"},[e("v-icon",(0,i.default)([{attrs:{"x-large":!0,color:"white"},class:"button"},{on:{click:function(e){for(var r=arguments.length,n=Array(r>1?r-1:0),a=1;a<r;a++)n[a-1]=arguments[a];(function(){return t.previousTrack()}).apply(void 0,[e].concat(n))}}}]),["skip_previous"]),e("v-icon",(0,i.default)([{attrs:{"x-large":!0,color:"white"},class:"button"},{on:{click:function(e){for(var r=arguments.length,n=Array(r>1?r-1:0),a=1;a<r;a++)n[a-1]=arguments[a];(function(){return t.nextTrack()}).apply(void 0,[e].concat(n))}}}]),["skip_next"])])}}),render:function(t){var e=this;return t("v-bottom-nav",{attrs:{fixed:!0,height:"50px"},class:this.drawerOpen?"playerDrawer open":"playerDrawer",style:"background-color: hsl(258.5, 30%, 42.5%); bottom:110px;"},[!!this.drawerOpen&&this.renderOpenDrawerActions(),t("v-progress-linear",(0,i.default)([{class:"playerDrawer__progress",attrs:{value:e.timings.progress},on:{input:function(t){e.timings.progress=t}}},{directives:[{name:"model",value:e.timings.progress}]},{attrs:{height:"3"}},{on:{click:function(t){for(var r=arguments.length,n=Array(r>1?r-1:0),a=1;a<r;a++)n[a-1]=arguments[a];e._jumpToTime.apply(e,[t].concat(n))}}}]),[]),t("v-icon",(0,i.default)([{attrs:{"x-large":!0,color:"white"},class:"button"},{on:{click:function(t){for(var r=arguments.length,n=Array(r>1?r-1:0),a=1;a<r;a++)n[a-1]=arguments[a];(function(){return e.openDrawer()}).apply(void 0,[t].concat(n))}}}]),["keyboard_arrow_up"]),t("span",{class:"playerDrawer__details"},[t("span",{class:"playerDrawer__details-track"},[this.track.name]),t("span",{class:"playerDrawer__details-track"},[this.track.artist.name," - ",this.track.album.name])]),this.renderRightActionButton])}}},91:function(t,e){t.exports={playerDrawer:"playerDrawer",open:"open",playerDrawer__progress:"playerDrawer__progress",playerDrawer__details:"playerDrawer__details",playerDrawer__openActions:"playerDrawer__openActions",button:"button"}},92:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),r(93),e.default={name:"FooterTabs",data:function(){return{visibility:!0}},render:function(t){return t("v-bottom-nav",{attrs:{app:!0,shift:!0,light:!0,height:"50px",value:this.visibility},class:"footer"},[t("v-btn",{attrs:{flat:!0,color:"teal"}},[t("span",null,["Discover"]),t("v-icon",null,["add_circle"])]),t("v-btn",{attrs:{flat:!0,color:"teal",to:"/"}},[t("span",null,["Library"]),t("v-icon",null,["library_music"])]),t("v-btn",{attrs:{flat:!0,color:"teal",to:"sync"}},[t("span",null,["Settings"]),t("v-icon",null,["settings"])])])}}},93:function(t,e){t.exports={"bottom-nav":"bottom-nav",footer:"footer"}},94:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=u(r(23)),a=u(r(95)),i=u(r(96)),o=u(r(99));function u(t){return t&&t.__esModule?t:{default:t}}n.default.use(a.default),e.default=new a.default({mode:"hash",routes:[{path:"/",component:i.default,name:"Library"},{path:"/import",component:o.default,name:"Import"},{path:"/sync",component:o.default,name:"Sync"}]})},96:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(r(32)),a=o(r(60)),i=r(17);function o(t){return t&&t.__esModule?t:{default:t}}function u(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,r){return function n(a,i){try{var o=e[a](i),u=o.value}catch(t){return void r(t)}if(!o.done)return Promise.resolve(u).then(function(t){n("next",t)},function(t){n("throw",t)});t(u)}("next")})}}e.default={data:function(){return{view:"albums"}},computed:Object.assign({},(0,i.mapGetters)(["getTracksByAlbum"]),{library:function(){return this.$store.state.library[this.view]}}),methods:Object.assign({},(0,i.mapActions)(["playTrack","addToQueue"]),{getCollectionOfTracks:function(){var t=u(a.default.mark(function t(e,r){return a.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.getTracksByAlbum(r).sort(function(t,e){return t.trackNumber>e.trackNumber}).map(function(t){return t.uuid});case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}},t,this)}));return function(e,r){return t.apply(this,arguments)}}(),playCollection:function(){var t=u(a.default.mark(function t(e,r){var n;return a.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.getCollectionOfTracks(e,r);case 2:n=t.sent,this.playTrack(n);case 4:case"end":return t.stop()}},t,this)}));return function(e,r){return t.apply(this,arguments)}}(),queueCollection:function(){var t=u(a.default.mark(function t(e,r){var n;return a.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.getCollectionOfTracks(e,r);case 2:n=t.sent,this.addToQueue(n);case 4:case"end":return t.stop()}},t,this)}));return function(e,r){return t.apply(this,arguments)}}()}),render:function(t){var e=this;return t("v-layout",{attrs:{row:!0,wrap:!0}},[this.library.map(function(r){return t("v-flex",{attrs:{xs4:!0,sm3:!0}},[t("v-card",{attrs:{light:!0}},[t("v-card-media",{on:{click:function(t){for(var n=arguments.length,a=Array(n>1?n-1:0),i=1;i<n;i++)a[i-1]=arguments[i];(function(){return e.playCollection("album",r.name)}).apply(void 0,[t].concat(a))}}},[]),t("v-card-title",(0,n.default)([{attrs:{"primary-title":!0}},{on:{click:function(t){for(var n=arguments.length,a=Array(n>1?n-1:0),i=1;i<n;i++)a[i-1]=arguments[i];(function(){return e.playCollection("album",r.name)}).apply(void 0,[t].concat(a))}}}]),[t("div",null,[t("div",{class:"body-2"},[r.name]),t("div",{class:"caption grey--text"},[r.artist.name])])]),t("v-card-actions",null,[t("v-btn",(0,n.default)([{attrs:{icon:!0}},{on:{click:function(t){for(var n=arguments.length,a=Array(n>1?n-1:0),i=1;i<n;i++)a[i-1]=arguments[i];(function(){return e.queueCollection("album",r.name)}).apply(void 0,[t].concat(a))}}}]),[t("v-icon",null,["playlist_add"])])])])])})])}}},99:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={render:function(){return(0,arguments[0])("p",null,["Dummy"])}}}},[82]);
//# sourceMappingURL=client.6841b136.js.map