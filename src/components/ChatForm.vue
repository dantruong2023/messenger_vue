<template>
    <div class="chat">
            <div class="chatheader">
                <div class="chatheader-title" :key="currentRoom.roomID">
                    <div class="chatheader-avt">
                        <img :src="`/assets/img/${currentRoom.photoURL}`" alt="">
                    </div>
                    <div class="chatheader-name">
                        <span>{{ getRoomName() }}</span><br>
                        <span>{{  currentRoom.lastOnline }}</span>
                    </div>
                </div>
                
                <div class="chatheader-item">
                    <ul class="chatheader-menuitem">
                        <li><a href=""><i class="bi bi-phone-fill"></i></a></li>
                        <li><a href=""><i class="bi bi-camera-fill"></i></a></li>
                        <li  @click="updateChatOption()">
                            <i class="bi bi-list"></i>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="wrapcontent scrollable">
                <div class="chatcontent">
                    <template v-for="message in currentRoom.historyMessage" >
                        <div style="position: relative;" class="receive contentChat"  @mouseenter="e => showInfoUser(e)" @mouseleave="e => hideInfoUser(e)" v-if="message.senderID != currentUID" :key="`${message.chatContent}${getRandom(10000)}`">
                            <template v-if="message.type == 'message'">
                                <img :src="`/assets/img/${getImageUrl(message.senderID)}`" alt="">
                                <p>
                                    {{ message.chatContent }}
                                </p>
                            </template>
                            <template v-if="message.type == 'icon'">
                                <img :src="`/assets/img/${getImageUrl(message.senderID)}`" alt="">
                                <span style="font-size:36px;">
                                    {{ message.chatContent }}
                                </span>
                            </template>
                            <span class="info" style="opacity : 1;display:none;position: absolute;left: 0;top: 50%;transform:translateY(-50%);background-color: #333;padding: 2px 16px;z-index: 2;border-radius: 20px;color: #fff;">
                                        {{ getMemberSend(message.senderID) }}
                            </span>
                        </div>
                        <div class="send" v-else :key="`${message.chatContent}${getRandom()}`">
                            <template v-if="message.type == 'message'">
                                <p>{{ message.chatContent }}</p>
                                <!-- <i class="bi bi-check-circle"></i> -->
                            </template>

                            <template v-if="message.type == 'icon'">
                                <span style="font-size:36px;">
                                    {{ message.chatContent }}
                                </span>
                            </template>

                            <i class="bi bi-check-circle-fill" v-if="message.seen == false"></i>
                            <img class="seen" :src="`/assets/img/${photoOpponent}`" alt="" v-else>
                        </div>
                    </template>
                    <!-- <div class="notify">
                        <span>9:55 PM</span>
                    </div> -->
                    
                </div>
            </div>
        </div>
</template>

<script>
    import store from '../main.js'
    import tools from  '../Model/function.js'

    export default{
        name : 'ChatForm',
        data(){
            return {
                photoOpponent : null,
                currentUID : null,
                currentRoom : null,
                selfMessages : null,
                allMembers : []
            }
        },
        created : function(){
            let self = this
            this.currentUID = store.state.currentUser.uid
            this.currentRoom = store.state.currentRoom
            this.currentRoom.members.forEach((idMember)=>{
                self.allMembers.push(store.state.users.find(m => m.uid == idMember))
            })
            this.photoOpponent = ""
            //this.photoOpponent = this.allMembers.length == 2 ? this.allMembers.find(m => m.uid != this.currentUID).photoURL : "user.png"
            tools.setChatColor(this.currentRoom.theme)
            setTimeout(this.scrolltoEnd,100)
        },
        methods : {
            scrolltoEnd : function(){
                let Wrapper = document.querySelector('.wrapcontent')
                let formChat = document.querySelector('.chatcontent')
                Wrapper.scrollTop = formChat.clientHeight
            },
            updateChatOption : function(){
                store.commit('updateShowOption')
            },
            getRandom :function(range = 10000){
                return Math.floor(Math.random() * range) 
            },
            getImageUrl : function(senderID){
                return store.state.users.find(m => m.uid == senderID).photoURL
            },
            getRoomName : function(){
                if(this.currentRoom.type == 'group')
                    return this.currentRoom.roomName 
                else{
                    return this.allMembers.find(m => m.uid != this.currentUID).nicknames[this.currentRoom.roomID]
                }
            },
            getMemberSend : function(uid){
                let nicknames = this.allMembers.find(m => m.uid == uid).nicknames[this.currentRoom.roomID]
                return nicknames.split(" ")[nicknames.split(" ").length - 1]
            },
            showInfoUser : function(e){
                if(e.target.classList.contains("contentChat")){
                    e.target.querySelector("span.info").style.display = 'block'
                }
            },
            hideInfoUser : function(e){
                if(e.target.classList.contains("contentChat")){
                    e.target.querySelector("span.info").style.display = 'none'
                }
            }
        }
    }
</script>