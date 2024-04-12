import { useRef, useState } from 'react';
import './App.css';

function SideMenu({ handleMenuClick }) {
  return (
    <div className="side-menu">
      <ul>
        <li onClick={() => handleMenuClick("home")}>Home</li>
        <li onClick={() => handleMenuClick("goPro")}>Go Pro</li>
        <li onClick={() => handleMenuClick("playlists")}>Playlists</li>
        <li onClick={() => handleMenuClick("newReleases")}>New Releases</li>
      </ul>
    </div>
  );
}

function TopNavbar() {
  return (
    <div className="top-navbar">
      
      <div className="navbar-left">
        <img src=""></img>
        <input type="text" placeholder="Search..." className="search-box" />
      
     
        <a href="" className="btn">Login</a>
        <a href className="btn">Signup</a>
      </div>
    </div>
  );
}

function Footer({ currentMusicDetails, isAudioPlaying, handleAudioPlay }) {
  return (
    <div className="navbar">
      <img  alt="song Avatar" id='songAvatar' onClick={handleAudioPlay} />
      <p>{currentMusicDetails.songName}</p>
      <p>{currentMusicDetails.songArtist}</p>
      <i className={`fa-solid ${isAudioPlaying ? 'fa-pause-circle' : 'fa-circle-play'} playBtn`} onClick={handleAudioPlay}></i>
    </div>
  );
}

