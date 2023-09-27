import './Error.scss';
import attention from '../../icons/attention.png';

type Props = {
  errorMessage: string,
}

export const Error:React.FC<Props> = ({ errorMessage }) => {
  return (
    <div className='Error'>
      <img src={attention} alt='attention' className='Error__Icon' />
      <h2>{errorMessage}</h2>
    </div>
  )
}