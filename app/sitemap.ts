// import { API } from '@/constants/api'
// import Path from '@/constants/paths'
// import { Blog } from '@/types/blog';
// import { Product } from '@/types/product';
// import type { MetadataRoute } from 'next'
 
// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//     const blogsData = await fetch(`http://localhost:5000/${API.GET_BLOGS}`);
//     const blogsRespone: Blog[] = await blogsData.json();
//     const productsData = await fetch(`http://localhost:5000/${API.GET_PRODUCTS}`);
//     const productsRespone: Product[] = await productsData.json();

//     const blogEntries : MetadataRoute.Sitemap = blogsRespone.map(({id}) => ({
//         url: `${process.env.NEXT_PUBLIC_BASE_URL}${Path.BLOG}/${id}`
//     }))

//     const productEntries : MetadataRoute.Sitemap = productsRespone.map(({id}) => ({
//         url: `${process.env.NEXT_PUBLIC_BASE_URL}${Path.PRODUCT}/${id}`
//     }))

//   return [
//     {
//       url: (process.env.NEXT_PUBLIC_BASE_URL as string),
//       lastModified: new Date(),
//       changeFrequency: 'monthly',
//       priority: 1,
//     },
//     {
//       url: `${process.env.NEXT_PUBLIC_BASE_URL}${Path.ABOUT}`,
//       lastModified: new Date(),
//       changeFrequency: 'yearly',
//       priority: 0.8,
//     },
//     {
//       url: `${process.env.NEXT_PUBLIC_BASE_URL}${Path.BLOG}`,
//       lastModified: new Date(),
//       changeFrequency: 'weekly',
//       priority: 0.5,
//     },
//     {
//         url: `${process.env.NEXT_PUBLIC_BASE_URL}${Path.PRODUCT}`,
//         lastModified: new Date(),
//         changeFrequency: 'daily',
//         priority: 0.5,
//       },
//       ...blogEntries,
//       ...productEntries,
//   ]
// }