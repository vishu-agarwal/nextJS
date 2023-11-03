import Image from "next/image";

// const getPostData = async () => {
//     const res = await fetch("https://jsonplaceholder.typicode.com/posts")
//     console.log("res=----", res)
//     return res.json();
// }

// const getUsersData = async () => {
//     const res = await fetch("https://jsonplaceholder.typicode.com/users")
//     console.log("res=----", res)
//     return res.json();
// }

const getDogData = async () => {
    const res = await fetch("https://dog.ceo/api/breeds/image/random", {
        cache: "no-store",
        // next: {
        //     revalidate: 15
        // }
    })
    console.log("res=----", res)
    return res.json();
}

export default async function PostList() {
    // const [posts, users, dogs] = await Promise.all([getPostData(), getUsersData(), getDogData()])
    const dogs = await getDogData()
    // console.log("post----", posts)
    return (
        <div>
            Post List
            {/* <div>{users.map((item: any) => {
                return <div>{item.name}</div>
            })}</div> */}
            <div> <Image src={dogs.message} height={300} width={300} alt="Dog image" /> </div>
            {/* {
                posts?.map((item: any) => {
                    return <div>{item.title}</div>
                })
            } */}
        </div>
    )
}


