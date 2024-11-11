<template>
  <div></div>
</template>
<script setup>
import { onMounted } from 'vue'
import axios from 'axios'

const ECWID_API_BASE = `https://app.ecwid.com/api/v3/${
  import.meta.env.VITE_ECWID_STORE_ID
}/products`

async function getRecentlyUpdatedProducts(limit) {
  const url = `${ECWID_API_BASE}?limit=${limit}`
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${
        import.meta.env.VITE_ECWID_ACCESS_TOKEN
      }`
    }
  })
  return response.data.items
}

onMounted(() => {
  getRecentlyUpdatedProducts(5).then((products) => {
    console.log(products)
  })
})
</script>
