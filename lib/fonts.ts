import localFont from 'next/font/local'

export const pretendard = localFont({
  src: [{ path: '../public/fonts/PretendardVariable.woff2' }],
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
