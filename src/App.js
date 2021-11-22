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
      <SearchIcon />
      <input
        type="search"
        value={input}
        placeholder="Search users by ID, address, name..."
        onChange={(e) => setInput(e.target.value)}
      />
      <CrossIcon onClick={() => setInput("")} />
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
              <div className="item-highlight">{`"${id}" was found in items`}</div>
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

const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="gray"
      viewBox="0 0 48 48"
      width="18px"
      height="18px"
      className="icon-mag"
    >
      <path d="M 20.5 6 C 12.509634 6 6 12.50964 6 20.5 C 6 28.49036 12.509634 35 20.5 35 C 23.956359 35 27.133709 33.779044 29.628906 31.75 L 39.439453 41.560547 A 1.50015 1.50015 0 1 0 41.560547 39.439453 L 31.75 29.628906 C 33.779044 27.133709 35 23.956357 35 20.5 C 35 12.50964 28.490366 6 20.5 6 z M 20.5 9 C 26.869047 9 32 14.130957 32 20.5 C 32 23.602612 30.776198 26.405717 28.791016 28.470703 A 1.50015 1.50015 0 0 0 28.470703 28.791016 C 26.405717 30.776199 23.602614 32 20.5 32 C 14.130953 32 9 26.869043 9 20.5 C 9 14.130957 14.130953 9 20.5 9 z" />
    </svg>
  );
};

const CrossIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="gray"
      viewBox="0 0 48 48"
      width="22px"
      height="22px"
      className="icon-cancel"
      onClick={props.onClick}
    >
      <path d="M3.293,26.707a1,1,0,0,0,1.414,0L15,16.414,25.293,26.707a1,1,0,0,0,1.414-1.414L16.414,15,26.707,4.707a1,1,0,1,0-1.414-1.414L15,13.586,4.707,3.293A1,1,0,0,0,3.293,4.707L13.586,15,3.293,25.293A1,1,0,0,0,3.293,26.707Z"></path>
    </svg>
  );
};
