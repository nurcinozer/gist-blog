import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '..'

export const Toggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="p-3 h-12 w-12 order-2 md:order-3 mt-4 md:mt-0"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}