import { useEffect, useState } from 'react';
import type { Book } from '../types/Book';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalNumBooks, setTotalNumBooks] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const totalPages = Math.ceil(totalNumBooks / pageSize);

  useEffect(() => {
    fetch(
      `https://localhost:7139/api/books?pageNum=${pageNum}&pageSize=${pageSize}&sortOrder=${sortOrder}`
    )
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.books);
        setTotalNumBooks(data.totalNumBooks);
      })
      .catch((err) => console.error('Error fetching books:', err));
  }, [pageNum, pageSize, sortOrder]);

  function handlePageSizeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setPageSize(Number(e.target.value));
    setPageNum(1);
  }

  function toggleSort() {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    setPageNum(1);
  }

  return (
    <div>
      <div className="d-flex align-items-center mb-3 gap-3">
        <label className="mb-0">Results per page:</label>
        <select
          className="form-select w-auto"
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th
              onClick={toggleSort}
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
              Title {sortOrder === 'asc' ? '▲' : '▼'}
            </th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
            <th>Classification</th>
            <th>Category</th>
            <th>Pages</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.bookId}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.isbn}</td>
              <td>{book.classification}</td>
              <td>{book.category}</td>
              <td>{book.pageCount}</td>
              <td>${book.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${pageNum === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => setPageNum((p) => p - 1)}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <li
              key={p}
              className={`page-item ${p === pageNum ? 'active' : ''}`}
            >
              <button className="page-link" onClick={() => setPageNum(p)}>
                {p}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${pageNum === totalPages ? 'disabled' : ''}`}
          >
            <button
              className="page-link"
              onClick={() => setPageNum((p) => p + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default BookList;
