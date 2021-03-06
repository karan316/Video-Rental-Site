import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
import auth from "../services/authService";

class MoviesTable extends Component {
    //columns doesn't have to be a state because it does not change through out the life cycle of the component
    columns = [
        {
            path: "title",
            label: "Title",
            content: movie => (
                <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
            )
        },
        { path: "genre.name", label: "Genre" },
        { path: "numberInStock", label: "Stock" },
        { path: "dailyRentalRate", label: "Rate" },
        {
            key: "like",
            content: movie => (
                <Like
                    liked={movie.liked}
                    onClick={() => this.props.onLike(movie)}
                />
            )
        } // empty columns for like and delete
    ];

    deleteColumn = {
        key: "delete",
        content: movie => (
            <button
                onClick={() => this.props.onDelete(movie)}
                className="btn btn-primary btn-sm btn-danger"
            >
                Delete
            </button>
        )
    };

    constructor() {
        super();
        const user = auth.getCurrentUser();
        if (user && user.isAdmin) {
            this.columns.push(this.deleteColumn);
        }
    }

    render() {
        const { movies, onSort, sortColumn } = this.props;

        return (
            <Table
                columns={this.columns}
                sortColumn={sortColumn}
                onSort={onSort}
                data={movies}
            />
        );
    }
}

export default MoviesTable;
