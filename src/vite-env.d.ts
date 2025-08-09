/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ELEVATE_DOCSITE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// YAML module declarations
declare module '*.yaml' {
  const content: any
  export default content
}

declare module '*.yml' {
  const content: any
  export default content
}