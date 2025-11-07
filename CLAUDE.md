# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an OCR (Optical Character Recognition) web application built with Next.js 16 and React 19. The primary feature is converting images to text using SiliconFlow's DeepSeek-OCR API. The application is configured for static export (unoptimized images) and ignores TypeScript build errors.

## Development Commands

```bash
# Install dependencies (uses pnpm)
pnpm install

# Run development server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16.0.0 (App Router, RSC enabled)
- **React**: 19.2.0
- **UI Components**: shadcn/ui with Radix UI primitives (New York style)
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **OCR Engine**: SiliconFlow DeepSeek-OCR API (server-side processing)
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics

### Environment Variables
Create a `.env.local` file with the following variables:
```
SILICONFLOW_API_KEY=your_api_key_here
SILICONFLOW_API_URL=https://api.siliconflow.cn/v1/chat/completions
```

### Key Configuration
- **TypeScript**: Strict mode enabled, but build errors are ignored (`next.config.mjs`)
- **Path Aliases**: `@/*` maps to root directory
- **Component Aliases** (from `components.json`):
  - `@/components` → components
  - `@/components/ui` → components/ui
  - `@/lib` → lib
  - `@/hooks` → hooks

### Application Structure

The app follows Next.js App Router conventions:

- **`app/`**: Route handlers and layouts
  - `layout.tsx`: Root layout with metadata and Vercel Analytics
  - `page.tsx`: Home page composed of 4 main sections
  - `globals.css`: Tailwind base styles and CSS variables
  - **`api/ocr/`**: API route for OCR processing
    - `route.ts`: POST endpoint that receives base64 images and calls SiliconFlow API

- **`components/`**: Feature and UI components
  - **Feature Components** (client-side):
    - `image-to-text-converter.tsx`: Core OCR functionality with drag-and-drop, file upload, progress tracking
    - `header.tsx`: Navigation and promotional banner
    - `tools-grid.tsx`: Grid of 22 related tool links (currently non-functional routes)
    - `info-section.tsx`: Marketing content explaining features
    - `theme-provider.tsx`: Theme context (if dark mode is implemented)

  - **`ui/`**: 50+ shadcn/ui components (accordion, button, card, dialog, etc.)

- **`hooks/`**: Custom React hooks
  - `use-mobile.ts`: Responsive breakpoint detection
  - `use-toast.ts`: Toast notification system

- **`lib/`**: Utility functions
  - `utils.ts`: Contains `cn()` helper for merging Tailwind classes

- **`public/`**: Static assets

### OCR Implementation Details

The OCR system consists of two parts:

1. **Frontend (`image-to-text-converter.tsx`)**:
   - Accepts multiple images via drag-and-drop or file browser
   - Converts images to base64 format using FileReader API
   - Sends base64 images to the backend API endpoint `/api/ocr`
   - Processes images sequentially with progress tracking
   - Displays extracted text in an editable textarea
   - Handles errors gracefully with inline error messages

2. **Backend (`app/api/ocr/route.ts`)**:
   - Receives base64 encoded images from the frontend
   - Calls SiliconFlow's DeepSeek-OCR API with the image
   - Returns extracted text to the frontend
   - Includes error handling for API failures

### Current Limitations
- TypeScript errors are suppressed in build
- Only English language OCR is implemented (despite multi-language marketing claims)
- URL image upload button is non-functional
- Tool grid links point to non-existent routes
- Navigation links in header are placeholders
- No actual authentication/login system
- No actual pricing/subscription system

## shadcn/ui Component Management

This project uses shadcn/ui. To add new components:

```bash
npx shadcn@latest add [component-name]
```

The configuration is in `components.json` with New York style and neutral base color.

## Important Notes

- **Server-side OCR**: Images are converted to base64 on the client, then sent to the backend API which calls SiliconFlow's DeepSeek-OCR API.
- **API Key Security**: The SiliconFlow API key is stored in `.env.local` and only accessed server-side.
- **Static Site**: Configured with `unoptimized: true` for images, but note that the API route requires a server runtime.
- **Responsive Design**: Mobile breakpoint detection available via `use-mobile` hook.
- **Styling Pattern**: Use the `cn()` utility from `@/lib/utils` for conditional Tailwind classes.
