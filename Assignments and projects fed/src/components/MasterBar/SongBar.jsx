import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineHeart, AiOutlinePlaySquare } from "react-icons/ai";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import { CgScreen } from "react-icons/cg";
import { BiRepeat, BiShuffle } from "react-icons/bi";
import { FaPause, FaPlay } from "react-icons/fa";
import { PiMicrophoneStageDuotone, PiQueueLight } from "react-icons/pi";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import { BsArrowsAngleContract, BsSpeakerFill } from "react-icons/bs";
import {
    pauseMaster,
    playMaster,
    playSong,
} from "../../states/Actors/SongActor";
import { useGlobalContext } from "../../states/Contet";
import "./SongBar.css";
import { songs } from "../Home/Home";

const SongBar = () => {
    const { masterSong, isPlaying } = useSelector((state) => state.mainSong);
    const {
        progress,
        setProgress,
        resetEverything,
        songIdx,
        setSongIdx,
        currTime,
        setCurrTime,
        duration,
        setDuration,
    } = useGlobalContext();
    const dispatch = useDispatch();
    const [intervalId, setIntervalId] = useState(null);

    const handleMaster = () => {
        if (isPlaying) {
            dispatch(pauseMaster());
        } else {
            dispatch(playMaster());
        }
    };

    const addToLiked = async() => {
        let data = JSON.stringify({
            song_mp3:masterSong.mp3.src,
            song_title:masterSong.title,
            song_artist:masterSong.artist,
            song_thumbnail:masterSong.img,
        })
        const res = await fetch('http://localhost:5000/api/playlist/like', {
            method:"POST",
            headers:{
                'Content-Type':"application/json",
                token:localStorage.getItem('token')
            },
            body:data,
        })

        let d = await res.json();
        console.log(d)

    };

    useEffect(() => {
        if (masterSong.mp3) {
            setDuration(formatTime(masterSong?.mp3?.duration));
            if (isPlaying) {
                masterSong?.mp3?.play();
                startProgressBar();
            } else {
                masterSong?.mp3?.pause();
                clearInterval(intervalId);
            }
        }
        
        return () => {
            clearInterval(intervalId);
            if (masterSong.mp3) {
                masterSong.mp3.pause();
            }
        };
    }, [masterSong, isPlaying]);

    const startProgressBar = () => {
        clearInterval(intervalId);
        const id = setInterval(() => {
            if (masterSong.mp3) {
                const currentTime = masterSong.mp3.currentTime;
                const totalDuration = masterSong.mp3.duration;
                const progressPercentage = (currentTime / totalDuration) * 100;
                setProgress(progressPercentage);
                setCurrTime(formatTime(currentTime));
            }
        }, 1000);
        setIntervalId(id);
    };

    const changeProgress = (e) => {
        const newProgress = parseInt(e.target.value);
        setProgress(newProgress);
        const newTime = (newProgress / 100) * masterSong.mp3.duration;
        setCurrTime(formatTime(newTime));
        if (masterSong.mp3) {
            masterSong.mp3.currentTime = newTime;
        }
    };

    const [volume, setVolume] = useState(50);
    const changeVolume = (e) => {
        const newVolume = parseInt(e.target.value);
        setVolume(newVolume);
        masterSong.mp3.volume = newVolume / 100;
    };
    
    const formatTime = (durationInSeconds) => {
        let minutes = Math.floor(durationInSeconds / 60);
        let seconds = Math.round(durationInSeconds % 60);
        let formattedDuration = `${minutes < 10 ? "0" + minutes : minutes}:${
            seconds < 9 ? "0" + seconds : seconds
        }`;
        return formattedDuration;
    };

    const backwardSong = () => {
        if (songIdx <= 0)
            return;
        const previousSongIdx = songIdx - 1;
        if (masterSong.mp3) {
            masterSong?.mp3?.pause();
            masterSong.mp3.currentTime = 0;
        }
        resetEverything();
        setSongIdx(previousSongIdx);
        dispatch(playSong(songs[previousSongIdx]));
    };

    const forwardSong = () => {
        if (songIdx >= songs.length - 1)
            return;
        const nextSongIdx = songIdx + 1;
        if (masterSong.mp3) {
            masterSong?.mp3?.pause();
            masterSong.mp3.currentTime = 0;
        }
        resetEverything();
        setSongIdx(nextSongIdx);
        dispatch(playSong(songs[nextSongIdx]));
    };

    return (
        <div className="fixed w-full flex px-2 items-center justify-between bottom-0 left-0 h-20 bg-white">
            <div className="w-2/12">
                <div className="flex items-center gap-2">
                    <img src={masterSong.img} alt="" className="h-12" />
                    <div>
                        <h3 className="text-xs font-medium mb-1">
                            {masterSong?.title || "Arijit Singh"}
                        </h3>
                        <span className="text-[10px]">
                            {masterSong?.artist || "Arijit Singh"}
                        </span>
                    </div>
                    <AiOutlineHeart onClick={addToLiked} className="ml-3 cursor-pointer hover:text-green-400" />
                    <CgScreen className="ml-3" />
                </div>
            </div>
            <div className="w-5/12">
                <div className="flex justify-center items-center mb-2 gap-6">
                    <BiShuffle />
                    <IoMdSkipBackward onClick={backwardSong} />
                    {isPlaying ? (
                        <button
                            onClick={handleMaster}
                            className="flex items-center rounded-[50%] bg-white justify-center p-2"
                        >
                            <FaPause className="text-black text-lg" />
                        </button>
                    ) : (
                        <button
                            onClick={handleMaster}
                            className="flex items-center rounded-[50%] bg-white justify-center p-2"
                        >
                            <FaPlay className="text-black text-lg" />
                        </button>
                    )}
                    <IoMdSkipForward onClick={forwardSong} />
                    <BiRepeat />
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs">{currTime}</span>
                    <div className="relative w-full flex items-center">
                        <input
                            type="range"
                            name=""
                            min={0}
                            value={progress}
                            disabled={!masterSong.mp3}
                            onChange={changeProgress}
                            className="w-full block"
                            max={100}
                        />
                        <div
                            className={`active_progress w-[${progress}%]`}
                        ></div>
                    </div>
                    <span className="text-xs">{duration}</span>
                </div>
            </div>
            <div className="w-2/12 flex items-center gap-2">
                <AiOutlinePlaySquare className="text-2xl" />
                <PiMicrophoneStageDuotone className="text-2xl" />
                <PiQueueLight className="text-2xl" />
                <BsSpeakerFill className="text-2xl" />
                {volume <= 0 && <HiSpeakerXMark className="text-2xl" />}
                {volume > 0 && <HiSpeakerWave className="text-2xl" />}
                <div className="relative w-full flex items-center">
                    <input
                        type="range"
                        name="volume"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={changeVolume}
                        className="w-full"
                        aria-label="Volume control"
                    />
                    <div id="volume" className={`active_progress w-[${volume}%]`} />
                </div>
                <BsArrowsAngleContract />
            </div>
            <div className="relative w-full flex items-center"></div>
        </div>
    );
};

export default SongBar;
