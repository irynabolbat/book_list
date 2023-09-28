import { useCallback, useContext, useState } from 'react';
import './FormPage.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Book } from '../../types/BookType';
import { Status } from '../../types/StatusEnum';
import * as booksServes from '../../api/books';
import * as authorServes from '../../api/authors';
import * as categoryServes from '../../api/categories';
import { AppContext } from '../../context/context';
import { Author } from '../../types/AuthorType';
import { Input } from './Input';
import { Loader } from '../../components/Loader/Loader';
import { createId } from '../../utils.ts/createId';
import { Category } from '../../types/CategoryType';
import leftArrow from '../../icons/left_arrow.png';
import { Error } from '../../components/Error/Error';
import { AuthorForm } from './AuthorForm';
import { CategoryForm } from './CategoryForm';
import { FormDataProp } from '../../types/FormDataProp';

export const FormPage = () => {
  const navigate = useNavigate();

  const { 
    books, setBooks, selectedBookId, setSelectedBookId, authors, setAuthors, categories 
  } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState<FormDataProp>({
    title: '',
    selectedAuthorId: '',
    newAuthor: '',
    selectedCategoryId: '',
    newCategory: '',
    isbn: '',
  });

  let bookTitle, bookAuthor, bookCategory, bookIsbn;
  
  if (selectedBookId) {
    bookTitle = findBookById(selectedBookId)?.title;
    bookAuthor = findBookById(selectedBookId)?.authorId?.toString();
    bookCategory = findBookById(selectedBookId)?.categoryId?.toString();
    bookIsbn = findBookById(selectedBookId)?.isbn?.toString();
  } else {
    bookTitle = ''
    bookAuthor = ''
    bookCategory = ''
    bookIsbn = ''
  }

  const [editData, setEditData] = useState({
    editTitle: bookTitle,
    editAuthor: bookAuthor,
    editCategory: bookCategory,
    editIsbn: bookIsbn,
  });
  

  const [errors, setErrors] = useState({
    title: '',
    author: '',
    category: '',
    isbn: '',
  })

  function findBookById(bookId: number | null): Book | undefined {
    return books.find(book => book.id === bookId);
  }

  function findAuthorById(authorId: number): Author | undefined {
    return authors.find(author => author.id === authorId);
  }

  function findCategoryById(categoryId: number) {
    return categories.find(category => category.id === categoryId);
  }

  const clearForm = () => {
    setFormData({
      title: '',
      selectedAuthorId: '',
      newAuthor: '',
      selectedCategoryId: '',
      newCategory: '',
      isbn: '',
    });

    setEditData({
      editTitle: '',
      editAuthor: '',
      editCategory: '',
      editIsbn: '',
    })
    setSelectedBookId(null);
  }

  const addBook = useCallback((createdBook: Book) => {
    setLoading(true);

    booksServes.createBook(createdBook)
      .then(newBook => {
        setBooks(currentBooks => [...currentBooks, newBook]);
      })
      .catch(() => {
        setErrorMessage('Unable to add a book');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const addAuthor = useCallback((createdAuthor: Author) => {
    setLoading(true);

    authorServes.createAuthor(createdAuthor)
      .then(newAuthor => {
        setAuthors(currentAuthors => [...currentAuthors, newAuthor]);
      })
      .catch(() => {
        setErrorMessage('Unable to add a author');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [])

  const addCategory = useCallback((createdCategory: Category) => {
    setLoading(true);

    categoryServes.createCategory(createdCategory)
      .then(newCategory => {
        setAuthors(currentCategories => [...currentCategories, newCategory]);
      })
      .catch(() => {
        setErrorMessage('Unable to add a category');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [])

  const updateBook = useCallback((updatedBook: Book) => {
    booksServes.updateBook(updatedBook)
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
        setErrorMessage('Unable to update a book');
      })
  }, []);

  function createNewBook() {
    const createdNewAuthor = ({
      id: createId(),
      name: formData.selectedAuthorId !== '' ? findAuthorById(+formData.selectedAuthorId)?.name || '' : formData.newAuthor || ''
    });
  
    const createdNewCategory = ({
      id: createId(),
      name: formData.selectedCategoryId !== '' ? findAuthorById(+formData.selectedCategoryId)?.name || '' : formData.newCategory || ''
    });

    const newBook = {
      id: createId(),
      title: formData.title,
      authorId: formData.selectedAuthorId !== '' ? +formData.selectedAuthorId : createdNewAuthor.id,
      categoryId: formData.selectedCategoryId ? +formData.selectedCategoryId : createdNewCategory.id,
      isbn: +formData.isbn,
      createdAt: new Date().toString(),
      modifiedAt: '--',
      status: Status.Active,
    };
    
    addAuthor(createdNewAuthor);
    addCategory(createdNewCategory);

    addBook(newBook);
  }

  function updateBookInfo() {
    const updatedBook = {
      id: selectedBookId || 0,
      title: editData.editTitle !== '' ? editData.editTitle! : findBookById(selectedBookId)?.title!,
      authorId: editData.editAuthor !== '' ? +editData.editAuthor! : findBookById(selectedBookId)?.authorId!,
      categoryId: editData.editCategory !== '' ? +editData.editCategory! : findBookById(selectedBookId)?.categoryId!,
      isbn: editData.editIsbn !== '' ? +editData.editIsbn! : findBookById(selectedBookId)?.isbn!,
      createdAt: findBookById(selectedBookId)?.createdAt || '',
      modifiedAt: new Date().toString(),
      status: findBookById(selectedBookId)?.status || '',
    };

    updateBook(updatedBook);
  }

  function checkForm() {
    const currentErrors = {...errors};

    if (formData.title.trim() === '' && editData.editTitle!.trim() === '') {
      currentErrors.title = '*Book title cannot be empty';
    } else {
      currentErrors.title = '';
    }

    if ((formData.selectedAuthorId === '' && formData.newAuthor.trim() === '') && editData.editAuthor!.trim() === '') {
      currentErrors.author = 'Choose the author or add a new one';
    } else {
      currentErrors.author = '';
    }

    if ((formData.selectedCategoryId === '' && formData.newCategory.trim() === '') && editData.editCategory!.trim() === '') {
      currentErrors.category = 'Choose the category or add a new one';
    } else {
      currentErrors.category = '';
    }

    if (formData.isbn.trim() === '' && editData.editIsbn!.trim() === '') {
      currentErrors.isbn = '*ISBN cannot be empty';
    } else {
      currentErrors.isbn = '';
    }

    if (formData.isbn.trim().length !== 13 && editData.editIsbn!.trim().length !== 13) {
      currentErrors.isbn = '*ISBN should have 13 digits';
    } else {
      currentErrors.isbn = '';
    }

    return currentErrors;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formErrors = checkForm();

    if (Object.values(formErrors).some((error) => error !== '')) {
      setErrors(formErrors);

      return;
    } 
    
    if (selectedBookId) {
      updateBookInfo()
    } else {
      createNewBook()
    }

    clearForm();
    navigate('/');
  }

  return (
    <div className='FormPage'>
      <h1 className='FormPage__Title'>
        {!selectedBookId
          ? 'Add a new book to the list'
          : 'Edit a book'
        }
      </h1>

      <div onClick={() => clearForm()}>
        <Link to='/' className='FormPage__BackLink'>
          <img src={leftArrow} alt='back' className='FormPage__Icon' />
          Back to list
        </Link>
      </div>
      
      {(!loading && errorMessage === '') 
        ? (
          <form onSubmit={handleSubmit} className='FormPage__Form'>
            <div className='FormPage__Form__Group'>
              <label htmlFor="title" className='FormPage__Form__Lable'>Book title:</label>
              {!selectedBookId
                ? <Input value={formData.title} setValue={value => setFormData({ ...formData, title: value })} />
                : <Input 
                    value={findBookById(selectedBookId)?.title} 
                    setValue={value => setEditData({ ...editData, editTitle: value })}
                  />
              }

              {(errors.title) && (
                <span className="FormPage__Form__Error">{errors.title}</span>
              )}
               
            </div>

            <AuthorForm
              formData={formData}
              setFormData={setFormData}
              findAuthorById={findAuthorById}
              findBookById={findBookById}
              error={errors.author}
            />

            <CategoryForm 
              formData={formData}
              setFormData={setFormData}
              findCategoryById={findCategoryById}
              findBookById={findBookById}
              error={errors.category}
            />

              <div className='FormPage__Form__Group'>
                <label htmlFor="isbn" className='FormPage__Form__Lable'>ISBN:</label>
                {!selectedBookId
                  ? <Input value={formData.isbn} setValue={value => setFormData({ ...formData, isbn: value })}/>
                  : <Input 
                      value={findBookById(selectedBookId)?.isbn?.toString()} 
                      setValue={value => setEditData({ ...editData, editIsbn: value })}
                    />
                }

                {(errors.isbn) && (
                  <span className="FormPage__Form__Error">{errors.isbn}</span>
                )}
              </div>

              {!selectedBookId 
                ? (
                  <button type="submit" className='FormPage__Form__Button'>
                    Add a Book
                  </button>
                ) 
                : (
                <div className='FormPage__Form__BtnsContainer'>
                  <button type="submit" className='FormPage__Form__Button'>
                    Edit Book
                  </button>

                  <button 
                    type="submit" 
                    className='FormPage__Form__Button FormPage__Form__CancelButton'
                    onClick={() => navigate('/')}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          )
          : <Loader />
        }  

        {errorMessage && <Error errorMessage={errorMessage} />}
    </div>
  )
}