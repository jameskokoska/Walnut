import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchResultContainer from "../../components/SearchResultContainer/SearchResultContainer";
import "./SearchResults.scss";
import API from "../../api";
import Loading from "../../components/Loading/Loading";

export default function SearchResults() {
  const [searchParams] = useSearchParams();

  const searchTerm = searchParams.get("term");
  const [results, setResults] = useState(null);
  const [term, setTerm] = useState(null);
  useEffect(() => {
    API.get(`/searchc?input=${searchTerm}`).then((res) => {
      const data = res.data;
      setTerm(data["term"]);
      setResults(data["courses_data"]);
    });
  }, []);

  // first time loading page there will be no results, display "Searching..."
  if (results == null) {
    return (
      <div className="search-results-page">
        <h2>Search Results</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "500px",
            flexDirection: "column",
          }}
        >
          <Loading />
          <p style={{ marginTop: "20px" }}>Loading...</p>
        </div>
      </div>
    );
  }

  // No course found
  else if (results.length == 0) {
    return (
      <div className="search-results-page">
        <div className="search-results-title">
          <h2>Search Results</h2>
          <h3>{`No results found for "${searchTerm}"`}</h3>
        </div>
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
                key={result["code"]}
                course={result}
                searchTerm={term}
                numberResults={results.length}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
