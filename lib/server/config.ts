import fs from 'fs'
import { resolve } from 'path'

import type { BlogConfig } from '@/types'

const raw = fs.readFileSync(resolve(process.cwd(), 'blog.config.js'), 'utf-8')
export const config: BlogConfig = eval(
  `((module = { exports }) => { ${raw}; return module.exports })()`
)

// If we need to stripe out some private fields
export const clientConfig = config
