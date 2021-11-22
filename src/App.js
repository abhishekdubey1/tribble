import axios from "axios";
import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";
import People from "./Components/People";
import ErrorBoundary from "./Components/ErrorBoundary";
import { CrossIcon, SearchIcon } from "./Components/Svgs";
const url = "https://lonelybumpyflatassembler2.ad99526.repl.co";

function App() {
  const [input, setInput] = useState("");
  const [people, setPeople] = useState([]);
  const [id, setId] = useState("");
  const [cursor, setCursor] = useState(-1);
  const [selected, setSelected] = useState(false);

  const ref = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.querySelectorAll("li")[cursor].scrollIntoView();
    }
  }, [cursor]);

  const getUsers = useCallback(async () => {
    try {
      const { data } = await axios(`${url}/search/${input}`);
      console.log(data);
      if (data.people) {
        setPeople(data.people);
      }
      if (data.id) {
        setId(data.id);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [input]);

  useEffect(() => {
    let timer = setTimeout(() => {
      if (input) {
        getUsers();
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [getUsers, input]); //Debounce on input change

  useEffect(() => {
    if (selected === false) {
      inputRef.current.focus();
    }
  }, [selected]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        return setSelected(true);
      }
      // arrow up/down button should select next/previous list element
      if (e.keyCode === 38 && cursor > 0) {
        setCursor((c) => c - 1);
      } else if (e.keyCode === 40 && cursor < people.length - 1) {
        setCursor((c) => c + 1);
      }
    },
    [cursor, people.length]
  );

  if (selected && people[cursor]?.id) {
    return (
      <div className="container card">
        <CrossIcon onClick={() => setSelected(false)} />
        <h1>Name: {people[cursor]?.name}</h1>
        <p>Address: {people[cursor]?.address}</p>
        <ol className="items">
          {people[cursor]?.items.map((item, idx) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div className="App">
      <ErrorBoundary>
        <div className="container">
          <SearchIcon />
          <input
            type="search"
            value={input}
            ref={inputRef}
            placeholder="Search users by ID, address, name..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <CrossIcon onClick={() => setInput("")} />
          {input.trim() && people.length === 0 && (
            <div className="no-result">No results found </div>
          )}
          <People
            people={people}
            id={id}
            input={input}
            ref={ref}
            cursor={cursor}
            setCursor={setCursor}
            setSelected={setSelected}
          />
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default App;
