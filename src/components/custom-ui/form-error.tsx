interface FormErrorProps {
  message?: string;
}

export function FormError({ message }: FormErrorProps) {
  if (!message || message.length < 1) return null;

  return (
    <p className="mt-1 flex items-center gap-1 text-sm text-destructive">
      <span className="text-destructive">⚠</span>
      {message}
    </p>
  );
}
