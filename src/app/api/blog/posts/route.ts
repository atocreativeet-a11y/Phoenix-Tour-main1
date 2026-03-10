// src/app/api/blog/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import connectDB from '@/lib/mongodb';
import { BlogPost } from '@/lib/models/BlogPost';
import { BlogCategory } from '@/lib/models/BlogCategory';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const author = searchParams.get('author');
    
    const skip = (page - 1) * limit;
    
    let query: any = { isPublished: true };
    
    // Build query based on parameters
    if (category) {
      query.categories = category;
    }
    
    if (tag) {
      query.tags = tag;
    }
    
    if (featured === 'true') {
      query.isFeatured = true;
    }
    
    if (author) {
      query.author = author;
    }
    
    if (search) {
      query.$text = { $search: search };
    }
    
    const [posts, total] = await Promise.all([
      BlogPost.find(query)
        .populate('author', 'name email image role')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      BlogPost.countDocuments(query)
    ]);
    
    // Get categories for filter
    const categories = await BlogCategory.find({ isActive: true }).lean();
    
    // Get popular tags
    const tagAggregation = await BlogPost.aggregate([
      { $match: { isPublished: true } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);
    
    return NextResponse.json({
      success: true,
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      filters: {
        categories,
        popularTags: tagAggregation
      }
    });
  } catch (error: any) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await connectDB();
    
    const data = await request.json();
    
    // Generate slug from title
    const slug = data.slug || data.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
    
    // Check if slug exists
    const existing = await BlogPost.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Slug already exists' },
        { status: 400 }
      );
    }
    
    const post = await BlogPost.create({
      ...data,
      slug,
      author: session.user.id
    });
    
    return NextResponse.json({
      success: true,
      post
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}