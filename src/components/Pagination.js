import styles from "./pagination.module.scss";
import PaginationSpinner from "./PaginationSpinner";

export default function Pagination({
  numberOfPages,
  currentPage,
  setCurrentPage,
  isLoading,
}) {
  const pageNumbers = [];
  const PreviousPageNumber = currentPage - 1;
  const NextPageNumber = currentPage + 1;

  for (let i = 1; i <= numberOfPages; i++) {
    if (i === numberOfPages || i === 1) {
      pageNumbers.push(i);
      continue;
    }

    if (i === currentPage || i === PreviousPageNumber || i === NextPageNumber) {
      pageNumbers.push(i);
      continue;
    }

    if (i === 2 && PreviousPageNumber - 1 >= 3) {
      pageNumbers.push("...");
      i = PreviousPageNumber - 1;
      continue;
    }

    if (i === NextPageNumber + 1 && numberOfPages - NextPageNumber >= 3) {
      pageNumbers.push("...");
      i = numberOfPages - 1;
      continue;
    }

    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      <ul className={styles["pagination__list"]}>
        <li
          className={styles["pagination__previous"]}
          onClick={() => {
            if (!isLoading) {
              setCurrentPage(Math.max(currentPage - 1, 1));
            }
          }}
        >
          Previous
        </li>
        {pageNumbers.map((number, index) => (
          <li
            className={
              number === currentPage
                ? styles["pagination__current-item"]
                : styles["pagination__item"]
            }
            key={index}
            onClick={() => {
              if (number !== "..." && !isLoading) {
                setCurrentPage(number);
              }
            }}
          >
            {isLoading && number === currentPage ? (
              <PaginationSpinner />
            ) : (
              number
            )}
          </li>
        ))}
        <li
          className={styles["pagination__next"]}
          onClick={() => {
            if (!isLoading) {
              setCurrentPage(Math.min(currentPage + 1, numberOfPages));
            }
          }}
        >
          Next
        </li>
      </ul>
    </div>
  );
}
