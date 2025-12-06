export const AFFILIATE_TAGS = {
    amazon: "dealzo21-21",
    earnkaro: "4712345",
    flipkart: "dealzoshop",
    default: "dealzo21-21"
};

export function convertToAffiliateLink(url: string): string {
    if (!url) return '#';

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
        return `https://ekaro.in/enkr20240618/${AFFILIATE_TAGS.earnkaro}?url=${encodeURIComponent(url)}`;

    } catch (e) {
        console.error("Affiliate link conversion error", e);
        return url;
    }
}
