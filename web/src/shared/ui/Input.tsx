import { CSSProperties } from "react";

interface InputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
}

export const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
}: InputProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label>{label}</label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          padding: 12,
          border: `1px solid ${error ? "red" : "#ccc"}`,
          borderRadius: 8,
        }}
      />

      {error && <span style={{ color: "red", fontSize: 12 }}>{error}</span>}
    </div>
  );
};