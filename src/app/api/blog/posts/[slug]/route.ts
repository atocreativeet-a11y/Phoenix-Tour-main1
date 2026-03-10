// src/app/api/blog/posts/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { BlogPost } from '@/lib/models/BlogPost';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    
    await connectDB();
    
    // Try to fetch from database first
    const post = await BlogPost.findOne({ slug, isPublished: true })
      .populate('author', 'name email image bio role')
      .populate('relatedTours', 'title slug price duration image')
      .lean();
    
    if (post) {
      // Get related posts from same categories
      const relatedPosts = await BlogPost.find({
        _id: { $ne: post._id },
        categories: { $in: post.categories },
        isPublished: true
      })
      .select('title slug excerpt featuredImage readTime createdAt')
      .limit(4)
      .lean();
      
      return NextResponse.json({
        success: true,
        post,
        relatedPosts
      });
    }
    
    // If not found in database, return mock data
    const mockPosts = {
      'coffee-ceremony-ethiopias-soul-cup': {
        _id: '1',
        title: 'Coffee Ceremony: Ethiopia\'s Soul in a Cup',
        slug: 'coffee-ceremony-ethiopias-soul-cup',
        excerpt: 'Discover the spiritual journey of Ethiopian coffee ceremony - a tradition that connects generations.',
        content: `
          <h2>The Spiritual Journey of Coffee</h2>
          <p>In Ethiopia, coffee is more than just a beverage—it's a spiritual journey, a social ritual, and a timeless tradition...</p>
          <!-- More content -->
        `,
        featuredImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
        categories: ['Food & Coffee', 'Ethiopian Culture'],
        tags: ['coffee', 'culture', 'tradition', 'ethiopia'],
        readTime: 8,
        views: 2500,
        likes: 156,
        createdAt: '2024-01-15T10:30:00.000Z',
        author: {
          _id: 'author1',
          name: 'Selam Mekonnen',
          role: 'Cultural Expert',
          bio: 'Local guide specializing in Ethiopian traditions'
        },
        relatedTours: [
          {
            _id: 'tour1',
            title: 'Coffee Culture Tour',
            slug: 'coffee-culture-tour',
            price: 89,
            duration: '3-4 hours',
            image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80'
          }
        ]
      },
      'lalibela-8th-wonder-world': {
        _id: '2',
        title: 'Lalibela: The 8th Wonder of the World',
        slug: 'lalibela-8th-wonder-world',
        excerpt: 'Explore the rock-hewn churches that have stood for 800 years as a testament to faith and engineering.',
        content: `
          <h2>The Rock-Hewn Marvels</h2>
          <p>Lalibela, a UNESCO World Heritage site, is home to 11 medieval churches carved entirely from solid rock...</p>
          <!-- More content -->
        `,
        featuredImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80',
        categories: ['History & Heritage', 'Photography'],
        tags: ['lalibela', 'unesco', 'churches', 'history'],
        readTime: 10,
        views: 3200,
        likes: 234,
        createdAt: '2024-01-10T14:45:00.000Z',
        author: {
          _id: 'author2',
          name: 'Michael Wolde',
          role: 'Historical Guide',
          bio: 'Expert in Ethiopian history and architecture'
        },
        relatedTours: [
          {
            _id: 'tour2',
            title: 'Lalibela Historical Tour',
            slug: 'lalibela-rockhewn-churches',
            price: 850,
            duration: '4 days',
            image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80'
          }
        ]
      },
      'omo-valley-ancient-tribes': {
        _id: '3',
        title: 'Omo Valley: Meeting Ethiopia\'s Ancient Tribes',
        slug: 'omo-valley-ancient-tribes',
        excerpt: 'A journey to meet the indigenous tribes who preserve traditions dating back thousands of years.',
        content: `
          <h2>Encounter with Ancient Cultures</h2>
          <p>The Omo Valley is home to some of Africa\'s most fascinating indigenous tribes...</p>
          <!-- More content -->
        `,
        featuredImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
        categories: ['Ethiopian Culture', 'Local Stories'],
        tags: ['omo valley', 'tribes', 'culture', 'indigenous'],
        readTime: 12,
        views: 1800,
        likes: 98,
        createdAt: '2024-01-05T09:15:00.000Z',
        author: {
          _id: 'author3',
          name: 'Amina Hassan',
          role: 'Cultural Anthropologist',
          bio: 'Specialist in Omo Valley tribes and traditions'
        },
        relatedTours: [
          {
            _id: 'tour3',
            title: 'Omo Valley Cultural Journey',
            slug: 'see-the-gelada-monkeys-and-ethiopian-wolve',
            price: 920,
            duration: '6 days',
            image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'
          }
        ]
      }
    };
    
    const mockPost = mockPosts[slug as keyof typeof mockPosts];
    
    if (!mockPost) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // Get related mock posts (excluding current one)
    const relatedPosts = Object.values(mockPosts)
      .filter(p => p._id !== mockPost._id)
      .slice(0, 4)
      .map(p => ({
        _id: p._id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        featuredImage: p.featuredImage,
        readTime: p.readTime,
        createdAt: p.createdAt
      }));
    
    return NextResponse.json({
      success: true,
      post: mockPost,
      relatedPosts
    });
  } catch (error: any) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}