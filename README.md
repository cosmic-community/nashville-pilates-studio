# Aligna Pilates Studio

![Aligna Pilates Studio](https://imgix.cosmicjs.com/2b09ceb0-f294-11f0-95ed-edd347b9d13a-photo-1518611012118-696072aa579a-1768537863557.jpg?w=1200&h=400&fit=crop&auto=format,compress)

A beautiful, modern online pilates instruction platform built with Next.js 16 and powered by Cosmic CMS. Features an elegant design inspired by premium wellness brands, showcasing classes, instructors, and promotional content.

## Features

- 🧘 **Class Catalog** - Browse pilates classes with filtering by category and difficulty
- 👩‍🏫 **Instructor Profiles** - Meet certified instructors with detailed bios
- 🎯 **Free & Premium Content** - Clearly distinguished access levels
- 📱 **Fully Responsive** - Beautiful on all devices
- ⚡ **Server-Side Rendering** - Fast, SEO-optimized pages
- 🎨 **Elegant Design** - Sophisticated aesthetic perfect for wellness brands

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=6969bdf2baf635ac03c3c725&clone_repository=6969c01abaf635ac03c3c73c)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a website for online pilates instruction. Free and paid content, classes, and videos. See screenshots for style inspiration"

### Code Generation Prompt

> "Based on the content model I created for 'Create a website for online pilates instruction. Free and paid content, classes, and videos. See screenshots for style inspiration', now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) - React framework with App Router
- [Cosmic](https://www.cosmicjs.com/docs) - Headless CMS for content management
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the Pilates content model

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd aligna-pilates
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Cosmic credentials to `.env.local`:
```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

5. Run the development server:
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Cosmic SDK Examples

### Fetching Site Settings
```typescript
const { object: settings } = await cosmic.objects
  .findOne({ type: 'site-settings', slug: 'site-settings' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Classes with Instructor Data
```typescript
const { objects: classes } = await cosmic.objects
  .find({ type: 'classes' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Instructors
```typescript
const { objects: instructors } = await cosmic.objects
  .find({ type: 'instructors' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application integrates with three Cosmic object types:

### Site Settings (Singleton)
- Hero headline and subheadline
- Hero image
- Philosophy quote
- Phone number
- Promo headline and offer

### Classes
- Description and featured image
- Video URL
- Duration (minutes)
- Difficulty level (Beginner/Intermediate/Advanced)
- Category (Mobility/Strength/Relaxation/Prenatal/Rehabilitation/Group)
- Access type (Free/Premium)
- Linked instructor

### Instructors
- Name and photo
- Bio
- Specialties

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to a Git repository
2. Import the project into Vercel
3. Add your environment variables
4. Deploy!

### Deploy to Netlify

1. Push your code to a Git repository
2. Connect to Netlify
3. Configure build settings:
   - Build command: `bun run build`
   - Publish directory: `.next`
4. Add environment variables
5. Deploy!

## License

MIT License - feel free to use this for your own projects.

<!-- README_END -->