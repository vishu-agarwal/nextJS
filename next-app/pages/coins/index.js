import axios from "axios";
import React from "react";

const CoinList = ({ coinData }) => {
  console.log(coinData);
  return coinData.coins.map((coin) => {
    return (
      <div key = {coin.id}>
        <h3>{coin.name}</h3>
        <img src={coin.icon} />
        <p>{coin.price}</p>
      </div>
    );
  });
};

//used for fetch data from external api from DB and it returns data then set it to props of above component, so that component can use those data
//when build website or project , nextjs will render this page at build time using props which returned from this function

// this function request the data to browser
export const getStaticProps = async () => {
  const data = await axios.get(
    "https://api.coinstats.app/public/v1/coins?skip=0"
  );

  return {
    props: {
      coinData: data.data,
    },
    //revalidate: 10,// time in sec for refetch data
  };
};

// export const getStaticProps = async ({params}) => { // also called sst static site generation
//   const id= params.id
//   const data = await axios.get(
//     "https://api.coinstats.app/public/v1/coins?skip=0"
//   );

//   return {
//     props: {
//       coinData: data.data,
//     },
//   };
// };

// export const getServerSideProps = async () => { // use at request time, it pre-render data to props when page pre-render
//   // const id= params.id
//   const data = await axios.get(
//     "https://api.coinstats.app/public/v1/coins?skip=0"
//   );

//   return {
//     props: {
//       coinData: data.data,
//     },
//   };
// };


export default CoinList;
