import React, { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import SearchResultContainer from "../../components/SearchResultContainer/SearchResultContainer";
import "./SearchResults.scss";
import API from "../../api";

export default function SearchResults() {
  const [searchParams] = useSearchParams();

  const searchTerm = searchParams.get("term");
  const [results, setResults] = useState(null);
  useEffect(() => {
    API.get(`/searchc?input=${searchTerm}`).then((res) => {
      const data = res.data;
      setResults(data);
    });
  }, []);

  // first time loading page there will be no results, display "Searching..."
  if (results == null) {
    return (
      <div className="search-results-page">
        <h2>Search Results</h2>
        <h3>Searching...</h3>
      </div>
    );
  }
  // results have been fetched, display them
  else {
    return (
      <div className="search-results-page">
        <div className="search-results-title">
          <h2>Search Results</h2>
          <h3>{`${results.length} results for "${searchTerm}"`}</h3>
        </div>
        <div className="search-results-list">
          {results.map((result) => {
            return (
              <SearchResultContainer
                course={result}
                searchTerm={searchTerm}
                numberResults={results.length}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
