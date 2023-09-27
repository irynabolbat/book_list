import './FormPage.scss';

type Props = {
  value: string | number | undefined,
  setValue: (value: string) => void,
  placeholder?: string,
}

export const Input:React.FC<Props> = ({ 
  value, 
  setValue,
  placeholder
}) => {

  const hangleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  return (
    <input
      type="text"
      id="title"
      name="title"
      placeholder={placeholder}
      defaultValue={value}
      onChange={(event) => hangleChange(event)}
      className='FormPage__Form__Input'
    />
  )
} 