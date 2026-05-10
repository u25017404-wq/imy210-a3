<script setup>
defineProps({
  blocks: {
    type: Array,
    default: () => []
  }
})

function renderText(children) {
  return children?.map(child => child.text).join('') ?? ''
}
</script>

<template>
  <div class="prose max-w-none">
    <template v-for="(block, i) in blocks" :key="i">
      <h1 v-if="block.type === 'heading' && block.level === 1">{{ renderText(block.children) }}</h1>
      <h2 v-else-if="block.type === 'heading' && block.level === 2">{{ renderText(block.children) }}</h2>
      <h3 v-else-if="block.type === 'heading' && block.level === 3">{{ renderText(block.children) }}</h3>
      <p v-else-if="block.type === 'paragraph'">{{ renderText(block.children) }}</p>
      <ul v-else-if="block.type === 'list' && block.format === 'unordered'">
        <li v-for="(item, j) in block.children" :key="j">{{ renderText(item.children) }}</li>
      </ul>
      <ol v-else-if="block.type === 'list' && block.format === 'ordered'">
        <li v-for="(item, j) in block.children" :key="j">{{ renderText(item.children) }}</li>
      </ol>
      <blockquote v-else-if="block.type === 'quote'">{{ renderText(block.children) }}</blockquote>
      <pre v-else-if="block.type === 'code'"><code>{{ renderText(block.children) }}</code></pre>
    </template>
  </div>
</template>