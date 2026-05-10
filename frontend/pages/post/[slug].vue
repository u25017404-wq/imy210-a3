<script setup>
const config = useRuntimeConfig()
const route = useRoute()
const slug = route.params.slug

const { data: posts } = await useFetch(
  `${config.public.strapiBase}/api/posts?filters[slug][$eq]=${slug}&populate=*`,
  { transform: (res) => res.data }
)

const post = computed(() => posts.value?.[0] ?? null)
</script>

<template>
  <div v-if="post" class="bg-white rounded-xl shadow p-8">
    <div class="mb-4">
      <span class="text-xs bg-blue-100 text-blue-700 rounded-full px-2 py-1">
        {{ post.category }}
      </span>
    </div>
    <h1 class="text-4xl font-bold mb-2">{{ post.title }}</h1>
    <p class="text-sm text-gray-500 mb-8">By {{ post.author }}</p>
    <RichTextRenderer :blocks="post.content" />
  </div>
  <div v-else class="text-gray-500">Post not found.</div>
</template>