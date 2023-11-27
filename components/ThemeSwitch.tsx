import { Switch } from '@headlessui/react'
import { useTheme } from 'next-themes'

interface ThemeSwitchSkeletonProps {
  dark?: boolean
  onChange?: () => void
}

export const ThemeSwitchSkeleton: React.FC<ThemeSwitchSkeletonProps> = ({ dark, onChange }) => {
  return (
    <Switch
      checked={dark}
      onChange={onChange}
      className='relative inline-flex h-6 w-12 shrink-0 cursor-pointer items-center overflow-hidden rounded-full bg-switch-day shadow-switch-inset drop-shadow focus:outline-none dark:bg-switch-night'
    >
      <span className='sr-only'>Switch theme</span>
      <span
        aria-hidden='true'
        className='pointer-events-none inline-block h-[18px] w-[18px] translate-x-1 transform rounded-full bg-sun shadow-lg shadow-switch-day ring-0 transition-transform duration-[.4s] ease-in-out dark:translate-x-6 dark:bg-moon dark:shadow-switch-night'
      />
      <span aria-hidden='true' className='cloud' />
      <span aria-hidden='true' className='star' />
      <span aria-hidden='true' className='star' />
    </Switch>
  )
}

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme()
  const dark = theme === 'dark'
  const onChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return <ThemeSwitchSkeleton dark={dark} onChange={onChange} />
}

export default ThemeSwitch
