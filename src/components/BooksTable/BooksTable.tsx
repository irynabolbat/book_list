import { useCallback, useContext, useState } from 'react';
import { Book } from '../../types/BookType';
import './BooksTable.scss';
import { TableRow } from './TableRow';
import * as bookServes from '../../api/books';
import { AppContext } from '../../context/context';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import { Error } from '../Error/Error';

type Props = {
  books: Book[],
}

export const BooksTable:React.FC<Props> = ({ books }) => {
  const { setBooks } = useContext(AppContext);

  const [errorMessage, setErrorMessage] = useState('');

  const updateBook = useCallback((updatedBook: Book) => {
    bookServes.updateBook(updatedBook)
      .then(updBook => {
        setBooks(currentBooks => {
          const updatedBooks = currentBooks?.map(book => {
            if (book.id === updBook.id) {
              return updBook;
            }
            return book;
          });

          return updatedBooks || currentBooks;
        });
      })
      .catch(() => {
        setErrorMessage('Unable to update book');
      })
  }, []);

  const removeBook = useCallback((bookId: number) => {
    bookServes.deleteBook(bookId)
      .then(() => {
        setBooks((currentBooks: Book[]) => {
          return currentBooks.filter(book => book.id !== bookId);
        });
      })
      .catch(() => {
        setErrorMessage('Unable to delete a book');
      })
  }, []);

  const [isModalOpened, setIsModalOpened] = useState(false);

  return (
    <>
      {isModalOpened && <ModalWindow setIsModalOpened={setIsModalOpened} />}

      <div className='Wrapper'>
        <table className='Table'>
          <thead className='Table__Heared'>
            <tr>
              <th className='Table__Column'>Book title</th>
              <th className='Table__Column'>Author name</th>
              <th className='Table__Column'>Category</th>
              <th className='Table__Column'>ISBN</th>
              <th className='Table__Column'>Created At</th>
              <th className='Table__Column'>Modified/Edited At</th>
              <th className='Table__Column'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <TableRow 
                key={book.id}
                book={book}
                removeBook={removeBook}
                updateBook={updateBook}
                setIsModalOpened={setIsModalOpened}
              />
            ))}
          </tbody>
        </table>

        {errorMessage && <Error errorMessage={errorMessage} />}
      </div>
    </>
  )
}