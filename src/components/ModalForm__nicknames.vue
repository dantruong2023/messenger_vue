<template>
    <div class="wrapcontent scrollable">
        <div class="contentForm__content" :key="selfStore.state.currentRoom.roomID">
            <div class="nickname smooth" v-for="(member,index) in listMember" :key="member.uid">
                <img class="nickname__avatar" :src="`/assets/img/${member.photoURL}`">
                <template v-if="!isEditNickName || currentIndex != index">
                    <div class="nickname__title">
                        <p>{{ member.displayName }}</p>
                        <span>{{ getNickname(member) }}</span>
                    </div>
                </template>
                <template v-if="isEditNickName && currentIndex == index">
                    <input class="nickname__input" :placeholder="getNickname(member,true)">
                </template>
                <i class="nickname__edit bi bi-pencil-fill" v-if="!isEditNickName" @click="isEditNickName = true; currentIndex = index"></i>
                <i class="nickname__edit bi bi-check2" v-if="isEditNickName && currentIndex == index" @click="  submitNickName(member)"></i>

            </div>
        </div>
    </div>
</template>
<script>
    import store from '../main.js';
    import tools from '../Model/function.js'
    //import { Message } from '../Model/Models';
    export default{
        name : 'ModalForm_nicknames',
        data(){
            return {
                isEditNickName : false,
                currentIndex : -1,
                listMember : null,
                selfStore : null
            }
        },
        created :function(){
            this.listMember = tools.getAllMembersRoom(store.state.currentRoom)
            this.selfStore = store
            console.log("Created editnicknames")
        },
        methods:{
            getNickname : function(memberObject,placeholder = false){
                let defaultValue = "Set nickname"
                if(placeholder) defaultValue = memberObject.displayName
                return memberObject.displayName == memberObject.nicknames[this.currentRoom.roomID] ? defaultValue : memberObject.nicknames[this.currentRoom.roomID]
            },
            submitNickName : function(member){
                let new_nickname = document.querySelector('.nickname__input').value
                this.isEditNickName = false
                member.nicknames[store.state.currentRoom.roomID] = new_nickname
                console.log(store.state.users)
                // this.currentRoom.historyMessage.push(new 
                //     Message(`You set the nickname for Huỳnh Minh Hiếu to Người tà răm.`))
            }
        },
        computed : {
            isPrivate : function(){
                return store.state.currentRoom.type == 'private'
            },
            currentRoom : function(){
                return store.state.currentRoom
            }
        }
    }
</script>
<style scoped>
.wrapcontent{
    max-height: 40%;
    overflow-y: scroll;
    width: 100%;
}
.contentForm__content{
    margin : auto;
    min-height: 0;
}
img.nickname__avatar{
    max-width: 50px;
    max-height: 50px;
    width: 50px;
    border-radius: 50%;
}
.nickname__title{
    flex : 1;
    padding : 0 24px;
}
.nickname__title p{
    margin : 0;
    padding : 0;
}
.nickname__title span{
    color : #333;
    opacity: 0.6;
}

.nickname__input{
    flex : 1;
    margin : 0 24px;
    padding : 8px;
    border-radius: 8px;
}
.nickname__input:focus{
    outline: blue;
    border-color: blue;
}
</style>