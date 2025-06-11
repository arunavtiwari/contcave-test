import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext';
import type { Post } from '../payload-types';

export const lexicalToText = (content: Post['content'] | null | undefined): string => {
  if (!content) return '';
  return convertLexicalToPlaintext({ data: content });
};
