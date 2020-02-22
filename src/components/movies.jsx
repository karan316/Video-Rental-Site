import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';
import Pagination from "./common/pagination";

class Movies extends Component {
    state = {
        // movies: getMovies(),
        movies: getMovies(),
        pageSize: 4
    };
    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies: movies }); //set movies property to newly created movie object
    };

    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movie[index] = { ...movies[index] }; //copying properties
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    };

    handlePageChange = page => {
        console.log(page);
    }
    render() {
        const { length: movie_count } = this.state.movies;
        if (movie_count === 0) return <p>No movies available</p>;
        return (
            <React.Fragment>
                <p>Showing {movie_count} movies in the database </p>
                {/* <span>{this.state.movies.map(movie => <li key={movie}>{movie}</li>)}</span> */}
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th />
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movies.map((
                            movie //map every movie in movies with a tr and td*4
                        ) => (
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td>
                                    <Like
                                        liked={movie.liked}
                                        onClick={() => this.handleLike(movie)}
                                    />
                                </td>
                                <td>
                                    <button
                                        onClick={() => this.handleDelete(movie)}
                                        className='btn btn-primary btn-sm btn-danger'
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Pagination itemsCount={movie_count} pageSize={this.state.pageSize} onPageChange={this.handlePageChange} />
            </React.Fragment>
        );
    }
}

export default Movies;
