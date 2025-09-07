# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Song Su Oh (송수오), a recent graduate from Hanseo University with a major in Aviation Software. The site will be deployed on Vercel as a static website using vanilla HTML, CSS, and JavaScript.

## Core Requirements

**Target Information:**
- Name: Song Su Oh / 송수오 / 宋洙旿
- Born: 2000.03.28 (Age 25)
- Contact: 010-4903-7642, hellosuo@naver.com
- Education: Hanseo University Aviation Software (2019-2025, Graduated)
- Military: Army Sergeant (2020.07-2022.01)
- Notable: Startup education background, Ministry of Education certificate recipient

**Technology Stack:**
- Pure HTML, CSS, JavaScript (no frameworks)
- Static deployment on Vercel
- Mobile-first responsive design
- Single Page Application (SPA) structure

## Development Commands

Since this is a static website project, no build tools are required:

- **Development**: Open `index.html` in browser or use Live Server
- **Deployment**: Push to GitHub and connect to Vercel for automatic deployment
- **Testing**: Manual testing across devices and browsers

## Architecture & File Structure

```
/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js          # JavaScript functionality
├── rules.md           # Korean project specifications (reference)
└── README.md          # Project documentation
```

**Content Sections (in order):**
1. Header - Name, contact info, navigation
2. About - Self introduction, current status
3. Education - University and high school details
4. Military Service - Army service record
5. Education & Training - Startup programs and training
6. Activities - Living lab projects, startup academy
7. Awards - Ministry of Education certification
8. Certifications - ATC CAD Master certification

## Design System

**Color Palette:**
- Primary: Navy Blue (#1e3a8a)
- Secondary: White (#ffffff) 
- Accent: Gray (#6b7280)

**Typography:**
- Headlines: Gothic-style Korean fonts
- Body: Sans-serif fonts optimized for Korean text
- Ensure good readability across devices

**Layout Principles:**
- Mobile-first responsive design
- Single page with smooth scroll navigation
- Clean, minimal, professional aesthetic
- Emphasize startup/entrepreneurship activities

## Key Features to Implement

**Navigation:**
- Smooth scrolling between sections
- Sticky navigation header
- Active section highlighting

**Interactions:**
- Fade-in animations on page load
- Scroll-triggered element animations
- Hover effects on interactive elements
- Clickable contact info (email/phone links)

**Technical Requirements:**
- Semantic HTML structure
- SEO meta tags and Open Graph tags
- Accessibility (a11y) considerations
- Print-optimized styles
- Loading speed optimization

## Important Notes

- All content should be in Korean with English names in parentheses
- Emphasize startup education background and entrepreneurship activities
- Highlight the Ministry of Education certification as a key achievement
- Consider privacy by showing only city/district level address information
- Maintain professional tone while showcasing technical and entrepreneurial interests
- Reference `rules.md` for detailed Korean specifications and personal information