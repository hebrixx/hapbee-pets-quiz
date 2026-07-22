import { useId } from "react";
import styles from "./HQInput.module.css";

function HQInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error = "",
  helperText = "",
  disabled = false,
  required = false,
  autoComplete,
  inputMode,
  name,
  id,
  className = "",
  ...props
}) {
  const generatedId = useId();
  const inputId = id || name || `hq-input-${generatedId.replace(/:/g, "")}`;
  const descriptionId = error
    ? `${inputId}-error`
    : helperText
      ? `${inputId}-helper`
      : undefined;

  const wrapperClasses = [
    styles.field,
    error ? styles.hasError : "",
    disabled ? styles.isDisabled : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClasses}>
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </label>
      )}

      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className={styles.input}
        aria-invalid={Boolean(error)}
        aria-describedby={descriptionId}
        {...props}
      />

      {error ? (
        <p id={`${inputId}-error`} className={styles.errorText} role="alert">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${inputId}-helper`} className={styles.helperText}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export default HQInput;
