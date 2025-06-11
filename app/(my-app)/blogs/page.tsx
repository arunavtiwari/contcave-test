// app/(my-app)/blogs/page.tsx

import Link from 'next/link';
import { lexicalToHtml } from '@/lib/lexicalToHtml';

async function fetchCategories() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/post-categories`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch categories');
    }

    const data = await res.json();
    return data.docs;
}

async function fetchPosts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts?limit=10`, {
        next: { revalidate: 60 }, 
    });

    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }

    const data = await res.json();
    return data.docs; 
}

export default async function BlogsPage({ searchParams }: { searchParams?: { category?: string } }) {
    const [posts, categories] = await Promise.all([
        fetchPosts(),
        fetchCategories(),
    ]);
    const activeCategory = searchParams?.category;
    const filtered = activeCategory
        ? posts.filter((p: any) => p.categories?.some((c: any) => c.slug === activeCategory))
        : posts;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <div className="space-x-2">
                    {categories.map((cat: any) => (
                        <Link
                            key={cat.id}
                            href={`/blogs?category=${cat.slug}`}
                            className={`px-3 py-1 rounded ${activeCategory === cat.slug ? 'bg-black text-white' : 'bg-gray-200'}`}
                        >
                            {cat.title}
                        </Link>
                    ))}
                </div>
                <Link href="/admin" className="px-3 py-1 rounded bg-blue-600 text-white">Create Post</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post: any) => (
                <Link key={post.id} href={`/blogs/${post.slug}`}>
                    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                        {post.featuredImage?.url && (
                            <img
                                src={post.featuredImage.url}
                                alt={post.title}
                                className="w-full h-48 object-cover"
                            />
                        )}
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">{post.title}</h2>
                            <p className="text-gray-600 mt-2">
                                {new Date(post.publishedDate).toLocaleDateString()}
                            </p>
                            <div
                                className="mt-2 prose"
                                dangerouslySetInnerHTML={{ __html: lexicalToHtml(post.content).slice(0, 200) }}
                            />
                        </div>
                    </div>
                </Link>
            ))}
            </div>
        </div>
    );
}
