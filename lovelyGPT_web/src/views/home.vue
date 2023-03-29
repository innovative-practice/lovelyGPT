<template>
    <div class="home">
        <el-container height="100%">
            <el-aside width="100px">
                <Nav></Nav>
            </el-aside>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import Nav from "../components/Nav.vue"
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import type { UploadProps, UploadUserFile } from 'element-plus'

const fileList = ref<UploadUserFile[]>([
	{
		name: 'element-plus-logo.svg',
		url: 'https://element-plus.org/images/element-plus-logo.svg',
	},
	{
		name: 'element-plus-logo2.svg',
		url: 'https://element-plus.org/images/element-plus-logo.svg',
	},
])

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
	console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
	console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
	ElMessage.warning(
		`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length
		} totally`
	)
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
	return ElMessageBox.confirm(
		`Cancel the transfert of ${uploadFile.name} ?`
	).then(
		() => true,
		() => false
	)
}
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