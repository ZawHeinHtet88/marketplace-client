import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const ImageAvatar = ({
  className,
  src,
  alt,
}: {
  className?: string;
  src: string;
  alt: string;
}) => {
  return (
    <Avatar className={cn("h-8 w-8", className)}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{alt}</AvatarFallback>
    </Avatar>
  );
};

export default ImageAvatar;
