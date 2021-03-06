import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

class MovieForm extends Form {
    state = {
        data: {
            title: "",
            genreId: "",
            numberInStock: "",
            dailyRentalRate: ""
        },
        genres: [],
        errors: {}
    };

    schema = {
        _id: Joi.string(),
        title: Joi.string()
            .required()
            .label("Title"),
        genreId: Joi.string()
            .required()
            .label("Genre"),
        numberInStock: Joi.number()
            .required()
            .min(0)
            .max(100)
            .label("Number in Stock"),
        dailyRentalRate: Joi.number()
            .required()
            .min(0)
            .max(10)
            .label("Daily Rental Rate")
    };

    async populateGenres() {
        const { data: genres } = await getGenres();
        this.setState({ genres });
    }

    async populateMovie() {
        try {
            const movieId = this.props.match.params.id; //get the id parameter in the route and store it in movieId
            if (movieId === "new") return; //return immediately. no need to populate the form with existing movie object
            const { data: movie } = await getMovie(movieId); //if Id is not new get the movie with the given movie id
            this.setState({ data: this.mapToViewModel(movie) }); //this will be executed even tho there is a return method above. setting the data property to a specific movie object returned from the server
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                this.props.history.replace("/not-found"); //if the movie doesn't exist redirect to not found
        }
    }

    async componentDidMount() {
        await this.populateGenres();
        await this.populateMovie(); //function to populate the movie form
    }

    //in the server movie object might have many attributes. we only need specific attributes like _id, title etc. so this function just returns those specific attributes that we want
    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    }

    doSubmit = async () => {
        await saveMovie(this.state.data); //function defined in fake movie service
        this.props.history.push("/movies");
    };
    render() {
        return (
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "Title")}
                    {this.renderSelect("genreId", "Genre", this.state.genres)}
                    {this.renderInput(
                        "numberInStock",
                        "Number in Stock",
                        "number"
                    )}
                    {this.renderInput("dailyRentalRate", "Rate")}
                    {this.renderButton("Save")}
                </form>
            </div>
        );
    }
}

export default MovieForm;
