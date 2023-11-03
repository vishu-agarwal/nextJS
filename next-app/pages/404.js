import Link from 'next/link'
import React from 'react'

const PageNotFound = () => {
  return (
    <div>
      Page not found your route is wrong!
      <Link href="/" >Home</Link>
    </div>
  )
}

export default PageNotFound
