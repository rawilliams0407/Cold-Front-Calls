import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
    dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
    useCdn: true, // set to `false` (for fresh data) or `true` (for fast data)
    apiVersion: '2023-05-03', // use a UTC date string
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
    return builder.image(source);
}

// Helper to fetch products
export async function getProducts() {
    const query = `*[_type == "product"] {
    id,
    title,
    price,
    category,
    "imageUrl": image.asset->url,
    "audioUrl": audioFile.asset->url
  }`;
    return await client.fetch(query);
}

// Helper for Site Settings
export async function getSiteSettings() {
    const query = `*[_type == "siteSettings"][0] {
    title,
    upsellDuckCall->,
    upsellGooseCall->
  }`;
    return await client.fetch(query);
}
