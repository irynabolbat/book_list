import { useContext, useState } from "react";
import { Book } from "../../types/BookType";
import { Category } from "../../types/CategoryType";
import { AppContext } from "../../context/context";
import { Input } from "./Input";
import close from '../../icons/close.png';
import { FormDataProp } from "../../types/FormDataProp";

type Props = {
  formData: {
    selectedCategoryId: string;
    newCategory: string;
  }, 
  setFormData:  React.Dispatch<React.SetStateAction<FormDataProp>>, 
  findCategoryById: (value: number) => Category | undefined, 
  findBookById: (value: number) => Book | undefined, 
  error: string,
}

export const CategoryForm:React.FC<Props> = ({
  formData, setFormData, findCategoryById, findBookById, error
}) => {
  const { selectedBookId, categories } = useContext(AppContext);

  const [isCategoryInputVisible, setIsCategoryInputVisible] = useState(false);
  const [isCategoryButtonVisible, setIsCategoryButtonVisible] = useState(true);

  const selectedBook = selectedBookId ? findBookById(selectedBookId) : null;
  const selectedCategory = selectedBook ? findCategoryById(selectedBook.categoryId!) : null;

  const handleAddCategoryToggle = () => {
    if (isCategoryInputVisible) {
      setIsCategoryInputVisible(false);
      setIsCategoryButtonVisible(true);

      if (!selectedBookId) {
        setFormData((prevState) => ({ 
          ...prevState, 
          newCategory: '' 
        }));
      }
    } else {
      setIsCategoryInputVisible(true);
      setIsCategoryButtonVisible(false);

      setFormData((prevState) => ({ 
        ...prevState, 
        selectedCategoryId: '' 
      }));
    }
  };

  const handleSelectCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = event.target.value;

    if (selectedCategoryId === '') {
      setIsCategoryInputVisible(false);
      setIsCategoryButtonVisible(true);
    }

    setFormData((prevState) => ({ 
      ...prevState, 
      selectedCategoryId
    }));
  };

  return (
    <div className='FormPage__Form__Group'>
      <label htmlFor="category" className='FormPage__Form__Lable'>Category:</label>
        <div className='FormPage__Form__Container'>
          <select
            id="category"
            name="category"
            value={formData.selectedCategoryId !== '' ? +formData.selectedCategoryId : ""}
            onChange={(event) => handleSelectCategoryChange(event)}
            className={isCategoryInputVisible ? 'FormPage__Form__Select FormPage__Form__Select__Disabled' : 'FormPage__Form__Select'}
            disabled={isCategoryInputVisible}
          >
            <option value="">
              {!selectedBookId
                ? 'Select Category'
                : selectedCategory?.name
              }
            </option>

            {categories.map((category) => (
              <option value={category.id} key={category.id} className='FormPage__Form__Option'>
                {category.name}
              </option>
            ))}
          </select>

          {!selectedBookId && (
            isCategoryInputVisible ? (
              <>
                <Input
                  value={formData.newCategory}
                  setValue={(value) => setFormData((prevState) => ({ 
                    ...prevState, 
                    newCategory: value
                  }))}
                  placeholder={'Add a new category'}
                />
                <button onClick={handleAddCategoryToggle} className="FormPage__Form__CloseButton">
                  <img src={close} alt="close" className="FormPage__Form__CloseIcon" />
                </button>
              </>
            ) : (
              <button onClick={handleAddCategoryToggle} className="FormPage__Form__AddButton">
                {isCategoryButtonVisible 
                  ? "+ add new category" 
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