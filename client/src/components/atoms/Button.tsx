type ButtonProps = {
  className?: string;
  type: "button" | "submit" | "reset";
  children: React.ReactNode | string;
  onClick?: () => void;
};

const Button = ({
  className,
  type = "button",
  children,
  onClick,
}: ButtonProps) => {
  return (
    <button type={type} className={`${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
