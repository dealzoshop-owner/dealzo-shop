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
            // Try to extract ASIN for cleaner links
            const asinMatch = url.match(/\/dp\/([A-Z0-9]{10})/) || url.match(/\/gp\/product\/([A-Z0-9]{10})/);
            if (asinMatch) {
                return `https://www.amazon.in/dp/${asinMatch[1]}?tag=${AFFILIATE_TAGS.amazon}`;
            }

            // Fallback: append tag to existing URL
            if (url.includes("tag=")) {
                return url.replace(/tag=[^&]*/, `tag=${AFFILIATE_TAGS.amazon}`);
            }
            return url.includes("?") ? `${url}&tag=${AFFILIATE_TAGS.amazon}` : `${url}?tag=${AFFILIATE_TAGS.amazon}`;
        }

        // EarnKaro (Flipkart, Myntra, Ajio, etc.)
        // Using the user provided format: https://ekaro.in/enkr20240618/4712345?url=...
        // Note: The 'enkr...' part is usually specific to a campaign or user. 
        // Assuming 'enkr20240618' is a placeholder or specific campaign ID provided by user.
        // If dynamic generation is needed, we'd need the real API. 
        // For now, we use the format requested.

        const earnKaroStores = ['flipkart.com', 'myntra.com', 'ajio.com', 'croma.com', 'reliancedigital.in', 'tatacliq.com', 'vijaysales.com'];
        if (earnKaroStores.some(store => url.includes(store))) {
            return `https://ekaro.in/enkr20240618/${AFFILIATE_TAGS.earnkaro}?url=${encodeURIComponent(url)}`;
        }

        return url;
    } catch (e) {
        console.error("Affiliate link conversion error", e);
        return url;
    }
}
