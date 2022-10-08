import React from "react";

function closeIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      ></path>
    </svg>
  );
}

function plusIcon(exp) {
  return (
    <div
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title={exp ? "Add Expense" : "Add Income"}
    >
      <svg
        className={"w-7 h-7 hover:text-stone-400"}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    </div>
  );
}

function minusIcon(amount, selectedPeriod) {
  return (
    <div data-bs-toggle="tooltip" data-bs-placement="top" title="Remove Income">
      <svg
        className={
          "w-7 h-7 " +
          (amount <= 0 || selectedPeriod !== "This Month"
            ? " text-stone-400"
            : " hover:text-stone-400")
        }
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    </div>
  );
}

function deleteIcon(exp) {
  return (
    <div
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title={
        exp
          ? exp === "expense"
            ? "Delete Expense"
            : "Delete History"
          : "Delete Account"
      }
    >
      <svg
        className={"w-7 h-7   hover:text-stone-400"}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        ></path>
      </svg>
    </div>
  );
}

function penIcon(exp) {
  return (
    <div
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title={
        exp === "expense"
          ? "Rename Expense"
          : exp === "history"
          ? "Change History"
          : "Rename Account"
      }
    >
      <svg
        className={"w-7 h-7   hover:text-stone-400"}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        ></path>
      </svg>
    </div>
  );
}

function eyeIcon() {
  return (
    <svg
      className="w-7 h-7 absolute top-[33px] text-gray-700 right-[5px] hover:text-stone-400 z-index-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      ></path>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      ></path>
    </svg>
  );
}

function eyeOffIcon() {
  return (
    <svg
      className="w-7 h-7 absolute top-[33px] text-gray-700 right-[5px] hover:text-stone-400 z-index-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
      ></path>
    </svg>
  );
}

function arrowDownIcon() {
  return (
    <svg
      className="md:w-7 md:h-7 w-6 h-6 hover:text-stone-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 9l-7 7-7-7"
      ></path>
    </svg>
  );
}

function arrowUpIcon() {
  return (
    <svg
      className="md:w-7 md:h-7 w-6 h-6 hover:text-stone-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 15l7-7 7 7"
      ></path>
    </svg>
  );
}

function doubleArrowDownIcon() {
  return (
    <svg
      className="md:w-7 md:h-7 w-6 h-6 hover:text-stone-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
      ></path>
    </svg>
  );
}

export {
  closeIcon,
  plusIcon,
  minusIcon,
  deleteIcon,
  eyeIcon,
  eyeOffIcon,
  penIcon,
  arrowDownIcon,
  arrowUpIcon,
  doubleArrowDownIcon
};