function App() {
  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName: 'Ram sia ram',
    songArtist: 'Adipurush',
    songSrc: './Assets/songs/Ram Siya Ram Adipurush 320 Kbps.mp3',
    songAvatar: './Assets/Images/song1.png'
  });

  // UseStates Variables
  const [audioProgress, setAudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [musicIndex, setMusicIndex] = useState(0);
  const [musicTotalLength, setMusicTotalLength] = useState('03 : 50');
  const [musicCurrentTime, setMusicCurrentTime] = useState('00 : 00');
  const [videoIndex, setVideoIndex] = useState(0);
  const [activeMenu, setActiveMenu] = useState("home");

  const currentAudio = useRef();

  const handleMusicProgressBar = (e) => {
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime = (e.target.value * currentAudio.current.duration) / 100;
  };

  // Play Audio Function
  const handleAudioPlay = () => {
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      setIsAudioPlaying(true);
    } else {
      currentAudio.current.pause();
      setIsAudioPlaying(false);
    }
  };

  // Function to handle the next song
  const handleNextSong = () => {
    if (musicIndex >= musicAPI.length - 1) {
      let setNumber = 0;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    } else {
      let setNumber = musicIndex + 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
  };

  // Function to handle the previous song
  const handlePrevSong = () => {
    if (musicIndex === 0) {
      let setNumber = musicAPI.length - 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    } else {
      let setNumber = musicIndex - 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
  };

  const musicAPI = [
    {
      songName: 'Ram sia Ram',
      songArtist: 'Adipurush',
      songSrc: './Assets/songs/Ram Siya Ram Adipurush 320 Kbps.mp3',
      songAvatar: './Assets/Images/song1.png'
    },
    {
      songName: 'Gulabi ankehan',
      songArtist: 'Sanam',
      songSrc: './Assets/songs/Gulabi Aankhen Universally Sanam 320 Kbps.mp3',
      songAvatar: './Assets/Images/song2.png'
    },
    {
      songName: 'Chaleya ',
      songArtist: 'Javan',
      songSrc: './Assets/songs/Chaleya Jawan 320 Kbps.mp3',
      songAvatar: './Assets/Images/song3.png'
    },
    {
      songName: 'O-Mere-Dil-Ke-Chain',
      songArtist: 'Sanam',
      songSrc: './Assets/songs/O-Mere-Dil-Ke-Chain_320(PaglaSongs).mp3',
      songAvatar: './Assets/Images/song4.png'
    },
    {
      songName: 'Guitar sikhda',
      songArtist: 'Jassi gill',
      songSrc: './Assets/songs/Guitar_Sikhda_1.mp3',
      songAvatar: './Assets/Images/song5.png'
    },
    {
      songName: 'Soch ',
      songArtist: 'Hardy Sandhu',
      songSrc: './Assets/songs/SOCH(Slowed+Reverbed) __ Hardy Sandhu.webm',
      songAvatar: './Assets/Images/image6.jpg'
    },
    {
      songName: 'Apna Bana Le',
      songArtist: 'Arijit Singh',
      songSrc: './Assets/songs/Apna Bana Le - Full Audio _ Bhediya _ Varun Dhawan, Kriti Sanon_ Sachin-Jigar,Arijit Singh,Amitabh B.webm',
      songAvatar: './Assets/Images/image7.jpg'
    },{
      songName: 'Lover',
      songArtist: 'Diljit Dosangh',
      songSrc: './Assets/songs/Lover_320(PaglaSongs).mp3',
      songAvatar: './Assets/Images/lover.png'
    }
    ,{
      songName: 'Khaab',
      songArtist: 'Akhil',
      songSrc: './Assets/songs/Khaab Akhil 320 Kbps.mp3',
      songAvatar: './Assets/Images/khaab.png'
    },
    {
      songName: 'Apna Bana Le',
      songArtist: 'Arijit Singh',
      songSrc: './Assets/songs/Apna Bana Le - Full Audio _ Bhediya _ Varun Dhawan, Kriti Sanon_ Sachin-Jigar,Arijit Singh,Amitabh B.webm',
      songAvatar: './Assets/Images/image7.jpg'
    },{
      songName: 'Lover',
      songArtist: 'Diljit Dosangh',
      songSrc: './Assets/songs/Lover_320(PaglaSongs).mp3',
      songAvatar: './Assets/Images/lover.png'
    }
    ,{
      songName: 'Goat',
      songArtist: 'Diljit Dosangh',
      songSrc: './Assets/songs/new_320_G.O.A.T.  - Diljit Dosanjh.mp3',
      songAvatar: './Assets/Images/goat.png'
    },
    {
      songName: 'Apna Bana Le',
      songArtist: 'Arijit Singh',
      songSrc: './Assets/songs/Apna Bana Le - Full Audio _ Bhediya _ Varun Dhawan, Kriti Sanon_ Sachin-Jigar,Arijit Singh,Amitabh B.webm',
      songAvatar: './Assets/Images/image7.jpg'
    },{
      songName: 'Lover',
      songArtist: 'Diljit Dosangh',
      songSrc: './Assets/songs/Lover_320(PaglaSongs).mp3',
      songAvatar: './Assets/Images/lover.png'
    }
    ,{
      songName: 'Goat',
      songArtist: 'Diljit Dosangh',
      songSrc: './Assets/songs/new_320_G.O.A.T.  - Diljit Dosanjh.mp3',
      songAvatar: './Assets/Images/goat.png'
    },
    {
      songName: 'Apna Bana Le',
      songArtist: 'Arijit Singh',
      songSrc: './Assets/songs/Apna Bana Le - Full Audio _ Bhediya _ Varun Dhawan, Kriti Sanon_ Sachin-Jigar,Arijit Singh,Amitabh B.webm',
      songAvatar: './Assets/Images/image7.jpg'
    },{
      songName: 'Lover',
      songArtist: 'Diljit Dosangh',
      songSrc: './Assets/songs/Lover_320(PaglaSongs).mp3',
      songAvatar: './Assets/Images/lover.png'
    }
    ,{
      songName: 'Goat',
      songArtist: 'Diljit Dosangh',
      songSrc: './Assets/songs/new_320_G.O.A.T.  - Diljit Dosanjh.mp3',
      songAvatar: './Assets/Images/goat.png'
    }
    
  ];

  const updateCurrentMusicDetails = (number) => {
    let musicObject = musicAPI[number];
    currentAudio.current.src = musicObject.songSrc;
    currentAudio.current.play();
    setCurrentMusicDetails({
      songName: musicObject.songName,
      songArtist: musicObject.songArtist,
      songSrc: musicObject.songSrc,
      songAvatar: musicObject.songAvatar
    });
    setIsAudioPlaying(true);
  };

  const handleAudioUpdate = () => {
    // Input total length of the audio
    let minutes = Math.floor(currentAudio.current.duration / 60);
    let seconds = Math.floor(currentAudio.current.duration % 60);
    let musicTotalLength0 = `${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
    setMusicTotalLength(musicTotalLength0);

    // Input Music Current Time
    let currentMin = Math.floor(currentAudio.current.currentTime / 60);
    let currentSec = Math.floor(currentAudio.current.currentTime % 60);
    let musicCurrentT = `${currentMin < 10 ? `0${currentMin}` : currentMin} : ${currentSec < 10 ? `0${currentSec}` : currentSec}`;
    setMusicCurrentTime(musicCurrentT);

    const progress = parseInt((currentAudio.current.currentTime / currentAudio.current.duration) * 100);
    setAudioProgress(isNaN(progress) ? 0 : progress);
  };

  const vidArray = ['./Assets/Videos/video1.mp4','./Assets/Videos/video2.mp4','./Assets/Videos/video3.mp4','./Assets/Videos/video4.mp4','./Assets/Videos/video5.mp4','./Assets/Videos/video6.mp4'];

  

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    // Handle menu clicks here
  };

  const Card = ({ song }) => {
    const handlePlayPause = () => {
      if (currentMusicDetails.songSrc === song.songSrc) {
        handleAudioPlay();
      } else {
        updateCurrentMusicDetails(musicAPI.findIndex(item => item.songSrc === song.songSrc));
      }
    };

    return (
      <div className="card">
        <p className='music-Head-Name'>{song.songName}</p>
        <p className='music-Artist-Name'>{song.songArtist}</p>
        <img src={song.songAvatar} onClick={handlePlayPause} alt="song Avatar" id='songAvatar'/>
      </div>
    );
  };

  return (
    <>
      <SideMenu handleMenuClick={handleMenuClick} />
      <div className="container">
        <audio src={currentMusicDetails.songSrc} ref={currentAudio} onEnded={handleNextSong} onTimeUpdate={handleAudioUpdate}></audio>
        <video src={vidArray[videoIndex]} loop muted autoPlay className='backgroundVideo'></video>
        <div className="blackScreen"></div>
        <TopNavbar />
        <Footer currentMusicDetails={currentMusicDetails} isAudioPlaying={isAudioPlaying} handleAudioPlay={handleAudioPlay} />
        <div className="music-Container">
          <div className="musicTimerDiv">
            <p className='musicCurrentTime'>{musicCurrentTime}</p>
            <p className='musicTotalLenght'>{musicTotalLength}</p>
          </div>
          <input type="range" name="musicProgressBar" className='musicProgressBar' value={audioProgress} onChange={handleMusicProgressBar} />
          <div className="musicControlers">
            <i className='fa-solid fa-backward musicControler' onClick={handlePrevSong}></i>
            <i className={`fa-solid ${isAudioPlaying? 'fa-pause-circle' : 'fa-circle-play'} playBtn`} onClick={handleAudioPlay}></i>
            <i className='fa-solid fa-forward musicControler' onClick={handleNextSong}></i>
          </div>
        </div>
      </div>
      <div className="card-container">
        {musicAPI.map((song, index) => (
          <Card key={index} song={song} />
        ))}
      </div>
    </>
  );
}

export default App;
