/// <reference types="vite/client" />

// Declare raw imports for markdown files
declare module '*.md?raw' {
  const content: string;
  export default content;
}

declare module '*.md' {
  const content: string;
  export default content;
}

// Declare Prism.js component modules
declare module 'prismjs/components/*' {
  const content: any;
  export default content;
}