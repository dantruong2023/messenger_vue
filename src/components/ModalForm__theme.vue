<template>
    <div class="contentForm__content">
        <div v-for="item in selfData" 
        :key="item" class="item__theme" 
        :data-color="item" 
        :style="{ '--color' : item}"
        @click="event => changeTheme(event.target.closest('.item__theme').dataset.color)"></div>
        <!-- <div class="item" data-color="#0084ff" style="--color : #0084ff"></div> -->
    </div>
</template>
<script>
    import store from '../main.js'
    import tools from '../Model/function.js'

    export default{
        name : 'ModalForm_Theme',
        data(){
            return {
                selfData : null
            }
        },
        props: {
            newValue : Object
        },
        created : function(){
            this.selfData = store.state.currentModalForm.data
        },
        methods : {
            changeTheme : function(theme){
                tools.setChatColor(theme)
                let value = {
                    type : 'theme',
                    theme
                }
                this.$emit('update:newValue',value)
            }
        }
    }
</script>
<style scoped>
.contentForm__content .item__theme{
    box-sizing: border-box;
    --num-theme : 9;
    display: inline-block !important; 
    width : calc((100% - 48px) / var(--num-theme)) !important;
    height : 0;
    border-radius: 50%;
    padding : 12px 0 calc((100%-48px)/ var(--num-theme));
    background-color: var(--color);
    opacity: 1;
    user-select: none;
}
.contentForm__content .item__theme:hover{
    opacity: 0.6;
    cursor: pointer;
}
</style>