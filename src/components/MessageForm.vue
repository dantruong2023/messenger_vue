<template>
    <div class="messages" id="message">
        <div class="messages__header">
                <div class="messages-heading">
                    <b><span>Chat</span></b>
                    <ul>
                        <li>
                            <i class="bi bi-camera-reels"></i>
                        </li>
                        <li>
                            <i class="bi bi-pencil-square"></i>
                        </li>
                    </ul>
                </div>
    
                <div class="messages-search">
                    <input class="search-ip"  type="text" placeholder="Tìm bạn bè">
                </div>
            </div>

            <div class="messages-list scrollable">
                <div :class = "['messages-item',index == currentSelected ? 'selected' : '']" 
                v-for="(room,index) in selfRoom" 
                    :key="`${room.roomID}-${room.lastMessage}`"
                    :data-id="room.roomID" 
                    @click="event => { loadMessagesHistory(event.target.closest('.messages-item'));currentSelected = index}"
                    >
                    <div class="messages-item__avatar">
                        <img :src="`/assets/img/${room.photoURL}`" alt="">
                    </div>
                    <div class="messages-item__content">
                        <p>{{ getRoomName(room) }}</p>
                        <div>
                            <span>{{lastMessage(room.lastMessage)}}</span>
                            <span> ·  46p</span>
                        </div>
                    </div>
                </div>
            </div>
      </div>
</template>
<script>
    import store from '../main.js'
    import tools from '@/Model/function'

    export default{
        name : 'MessageForm',
        data(){
            return {
                selfStore : null,
                selfRoom : null,
                currentSelected : 0,
                allMembers : null
            }
        },
        created : function(){
            this.selfStore = store
            this.selfRoom = this.selfStore.state.rooms
            this.allMembers = tools.getAllMembersRoom(store.state.currentRoom)
        },
        methods : {
            loadMessagesHistory : function(target){
                if(document.querySelector('.messages-item.selected') != undefined){
                    document.querySelector('.messages-item.selected').classList.remove('selected')
                }
                target.classList.add('selected')
                store.commit('changeCurrentRoom',target.dataset.id)
                console.log("Change room : ",store.state.currentRoom.roomID) 
            },
            lastMessage : function(message){
                if(store.state.isShowChatOption){
                    if(message.length > 20){
                        message = message.substring(0,17) + "..."
                    }
                }
                else{
                    if(message.length > 30){
                        message = message.substring(0,27) + "..."
                    }
                }
                return message
            },
            getRoomName : function(room){
                let members = tools.getAllMembersRoom(room)
                if(room.type == 'group')
                    return room.roomName 
                else{
                    return members.find(m => m.uid != store.state.currentUser.uid).nicknames[room.roomID]
                }
            }
        }
    }
</script>