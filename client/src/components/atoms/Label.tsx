type LabelProps = {
  htmlFor: string;
  text: string;
  labelClassName?: string;
};

const Label = ({ htmlFor, text, labelClassName }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400 ${labelClassName}`}
    >
      {text}
    </label>
  );
};

export default Label;
