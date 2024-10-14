import "./navbar.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import MobileBurger from "../MobileBurger/MobileBurger";
import { FaUser } from "react-icons/fa";
import { genre } from "../../assets/data";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsyncUser } from "../../redux/asyncThunks/authThunks";
import { IoSearch } from "react-icons/io5";
import axios from "axios";

const Navbar = () => {
  const [scroll, setScroll] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // Track current path

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Reset search state when navigating to a new page without search
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryValue = queryParams.get("search") || "";
    if (queryValue) {
      setSearchInputValue(queryValue); // Restore input from query params
      setSearch(true); // Show the search results area
    } else {
      setSearchInputValue(""); // Clear input when no search in the URL
      setSearch(false);
    }
  }, [location]);

  const handleLogout = () => {
    dispatch(logoutAsyncUser());
    navigate("/login");
  };

  const handleSearchChange = async (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchInputValue(searchValue); // Update input value

    if (searchValue.length === 0) {
      setSearch(false);
      setSearchResults([]); // Clear search results when input is empty
    } else {
      setSearch(true);

      // Filter genres to show suggestions based on input
      const filteredGenres = genre.filter((g) =>
        g.toLowerCase().startsWith(searchValue)
      );

      const suggestions = filteredGenres
        .map((g) => [
          {
            id: `${g}-movies`,
            title: `${g}`,
            genre: "Movies",
            link: `/query?type=movies&genre=${g}`,
            isMovie: false,
          },
          {
            id: `${g}-series`,
            title: `${g}`,
            genre: "Series",
            link: `/query?type=series&genre=${g}`,
            isMovie: false,
          },
        ])
        .flat();

      setSearchResults(suggestions); // Set search results to suggestions

      try {
        const response = await axios.get(
          `http://localhost:5000/api/movies/search`,
          {
            params: { query: searchValue },
          }
        );

        if (response.data.success) {
          const movieResults = response.data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            genre: movie.genre || "Movies", // Use the movie's genre or default to "Movies"
            link: `/movies/${movie.id}`,
            isMovie: true,
          }));

          setSearchResults((prevResults) => [...suggestions, ...movieResults]);

          // Update recent searches
          if (!recentSearches.some((item) => item.title === searchValue)) {
            const newRecentSearches = [searchValue, ...recentSearches];
            setRecentSearches(newRecentSearches.slice(0, 4)); // Limit to 4 recent searches
          }
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  const handleInputFocus = () => {
    if (searchResults.length > 0) setSearch(true); // Show search results on focus if there are results
  };

  const navbarClass = scroll ? "navbar scrolled" : "navbar";

  const handleClick = (result) => {
    navigate(result.link);
    setSearchResults([]); 
    setSearch(false);
    setSearchInputValue("");
  };

  return (
    <div className={navbarClass}>
      <div className="container">
        <div className="left">
          <Link to={"/"}>
            <h1>STREAMER</h1>
          </Link>
        </div>

        <div className="right">
          <div className="mobileSidebar">
            <MobileBurger />
          </div>
          <span className="navOptions moviesLink">
            <Link to={"/movies"}>Movies</Link>
            <div className="genre">
              {genre.map((g) => (
                <span key={g} value={g}>
                  <Link to={`/query?type=movies&genre=${g}`}>{g} Movies</Link>
                </span>
              ))}
            </div>
          </span>

          <span className="navOptions seriesLink">
            <Link to={"/series"}>Series</Link>
            <div className="genre">
              {genre.map((g) => (
                <span key={g} value={g}>
                  <Link to={`/query?type=series&genre=${g}`}>{g} Series</Link>
                </span>
              ))}
            </div>
          </span>

          <span className={`searchOption ${!openSearch ? "" : "closedSearch"}`}>
            <IoSearch
              className="search"
              onClick={() => setOpenSearch(!openSearch)}
            />

            <input
              type="search"
              placeholder="Movies, Series and more"
              value={searchInputValue}
              onChange={(e) => {
                setSearchInputValue(e.target.value); // Update state on input change
                handleSearchChange(e); // Call search handler
              }}
              onFocus={handleInputFocus}
              className="searchInput"
            />

            {search && (
              <div className="searchItem">
                <p className="recentSearched">Search Results</p>

                {searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <Link
                      to={result.isMovie ? result.link : result.link}
                      key={result.id}
                      onClick={() => handleClick(result)}
                    >
                      <p>
                        {result.title} <span className="searchType">/ </span>
                        <span className="searchValue">{result.genre}</span>
                      </p>
                    </Link>
                  ))
                ) : (
                  <p>No result found!</p>
                )}

                {recentSearches.length > 0 && (
                  <div className="recentSearches">
                    <p className="recentSearched">Recent Searches</p>
                    {recentSearches.map((recentSearch, index) => (
                      <Link
                        to={`/query?search=${recentSearch}`}
                        key={index}
                        onClick={() => handleClick({ title: recentSearch })}
                      >
                        <p>{recentSearch}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </span>

          <Link to="/subscriptions">
            <button className="subscribe">Subscriptions</button>
          </Link>
          {user ? (
            <button className="button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="button">Login</button>
            </Link>
          )}

          {user && (
            <Link to="/profile">
              <div className="user">
                <FaUser className="userIcon" />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
