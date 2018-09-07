import React, {Component} from 'react';
import TextTruncate from "react-text-truncate";
import FontAwesome from 'react-fontawesome';

class MovieRow extends Component {
    movie;
    render() {
        let movie = this.props.movie;
        return (
            <div className="row py-4">
                <div className="col-3 pr-0">
                    <img src={movie.poster} className="movie-poster" alt={movie.title}/>
                </div>
                <div className="col-9">
                    <h2 className="movie-title">{movie.title}</h2>
                    <div className="movie-overview">
                        <TextTruncate
                            line={3}
                            text={movie.overview}
                        />
                    </div>
                    <a className="btn btn-outline-success" href="">Play</a> <a className="ml-2 btn btn-outline-dark" href="">View <FontAwesome name="angle-right"/></a>
                </div>
                <hr/>
            </div>
        )
    }
}

export default MovieRow
