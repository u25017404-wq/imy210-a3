<script setup>
const config = useRuntimeConfig()
const query = ref('')

const { data: allPosts } = await useFetch(
  `${config.public.strapiBase}/api/posts?populate=*&pagination[pageSize]=100`,
  { transform: (res) => res.data }
)

const results = computed(() => {
  const q = query.value.toLowerCase().trim()
  if (!q) return []
  return allPosts.value?.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.author.toLowerCase().includes(q)
  ) ?? []
})
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Search</h1>
    <input
      v-model="query"
      type="text"
      placeholder="Search by title or author..."
      class="w-full border rounded-lg px-4 py-2 mb-6 shadow-sm text-sm"
    />

    <p v-if="query && results.length === 0" class="text-gray-500">No results found.</p>

    <div class="grid gap-6">
      <NuxtLink
        v-for="post in results"
        :key="post.id"
        :to="`/post/${post.slug}`"
        class="block bg-white rounded-xl shadow p-6 hover:shadow-md transition"
      >
        <h2 class="text-xl font-semibold mb-1">{{ post.title }}</h2>
        <p class="text-sm text-gray-500">By {{ post.author }}</p>
      </NuxtLink>
    </div>
  </div>
</template>