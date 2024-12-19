export const EditorButton = ({ icon: Icon, onClick, ariaLabel, isActive }) => {
  return (
    <button
      type="button"
      onMouseDown={(event) => {
        event.preventDefault();
        event.stopPropagation();
        if (typeof onClick === "function") onClick();
      }}
      aria-label={ariaLabel}
      aria-pressed={isActive}
      className={`${isActive ? "bg-gray-300" : "bg-transparent"} border-0 cursor-pointer p-2 hover:bg-gray-200`}
    >
     {typeof Icon === "function" ? <Icon /> : Icon}
    </button>
  );
};
