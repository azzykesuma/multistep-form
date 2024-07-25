import Header from '@/components/Header'
import { ReactNode } from 'react'

const Layout = ({children} : {children:ReactNode}) => {
  return (
   <main className='h-screen'>
    <Header />
    {children}
   </main>
  )
}

export default Layout
