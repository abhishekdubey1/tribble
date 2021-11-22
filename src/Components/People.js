import { forwardRef } from "react";
import Highlighter from "./Highlighter";

const People = forwardRef(
  ({ people, id, input, cursor, setCursor, setSelected }, ref) => {
    return (
      people.length !== 0 && (
        <ul tabIndex="0" ref={ref}>
          {people.map((person, i) => {
            return (
              <li
                key={person.id}
                className={cursor === i ? "active" : null}
                onMouseEnter={() => setCursor(i)}
                onClick={() => setSelected(true)}
              >
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
  }
);

export default People;
