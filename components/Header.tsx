import Image from 'next/image'
import Link from 'next/link'
import { forwardRef, useCallback, useEffect, useRef } from 'react'

import ClientLoading from '@/components/ClientLoading'
import ThemeSwitch, { ThemeSwitchSkeleton } from '@/components/ThemeSwitch'
import { useConfig } from '@/lib/config'
import { useLocale } from '@/lib/locale'

type Link = {
  id: number
  name: string
  to: string
  show: boolean
  external?: boolean
}

const NavBar = () => {
  const BLOG = useConfig()
  const locale = useLocale()
  const links: Link[] = [
    { id: 0, name: locale.NAV.INDEX, to: BLOG.path || '/', show: true },
    { id: 1, name: locale.NAV.ABOUT, to: '/about', show: BLOG.showAbout },
    { id: 2, name: locale.NAV.SEARCH, to: '/search', show: true }
  ]
  return (
    <div className='flex-shrink-0'>
      <ul className='flex flex-row gap-4'>
        {links.map(
          link =>
            link.show && (
              <li key={link.id} className='nav block text-black dark:text-gray-50'>
                <Link href={link.to} target={link.external ? '_blank' : undefined}>
                  {link.name}
                </Link>
              </li>
            )
        )}
        <ClientLoading fallback={<ThemeSwitchSkeleton />}>
          <ThemeSwitch />
        </ClientLoading>
      </ul>
    </div>
  )
}

interface HeaderProps {
  navBarTitle: string | null
  fullWidth?: boolean
}

export default function Header({ navBarTitle, fullWidth }: HeaderProps) {
  const BLOG = useConfig()

  const useSticky = !BLOG.autoCollapsedNavBar
  const navRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const handler: IntersectionObserverCallback = useCallback(
    ([entry]) => {
      if (useSticky && navRef.current) {
        navRef.current?.classList.toggle('sticky-nav-full', !entry.isIntersecting)
      } else {
        navRef.current?.classList.add('remove-sticky')
      }
    },
    [useSticky]
  )

  useEffect(() => {
    const sentinelEl = sentinelRef.current
    const observer = new window.IntersectionObserver(handler)
    sentinelEl && observer.observe(sentinelEl)

    return () => {
      sentinelEl && observer.unobserve(sentinelEl)
    }
  }, [handler, sentinelRef])

  const titleRef = useRef<HTMLParagraphElement>(null)

  function handleClickHeader(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (
      ![navRef.current, titleRef.current].includes(
        ev.target as HTMLDivElement | HTMLParagraphElement
      )
    )
      return

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      <div className='observer-element h-4 md:h-12' ref={sentinelRef}></div>
      <div
        className={`sticky-nav group m-auto mb-2 flex h-6 w-full flex-row items-center justify-between bg-opacity-60 py-8 md:mb-12 ${
          !fullWidth ? 'max-w-3xl px-4' : 'px-4 md:px-24'
        }`}
        id='sticky-nav'
        ref={navRef}
        onClick={handleClickHeader}
      >
        <svg
          viewBox='0 0 24 24'
          className='caret pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-6 w-6 opacity-30 transition duration-100 group-hover:opacity-100'
        >
          <path
            d='M12 10.828l-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414z'
            className='fill-black dark:fill-white'
          />
        </svg>
        <div className='flex items-center'>
          <Link href='/' aria-label={BLOG.title}>
            <Image src='/favicon.png' width={24} height={24} alt={BLOG.title} />
          </Link>
          <HeaderName
            ref={titleRef}
            siteTitle={BLOG.title}
            siteDescription={BLOG.description}
            postTitle={navBarTitle}
            onClick={handleClickHeader}
          />
        </div>
        <NavBar />
      </div>
    </>
  )
}

interface HeaderNameProps {
  siteTitle: string
  siteDescription: string
  postTitle: string | null
  onClick: React.MouseEventHandler<HTMLParagraphElement>
}

const HeaderName = forwardRef<HTMLParagraphElement, HeaderNameProps>(function HeaderName(
  { siteTitle, siteDescription, postTitle, onClick },
  ref
) {
  return (
    <p
      ref={ref}
      className='header-name capture-pointer-events ml-2 grid-cols-1 grid-rows-1 items-center font-medium text-gray-600 dark:text-gray-300'
      onClick={onClick}
    >
      {postTitle && <span className='post-title col-start-1 row-start-1'>{postTitle}</span>}
      <span className='col-start-1 row-start-1'>
        <span className='site-title'>{siteTitle}</span>
        <span className='site-description font-normal'>, {siteDescription}</span>
      </span>
    </p>
  )
})
