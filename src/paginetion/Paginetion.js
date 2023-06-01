import React, { useState, useEffect } from "react";

export default function Paginetion({ showperpage, onPaginetionChange, Total }) {
  const [counter, setCounter] = useState(1);
  const [numberOfButtons, setNumberOfButtons] = useState(
    Math.ceil(Total / showperpage)
  );
  useEffect(() => {
    const value = showperpage * counter;
    onPaginetionChange(value - showperpage, value);
  }, [counter]);
  const OnButtonClick = (type) => {
    if (type === "Prev") {
      if (counter < 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "Next") {
      if (numberOfButtons === counter) {
        setCounter(counter);
      } else {
        if (numberOfButtons <= counter) {
          setCounter(counter + 1);
        }
      }
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li className= {`page-item`}>
            <a className="page-link" onClick={() => OnButtonClick("Prev")}>
              Previous
            </a>
          </li>

          {new Array(numberOfButtons).fill("").map((el, index) => (
            <li
            className={`page-item ${index + 1 === counter ? "active" : null}`}
          >
              <a className="page-link">{index + 1}</a>
            </li>
          ))}
          <li className="page-item">
            <a className="page-link" onClick={() => OnButtonClick("Next")}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
