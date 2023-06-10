import Vue from 'vue'
import App from './App.vue'
import VueX from 'vuex'
import VueRouter  from 'vue-router' 
import {User, Room,Message} from './Model/Models.js'
import routes from './Model/routes'

Vue.config.productionTip = false

Vue.use(VueX)
Vue.use(VueRouter)

//Mockup data
let themes = ['#0084ff','#63a8ff','#ff9fb3',
            '#a07bae','#f7d700','#ed9f9a',
            '#7388ed','#01b3aa','#5d718d',
            'red','green', 'pink', 'orange',
             'black', 'brown', 'lightblue','#6c757d'
            ,'#ffc107','#343a40','#0dcaf0']

let rooms = []
rooms.push(new Room("Trịnh Phương Thảo","room2",["user01","user03"],"private","test1.jpg","Bạn : cute z tr"))
rooms.push(new Room("Bùi Anh Công","room1",["user01","user02"],"private","test3.jpg","Công : ủa alo"))
rooms.push(new Room("Dương Văn Tuân","room3",["user01","user04"],"private","test7.jpg",""))
rooms.push(new Room("Hội ae cây chuối","room4",["user01","user02","user03","user04"],"group","test8.jpg",""))
rooms[1].setTheme("#e5155a")

let users = []
users.push(new User("user01","admin","1","mail@mail.com","Nguyễn Ngọc Đan Trường","avatar.jpg",rooms))
users.push(new User("user02","admin2","1","mail@mail.com","Bùi Anh Công","test3.jpg",rooms))
users.push(new User("user03","admin3","1","mail@mail.com","Trịnh Phương Thảo","test1.jpg",rooms))
users.push(new User("user04","admin4","1","mail@mail.com","Dương Văn Tuân","test7.jpg",rooms))

//let listMsg = new MessagesList()
rooms[0].historyMessage.push(new Message("Chào bạn","room1","1:13","user01"))
rooms[0].historyMessage.push(new Message("😍","room1","1:14","user03",'icon'))
rooms[0].historyMessage.push(new Message("Hello bạn","room1","1:15","user01"))
rooms[0].historyMessage.push(new Message("Rất vui được làm quen với bạn !","room1","1:15","user03"))
rooms[0].historyMessage.push(new Message("Mình cũng vậy!","room1","1:15","user01"))

rooms[1].historyMessage.push(new Message("Hi bạn","room2","1:15","user02"))
rooms[1].historyMessage.push(new Message("😮","room2","1:14","user02",'icon'))
rooms[1].historyMessage.push(new Message("Hi !","room2","1:15","user01"))
rooms[1].historyMessage.push(new Message("😃","room2","1:14","user01",'icon'))

rooms[2].historyMessage.push(new Message("Cho mình làm quen nhé !","room3","1:15","user04"))
rooms[2].historyMessage.push(new Message("ualoaualoaualoaualoaualoaualoaualoaualoaualoaualoaualoaualoaualoaualoaualoaualoaualoaualoaualoaualoaualoaualoaualoaualoaualoaualoaualoaualoaualoaualoaualoaualoaualoaualoaualoaualoaualoa","room3","1:15","user01"))

rooms[3].historyMessage.push(new Message("@all Hi mng","room4","1:15","user01"))
rooms[3].historyMessage.push(new Message("Hi","room4","1:15","user02"))
rooms[3].historyMessage.push(new Message("Nhóm gì the?","room4","1:15","user03"))
rooms[3].historyMessage.push(new Message("Hello","room4","1:15","user04"))
rooms[3].historyMessage.push(new Message("Chào mng","room4","1:15","user04"))

const store = new VueX.Store({
  state : {
      isShowChatOption : false,
      isShowModalForm : false,
      currentModalForm : {
        title : '',
        type : '',
        data : null
      },
      currentRoom : null,
      currentUser : {
        uid : "user01",
        token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        linkProfile : 'https://www.facebook.com/berlin.03',
        photoURL : 'avatar.jpg'
      },
      themes : themes,
      rooms : rooms,
      users : users
  },
  mutations: {
      changeCurrentRoom : function(state,uid){
        state.currentRoom = state.rooms.find(m => m.roomID == uid)
      },
      setLastMessage : function(state,  message){
        if(state.currentRoom != null){
          state.currentRoom.lastMessage = message
        }
      },
      updateShowOption : function(state){
        state.isShowChatOption = !state.isShowChatOption
      },
      changeData : function(state,{nameData,value}){
        state[nameData] = value
      }
  }
})

export default store 

new Vue({
  render: h => h(App),
  routes
}).$mount('#app')