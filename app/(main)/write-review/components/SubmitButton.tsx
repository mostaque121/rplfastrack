import React from "react";

type SubmitButtonProps = {
  isSubmitting: boolean;
  isDisabled: boolean;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isSubmitting,
  isDisabled,
}) => {
  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={`relative w-full bg-gradient-to-r cursor-pointer from-cyan-500 to-blue-600 text-white px-4 py-3 rounded-lg transition-all transform ${
        isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg"
      } active:scale-95 active:shadow-inner`}
    >
      {isSubmitting ? (
        <>
          <span className="absolute inset-0 flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0 0 8v4a8 8 0 0 1-8-8z"
              />
            </svg>
          </span>
          Submitting...
        </>
      ) : (
        "Submit Review"
      )}
    </button>
  );
};

export default SubmitButton;
