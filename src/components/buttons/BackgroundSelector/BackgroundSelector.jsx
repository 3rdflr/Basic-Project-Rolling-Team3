import { useState, useEffect } from 'react';
import { imagesAPI } from '../../../api';
import useFetch from '../../../hooks/useFetch';
import styles from './BackgroundSelector.module.css';
import checkIcon from '../../../assets/icons/check.png';

function BackgroundSelector({ onSelect, selectedTab, setSelectedTab }) {
	const [selectedColor, setSelectedColor] = useState(null);
	const [selectedImage, setSelectedImage] = useState(null);
	const [imageData, setImageData] = useState([]);

	const [isLoading, error, getImages] = useFetch(imagesAPI.getBackgrounds);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getImages();
				setImageData(data);
			} catch (error) {
				console.error('이미지 불러오기 실패:', error);
			}
		};
		fetchData();
	}, [getImages]);

	return (
		<div className={styles.container}>
			<div className={styles.toggles}>
				<button
					type="button"
					className={selectedTab === 'color' ? styles.activeTab : styles.inactiveTab}
					onClick={() => setSelectedTab('color')}
				>
					컬러
				</button>
				<button
					type="button"
					className={selectedTab === 'image' ? styles.activeTab : styles.inactiveTab}
					onClick={() => setSelectedTab('image')}
				>
					이미지
				</button>
			</div>
			{selectedTab === 'color' && (
				<div className={styles.palette}>
					{['beige', 'purple', 'blue', 'green'].map((color, idx) => (
						<div
							key={idx}
							className={`${styles.square} ${styles[color]} ${
								selectedColor === idx ? styles.selected : ''
							}`}
							onClick={() => {
								setSelectedColor(idx);
								setSelectedImage(null);
								onSelect({ backgroundColor: color, backgroundImageURL: '' });
							}}
						>
							{selectedColor === idx && (
								<img src={checkIcon} alt="선택됨" className={styles.checkIcon} />
							)}
						</div>
					))}
				</div>
			)}
			{selectedTab === 'image' && (
				<div className={styles.palette}>
					{isLoading && <p>이미지를 불러오고 있습니다.</p>}
					{error && <p>이미지를 불러오는데 실패했습니다.</p>}
					{imageData.map((url, idx) => (
						<div
							key={idx}
							className={`${styles.imageWrapper} ${styles.image} ${
								selectedImage === idx ? styles.selected : styles.notselected
							}`}
							onClick={() => {
								setSelectedImage(idx);
								setSelectedColor(null);
								onSelect(prev => ({
									...prev,
									backgroundColor: 'beige',
									backgroundImageURL: imageData[idx],
								}));
							}}
							style={{ backgroundImage: `url(${url})` }}
						>
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
