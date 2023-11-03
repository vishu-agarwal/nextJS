import React from "react";
import Link from "next/link";
import styles from '../styles/Navbar.module.css'
const Navbar = () => {
  return (
    <div>
    {/* // <div className={styles.navbar}>
    //   <div className={styles.links}>  */}
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/about/us">US</Link>
        <Link href="/about/someone">Someone</Link>
        <Link href="/postlist">Post List</Link>
      {/* // </div> */}
    </div >
  );
};

export default Navbar;
