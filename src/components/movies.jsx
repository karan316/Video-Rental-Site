import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import SearchBox from './common/searchBox';

class Movies extends Component {
    state = {
        // movies: getMovies(),
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        searchQuery: '',
        selectedGenre: null,
        sortColumn: { path: 'title', order: 'asc' } //path and order initializations are used in lodash
    };

    componentDidMount() {
        //normally movies and genres would be added via backend so we use componentDidMount life cycle hook to initialize them
        const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];
        this.setState({ movies: getMovies(), genres: genres });
    }

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

    handleGenreSelect = genre => {
        this.setState({
            selectedGenre: genre,
            searchQuery: '',
            currentPage: 1
        });
    };

    handleOnSort = sortColumn => {
        this.setState({ sortColumn });
    };

    handleSearch = query => {
        this.setState({
            searchQuery: query,
            selectedGenre: null,
            currentPage: 1
        });
    };

    getPagedData = () => {
        const {
            pageSize,
            currentPage,
            selectedGenre,
            searchQuery,
            movies: allMovies,
            sortColumn
        } = this.state;

        // const filtered =
        //     selectedGenre && selectedGenre._id // need to include selectedGenre._id for all genre movies
        //         ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        //         : allMovies;

        let filtered = allMovies;
        if (searchQuery)
            filtered = allMovies.filter(m =>
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        //if there is a search query search using the search query else use the genre filter
        else if (selectedGenre && selectedGenre._id)
            filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

        const sorted = _.orderBy(
            filtered,
            [sortColumn.path],
            [sortColumn.order]
        );

        const movies = paginate(sorted, currentPage, pageSize);

        return {
            totalCount: filtered.length,
            data: movies
        };
    };

    render() {
        const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

        const { length: movie_count } = this.state.movies;

        if (movie_count === 0) return <p>No movies available</p>;

        const { totalCount, data: movies } = this.getPagedData();
        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup
                        items={this.state.genres}
                        onItemSelect={this.handleGenreSelect}
                        selectedItem={this.state.selectedGenre}
                    />
                </div>

                <div className="col">
                    <Link
                        to="/movies/new"
                        className="btn btn-primary btn-sm"
                        style={{ marginBottom: 20 }}
                    >
                        New Movie
                    </Link>
                    <p>Showing {totalCount} movies in the database </p>
                    <SearchBox
                        value={searchQuery}
                        onChange={this.handleSearch}
                    />
                    {/* <span>{this.state.movies.map(movie => <li key={movie}>{movie}</li>)}</span> */}
                    <MoviesTable
                        movies={movies}
                        sortColumn={sortColumn}
                        onDelete={this.handleDelete}
                        onLike={this.handleLike}
                        onSort={this.handleOnSort}
                    />
                    <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }
}

export default Movies;
