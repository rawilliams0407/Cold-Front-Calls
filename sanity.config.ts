import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import product from './sanity/schema';
import siteSettings from './sanity/siteSettings';

export default defineConfig({
    name: 'default',
    title: 'Cold Front Calls',

    projectId: process.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
    dataset: process.env.VITE_SANITY_DATASET || 'production',

    plugins: [deskTool(), visionTool()],

    schema: {
        types: [product, siteSettings],
    },
});
