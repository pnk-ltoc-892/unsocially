import { useState } from "react";

import { cn } from "@/lib/utils";
import { imageSrcSet, optimizeImageUrl } from "@/lib/image";

const FEED_SIZES = "(max-width: 768px) 92vw, 560px";
const DETAIL_SIZES = "(max-width: 768px) 92vw, 720px";

const PostImage = ({
    src,
    alt = "Post image",
    priority = false,
    variant = "feed",
    className,
}) => {
    const [loaded, setLoaded] = useState(false);
    const [failed, setFailed] = useState(false);

    if (!src || failed) return null;

    return (
        <div
            className={cn(
                "overflow-hidden rounded-[0.5rem] bg-white/5",
                variant === "detail" && "border border-white/15",
            )}
        >
            <img
                src={optimizeImageUrl(src, { width: variant === "detail" ? 1080 : 800 })}
                srcSet={imageSrcSet(src)}
                sizes={variant === "detail" ? DETAIL_SIZES : FEED_SIZES}
                alt={alt}
                loading={priority ? "eager" : "lazy"}
                fetchPriority={priority ? "high" : "auto"}
                decoding="async"
                onLoad={() => setLoaded(true)}
                onError={() => setFailed(true)}
                className={cn("post-image h-auto w-full object-cover", loaded && "is-loaded", className)}
            />
        </div>
    );
};

export default PostImage;
