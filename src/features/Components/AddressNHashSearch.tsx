import "./IndexComponents.css";
import SearchIcon from "../../assets/images/HashSearchIcon.svg"
import { useState, useEffect, useRef } from "react";
import { BASE_URL, basename } from "../../api/config";

interface SearchResult {
  id: number;
  hash: string;
  type: string;
  icon: string;
  url: string;
  actions: string[];
  balance?: number;
  fiatRate?: number;
  transactions?: number;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: {
    data: Array<{
      balance: number;
      fiat_rate: number;
      n_tx: number;
      received: number;
      token_id: number;
    }>;
    meta: {
      error_code: number;
      error_message: string;
      server_time: number;
    };
  };
  address?: string;
}

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isPastedRef = useRef(false);

  const exampleHash = "1Fw7wvVPhv5eioWQZ2if2zRUcHNdNBfu9r";

  const fetchTokenStats = async (address: string) => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const response = await fetch(
        // "https://dreamgroupsindia.com/dev/sterlingFraudSolutionBackend/api/blockchain/address/token-stats",     
        `${BASE_URL}/api/blockchain/address/token-stats`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ address }),
        }
      );

      const data: ApiResponse = await response.json();

      if (!data.success) {
        setErrorMessage("Address is not found");
        setShowResults(false);
        setSearchResults([]);
        setIsLoading(false);
        return;
      }

      if (data.data && data.data.data.length > 0) {
        // const tokenData = data.data.data[0];
        const mockResults: SearchResult[] = [
          {
            id: 1,
            hash: address,
            type: "BTC",
            icon: "👤",
            actions: ["Open Visualization"],
            url: `${basename}/visualization/new/${address}`,
            // balance: tokenData.balance,
            // fiatRate: tokenData.fiat_rate,
            // transactions: tokenData.n_tx,
          },
          {
            id: 2,
            hash: address,
            type: "BTC",
            icon: "🔄",
            actions: ["Open Explorer"],
            url: ``,
            // fiatRate: tokenData.fiat_rate,
            // transactions: tokenData.n_tx,
          },
        ];
        setSearchResults(mockResults);
        setShowResults(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching token stats:", error);
      setErrorMessage("Error fetching data. Please try again.");
      setShowResults(false);
      setIsLoading(false);
    }
  };

  const handleExampleClick = () => {
    if (searchValue.trim()) {
      // If search field has data, clear it
      setSearchValue("");
      setShowResults(false);
      setErrorMessage("");
    } else {
      // If search field is empty, show example hash
      setSearchValue(exampleHash);
      fetchTokenStats(exampleHash);
    }
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      fetchTokenStats(searchValue.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handlePaste = () => {
    isPastedRef.current = true;
  };

  useEffect(() => {
    if (isPastedRef.current && searchValue.trim()) {
      handleSearch();
      isPastedRef.current = false;
    }
  }, [searchValue]);

  return (
    <>
      <div className="HashSearch">
        <span className="search-icon">
          <img src={SearchIcon} alt="SearchIcon"/>
        </span>

        <input
          type="text"
          placeholder="Address & Transaction Hash"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            if (!e.target.value.trim()) {
              setShowResults(false);
            }
          }}
          onKeyPress={handleKeyPress}
          onPaste={handlePaste}
        />

        <button className="example-btn" onClick={handleExampleClick}>
          {searchValue.trim() ? "✕" : "Example Hash"}
        </button>
      </div>

      {errorMessage && (
        <div className="search-error-message">
          {errorMessage}
        </div>
      )}

      {isLoading && (
        <div className="search-loading">
          Loading...
        </div>
      )}

      {showResults && !isLoading && (
        <div className="search-results-container">
          {searchResults.map((result) => (
            <div key={result.id} className="search-result-item">
              <div className="result-header">
                <span className="result-icon">{result.icon}</span>
                <div className="result-info">
                  <span className="result-hash">{result.hash}</span>
                  <span className="result-type">{result.type}</span>
                  {result.balance && (
                    <div className="result-details">
                      <span className="detail-item">Balance: {(result.balance / 1e8).toFixed(8)} BTC</span>
                      {result.fiatRate && (
                        <span className="detail-item">Rate: ${result.fiatRate.toFixed(2)}</span>
                      )}
                      {result.transactions && (
                        <span className="detail-item">Transactions: {result.transactions}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="result-actions">
                {result.actions.map((action, idx) => (
                   <a key={idx} href={result.url} className="action-link">
                    {action} →
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchBar;