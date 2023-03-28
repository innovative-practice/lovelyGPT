<template>
    <div class="nav">
        <div class="nav-menu-wrapper">
            <ul class="menu-list">
                <el-icon size="45" color="rgb(150, 156, 165)"><ChatDotSquare /></el-icon>
                <el-icon size="45" color="rgb(150, 156, 165)"><Setting /></el-icon>
            </ul>
        </div>
    </div>
</template>

<script setup>
import {ref,reactive} from 'vue'
const menulist = ref([
    "icon-xinxi",
    "icon-shipin",
    "icon-shu",
    "icon-shandian",
    "icon-shezhi"
]
)
const current=ref(0)
const imgurl=reactive()
</script>

<style scoped>
.nav{
    width: 100%;
    height: 90vh;
    position: relative;
    border-radius: 20px 0 0 20px;
}
.nav-menu-wrapper{
    position: relative;
    top: 40%;        
    transform: translate(0,0%);
}
.menu-list{
    margin-left: 50%;
    line-height: 10vh;
}

svg{
    cursor:hand;
}


</style>