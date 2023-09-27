import { useContext, useEffect, useState } from 'react';
import './DashboardPage.scss';
import { Link } from 'react-router-dom';
import { Status } from '../../types/StatusEnum';
import { BooksTable } from '../../components/BooksTable/BooksTable';
import { filteredBooks } from '../../utils.ts/filteredBooks';
import * as bookServes from '../../api/books';
import * as authorServes from '../../api/authors';
import * as categoryServes from '../../api/categories';
import { Loader } from '../../components/Loader/Loader';
import { AppContext } from '../../context/context';
import plus from '../../icons/plus.png';
import { Error } from '../../components/Error/Error';

export const DashboardPage = () => {
  const { books, setBooks, setAuthors, setCategories } = useContext(AppContext);
  const [filter, setFilter] = useState<Status | string>(Status.Active);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  useEffect(() => {
    setLoading(true);
    bookServes.getBooks()
      .then(setBooks)
      .catch(() => {
        setErrorMessage('Unable to load data');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    authorServes.getAuthors()
      .then(setAuthors)
      .catch(() => {
        setErrorMessage('Unable to load data');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    categoryServes.getCategories()
      .then(setCategories)
      .catch(() => {
        setErrorMessage('Unable to load data');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const visibleBooks = (filteredBooks(books, filter));

  return (
    <div className='Dashboard'>
      <h1 className='Dashboard__Title'>Dashboard</h1>

      <Link to='/add_book' className='Dashboard__Link'>
        <img src={plus} alt='plus' className='Dashboard__Icon' />
        Add new book
      </Link>

      <div className='Dashboard__Filter'>
        <label htmlFor="filter" className='Dashboard__Filter__Label'>Filter:</label>
        <select 
          id="filter" 
          onChange={(event) => handleFilterChange(event.target.value)} 
          value={filter}
          className='Dashboard__Filter__Select'
        >
          <option value={Status.All} className='Dashboard__Filter__Option'>Show All</option>
          <option value={Status.Active} className='Dashboard__Filter__Option'>Show Active</option>
          <option value={Status.Deactivated} className='Dashboard__Filter__Option'>Show Deactivated</option>
        </select>
      </div>

      <div className='Dashboard__Counter'>
        {`${visibleBooks.length} ${visibleBooks.length <= 1 ? 'book' : 'books'} 
        from ${books.length} ${visibleBooks.length <= 1 ? 'is' : 'are'} shown`}
      </div>

      {(!loading && errorMessage === '') 
      ? <BooksTable 
          books={visibleBooks} 
        />
      : <Loader />
      }

      {errorMessage && <Error errorMessage={errorMessage} />}
    </div>
  )
}