import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
const About = () => {
  return (
    <div style={{color:"green"}}>
         <Head>
        <title>About Page</title>
      </Head>
      About page
      <Link href="/">Home</Link>
    </div>
  )
}

export default About
