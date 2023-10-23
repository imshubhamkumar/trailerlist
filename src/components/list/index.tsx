import { useEffect, useState } from "react";
import { getMovies } from "../../services/apiService";
import ListItem from "./item";

const ListComponent = () => {
    const [movies, setMovies] = useState<any>([])
    const [selected, setSelected] = useState<number>(-1)

    useEffect(() => {
        setTimeout(() => {
            setMovies(getMovies())
        }, 100)

    }, [])
    return (
        <>
            <div className="grid-container">
                {movies.map((movie: any, idx: number) => !movie ? '' : <ListItem movieData={movie} onSelected={setSelected} selected={selected} count={idx} key={'movie' + idx} />)}
            </div>
        </>
    );
}

export default ListComponent;