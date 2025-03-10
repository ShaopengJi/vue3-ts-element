<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="Activity name">
      <el-input v-model="form.phoneNumber" />
    </el-form-item>
    <el-form-item label="Activity name">
      <el-input v-model="form.password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/user"
import { LoginForm } from "@/api/types"
import { useRouter } from "vue-router"
const router = useRouter()
const userStore = useUserStore()

// do not use same name with ref
const form = reactive<LoginForm>({
  phoneNumber: "",
  password: ""
})

const onSubmit = () => {
  console.log(userStore.login)
  //   return
  userStore.login(form).then((res) => {
    router.push("/")
  })
  console.log(form)
}
</script>
