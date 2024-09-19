import React from "react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="d-flex justify-content-center align-items-center mb-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn btn-primary mx-2"
      >
        Previous
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`btn mx-1 ${
            currentPage === number ? "btn-secondary" : "btn-outline-primary"
          }`}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn btn-primary mx-2"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
