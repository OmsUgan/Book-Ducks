import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function UserLayout({ children }) {
  const token = cookies().get('token')?.value

  if (!token) {
    redirect('/login')
  }

  return (
    <>
      {children}
    </>
  )
}