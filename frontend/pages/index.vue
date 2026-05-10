<script setup>
const config = useRuntimeConfig()
const selectedCategory = ref('')

const { data: posts } = await useFetch(
  `${config.public.strapiBase}/api/posts?populate=*&pagination[pageSize]=100`,
  { transform: (res) => res.data }
)

const categories = computed(() => {
  const cats = posts.value?.map(p => p.category).filter(Boolean) ?? []
  return [...new Set(cats)]
})

const filtered = computed(() => {
  if (!selectedCategory.value) return posts.value ?? []
  return posts.value.filter(p => p.category === selectedCategory.value)
})
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Blog</h1>

    <div class="mb-6">
      <select v-model="selectedCategory"
        class="border rounded px-3 py-2 text-sm bg-white shadow-sm">
        <option value="">All Categories</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <div class="grid gap-6">
      <NuxtLink
        v-for="post in filtered"
        :key="post.id"
        :to="`/post/${post.slug}`"
        class="block bg-white rounded-xl shadow p-6 hover:shadow-md transition"
      >
        <div class="flex justify-between items-start mb-1">
          <h2 class="text-xl font-semibold">{{ post.title }}</h2>
          <span class="text-xs bg-blue-100 text-blue-700 rounded-full px-2 py-1">
            {{ post.category }}
          </span>
        </div>
        <p class="text-sm text-gray-500 mb-2">By {{ post.author }}</p>
        <p class="text-gray-600 text-sm">{{ post.snippet }}</p>
      </NuxtLink>
    </div>
  </div>
</template>
