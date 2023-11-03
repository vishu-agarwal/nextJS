import React from "react";
import Link from "next/link";
import Head from "next/head";
import styles from "../../styles/Profile.module.css";

const ProfilePage = () => {
  return (
    <div className={styles.homePageTitle}>
      <Head>
        <title styles={{color:"red"}}>Profile page</title>
      </Head>
     <h4 styles={{color:"white"}}> Profile apge</h4>
      <Link href="/">Home</Link>
    </div>
  );
};

export default ProfilePage;
