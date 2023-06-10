<template>
  <div id="content">
      <MenuLeft></MenuLeft>
      
      <MessageForm :key="selfStore.state.rooms.length"></MessageForm>

      <div class="chat">
        <ChatForm  :key="selfStore.state.currentRoom.roomID"></ChatForm>
        <div class="chatfooter">
          <div class="chatfooter__icons">
              <i class="bi bi-card-image smooth"></i>
              <i class="bi bi-sticky-fill smooth"></i>
          </div>
          <div class="input">
              <input 
              class="text-user" type="text" placeholder="Aa" 
              v-model="textUser" 
              @keypress="event => listenInput(event)"
              @focus="showListEmoji = false"
              @input="checkEmoji()">
          </div>
          <keep-alive>
              <div class="sendBTN"> 
                  <i class="bi bi-emoji-smile-fill smooth" style="position : relative;" @click="event => showEmoji(event)">
                      <picker 
                      @select="emoji => selectEmoji(emoji)" 
                      v-show="showListEmoji" 
                      title="Pick your emoji…" 
                      emoji="point_up" 
                      :showPreview="false"
                      style="font-style:normal"
                      :native="true"
                      :style="{ position: 'absolute', bottom: '20px', right: '20px'}"/>
                  </i>
                  <i class="bi bi-send-fill smooth" v-show="!showIcons" @click="sendMessage()"></i>
                  <p class="smooth" v-show="showIcons"
                  style="padding:10px;font-size:21px;margin:0;cursor: pointer;" 
                  @click="sendIcon()"> {{ selfStore.state.currentRoom.emoji }}</p>
              </div>
          </keep-alive>
        </div>
      </div>
      <ChatOption :key="selfStore.state.currentRoom.roomID + 'chatOption'" v-if="selfStore.state.isShowChatOption"></ChatOption>
      <ModalForm v-if="selfStore.state.isShowModalForm" :key="selfStore.state.currentModalForm.title"></ModalForm>
    </div>
</template>

<script>
import store from './main.js'
import tools from './Model/function'
import MessageForm from './components/MessageForm.vue'
import ChatForm from './components/ChatForm.vue'
import MenuLeft from './components/MenuLeft.vue'
import ChatOption from './components/ChatOption.vue'
import ModalForm from './components/ModalForm.vue'
import {Message} from './Model/Models.js'
import {Picker} from 'emoji-mart-vue'

export default {
  name: 'App',
  components: {
    MessageForm,
    ChatForm,
    MenuLeft,
    ChatOption,
    ModalForm,
    Picker
  },
  data(){
    return {
        selfStore : null,
        showIcons : true,
        showListEmoji : false,
        textUser : '',
        selfMessages : null,
        currentRoom : null
    }
  },
  created : function(){
    this.selfStore = store
    if(this.selfStore.state.currentRoom == null){
      store.commit('changeCurrentRoom',this.selfStore.state.rooms[0].roomID)
    }
  },
  watch : {
    textUser : function(){
        if(this.textUser == ""){
            this.showIcons = true
        }
        else{
            this.showIcons = false
        }
    }
  },
  methods : {
    scrolltoEnd : function(){
        let Wrapper = document.querySelector('.wrapcontent')
        let formChat = document.querySelector('.chatcontent')
        Wrapper.scrollTop = formChat.clientHeight
    },
    checkEmoji : function(){
        for(let key in tools.icons){
            let breakOut = false
            for(let key_child of key.split(',')){
                if(this.textUser.includes(key_child)){
                    this.textUser = this.textUser.replace(key_child,store.state.icons[key])
                    breakOut = true
                    break
                }
            }
            if(breakOut) break
        }
    },
    listenInput : function(event){
        if(event.keyCode == 13){
            event.preventDefault()
            this.sendMessage()
        }
    },
    sendMessage : function(){
        if(this.textUser !== ""){
            let isIcon = true
            for(let character of this.textUser){
              if(!tools.getAllNativeIcons().includes(character)){
                  isIcon = false
                  break
              }
            }
            let message = new Message(this.textUser,this.selfStore.state.currentRoom.roomID,new Date().toLocaleString(),store.state.currentUser.uid)
            if(isIcon){
                message.type = 'icon'
            }
            this.selfStore.state.currentRoom.historyMessage.push(message)
            this.selfStore.state.currentRoom.lastMessage = "Bạn : " + this.textUser
            this.textUser = ""
        }
        this.showListEmoji = false
        setTimeout(this.scrolltoEnd,200)
    },
    sendIcon : function(){
        let message = new Message(this.selfStore.state.currentRoom.emoji,this.selfStore.state.currentRoom.roomID,new Date().toLocaleString(),store.state.currentUser.uid,'icon')
        this.selfStore.state.currentRoom.historyMessage.push(message)
        this.selfStore.state.currentRoom.lastMessage = `Bạn : ${this.selfStore.state.currentRoom.emoji}` 
        setTimeout(this.scrolltoEnd,200)
    },
    selectEmoji : function(emoji){
        this.textUser += emoji.native
        if(emoji.emoticons.length > 0){
            store.state.icons[String(emoji.emoticons)] = emoji.native
        }
    },
    showEmoji: function(event){
        if(event.target.classList.contains("bi-emoji-smile-fill")){
            this.showListEmoji = !this.showListEmoji
        }
    },
    selector : function(selector_param){
      return document.querySelector(selector_param)
    },
    selectItemMenuLeft : function(target){
      if(this.selector('.itemmenu li.selected')!=undefined)
        this.selector('.itemmenu li.selected').classList.toggle('selected')
      target.classList.add('selected')
    } 
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
