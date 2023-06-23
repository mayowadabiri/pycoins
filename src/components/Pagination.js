import goleft from "../assets/go-left.svg";
import goright from "../assets/go-right.svg";

const Pagination = ({
  data,
  currPage,
  prevPage,
  nextPage,
  handlePageSize,
  pageSize,
}) => {
  return (
    <div className="pagination">
      <p>Rows per page:</p>
      <select onChange={handlePageSize}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </select>
      <p>
        {(data?.page - 1) * 10 + 1} - {data?.pageSize * data?.page} of{" "}
        {data?.count}
      </p>
      <div className="pagination_img">
        <button onClick={prevPage} disabled={currPage === 1 ? true : false}>
          <img src={goleft} alt="go left" />
        </button>
        <button
          onClick={nextPage}
          disabled={currPage >= data?.noOfPages ? true : false}
        >
          <img src={goright} alt="go down" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
