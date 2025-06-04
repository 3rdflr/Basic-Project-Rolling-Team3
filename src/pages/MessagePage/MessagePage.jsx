import TextDropdown from '../../components/TextField/TextDropdown';

const options = ['Option 1', 'Option 2', 'Option 3'];
const [selectedOption, setSelectedOption] = useState(options[0]);

<TextDropdown options={options} value={selectedOption} onChange={setSelectedOption} />;
