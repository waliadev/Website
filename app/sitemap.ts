import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {

  const baseUrl = "https://brokrdash.com";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/privacy-and-policy`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/expert-help`,
      lastModified: new Date(),
    },
  ];
}