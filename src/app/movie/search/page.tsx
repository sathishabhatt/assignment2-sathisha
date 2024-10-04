// app/movie/search/page.tsx
"use client"; // This is a client component

import React, { useState } from 'react';
import useSWR from 'swr';

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: movies, error } = useSWR(
    searchTerm ? `https://freetestapi.com/api/v1/movies?search=${searchTerm}` : null,
    fetcher
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // SWR automatically handles the fetch when searchTerm changes
  };

  return (
    <div className="search-container">
      <h1 className="search-title">Search Movies</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter movie title"
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      {error && <div>Error fetching movies.</div>}
      {searchTerm && (
        <div className="search-results">
          {movies && movies.length > 0 ? (
            <table className="movie-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Year</th>
                  <th>Rating</th>
                  <th>Genre</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie: any) => (
                  <tr key={movie.id}>
                    <td>{movie.Title || 'N/A'}</td>
                    <td>{movie.Year || 'N/A'}</td>
                    <td>{movie.Rating || 'N/A'}</td>
                    <td>{movie.Genre?.join(', ') || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      )}
    </div>
  );
}
