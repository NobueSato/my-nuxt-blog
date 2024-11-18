<script setup lang="ts">
    interface BlogPost {
        id: number;
        title: string;
        excerpt: string;
        slug: string;
        cover_image: object; 
        published: string; 
    }
    
    const { data: blogPosts, error } = await useAsyncData<BlogPost[]>(
        'blogPosts',
        async () => {
        try {
            const { data } = await $fetch<{ data: BlogPost[] }>('http://localhost:1337/api/posts?populate=cover_image');
            console.log(data);
            return data || []; // Return the fetched data
        } catch (err) {
            return []; // Fallback to an empty array on error
        }
        }
    );

    // Create a computed property to safely access the cover image URL
    const getCoverImageUrl = (post: BlogPost) => {
    const coverImage = post.cover_image as { formats: { large: { url: string } } };
    return `http://localhost:1337${coverImage.formats.large.url}`;
    };

    // Method to format the published date to remove milliseconds and timezone info
    const formatPublishedDate = (date: string) => {
        const formattedDate = new Date(date).toISOString().split('T')[0]; // Get only the date part
        console.log(formattedDate);
        return formattedDate;
    };

  </script>
  

<template>
<div class="py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl lg:mx-0">
      <h2 class="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Blog</h2>
      <p class="mt-2 text-lg/8 text-gray-600">Join me as I explore the world of code, one line at a time!</p>
    </div>
    <div class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      
      <!-- Loop through blog posts -->
      <div v-for="post in blogPosts" :key="post.id" class="flex max-w-xl flex-col items-start justify-between">
        <div class="flex items-center gap-x-4 text-xs">
            <time :datetime="post.published" class="text-gray-500">{{ formatPublishedDate(post.published) }}</time>
          <!-- <a href="#" class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">Category</a> -->
        </div>
        <div class="group relative">
            <img
              :src="getCoverImageUrl(post)"
              alt="Blog thumbnail"
              class="w-full h-auto rounded-lg shadow-lg object-cover overflow-hidden"
            />
          <h3 class="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
            <a :href="`/blog/${post.slug}`">
              <span class="absolute inset-0"></span>
              {{ post.title }}
            </a>
          </h3>
          <p class="mt-5 line-clamp-3 text-sm/6 text-gray-600">{{ post.excerpt }}</p>
        </div>
        <div class="relative mt-8 flex items-center gap-x-4">
        </div>
      </div>

      <!-- More posts... -->
    </div>
  </div>
</div>

</template>