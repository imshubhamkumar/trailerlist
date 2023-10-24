import React, { useEffect } from "react";
const VideoPlayer = (props: any) => {
    if (props && !props.selected) {
        return null
    }
    const { title,
        language,
        genres } = props.details
    return (
        <>
            <div className="video-player-container">
                <div className="video-container">
                    <iframe src={props.videoURL} className="video-fram" title="trailer" />
                </div>
                <div className="video-detail-container">
                    <span className="title">{title}</span>
                    <span className="language">{language}</span>
                    <div className="geners">{genres.map((g: string) => <span className="genre">{g}</span>)}</div>
                </div>
            </div>
        </>
    );
}

export default VideoPlayer;