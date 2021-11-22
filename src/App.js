import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import "./App.css";

const url = "https://lonelybumpyflatassembler2.ad99526.repl.co";

function App() {
  const [input, setInput] = useState("");
  const [people, setPeople] = useState([]);

  const getUsers = useCallback(async () => {
    try {
      const { data } = await axios(`${url}/search/${input}`);
      console.log(data);
      if (data.people) {
        setPeople(data.people);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [input]);

  useEffect(() => {
    if (input) {
      getUsers();
    }
  }, [getUsers, input]);
  return (
    <div className="App">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <ul>
        {people.map((person) => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

const getHighlightedText = (text, highlight, className) => {
  // Split text on highlight term, include term itself into parts, ignore case
  const parts = text?.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {parts?.map((part) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span className={className}>{part}</span>
        ) : (
          <>{part}</>
        )
      )}
    </span>
  );
};

const Highlighter = ({
  condition,
  sentence,
  highlight,
  className = "highlight",
}) => {
  if (condition) {
    return getHighlightedText(sentence, highlight, className);
  }
  return sentence || "";
};
