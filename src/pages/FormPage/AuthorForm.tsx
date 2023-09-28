import { useContext, useState } from "react";
import './FormPage.scss';
import { AppContext } from "../../context/context";
import { Input } from "./Input";
import close from '../../icons/close.png';
import { Book } from "../../types/BookType";
import { Author } from "../../types/AuthorType";
import { FormDataProp } from "../../types/FormDataProp";

type Props = {
  formData: {
    selectedAuthorId: string;
    newAuthor: string;
  }, 
  setFormData: React.Dispatch<React.SetStateAction<FormDataProp>>, 
  findAuthorById: (value: number) => Author | undefined, 
  findBookById: (value: number) => Book | undefined, 
  error: string,
}

export const AuthorForm:React.FC<Props> = ({ 
  formData, setFormData, findAuthorById, findBookById, error,
}) => {
  const { selectedBookId, authors } = useContext(AppContext);

  const [isAddAuthorInputVisible, setIsAddAuthorInputVisible] = useState(false);
  const [isAddAuthorButtonVisible, setIsAddAuthorButtonVisible] = useState(true);

  const selectedBook = selectedBookId ? findBookById(selectedBookId) : null;
  const selectedAuthor = selectedBook ? findAuthorById(selectedBook.authorId!) : null;

  const handleAddAuthorToggle = () => {
    if (isAddAuthorInputVisible) {
      setIsAddAuthorInputVisible(false);
      setIsAddAuthorButtonVisible(true);

      if (!selectedBookId) {
        setFormData((prevState) => ({ 
          ...prevState, newAuthor: '' 
        }));
      }
    } else {
      setIsAddAuthorInputVisible(true);
      setIsAddAuthorButtonVisible(false);

      setFormData((prevState) => ({ 
        ...prevState, 
        selectedAuthorId: '' 
      }));
    }
  };

  const handleSelectAuthorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAuthorId = event.target.value;

    if (selectedAuthorId === '') {
      setIsAddAuthorInputVisible(false);
      setIsAddAuthorButtonVisible(true);
    }

    setFormData((prevState) => ({ 
      ...prevState, 
      selectedAuthorId
    }));
  };

  return (
    <div className='FormPage__Form__Group'>
      <label htmlFor="author" className='FormPage__Form__Lable'>Author name:</label>
        <div className='FormPage__Form__Container'>
          <select
            id="author"
            name="author"
            value={formData.selectedAuthorId !== '' ? +formData.selectedAuthorId : ""}
            onChange={(event) => handleSelectAuthorChange(event)}
            className={isAddAuthorInputVisible ? 'FormPage__Form__Select FormPage__Form__Select__Disabled' : 'FormPage__Form__Select'}
            disabled={isAddAuthorInputVisible}
          >
            <option value="">
              {!selectedBookId
                ? 'Select Author'
                : selectedAuthor?.name
              }
            </option>

            {authors.map((author) => (
              <option value={author.id} key={author.id} className='FormPage__Form__Option'>
                {author.name}
              </option>
            ))}
          </select>

          {!selectedBookId && (
            isAddAuthorInputVisible ? (
              <>
                <Input
                  value={formData.newAuthor}
                  setValue={(value) => setFormData((prevState) => ({ 
                    ...prevState, 
                    newAuthor: value
                  }))}
                  placeholder={'Add a new author'}
                />
                <button onClick={handleAddAuthorToggle} className="FormPage__Form__CloseButton">
                  <img src={close} alt="close" className="FormPage__Form__CloseIcon" />
                </button>
              </>
            ) : (
              <button onClick={handleAddAuthorToggle} className="FormPage__Form__AddButton">
                {isAddAuthorButtonVisible 
                  ? "+ add new author" 
                  : <img src={close} alt="close" className="FormPage__Form__CloseIcon" />
                }
              </button>
            ))
          }
        </div>

        {(error) && (
          <span className="FormPage__Form__Error">{error}</span>
        )}
      </div>
  )
}