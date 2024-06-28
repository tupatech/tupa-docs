import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Tupã Docs',
			social: {
				github: 'https://github.com/tupatech/tupa',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Fast start', link: '/guides/fast-start/' },
						{ label: 'New Routes', link: '/guides/new-routes/' },
						{ label: 'Routes Managers', link: '/guides/routes-managers/' },
						{ label: 'Middlewares', link: '/guides/middlewares/' },
						{ label: 'Global Middlewares', link: '/guides/global-middlewares/' },
						{ label: 'After Middlewares', link: '/guides/after-middlewares/' },
						{ label: 'Params and Query Params', link: '/guides/params-and-query-params/' },
						{ label: 'Context', link: '/guides/context' },
					],
				},
				// {
				// 	label: 'Reference',
				// 	autogenerate: { directory: 'reference' },
				// },
				{
					label: 'License',
					items: [
						{ label: 'MIT License', link: '/license/license' },
					]
				},
				{
					label: 'Contribute',
					items: [
						{ label: 'Contribute', link: '/contribute/contribute' },
					]
				},
				{
					label: 'Brand Assets',
					items: [
						{ label: 'Brand Assets', link: '/brand-assets/brand-assets' },
					]
				}
			],
			logo: { 
				src: '/public/tupa.wscqgWro.png',
			},
			favicon: '/favicon.png',
		}),
	],
});