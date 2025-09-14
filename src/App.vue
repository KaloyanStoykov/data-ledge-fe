<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'

interface AnimalFacts {
  text: string
}

const catFacts = ref([] as AnimalFacts[])
const fetchingFacts = ref(false)
async function loadMoreFacts() {
  fetchingFacts.value = true
  const catFactsResponse = await axios.get<AnimalFacts[]>(
    'https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=5',
  )
  catFacts.value.push(...(catFactsResponse.data || []))

  fetchingFacts.value = false
}

async function fetchInitialCatFacts() {
  const catFactsResponse = await axios.get<AnimalFacts[]>(
    'https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=5',
  )
  catFacts.value = catFactsResponse.data
}

onMounted(async () => {
  await fetchInitialCatFacts();
})
</script>

<template>
  <ul>
    <li v-for="(fact, index) in catFacts" :key="index">{{ index + 1 }} {{ fact.text }}</li>
  </ul>
  <button name="login" v-on:click="loadMoreFacts">{{ fetchingFacts ? '...' : 'Load More' }}</button>
</template>

<style>
body {
  background: black;
}
</style>

<style scoped>
h1 {
  font-weight: bold;
  color: white;
}

li {
  color: white;
  padding: 0.5em 1em;
}
.static {
  color: blue;
}

p {
  line-height: 1.6;
  margin-top: 1em;
}
</style>
