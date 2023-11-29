import localFont from 'next/font/local'

export const suit = localFont({
  src: [
    {
      path: '../public/fonts/SUIT-Variable.woff2'
    }
  ],
  variable: '--notion-font'
})

export const monaspace = localFont({
  src: [
    {
      path: '../public/fonts/MonaspaceNeonVarVF.woff2'
    }
  ],
  variable: '--code-font'
})
