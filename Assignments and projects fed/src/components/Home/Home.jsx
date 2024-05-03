import Layout from "../../Layout/Layout";
import Card from "../Card/Card";
import SongBar from "../MasterBar/SongBar";
import { useEffect } from "react";
import Navbar from "../Navbar";
import { useGlobalContext } from "../../states/Contet";
import Footer from "../Footer/Footer";

export const songs = [

  {
    id: Math.random() * Date.now(),
    title: "Ram sia ram",
    artist: "Adipurush",
    mp3: new Audio("/assets/mp3/Ram Siya Ram Adipurush 320 Kbps.mp3"),
    img: "/assets/song1.png",
  },

  {
    id: Math.random() * Date.now(),
    title: "Gulabi ankehan",
    artist: "Sanam ",
    mp3: new Audio("/assets/mp3/Gulabi Aankhen Universally Sanam 320 Kbps.mp3"),
    img: "/assets/song2.png",
  },
  {
    id: Math.random() * Date.now(),
    title: "Chaleya ",
    artist: "Arijit",
    mp3: new Audio("/assets/mp3/Chaleya Jawan 320 Kbps.mp3"),
    img: "/assets/song3.png",
  },
  {
    id: Math.random() * Date.now(),
    title: "O-Mere-Dil-Ke-Chain ",
    artist: "Sanam",
    mp3: new Audio("/assets/mp3/O-Mere-Dil-Ke-Chain_320(PaglaSongs).mp3"),
    img: "/assets/song4.png",
  },
  {
    id: Math.random() * Date.now(),
    title: "Guitar sikhda ",
    artist: "Jassi gill",
    mp3: new Audio("/assets/mp3/Guitar_Sikhda_1.mp3"),
    img: "/assets/song5.png",
  },{
    id: Math.random() * Date.now(),
    title: " Apna Bana Le",
    artist: "Arijit Singh",
    mp3: new Audio("/assets/mp3/Apna Bana Le - Full Audio _ Bhediya _ Varun Dhawan, Kriti Sanon_ Sachin-Jigar,Arijit Singh,Amitabh B.webm"),
    img: "/assets/image7.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: " Khaab",
    artist: "Akhil",
    mp3: new Audio("/assets/mp3/Khaab Akhil 320 Kbps.mp3"),
    img: "/assets/khaab.png",
  },
  {
    id: Math.random() * Date.now(),
    title: " Lover",
    artist: "Diljit Dosangh",
    mp3: new Audio("/assets/mp3/Lover_320(PaglaSongs).mp3"),
    img: "/assets/lover.png",
  },
  {
    id: Math.random() * Date.now(),
    title: " O mahi ",
    artist: "Arijit singh",
    mp3: new Audio("/assets/mp3/O Mahi O Mahi_320(PagalWorld.com.sb).mp3"),
    img: "/assets/omahi.png",
  },
  {
    id: Math.random() * Date.now(),
    title: " Deva deva ",
    artist: "Arijit singh",
    mp3: new Audio("/assets/mp3/Deva Deva_320(PagalWorld.com.sb).mp3"),
    img: "/assets/devadeva.png",
  },

];

const Home = () => {

  const { getUser } = useGlobalContext();

  useEffect(() => {
    getUser();
  }, []);
  return (
    <Layout>
      <Navbar />

      <div className="tertiary_bg ml-2 px-4 py-4 home ">


        <div className="flex justify-between my-4 items-center">
          <span className="text-xl font-bold hover:underline cursor-pointer">
          Songs
          </span>
         
        </div>
        <div className="grid  gap-6 grid-cols-5">
          {songs.map((song, i) => {
            return <Card key={song.id} idx={i} song={song} />;
          })}
        </div>
      </div>
      <Footer/>
      <SongBar />
    </Layout>
  );
};

export default Home;
