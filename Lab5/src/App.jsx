import {useState} from "react";
import "./App.css";

function App() {
    const [movies, setMovies] = useState([]);
    const [title, setTitle] = useState("");
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const addMovie = () => {
        if (title.trim() === "") {
            alert("Please enter a movie title");
            return;
        }

        const newMovie = {
            id: Date.now(),
            title: title,
            rating: rating,
            comment: comment,
        };

        setMovies([...movies, newMovie]);
        setTitle("");
        setRating(0);
        setComment("");
    };


    const removeMovie = (id) => {
        setMovies(movies.filter((movie) => movie.id !== id));
    };


    const showStars = (rating) => {
        return "⭐".repeat(rating);
    };

    return (
        <div className="app-container">
            <h1>🎬 Movies Watchlist</h1>

            {/* Add Movie Form */}
            <div className="form-container">
                <h2>Add a Movie</h2>

                <input
                    type="text"
                    placeholder="Movie title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input"
                />

                <div>
                    <label>Rating: {rating} stars</label>
                    <input
                        type="range"
                        min="0"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="slider"
                    />
                </div>

                <textarea
                    placeholder="Add a comment review..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="textarea"
                    rows="3"
                />

                <button onClick={addMovie} className="btn btn-add">
                    Add Movie
                </button>
            </div>

            {/* Movies List */}
            <div className="movies-container">
                <h2>Your Movies ({movies.length})</h2>
                {movies.length === 0 ? (
                    <p className="empty-message">No movies added yet!</p>
                ) : (
                    movies.map((movie) => (
                        <div key={movie.id} className="movie-card">
                            <h3>{movie.title}</h3>
                            <p className="stars">{showStars(movie.rating)}</p>
                            <p className="rating-text">{movie.rating}/5 stars</p>
                            {movie.comment && (
                                <p className="comment">
                                    <strong>Review:</strong> {movie.comment}
                                </p>
                            )}
                            <button
                                onClick={() => removeMovie(movie.id)}
                                className="btn btn-remove"
                            >
                                Remove
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default App;