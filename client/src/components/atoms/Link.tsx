import Link from "next/link";

type LinkProps = {
  href: string;
  children: React.ReactNode | string;
  className?: string;
};

const LinkTag = ({ href, children, className }: LinkProps) => {
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
};

export default LinkTag;
