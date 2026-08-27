# 19 - Image Compression & Media Optimization

## 🎯 Why It Matters
Unoptimized, multi-megabyte raw images are the #1 cause of slow page load times and bloated network transfer costs. Compressing assets and serving modern image formats (WebP/AVIF) can reduce image payload sizes by 70–90% while drastically improving Largest Contentful Paint (LCP) and SEO rankings.

## ✅ Verification Checklist

### Asset Delivery & Formatting
- [ ] Modern next-gen formats (WebP or AVIF) served with fallback support for older browsers.
- [ ] Responsive `srcset` and `sizes` attributes used so mobile devices download appropriately scaled image resolutions.
- [ ] Explicit `width` and `height` (or aspect-ratio) specified on `<img>` tags to prevent Cumulative Layout Shift (CLS).
- [ ] Native lazy loading (`loading="lazy"`) enabled on all below-the-fold images.
- [ ] Hero / LCP images preloaded with high priority (`fetchpriority="high"` or `priority` in Next.js Image).

### User Upload Pipeline
- [ ] User-uploaded images resized, stripped of EXIF GPS metadata, and compressed on upload (via Sharp or serverless worker).
- [ ] Static assets cached with long TTL headers (`Cache-Control: public, max-age=31536000, immutable`).

## 💡 Best Practices

### Image Optimization Pipeline with Sharp
```typescript
import sharp from 'sharp';

export async function processUserAvatar(imageBuffer: Buffer): Promise<Buffer> {
  return await sharp(imageBuffer)
    .resize(256, 256, { fit: 'cover', position: 'center' })
    .webp({ quality: 80, effort: 4 })
    .withMetadata({ orientation: 1 }) // Retain rotation, strip sensitive EXIF GPS
    .toBuffer();
}
```

## 🔧 Recommended Tools
- **Node.js**: [Sharp](https://sharp.pixelplumbing.com/)
- **Image CDNs / Hosting**: [Cloudflare Images](https://www.cloudflare.com/products/cloudflare-images/), [imgix](https://www.imgix.com/), [Cloudinary](https://cloudinary.com/)
- **Framework Optimization**: [Next.js Image Component](https://nextjs.org/docs/app/building-your-application/optimizing/images), [Nuxt Image](https://image.nuxt.com/)

## 📚 Additional Resources
- [web.dev - Optimize your images](https://web.dev/fast/#optimize-your-images)
- [Next.js Image Optimization Guide](https://nextjs.org/docs/pages/building-your-application/optimizing/images)

---
*Last updated: 2026-08-27*
