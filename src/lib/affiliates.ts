export const AFFILIATE_TAGS = {
    amazon: "dealzo21-21",
    earnkaro: "4712345",
    flipkart: "dealzoshop",
    default: "dealzo21-21"
};

export function convertToAffiliateLink(url: string): string {
    if (!url) return '#';

    // Amazon
    if (url.includes("amazon.in") || url.includes("amzn.to") || url.includes("amazon.com")) {
        const tag = AFFILIATE_TAGS.amazon;
        if (url.includes("tag=")) {
            return url.replace(/tag=[^&]*/, `tag=${tag}`);
        }
        return url.includes("?") ? `${url}&tag=${tag}` : `${url}?tag=${tag}`;
    }

    // EarnKaro (Flipkart, Myntra, Ajio, etc.)
    // In a real app, you would use the EarnKaro API or link generator. 
    // For now, we'll append the ID if it's a supported store to demonstrate intent, 
    // or just return the link if no specific pattern is provided.
    const earnKaroStores = ['flipkart.com', 'myntra.com', 'ajio.com', 'croma.com', 'reliancedigital.in', 'tatacliq.com'];
    if (earnKaroStores.some(store => url.includes(store))) {
        // Placeholder for EarnKaro deep link logic
        // return `https://earnkaro.com/deep-link?r=${AFFILIATE_TAGS.earnkaro}&url=${encodeURIComponent(url)}`;
        return url;
    }

    return url;
}
