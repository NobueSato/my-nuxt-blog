<script setup lang="ts">
import Hero from '@/components/Hero.vue'
import Introduction from '~/components/Introduction.vue';
import BlogSection from '~/components/BlogSection.vue';

// interface BlogPost {
//   id: number;
//   title: string;
//   excerpt: string;
//   slug: string;
// }

// const { data: blogPosts, error } = await useAsyncData<BlogPost[]>(
//   'blogPosts',
//   async () => {
//     try {
//       const { data } = await $fetch<{ data: BlogPost[] }>('http://localhost:1337/api/posts?populate=cover_image');
//       return data || []; // Return the fetched data
//     } catch (err) {
//       return []; // Fallback to an empty array on error
//     }
//   }
// );
</script>

<template>
  <!-- <div> -->
    <!-- Hero Section -->
    <Hero />
    <Introduction />
    <BlogSection />
    <!-- <div v-if="blogPosts && blogPosts.length > 0">
      <div v-for="post in blogPosts" :key="post.id" class="blog-post">
        <h2>{{ post.title || 'Untitled Post' }}</h2>
        <p>{{ post.excerpt || 'No excerpt available.' }}</p>
        <router-link :to="`/blog/${post.slug || post.id}`">Read more</router-link>
      </div>
    </div>
    <div v-else>
      <p>No blog posts available.</p>
    </div>
  </div> -->
  <!-- <div> -->
    <!-- Navbar Component -->
    <!-- <Navbar /> -->
    <!-- Footer Component -->
  <!-- </div> -->
</template>

<style scoped>
.blog-post {
  margin-bottom: 20px;
}
</style>
