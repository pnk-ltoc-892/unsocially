const FEED_WIDTHS = [480, 800, 1080];

const isUnsplash = (url) =>
    url.includes("images.unsplash.com") || url.includes("plus.unsplash.com");

const isCloudinary = (url) =>
    url.includes("res.cloudinary.com") && url.includes("/image/upload/");

const withCloudinaryTransform = (url, width) => {
    const marker = "/image/upload/";
    const index = url.indexOf(marker);
    if (index === -1) return url;

    const transform = `f_auto,q_auto,c_limit,w_${width}`;
    const prefix = url.slice(0, index + marker.length);
    const after = url.slice(index + marker.length);

    if (after.startsWith("f_auto,q_auto,c_limit,w_")) {
        return `${prefix}${after.replace(/^f_auto,q_auto,c_limit,w_\d+\/?/, `${transform}/`)}`;
    }

    return `${prefix}${transform}/${after}`;
};

export function optimizeImageUrl(url, { width = 800, quality = 70 } = {}) {
    if (!url || typeof url !== "string") return url;
    if (url.startsWith("blob:") || url.startsWith("data:")) return url;

    try {
        if (isUnsplash(url)) {
            const parsed = new URL(url);
            parsed.searchParams.set("auto", "format");
            parsed.searchParams.set("fit", "crop");
            parsed.searchParams.set("w", String(width));
            parsed.searchParams.set("q", String(quality));
            return parsed.toString();
        }

        if (isCloudinary(url)) {
            return withCloudinaryTransform(url, width);
        }
    } catch {
        return url;
    }

    return url;
}

export function imageSrcSet(url, widths = FEED_WIDTHS) {
    if (!url) return undefined;
    return widths
        .map((width) => `${optimizeImageUrl(url, { width })} ${width}w`)
        .join(", ");
}
