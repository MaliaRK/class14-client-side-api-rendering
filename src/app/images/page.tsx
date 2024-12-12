'use client';
import { useEffect, useState } from "react";

interface Images {
        albumId: number;
        id: number;
        title: string;
        url: string;
        thumbnailUrl: string;
    }

const Home = () => {
    const [imagesData, setImagesData] = useState<Images[]>([]);
    const [error, setError] = useState("");

    const data = useEffect(() => {      //swr or react query library h jo useEffect se zyada bhtr h client side data fetching kelye mtlb error handling, loading, refetching sb kregi.
        const dataFetch = async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/photos');
            const images = await res.json();

            if(!res.ok){
                setError("something went wrong");
                return;
            }

            const imagesSlice = images.slice(0, 5);
            setImagesData(imagesSlice);
        }
        dataFetch();
    }, [])   // isme bht sari chezen hyn return, dependency etc... channel codevolution bhhtt acha parhaya h.
  return (
    <div className="mx-[30%] mt-10">
        <h1 className='text-center mb-5'><u><strong>IMAGES</strong></u></h1>
        <ul className="flex gap-5">
            {imagesData.map((image) => {
                return (
                    <li key={image.id}>
                        <img src={image.url} alt={image.title} width={100} height={100}></img>
                        {/* agar hum api(ksi or) ki images use krengy Image component
                        m to use phle whitelist krengy.
                        whitelist krne ka tarika:
                        next.config ki file m lkhengy.
                        const nextCofig = {  ye likha hua hoga
                            images: {
                            remotePattern: ["via.plaveholder.com"]
                            }
                        } */}
                    </li>
                )
            })
            }
        </ul>
    </div>
  )
}

export default Home