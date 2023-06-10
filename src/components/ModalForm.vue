<template>
     <div id="modalForm" v-show="isShowModalForm" @click=" hideForm()">
      <div class="contentForm" @click="event=>event.stopPropagation()">
            <!-- Form change theme -->
            <div class="contentForm__header">
                <p> {{  currentModalForm.title }}</p>
                <i class="bi bi-x" @click=" hideForm()"></i>
            </div>
            <!-- <contentForm class=""></contentForm> -->
            <ModalForm__theme :new-value.sync ="currentValue" v-if="currentModalForm.type == 'theme'"></ModalForm__theme>
            <ModalForm__nicknames v-if="currentModalForm.type == 'nickname'"></ModalForm__nicknames>
            <div class="contentForm__footer">
                <button class="cancel smooth" @click="hideForm()">Cancel</button>
                <button class="save smooth" @click="applyChange()">Save</button>
            </div>
        </div>
    </div>
</template>
<script>
    import store from '../main.js'
    import ModalForm__theme from './ModalForm__theme.vue'
    import ModalForm__nicknames from './ModalForm__nicknames.vue'
    import tools from '../Model/function.js'

    export default{
        name : 'ModalForm',
        components : {
            ModalForm__theme,
            ModalForm__nicknames
        },
        data(){
            return {
                currentModalForm : null,
                currentValue : null,
            }
        },
        created : function(){
            this.currentModalForm = store.state.currentModalForm
        },
        computed : {
            isShowModalForm : function(){
                return store.state.isShowModalForm
            }
        },
        methods : {
            hideForm : function(){
                tools.setChatColor(store.state.currentRoom.theme)
                store.commit('changeData',{nameData : 'isShowModalForm',value : false})
            },
            applyChange : function(){
                if(this.currentValue != null){
                    switch(this.currentValue.type){
                        case "theme" : {
                            store.state.currentRoom.setTheme(this.currentValue.theme)
                            break
                        }
                    }
                }
                this.hideForm()
            }
        }
    }
</script>
<style scoped>
.contentForm{
    background-color: #fff;
    min-width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin : 3% 20% 0;
    border-radius: 20px;
}

</style>