<template>
    <div class="home">
        <el-container height="100%">
            <el-aside width="100px">
                <Nav></Nav>
            </el-aside>
        </el-container>
    </div>
</template>

<script setup>
import Nav from "../components/Nav.vue"

</script>

<style  scoped lang="css">
.home{
    width:90vw;
    height:90vh;
    background-color: rgb(39, 42,65);
    border-radius: 15px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

}
</style>