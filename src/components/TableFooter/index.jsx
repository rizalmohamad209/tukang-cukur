import React, { useEffect } from "react";

export default function TableFooter({ range, setPage, page, slice }) {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <div>
      <div className="bg-gray-300 p-5 items-center justify-center flex text-center gap-3">
        {range.map((el, index) => (
          <button
            key={index}
            className={
              page === el
                ? "bg-blue-700 px-3 py-2 rounded-lg"
                : "bg-gray-50  px-3 py-2 rounded-lg"
            }
            onClick={() => setPage(el)}
          >
            {el}
          </button>
        ))}
      </div>
    </div>
  );
}
