import moment from 'moment';
import { Book } from '../../types/BookType';
import './BooksTable';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../context/context';
import { Status } from '../../types/StatusEnum';
import edit from '../../icons/edit_icon.png';

type Props = {
  book: Book,
  removeBook: (bookId: number) => void,
  updateBook: (book: Book) => void,
  setIsModalOpened: (value: boolean) => void
}

export const TableRow:React.FC<Props> = ({ book, removeBook, updateBook, setIsModalOpened }) => {
  const { 
    setSelectedBookId, authors, categories,
  } = useContext(AppContext);

  function getAuthorById(id: number | null) {
    return authors.find(author => author.id === id)?.name || null;
  }

  function getCategoryById(id: number | null) {
    return categories.find(category => category.id === id)?.name || null;
  }

  const handleDeactivate = (book: Book) => {
    updateBook({
      ...book,
      status: Status.Deactivated,
    })
  }

  const handleReactivate = (book: Book) => {
    updateBook({
      ...book,
      status: Status.Active,
    })
  }

  const deleteBook = (bookId: number) => {
    removeBook(bookId);
    setIsModalOpened(true);
  }

  return (
    <tr key={book.id} className='Table__Row'>
      <td className='Table__Cell'>{book.title}</td>
      <td className='Table__Cell'>
        {getAuthorById(book.authorId)}
      </td>
      <td className='Table__Cell'>
        {getCategoryById(book.categoryId)}
      </td>
      <td className='Table__Cell'>{book.isbn}</td>
      <td className='Table__Cell'>{moment(book.createdAt).format('DD MMMM YYYY, h:mmA')}</td>
      <td>{book.modifiedAt !== '--' ? moment(book.modifiedAt).format('DD MMMM YYYY, h:mmA') : '--'}</td>
      <td className='Table__Cell Table__Buttons'>
        <button onClick={() => setSelectedBookId(book.id)} className='Table__Button Table__Edit'>
          <Link to={`/edit_book/${book.id}`}>
            <img src={edit} alt='Edit' className='Table__Icon' />
          </Link>
        </button>

        {book.status === Status.Active && (
          <button onClick={() => handleDeactivate(book)} className='Table__Button Table__Deactivate'>
            Deactivate
          </button>
        )}

        {book.status === Status.Deactivated && (
          <button onClick={() => handleReactivate(book)} className='Table__Button Table__Reactivate'>
            Re-Activate
          </button>
          )}

          {book.status === Status.Deactivated && (
            <button onClick={() => deleteBook(book.id)} className='Table__Button Table__Delete'>
              Delete
            </button>
          )}
      </td>
    </tr>
  );
};
