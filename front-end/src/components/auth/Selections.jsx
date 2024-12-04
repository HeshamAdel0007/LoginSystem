import Link from "next/link";
import Image from "next/image";

const Selections = ({ ...props }) => {
  const Name = props.Name;
  const LinkClass = props.LinkClass;
  const Linkhref = props.Linkhref;
  const ImageSrc = props.ImageSrc;
  const ImgAlt = props.ImgAlt;
  return (
    <Link
      className={LinkClass}
      href={`${Name}/${Linkhref}`}
    >
      <Image
        src={ImageSrc.src}
        alt={ImgAlt}
        width={100}
        height={100}
      />
    </Link>
  );
}

export default Selections;