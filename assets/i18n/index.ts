import type { Locale } from '@/types'

const requireAsset = require.context('.', true, /^\.\/(\w+)\/([\w-]+)\.json$/, 'lazy')

/**
 * Lazy-load lang data
 *
 * @param {string} section - The section of lang data to load
 * @param {string} lang    - The language name
 * @returns {Promise<Locale>} - The content of a lang JSON
 */
export default function loadLocale(section: string, lang: String): Promise<Locale> {
  return requireAsset(`./${section}/${lang}.json`)
}
