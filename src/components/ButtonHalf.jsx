export default function ButtonHalf({ content, ...props }) {
	return (
		<button
			className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg text-center m-2"
			style={{ width: 'fit-content' }}
			{...props}
		>
			{content}
		</button>
	);
}
