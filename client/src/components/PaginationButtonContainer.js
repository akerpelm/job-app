import { useAppContext } from "../context/appContext";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PaginationButtonContainer";

const PaginationButtonContainer = () => {
  const { pages, currentPage, changePage } = useAppContext();

  const buttonPages = Array.from({ length: pages }, (_, index) => {
    return index + 1;
  });

  const prevPage = () => {
    let newPage = currentPage - 1;
    if (newPage < 1) {
      newPage = 1;
    }
    changePage(newPage);
  };

  const nextPage = () => {
    let newPage = currentPage + 1;
    if (newPage > pages) {
      newPage = pages;
    }
    changePage(newPage);
  };

  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {buttonPages.map((pageNumber) => {
          return (
            <button
              type="button"
              className={
                pageNumber === currentPage ? "pageBtn active" : "pageBtn"
              }
              key={pageNumber}
              onClick={() => changePage(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button className="next-btn" onClick={nextPage}>
        <HiChevronDoubleRight />
        next
      </button>
    </Wrapper>
  );
};
export default PaginationButtonContainer;
