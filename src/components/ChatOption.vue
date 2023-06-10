<template>
    <div class="chat-op scrollable">
            <div class="info">
                <img :src="`/assets/img/${selfCurrentRoom.photoURL}`" alt="">
                <p>{{  selfCurrentRoom.roomName }}</p>
                <span>{{ selfCurrentRoom.lastOnline }}</span>
            </div>
            <div class="function" :class="['function',selfCurrentRoom.type == 'private' ? '' : 'center-item']">
                <div class="btn smooth profile" v-if="selfCurrentRoom.type == 'private'" @click="joinLink(selfCurrentRoom.linkProfile)">
                    <div class="btn__icon">
                        <i class="bi bi-person-circle"></i>
                    </div>
                    <span>Profile</span>
                </div>
                <div class="btn smooth">
                    <div class="btn__icon">
                        <i class="bi bi-bell-fill"></i>
                    </div>
                    <span>Mute</span>
                </div>
                <div class="btn smooth">
                    <div class="btn__icon">
                        <i class="bi bi-search"></i>
                    </div>
                    <span>Search</span>
                </div>
            </div>
            <div class="customize-chat smooth" @click="showCustomizeChat = !showCustomizeChat">
                Customize chat <i :class="[showCustomizeChat == true ? 'bi bi-arrow-down': 'bi bi-arrow-right']"></i>
            </div>
            <keep-alive>
                <ul class="customize-chat__menu" v-show = "showCustomizeChat">
                    <li class="customize-chat smooth" @click="showModal({
                        title : 'Themes',
                        type : 'theme',
                        data : selfStore.state.themes
                    })">
                        <i class="bi bi-record-circle-fill"></i> Change theme
                    </li>
                    <li class="customize-chat smooth" style="position:relative" @click="event => showChangeEmoji__click(event)">
                        <!-- <i class="bi bi-hand-thumbs-up-fill"></i>  -->
                            <span>{{ selfCurrentRoom.emoji }}</span>    Change Emoji
                            <picker 
                            v-show="showChangeEmoji" 
                            :emojiSize=24   
                            :native="true"
                            title="Pick one!" 
                            emoji="point_up" 
                            color="#fff"
                            :showPreview="false"
                            :showSearch="false"
                            :showCategories="false"
                            @select = "emoji => pickNewEmoji(emoji)"
                            style="z-index : 2; max-width: 100%; max-height: 350px;"
                            :style="{ position: 'absolute', bottom: '100%', right: '0' }"/>
                    </li>
                    <li class="customize-chat smooth " :key="forceKey" @click="showModal({
                        title : 'Edit nicknames',
                        type : 'nickname',
                        data : currentMember
                    })">
                        <i class="bi bi-type text-black"></i> Edit nicknames
                    </li>
                    <li class="customize-chat smooth ">
                        <i class="bi bi-search text-black"></i> Search in conversation
                    </li>
                </ul>
            </keep-alive>
            <div class="chat-members smooth" @click="showChatMembers = !showChatMembers" v-if="selfCurrentRoom.type == 'group'">
                Chat members<i :class="[showChatMembers == true ? 'bi bi-arrow-down': 'bi bi-arrow-right']"></i>
              </div>
            <ul class="members__menu" v-show="showChatMembers && selfCurrentRoom.type == 'group'">
                <li class="members smooth" v-for="member in currentMember()" :key="member.uid">
                    <div style="display:flex;align-items:center;">
                        <img :src="`/assets/img/${member.photoURL}`" alt=""> 
                        <div style="margin-left:5px;">
                            {{ member.displayName }}
                            <p class="text-black" style="font-weight: 500;margin : 0;font-size:12px;opacity: 0.6;">
                                Added by admin
                            </p>
                        </div>
                    </div>
                    <i class="optionUser bi bi-three-dots text-black smooth" style="padding : 10px" @click="showMemberOption__menu(member.uid)">
                        <div class="menuShow" :key="`${forceKey}${Math.floor(Math.random()*1000)}`" v-show="showMemberOptions[member.uid] == true">
                            <div class="menuShow__option smooth" @click="joinMessage(member.uid)">
                                <i class="bi bi-messenger text-black"></i>
                                <span>Message</span>
                            </div>
                            <div class="menuShow__option smooth" @click="joinLink(member.linkProfile)">
                                <i class="bi bi-person-circle text-black"></i>
                                <span>View Profile</span>
                            </div>
                            <div class="menuShow__option smooth" @click="block(member.uid)">
                                <i class="bi bi-dash-circle-fill text-black"></i>
                                <span>Block</span>
                            </div>
                        </div>
                    </i>
                </li>
            </ul>

            <div class="medias smooth" @click="showMediaFiles = !showMediaFiles">
                Media, files and link <i :class="[showMediaFiles == true ? 'bi bi-arrow-down': 'bi bi-arrow-right']"></i>
            </div>
            <ul class="medias__menu" v-show="showMediaFiles">
                <li class="medias smooth">
                    <i class="bi bi-images text-black"></i> Media
                </li>
                <li class="medias smooth">
                    <i class="bi bi-file-earmark-text-fill text-black"></i> Files
                </li>
                <li class="medias smooth ">
                    <i class="bi bi-link-45deg text-black"></i> Links
                </li>
            </ul>
            <div class="privacy smooth" @click="showPrivacy = !showPrivacy">
                Privacy & support <i :class="[showPrivacy == true ? 'bi bi-arrow-down': 'bi bi-arrow-right']"></i>
            </div>
            <ul class="privacy__menu" v-show="showPrivacy">
                <li class="privacy smooth">
                    <i class="bi bi-bell-fill text-black"></i> Mute notifications
                </li>
                <li class="privacy smooth">
                    <i class="bi bi-envelope-dash-fill text-black"></i> Ignore messages
                </li>
                <li class="privacy smooth ">
                    <i class="bi bi-dash-circle-fill text-black"></i> Block
                </li>
                <li class="privacy smooth ">
                    <i class="bi bi-exclamation-triangle-fill text-black"></i> Report
                </li>
            </ul>
        </div>
