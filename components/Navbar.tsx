import Link from "next/link"

export default function Navbar() {
  return (
    <div className="flex flex-row max-w-full overflow-x-auto gap-4 items-center">
      <Link href='/'>Home</Link><p>|</p>
      <Link href='/profile'>Profile</Link><p>|</p>
      <Link href='/poems'>Poems</Link><p>|</p>
      <Link href='users'>Users</Link>
    </div>
  )
}
