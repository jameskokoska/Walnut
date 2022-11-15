import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchResultContainer from "../../components/SearchResultContainer/SearchResultContainer";
import "./SearchResults.scss";
import API from "../../api";
import Loading from "../../components/Loading/Loading";

export default function SearchResults(props) {
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(null);
  const [term, setTerm] = useState(null);
  useEffect(() => {
    if (props.searchTerm) {
      setSearchTerm(props.searchTerm);
      API.get(`/searchc?input=${props.searchTerm}`).then((res) => {
        const data = res.data;
        setResults(data);
      });
    } else {
      const searchTerm = searchParams.get("term");
      setSearchTerm(searchTerm);
      API.get(`/searchc?input=${searchTerm}`).then((res) => {
        const data = res.data;
        setResults(data);
        console.log(data);
      });
    }
  }, []);

  // first time loading page there will be no results, display "Searching..."
  if (results == null) {
    return (
      <div className="search-results-page">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90%",
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
        <div className="search-results-container">
          <div className="search-results-title">
            <h2>Search Results</h2>
            <h3>{`${results?.courses_data?.length} result${
              results?.courses_data?.length === 1 ? "" : "s"
            } for "${searchTerm}"`}</h3>
          </div>
          <div className="search-results-list">
            {results?.courses_data?.map((result) => {
              return (
                <SearchResultContainer
                  course={result}
                  searchTerm={searchTerm}
                  numberResults={results?.courses_data?.length}
                  setCourse={props.setCourse}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
