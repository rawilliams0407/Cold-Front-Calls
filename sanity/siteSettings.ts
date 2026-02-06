// Site Settings Schema for Upsell Configuration
// This file should be added to your Sanity studio/schemas directory

import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Cold Front Calls',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      initialValue: 'Cold Front Calls',
    }),
    defineField({
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'string',
      initialValue: 'Hunt the Front',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      initialValue: 'Engineered from my lathe to your lanyard...',
    }),
    defineField({
      name: 'upsellDuckCall',
      title: 'Upsell Duck Call',
      description: 'The Duck Call product shown when customer has Goose but no Duck in cart',
      type: 'reference',
      to: [{ type: 'product' }],
      options: {
        filter: 'category == "Duck"',
      },
    }),
    defineField({
      name: 'upsellGooseCall',
      title: 'Upsell Goose Call',
      description: 'The Goose Call product shown when customer has Duck but no Goose in cart',
      type: 'reference',
      to: [{ type: 'product' }],
      options: {
        filter: 'category == "Goose"',
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
});
