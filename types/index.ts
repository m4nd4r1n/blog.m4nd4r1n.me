import type {
  AvailableLanguage,
  BooleanString,
  InputPosition,
  Loading,
  Mapping,
  Repo
} from '@giscus/react'

export type PostType = 'Post' | 'Page'

export type PostStatus = 'Idea' | 'Revise' | 'Published' | 'Draft'

export type Properties = {
  id?: string
  date?: { start_date?: string }
  type?: [PostType] | string[]
  slug?: string
  tags?: string[]
  summary?: string
  title?: string
  status?: [PostStatus] | string[]
}

export type Post = {
  date: number
  fullWidth: boolean
  tags: {
    tag: string
    color: string
  }[]
  pageCover: string
} & Omit<Properties, 'date' | 'tags'>

export type BlogConfig = {
  title: string
  author: string
  email: string
  link: string
  description: string
  lang: 'en-US' | 'zh-CN' | 'zh-HK' | 'zh-TW' | 'ja-JP' | 'es-ES'
  timezone: string
  appearance: 'light' | 'dark' | 'auto'
  lightBackground: `#${string}`
  darkBackground: `#${string}`
  path: string
  since?: number
  postsPerPage: number
  sortByDate: boolean
  showAbout: boolean
  showArchive: boolean
  autoCollapsedNavBar: boolean
  socialLink: string
  seo: {
    keywords: string[]
    googleSiteVerification?: string
  }
  notionPageId: string | undefined
  notionAccessToken: string | undefined
  analytics?: {
    provider?: 'ga' | ''
    gaConfig: {
      measurementId?: string
    }
  }
  comment?: {
    provider?: 'utterances' | 'giscus' | ''
    utterancesConfig: {
      repo?: string
    }
    giscusConfig: {
      repo: Repo
      repoId: string
      category?: string
      categoryId?: string
      mapping: Mapping
      strict?: BooleanString
      reactionsEnabled?: BooleanString
      emitMetadata?: BooleanString
      inputPosition?: InputPosition
      lang?: AvailableLanguage
      loading?: Loading
    }
  }
  isProd: boolean
}

export type Locale = {
  NAV: {
    INDEX: string
    RSS: string
    SEARCH: string
    ABOUT: string
  }
  PAGINATION: {
    PREV: string
    NEXT: string
  }
  POST: {
    BACK: string
    TOP: string
  }
  PAGE: {
    ERROR_404: {
      MESSAGE: string
    }
  }
}
