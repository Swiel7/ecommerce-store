import Image from "next/image";
import Link from "next/link";
import logo from "public/logo.svg";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src={logo}
        alt="TechVVave Store logo"
        className="h-7 w-auto md:h-8"
      />
    </Link>
  );
};

export default Logo;
