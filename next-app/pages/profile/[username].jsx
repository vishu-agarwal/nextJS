import React from 'react';
//dynamic routing in next js    
import {useRouter} from 'next/router';
import Link from 'next/link';

const UsernamePage = () => {
    const router = useRouter()
    const {username} = router.query


  return (
    <div>
      Hello  {username}!
      <Link href="/about">About</Link>
    </div>
  )
}

export default UsernamePage
