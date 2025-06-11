import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html';
import type { Post } from '../payload-types';

export const lexicalToHtml = (content: Post['content'] | null | undefined): string => {
  if (!content) return '';
  return convertLexicalToHTML({ data: content });
};
