// app/(my-app)/blogs/page.tsx

import Link from 'next/link';
import { lexicalToHtml } from '@/lib/lexicalToHtml';
import { lexicalToText } from '@/lib/lexicalToText';

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

export default async function BlogsPage({
    searchParams,
}: { searchParams?: { category?: string; view?: string } }) {
    const [posts, categories] = await Promise.all([
        fetchPosts(),
        fetchCategories(),
    ]);

    // Provide placeholder data when API returns nothing
    let fallbackCategories = categories;
    if (!fallbackCategories || fallbackCategories.length === 0) {
        fallbackCategories = [
            { id: 'about', title: 'About Us', slug: 'about-us' },
            { id: 'cat1', title: 'Category One', slug: 'category-one' },
            { id: 'cat2', title: 'Category Two', slug: 'category-two' },
            { id: 'cat3', title: 'Category Three', slug: 'category-three' },
        ];
    }

    let fallbackPosts = posts;
    if (!fallbackPosts || fallbackPosts.length === 0) {
        fallbackPosts = fallbackCategories.flatMap((cat) =>
            Array.from({ length: 4 }).map((_, i) => ({
                id: `${cat.slug}-${i}`,
                slug: `${cat.slug}-${i}`,
                title: `Sample Blog ${i + 1}`,
                featuredImage: { url: `https://picsum.photos/seed/${cat.slug}-${i}/400/300` },
                categories: [cat],
                publishedDate: new Date().toISOString(),
                content: null,
            }))
        );
    }

    const cats = fallbackCategories;
    const allPosts = fallbackPosts;

    const activeCategory = searchParams?.category;
    const viewAll = searchParams?.view === 'all';

    const filtered = activeCategory
        ? allPosts.filter((p: any) => p.categories?.some((c: any) => c.slug === activeCategory))
        : allPosts;

    // When a category is selected or view=all is passed, just render the list
    if (activeCategory || viewAll) {
        return (
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="space-x-2">
                        {cats.map((cat: any) => (
                            <Link
                                key={cat.id}
                                href={`/blogs?category=${cat.slug}`}
                                className={`px-3 py-1 rounded ${activeCategory === cat.slug ? 'bg-black text-white' : 'bg-gray-200'}`}
                            >
                                {cat.title}
                            </Link>
                        ))}
                    </div>
                    <Link
                        href="/blogs"
                        className="px-3 py-1 rounded bg-gray-200 text-black"
                    >
                        Back to Categories
                    </Link>
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
                                    {post.categories?.length > 0 && (
                                        <p className="text-sm text-gray-500">
                                            {post.categories.map((c: any) => c.title).join(', ')}
                                        </p>
                                    )}
                                    <p className="mt-2 text-gray-700">
                                        {lexicalToText(post.content).slice(0, 200)}...
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }

    const postsByCategory = cats.map((cat: any) => ({
        category: cat,
        posts: allPosts
            .filter((p: any) => p.categories?.some((c: any) => c.slug === cat.slug))
            .slice(0, 4),
    }));

    return (
        <div className="p-6">
            <div className="flex justify-end mb-6">
                <Link
                    href="/blogs?view=all"
                    className="px-3 py-1 rounded bg-blue-600 text-white"
                >
                    View All Blogs
                </Link>
            </div>
            {postsByCategory.map(({ category, posts }) => (
                <div key={category.id} className="mb-10">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">{category.title}</h2>
                        <Link
                            href={`/blogs?category=${category.slug}`}
                            className="text-blue-600"
                        >
                            View all
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post: any) => (
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
                                        <h3 className="text-lg font-semibold">{post.title}</h3>
                                        <p className="text-gray-600 mt-2">
                                            {new Date(post.publishedDate).toLocaleDateString()}
                                        </p>
                                        <p className="mt-2 text-gray-700">
                                            {lexicalToText(post.content).slice(0, 100)}...
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
