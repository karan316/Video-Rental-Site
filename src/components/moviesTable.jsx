import React, { Component } from 'react';
import Like from './common/like';
import TableHeader from './common/tableHeader';
import TableBody from './common/TableBody';

class MoviesTable extends Component {
    //columns doesn't have to be a state because it does not change through out the life cycle of the component
    columns = [
        { path: 'title', label: 'Title' },
        { path: 'genre.name', label: 'Genre' },
        { path: 'numberInStock', label: 'Stock' },
        { path: 'dailyRentalRate', label: 'Rate' },
        { key: 'like' }, // empty columns for like and delete
        { key: 'delete' }
    ];

    render() {
        const { movies, onDelete, onLike, onSort, sortColumn } = this.props;

        return (
            <table className='table'>
                <TableHeader
                    columns={this.columns}
                    sortColumn={sortColumn}
                    onSort={onSort}
                />

                <TableBody data={movies} />
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
                                    onClick={() => onLike(movie)}
                                />
                            </td>
                            <td>
                                <button
                                    onClick={() => onDelete(movie)}
                                    className='btn btn-primary btn-sm btn-danger'
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default MoviesTable;
