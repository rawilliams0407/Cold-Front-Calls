import { SanityContentSource } from '@stackbit/cms-sanity';

export default {
    stackbitVersion: '~0.6.0',
    ssgName: 'vite',
    nodeVersion: '20',
    contentSources: [
        new SanityContentSource({
            projectId: process.env.SANITY_PROJECT_ID || '',
            dataset: process.env.SANITY_DATASET || 'production',
            token: process.env.SANITY_ACCESS_TOKEN || '',
            rootPath: __dirname,
            models: [
                {
                    name: 'product',
                    type: 'document',
                    fields: [
                        { name: 'title', type: 'string', required: true },
                        { name: 'slug', type: 'slug', required: true },
                        { name: 'price', type: 'number', required: true },
                        { name: 'category', type: 'string', required: true },
                        { name: 'image', type: 'image', required: true },
                        { name: 'audioFile', type: 'file' }
                    ]
                },
                {
                    name: 'siteSettings',
                    type: 'document',
                    fields: [
                        { name: 'title', type: 'string' },
                        { name: 'heroHeadline', type: 'string' },
                        { name: 'heroTagline', type: 'string' },
                        { name: 'heroDescription', type: 'string' },
                        { name: 'upsellDuckCall', type: 'reference', to: 'product' },
                        { name: 'upsellGooseCall', type: 'reference', to: 'product' },
                        {
                            name: 'gallery',
                            type: 'list',
                            items: { type: 'image' }
                        }
                    ]
                }
            ]
        })
    ],
    modelExtensions: [
        { name: 'product', type: 'page', urlPath: '/shop' },
        { name: 'siteSettings', type: 'page', urlPath: '/' }
    ],
    siteMap: ({ documents, models }) => {
        const pageModels = models.filter((m) => m.type === "page");

        return documents
            .filter((d) => pageModels.some(m => m.name === d.modelName))
            .map((document) => {
                let urlPath = '/';
                if (document.modelName === 'product') {
                    urlPath = '/shop';
                }

                return {
                    stableId: document.id,
                    urlPath,
                    document,
                    isHomePage: document.modelName === 'siteSettings',
                };
            });
    }
};
