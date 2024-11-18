<script setup lang="ts">
  import { useRoute } from 'vue-router'
  
  interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    slug: string;
    cover_image: object;
    content: string;
    published: string;
  }

  const route = useRoute()
  const slug = route.params.slug as string
  
  // Fetch the single post by slug
  const { data: post, error } = await useAsyncData<BlogPost | null>(
    'post',
    async () => {
      try {
        const { data } = await $fetch<{ data: BlogPost[] }>(`http://localhost:1337/api/posts?slug=${slug}&populate=cover_image`);
        return data[0] || null; // Return the first post if found
      } catch (err) {
        console.error(err);
        return null; // Return null if there is an error
      }
    }
  );

  // Get the cover image URL
  const getCoverImageUrl = (post: BlogPost) => {
    const coverImage = post.cover_image as { formats: { large: { url: string } } };
    return `http://localhost:1337${coverImage.formats.large.url}`;
  };

  // Format the published date
  const formatPublishedDate = (date: string) => {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
  };
</script>

<template>
  <div v-if="post" class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <article class="max-w-2xl mx-auto">
        <!-- Cover image -->
        <img
          :src="getCoverImageUrl(post)"
          alt="Cover image"
          class="rounded-lg shadow-lg w-full h-auto"
        />
        <!-- Post title and date -->
        <header class="mt-6">
          <h1 class="text-3xl font-bold text-gray-900">{{ post.title }}</h1>
          <time :datetime="post.published" class="text-sm text-gray-500">{{ formatPublishedDate(post.published) }}</time>
        </header>
        <!-- Post content -->
        <section class="mt-6">
          <div v-html="post.content" class="mt-4 text-base text-gray-700"></div>
        </section>
      </article>
    </div>
  </div>

  <div v-else>
    <p>Loading...</p>
  </div>
</template>
