import React, { useState, useEffect } from "react";
import "./App.css";

const colors = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857",
];

function App() {
  const [quoteData, setQuoteData] = useState([]);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch(
          "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
        );
        const data = await response.json();
        setQuoteData(data.quotes);
        setQuoteIndex(Math.floor(Math.random() * data.quotes.length));
      } catch (error) {
        console.error("Error fetching quotes:", error.message);
      }
    };

    fetchQuotes();
  }, []);

  const showQuote = () => {
    setQuoteIndex(Math.floor(Math.random() * quoteData.length));
    setColorIndex(Math.floor(Math.random() * colors.length));
  };

  const backgroundColor = colors[colorIndex];
  const currentQuote = quoteData[quoteIndex] || { quote: "", author: "" };

  return (
    <div id="quote-box-wrapper" style={{ backgroundColor }}>
      <div id="quote-box">
        <span id="text" style={{ color: backgroundColor }}>
          <i className="fa fa-quote-left"></i> {currentQuote.quote}
        </span>
        <span id="author" style={{ color: backgroundColor }}>
          - {currentQuote.author}
        </span>
        <div id="buttons">
          <div id="icons">
            <a
              id="tweet-quote"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(
                `"${currentQuote.quote}" - ${currentQuote.author}`
              )}`}
              style={{ backgroundColor }}
            >
              <i className="fa fa-twitter"></i>
            </a>
            <a
              id="tumblr-quote"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.tumblr.com/widgets/share/tool"
              style={{ backgroundColor }}
            >
              <i className="fa fa-tumblr"></i>
            </a>
          </div>
          <button
            id="new-quote"
            onClick={showQuote}
            style={{ backgroundColor }}
          >
            New quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
