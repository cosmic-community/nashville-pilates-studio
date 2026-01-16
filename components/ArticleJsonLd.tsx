import { BlogPost } from '@/types'

interface ArticleJsonLdProps {
  post: BlogPost
  url: string
}

export default function ArticleJsonLd({ post, url }: ArticleJsonLdProps) {
  const publishDate = post.metadata?.publish_date || post.created_at
  const authorName = post.metadata?.author?.metadata?.name || 'Studio Team'
  const authorPhoto = post.metadata?.author?.metadata?.photo?.imgix_url
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.metadata?.seo_title || post.metadata?.title || post.title,
    description: post.metadata?.seo_description || post.metadata?.excerpt,
    image: post.metadata?.featured_image?.imgix_url 
      ? `${post.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`
      : undefined,
    datePublished: publishDate,
    dateModified: post.modified_at || publishDate,
    author: {
      '@type': 'Person',
      name: authorName,
      image: authorPhoto ? `${authorPhoto}?w=200&h=200&fit=crop&auto=format,compress` : undefined,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Aligna Pilates Studio',
      logo: {
        '@type': 'ImageObject',
        url: `${url.split('/blog')[0]}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}