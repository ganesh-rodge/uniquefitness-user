export default function Button({ content, ...props }) {
    return (
        <button
            className="block mx-auto w-full max-w-md px-8 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-sm text-center"
            {...props}
        >
            {content}
        </button>
    );
}