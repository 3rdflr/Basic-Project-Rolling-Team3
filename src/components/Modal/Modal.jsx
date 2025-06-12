import styles from './Modal.module.css';

const Modal = ({ children, onClose }) => {
	return (
		<div className={styles.modalOverlay} onClick={onClose}>
			<div className={styles.modalBox} onClick={e => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
};

export default Modal;
