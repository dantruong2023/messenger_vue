<template>
    <div class="item menu-left">
        <ul class="itemmenu">
                <li :class="[currentSelect == 0 ? 'selected' : '']" @click="currentSelect = 0">
                  <i class="bi bi-chat-fill text-black"></i>
                </li>
                <li :class="[currentSelect == 1 ? 'selected' : '']" @click="currentSelect = 1">
                  <i class="bi bi-people-fill text-black"></i>
                </li>
                <li :class="[currentSelect == 2 ? 'selected' : '']" @click="currentSelect = 2">
                  <i class="bi bi-cart-fill text-black"></i>
                </li>
                <li :class="[currentSelect == 3 ? 'selected' : '']" @click="currentSelect = 3">
                  <i class="bi bi-chat-dots-fill text-black"></i>
                </li>
                <li :class="[currentSelect == 4 ? 'selected' : '']" @click="currentSelect = 4">
                  <i class="bi bi-archive-fill text-black"></i>
                </li> 
                <li :class="[currentSelect == 5 ? 'selected' : '']" @click="currentSelect = 5">
                  <i class="bi bi-kanban-fill"></i>
                </li> 
            </ul>
            <a :href="linkProfile">
                <img :src="`/assets/img/${linkImageProfile}`" alt="">
            </a>
      </div>
</template>
<script>
    import store from '../main.js'
    export default{
        name : 'MenuLeft',
        data(){
            return {
                currentSelect : 0
            }
        },
        computed : {
            linkImageProfile : function(){
                return store.state.currentUser.photoURL
            },
            linkProfile : function(){
                return store.state.currentUser.linkProfile
            }
        },
        watch : {

        }
    }
</script>