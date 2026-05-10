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
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-1">Search</h1>
      <p class="text-gray-500 text-sm">Find posts by title or author</p>
    </div>

    <div class="relative mb-8">
      <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></span>
      <input
        v-model="query"
        type="text"
        placeholder="Search by title or author..."
        class="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <p v-if="query && results.length === 0" class="text-gray-400 text-sm">No results found for "{{ query }}".</p>
    <p v-if="!query" class="text-gray-400 text-sm">Start typing to search...</p>

    <div class="grid gap-6">
      <NuxtLink
        v-for="post in results"
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
        <p class="text-sm text-gray-400 mb-2">By <span class="font-medium text-gray-600">{{ post.author }}</span></p>
        <p class="text-gray-600 text-sm leading-relaxed">{{ post.snippet }}</p>
        <p class="mt-4 text-blue-500 text-sm font-medium">Read more →</p>
      </NuxtLink>
    </div>
  </div>
</template>