/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ELEVATE_DOCSITE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}