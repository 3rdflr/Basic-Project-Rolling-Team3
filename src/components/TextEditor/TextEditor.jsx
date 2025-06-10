import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css'; // 에디터 스타일

function TextEditor({ value, onChange }) {
	const modules = {
		toolbar: [
			['bold', 'italic', 'underline'],
			[{ list: 'bullet' }, { list: 'ordered' }],
			[{ color: [] }],
			[{ align: [] }],
		],
	};

	const formats = ['bold', 'italic', 'underline', 'align', 'list', 'color'];

	return (
		<div>
			<ReactQuill
				value={value}
				onChange={onChange}
				modules={modules}
				formats={formats}
				placeholder="내용을 입력해 주세요."
			/>
		</div>
	);
}

export default TextEditor;