</template>
<script>
import store from '../main.js'
import  { Picker } from 'emoji-mart-vue'
import tools from '@/Model/function'

    export default {
        name : 'ChatOption',
        components : {
            Picker
        },
        data(){
            return {
                selfStore : null,
                selfCurrentRoom : null,
                showCustomizeChat : true,
                showChatMembers : false,
                showMediaFiles : false,
                showPrivacy : false,
                showChangeEmoji : false,
                showMemberOptions : {

                },
                forceKey : '123'
            }
        },
        created : function(){
            this.selfStore = store
            this.selfCurrentRoom = store.state.currentRoom
        },
        methods : {
            currentMember : function(){
                return tools.getAllMembersRoom(store.state.currentRoom)
            },
            joinLink : function(link){
                window.open(link,'_blank')
            },
            showModal : function({title, type, data}){
                for(let member of tools.getAllMembersRoom(store.state.currentRoom)){
                    console.log(member.displayName)
                }
                store.commit('changeData',{nameData : 'isShowModalForm', value : true})
                store.commit('changeData',{nameData : 'currentModalForm', value : {title, type, data}})
            },
            showMemberOption__menu : function(uid){
                this.showMemberOptions[uid] = !this.showMemberOptions[uid]
                this.forceKey = Math.floor(Math.random()* 1000) +'key'
            },
            showChangeEmoji__click: function(event){
                if(event.target.classList.contains("customize-chat")){
                    this.showChangeEmoji = !this.showChangeEmoji
                }
            },
            joinMessage : function(uid){
                console.log("Message to : ",uid)
            },
            block : function(uid){
                console.log("Block user : ",uid)
            },
            pickNewEmoji : function(emoji){
                store.state.currentRoom.emoji = emoji.native
                this.showChangeEmoji = false
            }
        }
    }
</script>
<style scoped>
.center-item{
    justify-content: center !important;
}
</style>