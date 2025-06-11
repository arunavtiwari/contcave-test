import sharp from 'sharp';
import { lexicalEditor, defaultEditorFeatures } from '@payloadcms/richtext-lexical';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { buildConfig } from 'payload';

import Posts from './app/(payload)/collections/Posts';
import Media from './app/(payload)/collections/Media';
import PostCategories from './app/(payload)/collections/PostCategories';

export default buildConfig({
  editor: lexicalEditor({
    features: defaultEditorFeatures,
  }),

  collections: [
    Posts,
    Media,
    PostCategories,
  ],

  secret: process.env.PAYLOAD_SECRET || '',

  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),

  sharp,
});
