import { BlogPost } from '@/lib/models/BlogPost';

// Example: create a new blog post
await BlogPost.create({
  title: 'My First Post',
  content: 'Hello world!',
  category: 'Tech',
  published: true
});