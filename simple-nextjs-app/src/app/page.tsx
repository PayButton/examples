import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import React from 'react';

export default async function Page() {
  async function getReadme() {
    'use server'
    const markdownPath = path.join(process.cwd(), 'README.md');
    const markdown = fs.readFileSync(markdownPath, 'utf8');
    const parsedMarkdown = await marked.parse(markdown);

    return parsedMarkdown
  }
  return (
      <div dangerouslySetInnerHTML={{ __html: await getReadme() }} />
  );
}
