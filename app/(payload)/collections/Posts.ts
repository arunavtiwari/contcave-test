import { CollectionConfig } from 'payload';

const Posts: CollectionConfig = {
    slug: 'posts',
    admin: {
        useAsTitle: 'title',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'author',
            type: 'relationship',
            relationTo: 'users',
        },
        {
            name: 'featuredImage',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'categories',
            type: 'relationship',
            relationTo: 'post-categories',
            hasMany: true,
        },
        {
            name: 'publishedDate',
            type: 'date',
        },
        {
            name: 'content',
            type: 'richText',
        },
    ],
};

export default Posts;