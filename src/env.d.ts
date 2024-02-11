/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly SUPABASE_KEY: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
