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
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-1">Latest Posts</h1>
      <p class="text-gray-500 text-sm">Browse our latest articles and stories</p>
    </div>

    <div class="mb-6 flex items-center gap-3">
      <label class="text-sm font-medium text-gray-600">Filter by category:</label>
      <select
        v-model="selectedCategory"
        class="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Categories</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <p v-if="filtered.length === 0" class="text-gray-400 text-sm">No posts found.</p>

    <div class="grid gap-6">
      <NuxtLink
        v-for="post in filtered"
        :key="post.id"
        :to="`/post/${post.slug}`"
        class="block bg-white/80 backdrop-blur-sm rounded-2xl shadow hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-100"
      >
        <div class="flex justify-between items-start mb-2">
          <h2 class="text-xl font-semibold text-gray-900 hover:text-blue-600 transition">
            {{ post.title }}
          </h2>
          <span class="ml-4 shrink-0 text-xs bg-blue-100 text-blue-700 rounded-full px-3 py-1 font-medium">
            {{ post.category }}
          </span>
        </div>
        <p class="text-sm text-gray-400 mb-3">By <span class="font-medium text-gray-600">{{ post.author }}</span></p>
        <p class="text-gray-600 text-sm leading-relaxed">{{ post.snippet }}</p>
        <p class="mt-4 text-blue-500 text-sm font-medium">Read more →</p>
      </NuxtLink>
    </div>
  </div>
</template>