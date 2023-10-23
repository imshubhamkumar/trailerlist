import playButton from "../../../assets/play-button.svg";
import likeIcon from "../../../assets/like-icon.svg";
import { useEffect, useState } from "react";
import { findRow, isImageAvailable } from "../../../services/apiService";
import VideoPlayer from "../../videoPlayer";
const ListItem = (props: any) => {
    const [thumbnail, setThumbnail] = useState('')
    const [movieName, setmovieName] = useState('')
    const [isExist, setExistStatus] = useState(true)
    const [videoURL, setVideoURL] = useState()
    const getfileStatus = async (url: string) => {
        const status = await isImageAvailable(url)
        setExistStatus(status)
    }
    const [details, setDetails] = useState()
    useEffect(() => {
        if (props) {
            setThumbnail(props.movieData.thumbnail)
            setmovieName(props.movieData.title)
            getfileStatus(props.movieData.thumbnail)
            setVideoURL(props.movieData.videoURI)
            const movieData: any = {
                title: props.movieData.title,
                date: props.movieData.fullDate,
                likes: props.movieData.like,
                votes: props.movieData.votes,
                language: props.movieData.language,
                genres: props.movieData.genres
            }
            setDetails(movieData)
        }
    }, [])

    return (
        <>
            <div className={['card', props.selected === props.count ? 'active' : ''].join(" ")} onClick={() => props.onSelected(props.count)}>
                <div className={['card-head'].join(" ")}>
                    {isExist ? (
                        <img src={thumbnail} alt="poster" />) : (<div className="poster-placeholder">
                            <span>{movieName}</span>
                        </div>)}
                    <div className="poster-container">
                        <div className="release-date primary-bg round-badge">
                            <span className="release-date-row1 bold-b1">{props.movieData.displayDate[0]}</span>
                            <span className="release-date-row1">{props.movieData.displayDate[1]}</span>
                        </div>
                        <div className="play-btn-container">
                            <button className="btn play-btn">
                                <img src={playButton} alt="play button" />
                            </button>

                        </div>
                        <div className="vote-like-container">
                            <span className="like-count"><img src={likeIcon} alt="like" /> {props.movieData.like} %</span>
                            <span className="vote-count">{props.movieData.votes} vote</span>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <span className="movie-name">{movieName}</span>
                </div>
            </div>
            <VideoPlayer selected={props.selected === props.count} videoURL={videoURL} details={details} />
        </>
    );
}

export default ListItem;