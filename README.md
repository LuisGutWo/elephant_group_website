# Elephant Group Website

This repository contains the source code for the Elephant Group website, a modern and responsive web application built using Next.js. The website showcases the services, portfolio, and contact information of Elephant Group, a creative agency specializing in advertising and marketing.

## Features

- **Light and Dark Modes**: The website supports both light and dark themes, which can be toggled dynamically.
- **Responsive Design**: Optimized for various screen sizes, ensuring a seamless experience across devices.
- **Dynamic Pages**: Includes pages for services, portfolio, contact, and more, with reusable components.
- **Animations**: Smooth animations and transitions using GSAP and other libraries.
- **SEO Optimized**: Meta tags and structured data for better search engine visibility.
- **WhatsApp Integration**: Direct contact through WhatsApp with pre-formatted messages from the contact form.

## Key Pages

- **Home**: Introduction to Elephant Group with featured services and portfolio.
- **About**: Information about the company, its history, and team.
- **Services**: Detailed descriptions of the services offered.
- **Portfolio**: Showcase of completed projects.
- **Contact**: Contact form with WhatsApp integration for instant communication.

## 🚀 Quick Start

### 1. Clone the repository:

```bash
git clone https://github.com/LuisGutWo/elephant_group_website.git
cd elephant_group_website
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Configure environment variables:

Copy the example file and configure your WhatsApp number:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and replace with your WhatsApp number:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=56912345678
```

**Important:** Use format: CountryCode + Number (no +, no spaces, no dashes)

**Examples:**
- Chile: `56912345678`
- Mexico: `5215512345678`
- Argentina: `5491112345678`

### 4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**

2. **Import project in Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure environment variables:**
   - Go to Project Settings → Environment Variables
   - Add: `NEXT_PUBLIC_WHATSAPP_NUMBER` with your WhatsApp number
   - Format: `56912345678` (no +, no spaces)

4. **Deploy:**
   - Vercel will automatically deploy on every push to main branch

### Deploy to Netlify

1. **Push your code to GitHub**

2. **Import project in Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"

3. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`

4. **Configure environment variables:**
   - Go to Site settings → Environment variables
   - Add: `NEXT_PUBLIC_WHATSAPP_NUMBER` with your WhatsApp number

5. **Deploy**

## 📱 WhatsApp Integration

The contact form includes WhatsApp integration for instant communication. When users submit the form:

1. A pre-formatted message is created with all form data
2. WhatsApp opens automatically (Web or App)
3. User just needs to click "Send" in WhatsApp
4. A backup email is sent in the background

**Configuration:** See `WHATSAPP_QUICK_START.md` for detailed setup instructions.

## 🐛 Troubleshooting

### Changes not showing up?

**Problem:** Made changes but don't see them reflected in the browser.

**Solution:**
1. Verify `.env.local` exists with your WhatsApp number
2. Restart the development server (`npm run dev`)
3. Clear browser cache or open in incognito mode
4. Check console for any errors

**See:** `COMO_VER_LOS_CAMBIOS.md` for comprehensive troubleshooting guide (Spanish).

### WhatsApp not opening?

**Problem:** Form submits but WhatsApp doesn't open.

**Solutions:**
- Verify `NEXT_PUBLIC_WHATSAPP_NUMBER` is set correctly in `.env.local`
- Ensure number format: `56912345678` (no +, no spaces, no dashes)
- Restart server after changing `.env.local`
- Check if WhatsApp is installed on the device

### Build failing?

**Problem:** `npm run build` fails.

**Solutions:**
- Run `npm install` to ensure all dependencies are installed
- Check for syntax errors in your code
- Verify all required environment variables are set
- Run `npm run lint` to check for linting issues

## 📚 Documentation

- **WHATSAPP_QUICK_START.md** - Quick setup guide for WhatsApp integration
- **WHATSAPP_SETUP.md** - Detailed WhatsApp configuration documentation
- **COMO_VER_LOS_CAMBIOS.md** - Troubleshooting guide (Spanish)
- **RESUMEN_CAMBIOS.md** - Summary of WhatsApp integration changes (Spanish)

## 🛠️ Tech Stack

- **Framework:** Next.js 15
- **UI Libraries:** React Bootstrap, NextUI, Framer Motion
- **Maps:** Leaflet, Google Maps API
- **Icons:** React Icons
- **Animations:** GSAP, Animate.css, WOW.js
- **Forms:** React Bootstrap Forms
- **Styling:** Bootstrap 5, CSS Modules

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# WhatsApp Integration
NEXT_PUBLIC_WHATSAPP_NUMBER=56912345678

# Add other environment variables as needed
```

**Note:** The `.env.local` file is not tracked by Git. Use `.env.local.example` as a template.

## 📄 License

This project is proprietary and confidential.

## 👥 Team

Developed by Elephant Group

## 📞 Support

For questions or issues, please contact the development team or open an issue in this repository.
