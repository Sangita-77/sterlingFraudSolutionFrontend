import "./IndexComponents.css";
import SearchIcon from "../../assets/images/HashSearchIcon.svg"

const SearchBar = () => {
  return (
    <div className="HashSearch">
      <span className="search-icon">
        <img src={SearchIcon} alt="SearchIcon"/>
      </span>

      <input
        type="text"
        placeholder="Address & Transaction Hash"
      />

      <button className="example-btn">Example Hash</button>
    </div>
  );
};

export default SearchBar;