<template>
  <div>
    <img :src="imgUrl" alt="">
  </div>
</template>

<script>
export default {
  props: {
    imgUrl: {
      type: String,
      required: true
    }
  }
}
</script>
