// eslint-disable-next-line react/prop-types
function Error({ message = "Something went wrong!" }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50 text-center p-6">
      {/* Error Icon */}
      <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center animate-bounce mb-6">
        <svg
          className="w-12 h-12 text-red-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M6.938 6.938a8 8 0 1111.313 11.313A8 8 0 016.938 6.938z"
          />
        </svg>
      </div>

      {/* Error Message */}
      <h2 className="text-3xl font-bold text-red-600 mb-4">Oops!</h2>
      <p className="text-gray-600 text-lg mb-6 max-w-lg">{message}</p>
    </div>
  );
}

export default Error;
