 
import React from 'react';

 
 
async function fetchMovies() {
  const res = await fetch('https://freetestapi.com/api/v1/movies', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch movie data');
  }

  const data = await res.json();
  console.log(data);  
  return data;  
}

export default async function MovieList() {
  const movies = await fetchMovies();

  return (
    <div className="container">
      <h1 className="title">Movie List</h1>
      <table className="movie-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Rating</th>
            <th>Director</th>
            <th>Actors</th>
            <th>Plot</th>
            <th>Runtime</th>
            <th>Awards</th>
            <th>Box Office</th>
            <th>Production</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie: any) => (
            <tr key={movie.id}>
              <td>{movie.Title || 'N/A'}</td>
              <td>{movie.Year || 'N/A'}</td>
              <td>{movie.Genre ? movie.Genre.join(', ') : 'N/A'}</td>
              <td>{movie.Rating || 'N/A'}</td>
              <td>{movie.Director || 'N/A'}</td>
              <td>{movie.Actors ? movie.Actors.join(', ') : 'N/A'}</td>
              <td>{movie.Plot || 'N/A'}</td>
              <td>{movie.Runtime || 'N/A'}</td>
              <td>{movie.Awards || 'N/A'}</td>
              <td>{movie.BoxOffice || 'N/A'}</td>
              <td>{movie.Production || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
