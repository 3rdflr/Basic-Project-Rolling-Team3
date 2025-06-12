import Button from '../../buttons/Button/Button';

import { Link } from 'react-router';

import icon from '../../../assets/icons/logo.svg';
import styles from './Header.module.css';
import LinkButton from '../../buttons/Button/LinkButton';

function Header({ isForm = false }) {
	return (
		<div className={styles.header}>
			<div className={styles.content}>
				<Link to={'/'}>
					<img src={icon} alt="롤링 로고" className={styles.img} />
				</Link>
				{!isForm ? (
					<LinkButton variant={'button'} linkTo={'/post'} children={'롤링 페이퍼 만들기'} />
				) : (
					<div></div>
				)}
			</div>
		</div>
	);
}

export default Header;
