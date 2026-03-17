import { getCleanImageUrl } from "@/utils/formatUrl";
import NextImage, { ImageProps as NextImageProps } from "next/image";

interface ImageProps extends Omit<NextImageProps, "src"> {
    src: string;
}

export default function Image({ src, alt, ...props }: ImageProps) {
    return (
        <NextImage
            src={getCleanImageUrl(src)}
            alt={alt}
            {...props}
        />
    )
}
