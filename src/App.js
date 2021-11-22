import axios from "axios";
import { useState, useEffect, useCallback, memo } from "react";
import "./App.css";

const url = "https://lonelybumpyflatassembler2.ad99526.repl.co";

function App() {
  const [input, setInput] = useState("");
  const [people, setPeople] = useState([]);
  const [id, setId] = useState("");

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
      <People people={people} id={id} input={input} />
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

const People = ({ people, id, input }) => {
  return (
    people.length !== 0 && (
      <ul tabIndex="-1">
        {people.map((person, i) => {
          return (
            <li key={person.id}>
              <div>
                <Highlighter
                  sentence={person.id}
                  condition={person.keys?.includes("id")}
                  highlight={id || input}
                />
              </div>
              <div className="italic">
                <Highlighter
                  sentence={person.name}
                  condition={person.keys?.includes("name")}
                  highlight={id || input}
                  className="highlight italic"
                />
              </div>
              <div className="item-highlight">{`${id} was found in items`}</div>
              <div>
                <Highlighter
                  sentence={person.address}
                  condition={person.keys?.includes("address")}
                  highlight={id || input}
                />
              </div>
            </li>
          );
        })}
      </ul>
    )
  );
};
