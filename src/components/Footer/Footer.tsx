import './Footer.scss';
import { Link } from 'react-router-dom';
import github from '../../icons/github_icon.png';

export const Footer = () => {
  return (
    <div className='Footer'>
      <Link to='https://github.com/irynabolbat' target='blank'>
        <img src={github} alt='github' className='Footer__Icon' />
      </Link>
    </div>
  )
}