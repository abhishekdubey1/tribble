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

export default Highlighter;

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
