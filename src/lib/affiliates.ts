export const AFFILIATE_TAGS = {
    amazon: "dealzo21-21",
    earnkaro: "4712345",
    flipkart: "dealzoshop",
    default: "dealzo21-21"
};

export function convertToAffiliateLink(rawUrl: string | null | undefined): string {
    if (!rawUrl || typeof rawUrl !== "string") return '';

    const url = rawUrl.trim();

    // Guard: must be http(s)
    if (!url.startsWith("http")) return url;

    try {
        // Amazon
        if (url.includes("amazon.in") || url.includes("amzn.to") || url.includes("amazon.com")) {
            const asinMatch = url.match(/\/dp\/([A-Z0-9]{10})/) || url.match(/\/gp\/product\/([A-Z0-9]{10})/);
            if (asinMatch) {
                return `https://www.amazon.in/dp/${asinMatch[1]}?tag=${AFFILIATE_TAGS.amazon}`;
            }
            if (url.includes("tag=")) {
                return url.replace(/tag=[^&]*/, `tag=${AFFILIATE_TAGS.amazon}`);
            }
            return url.includes("?") ? `${url}&tag=${AFFILIATE_TAGS.amazon}` : `${url}?tag=${AFFILIATE_TAGS.amazon}`;
        }

        // Flipkart (EarnKaro)
        if (url.includes("flipkart.com")) {
            return `https://ekaro.in/enkr20240618/${AFFILIATE_TAGS.earnkaro}?url=${encodeURIComponent(url)}`;
        }

        // Catch-all for other stores (Myntra, Ajio, Croma, etc.) via EarnKaro
        // This ensures we try to monetize every link
        if (url.includes("myntra") || url.includes("ajio") || url.includes("croma") || url.includes("tatacliq") || url.includes("reliancedigital")) {
            return `https://ekaro.in/enkr20240618/${AFFILIATE_TAGS.earnkaro}?url=${encodeURIComponent(url)}`;
        }

        // If it's a valid URL but not a specific partner store, return it as is (direct link)
        // This prevents "0 results" by keeping the product even if we can't monetize it yet.
        return url;

    } catch (e) {
        console.error("Affiliate link conversion error", e);
        return url;
    }
}
