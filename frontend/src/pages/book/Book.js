// import React, { useEffect } from 'react';
// import Nav from '../../components/navbar/Nav';
// import  {fetchBooks}  from '../../redux/actions/books/BookAction';
// import { useDispatch, useSelector } from 'react-redux';

// const Book = () => {
//   const dispatch = useDispatch();
//   const { loading, books, error, searchTerm } = useSelector((state) => state.booklist);

//   useEffect(() => {
//     dispatch(fetchBooks());
//   }, [dispatch]);

//   const filteredBooks = searchTerm ? books.filter((book) => book.title.toLowerCase().includes(searchTerm.toLowerCase()))
//     : books;

//   return (
//     <>
//       <Nav />
//       <div>
//         <h2 style={{ textAlign: 'center', margin: '20px 0', color: 'black' }}>View Books</h2>
//         <div className='cards-container' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
//           {loading ? (
//             <p>Loading books..</p>
//           ) : error ? (
//             <p>Error:{error}</p>
//           ) : filteredBooks.length > 0 ? (
//             filteredBooks.map((book) => (
//               <div key={book.id} className='card mb-3' style={{
//                 width: '18rem',
//                 margin: '10px',
//                 border: '1px solid #ddd',
//                 borderRadius: '8px',
//                transition: 'all 0.2s ease',
//                cursor:'pointer',
//                 overflow: 'hidden', 
//               }}>


//                 {book.image && <img src={book.image} className='card-img-top' alt='' />}


//                 <div className='card-body' >
//                   <h5 className='card-title'>{book.title}</h5>
//                   <p className='card-text'>{book.description}</p>

//                   <p className='card-text'>
//                     <small className='text-muted'>price: {book.price}</small>

//                   </p>
//                   <p className='card-text'>
//                     <small className='text-muted'>By: {book.author}</small>
//                   </p>
//                 </div>
//               </div>

//             ))
//           ) : searchTerm ? (
//             <p>No matching books found</p>
//           ) : (
//             <p>No books</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };


// export default Book;// without details


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Nav from '../../components/navbar/Nav';
import  {fetchBooks}  from '../../redux/actions/books/BookAction';

const Book = () => {
  const dispatch = useDispatch();
  const { books, loading, error, currentPage, totalPages } = useSelector(state => state.booklist); // Assuming your Redux state has a slice named 'booklist'

  useEffect(() => {
    if (!loading && currentPage === null) {
      dispatch(fetchBooks(4)); // Fetch the first page of books initially
    }
  }, [dispatch, loading, currentPage]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(fetchBooks(page));
    }
  };

  return (
    <>
      <Nav />
      <div>
        <h2 style={{ textAlign: 'center', margin: '20px 0', color: 'black' }}>View Books</h2>
        <div className='cards-container' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          {loading ? (
            <p>Loading books..</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : books.length > 0 ? (
            books.map((book) => (
              <div key={book.id} className='card mb-3' style={{
                width: '18rem',
                margin: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                overflow: 'hidden',
              }}>
                {book.image && <img src={book.image} className='card-img-top' alt='' />}
                <div className='card-body' >
                  <h5 className='card-title'>{book.title}</h5>
                  <p className='card-text'>{book.description}</p>
                  <p className='card-text'>
                    <small className='text-muted'>Price: {book.price}</small>
                  </p>
                  <p className='card-text'>
                    <small className='text-muted'>By: {book.author}</small>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No books</p>
          )}
        </div>
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          {totalPages > 1 && (
            <div>
              <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
              <span>{currentPage} / {totalPages}</span>
              <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Book;