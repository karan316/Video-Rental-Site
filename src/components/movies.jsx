import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';

class Movies extends Component {
    state = {
        // movies: getMovies(),
        movies: getMovies(),
        currentPage: 1,
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
        this.setState({ currentPage: page });
    };
    render() {
        const { pageSize, currentPage, movies: allMovies } = this.state;
        const { length: movie_count } = this.state.movies;
        if (movie_count === 0) return <p>No movies available</p>;
        const movies = paginate(allMovies, currentPage, pageSize);
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
                        {/* render movies array local to this application. removed this.state after pagination */}
                        {movies.map((
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

                <Pagination
                    itemsCount={movie_count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                />
            </React.Fragment>
        );
    }
}

export default Movies;
