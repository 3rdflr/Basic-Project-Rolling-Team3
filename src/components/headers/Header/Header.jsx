import Button from '../../buttons/Button/Button';

import { Link } from 'react-router';

import icon from '../../../assets/icons/logo.svg';
import styles from './Header.module.css';

function Header({ isForm }) {
	return (
		<div className={styles.header}>
			<div className={styles.content}>
				<Link to={'/'}>
					<img src={icon} alt="롤링 로고" />
				</Link>
				{isForm && <Button style={'button'} linkTo={'/post'} text={'롤링 페이퍼 만들기'} />}
			</div>
		</div>
	);
}

export default Header;
