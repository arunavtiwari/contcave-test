import type { CollectionConfig } from 'payload/types';

const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticURL: '/media',
    staticDir: 'public/media',
  },
  access: {
    read: () => true,
  },
  fields: [],
};

export default Media;
