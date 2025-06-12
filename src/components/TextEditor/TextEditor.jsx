import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import styles from './TextEditor.module.css';

function TextEditor({ value, onChange, selectedFont }) {
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
		<div className={styles.editor}>
			<ReactQuill
				value={value}
				onChange={onChange}
				modules={modules}
				formats={formats}
				placeholder="내용을 입력해 주세요."
			/>
			<style jsx>{`
				.ql-editor {
					font-family: '${selectedFont}', sans-serif;
				}
			`}</style>
		</div>
	);
}

export default TextEditor;
