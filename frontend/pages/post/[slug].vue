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
  <div>
    <NuxtLink to="/" class="text-sm text-blue-500 hover:underline mb-6 inline-block">← Back to all posts</NuxtLink>

    <div v-if="post" class="bg-white/80 backdrop-blur-sm rounded-2xl shadow p-8 border border-gray-100">
      <div class="mb-4">
        <span class="text-xs bg-blue-100 text-blue-700 rounded-full px-3 py-1 font-medium">
          {{ post.category }}
        </span>
      </div>
      <h1 class="text-4xl font-bold text-gray-900 mb-2 leading-tight">{{ post.title }}</h1>
      <p class="text-sm text-gray-400 mb-8">
        By <span class="font-medium text-gray-600">{{ post.author }}</span>
      </p>
      <hr class="mb-8 border-gray-100" />
      <RichTextRenderer :blocks="post.content" />
    </div>

    <div v-else class="text-gray-400 text-sm">Post not found.</div>
  </div>
</template>