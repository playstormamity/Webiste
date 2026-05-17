# Contact Page

The `Contact` page provides multiple ways for students, partners, and sponsors to get in touch with the PlayStorm Esports Club.

## Route
`/contact`

## Features
- **Inquiry Form**: A functional contact form for general queries, partnership proposals, or recruitment questions.
- **Social Links**: Direct links to Discord, Instagram, YouTube, and LinkedIn.
- **Quick Info**: Displays the official club email and campus location.
- **Interactive Map**: A stylized representation of the club's location on the Amity campus.

## Components Used
- `Layout`: Provides the global structure.
- `VisualEffects` (GlitchText): Used for section headers.
- `BentoGrid`: For organizing the contact information and form sections.

## Internal Logic
- **Form Submission**: Uses `useState` to track form data and submission status (Success/Error).
- **Social Pills**: Custom components for high-visibility social media links.
- **Lucide Icons**: Uses `Mail`, `MapPin`, `CalendarDays`, etc.
