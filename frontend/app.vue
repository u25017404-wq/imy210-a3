<template>
  <div class="min-h-screen bg-blue-50 text-gray-800">
    <div class="flex justify-center pt-6 px-4">
      <nav class="bg-white shadow-md rounded-2xl px-8 py-3 flex items-center justify-between w-full max-w-4xl">
        <NuxtLink to="/" class="text-xl font-bold text-blue-600 tracking-tight">MyBlog</NuxtLink>
        <div class="flex gap-6 text-sm font-medium">
          <NuxtLink to="/" class="hover:text-blue-600 transition">Home</NuxtLink>
          <NuxtLink to="/search" class="hover:text-blue-600 transition">Search</NuxtLink>
        </div>
      </nav>
    </div>
    <main class="max-w-4xl mx-auto px-4 py-10">
      <NuxtPage />
    </main>
  </div>
</template>