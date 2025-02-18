import { useEffect, useState } from 'react'

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import { useConfig } from '@/lib/config'

dayjs.extend(localizedFormat)

const loaded: Record<string, true | Promise<void>> = {}

interface FormattedDateProps {
  date: number
}

export default function FormattedDate({ date }: FormattedDateProps) {
  const lang = useConfig().lang.slice(0, 2)
  const [isLocaleLoaded, setIsLocaleLoaded] = useState(loaded[lang] === true)

  useEffect(() => {
    if (!isLocaleLoaded) {
      loaded[lang] ??= import(`dayjs/locale/${lang}`).then(
        () => {
          loaded[lang] = true
          dayjs.locale(lang)
        },
        () => console.warn(`dayjs locale \`${lang}\` not found`)
      )
      const loadedLang = loaded[lang]
      if (loadedLang instanceof Promise) loadedLang.then(() => setIsLocaleLoaded(true))
    }
  }, [isLocaleLoaded, lang])

  return <span suppressHydrationWarning>{dayjs(date).format('ll')}</span>
}
