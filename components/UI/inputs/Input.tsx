interface IInput {
  className?: string;
  label: string;
  placeholder: string;
  id: string;
  defaultValue?: string | number;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "url"
    | "search"
    | "file";
}
export default function Input({
  className = "",
  label,
  placeholder,
  type = "text",
  id,
  defaultValue,
}: IInput) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label
        className="text-sm font-semibold text-green-800 2xl:text-base"
        htmlFor="name"
      >
        {label}
      </label>
      <input
        className="rounded-xl border-2 border-green-300 px-3 py-1.5 text-green-700 shadow transition-colors outline-none focus:border-green-400"
        placeholder={placeholder}
        name={id}
        type={type}
        min={type === "number" ? 0 : undefined}
        defaultValue={defaultValue}
      />
    </div>
  );
}
