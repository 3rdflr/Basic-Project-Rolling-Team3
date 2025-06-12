import TextDropdown from '../../components/TextField/TextDropdown';

const options = ['Option 1', 'Option 2', 'Option 3'];
const [selectedOption, setSelectedOption] = useState(options[0]);

<TextDropdown options={options} value={selectedOption} onChange={setSelectedOption} />;

{
	selectedTab === 'image' && (
		<div className={styles.imagePalette}>
			{loading && <p>Loading...</p>}
			{error && <p>Error loading images</p>}
			{imageData?.imageUrls?.map((url, idx) => (
				<div
					key={idx}
					className={`${styles.imageWrapper} ${selectedImage === idx ? styles.selected : ''}`}
					onClick={() => {
						setSelectedImage(idx);
						setSelectedColor(null);
						onSelect({ backgroundColor: '', backgroundImageURL: url });
					}}
				>
					<img className={styles.image} src={url} alt={`Image ${idx}`} />
					{selectedImage === idx && (
						<img src={checkIcon} alt="선택됨" className={styles.checkIcon} />
					)}
				</div>
			))}
		</div>
	);
}
