import { useState } from 'react';
import useGetData from '../../../hooks/useGetData';
import styles from './BackgroundSelector.module.css';
import checkIcon from '../../../assets/icons/check.png';

function BackgroundSelector() {
	const [selectedTab, setSelectedTab] = useState('color');
	const { data: imageData, loading, error } = useGetData('BACKGROUND_IMGS', 'GET');
	const [selectedColor, setSelectedColor] = useState(null);
	const [selectedImage, setSelectedImage] = useState(null);

	return (
		<div className={styles.container}>
			<div>
				<button
					className={selectedTab === 'color' ? styles.activeTab : styles.inactiveTab}
					onClick={() => setSelectedTab('color')}
				>
					컬러
				</button>
				<button
					className={selectedTab === 'image' ? styles.activeTab : styles.inactiveTab}
					onClick={() => setSelectedTab('image')}
				>
					이미지
				</button>
			</div>
			{selectedTab === 'color' && (
				<div className={styles.colorpalette}>
					{['orange', 'purple', 'blue', 'green'].map((color, idx) => (
						<div
							key={idx}
							className={`${styles.square} ${styles[color]} ${
								selectedColor === idx ? styles.selected : ''
							}`}
							onClick={() => setSelectedColor(idx)}
						>
							{selectedColor === idx && (
								<img src={checkIcon} alt="선택됨" className={styles.checkIcon} />
							)}
						</div>
					))}
				</div>
			)}
			{selectedTab === 'image' && (
				<div className={styles.imagePalette}>
					{loading && <p>Loading...</p>}
					{error && <p>Error loading images</p>}
					{imageData?.imageUrls?.map((url, idx) => (
						<div
							key={idx}
							className={`${styles.imageWrapper} ${selectedImage === idx ? styles.selected : ''}`}
							onClick={() => setSelectedImage(idx)}
						>
							<img className={styles.image} src={url} alt={`Image ${idx}`} />
							{selectedImage === idx && (
								<img src={checkIcon} alt="선택됨" className={styles.checkIcon} />
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default BackgroundSelector;
