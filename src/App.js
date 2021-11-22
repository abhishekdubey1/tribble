import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import "./App.css";

const url = "https://LonelyBumpyFlatassembler2.ad99526.repl.co";

function App() {
  const [input, setInput] = useState("");
  const [people, setPeople] = useState([]);

  const getUsers = useCallback(async () => {
    const { data } = await axios(`${url}/search/${input}`);
    console.log(data);
    if (data.people) {
      setPeople(data.people);
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
