import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
  const paginationItems = () => {
    const pages = [];
    let startPage: number, endPage: number;

    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="paginationContainer">
      <button 
        className="paginationButtons"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      ><GrLinkPrevious className="paginationBtnIcon"/></button>
      {paginationItems().map((page, index) => (
        <button
          key={index}
          disabled={page === currentPage || page === '...'}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          style={page === currentPage ? paginationBtnCurrentItem  : paginationBtnNextItem}
        >{page}</button> 
      ))}
      <button 
        className="paginationButtons"
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
      ><GrLinkNext className="paginationBtnIcon"/></button>
    </div>
  );
};

const paginationBtnCurrentItem = {
  backgroundColor: "#fff", 
  border: "1px solid #fff", 
  borderRadius: "12px", 
  color: "#1f2739", 
  cursor: "pointer",
  fontSize: "11px",
  fontWeight: 'bold',
  height: "25px",
  width: "25px"
  
}

const paginationBtnNextItem = {
  backgroundColor: "transparent", 
  border: "none", 
  color: "#696b6f", 
  cursor: "pointer",
  fontWeight: 'bold' 
}