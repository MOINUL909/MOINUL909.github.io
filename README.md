# 🚀 Professional Portfolio Website

A modern, animated, and fully responsive portfolio website showcasing your research, experience, education, skills, publications, leadership, awards, and certifications.

## ✨ Features

### 🎨 Design & Animations
- **Modern Design**: Clean, professional layout with gradient accents
- **Smooth Animations**: Scroll-triggered animations using AOS library
- **Typing Effect**: Dynamic typing animation in hero section
- **Hover Effects**: Interactive hover states on all elements
- **Particle Background**: Animated particles in hero section
- **Floating Shapes**: Decorative floating elements
- **Progress Bars**: Animated skill progress bars
- **Gradient Buttons**: Eye-catching gradient buttons

### 📱 Responsive
- Fully responsive on all devices
- Mobile-first approach
- Hamburger menu for mobile
- Optimized for tablets and desktops

### 🔧 Sections
1. **Hero Section** - Eye-catching introduction with typing animation
2. **About** - Professional bio and contact information
3. **Experience** - Timeline of professional journey
4. **Education** - Academic background with GPA
5. **Skills** - Progress bars and badges for all skills
6. **Publications** - Research papers with abstracts and BibTeX
7. **Leadership** - Leadership roles and responsibilities
8. **Awards** - Honors and achievements
9. **Certificates** - Professional certifications and training
10. **Contact** - Easy way to get in touch

### 🎯 Interactive Features
- Smooth scroll navigation
- Active section highlighting
- Modal popups for abstracts and BibTeX
- Copy-to-clipboard for BibTeX
- Back-to-top button
- Social media links

## 📁 File Structure

```
portfolio-pro/
├── index.html           # Main HTML file
├── style.css            # Comprehensive styling (1666 lines!)
├── app.js              # JavaScript functionality
├── data.json           # All your content (easy to update!)
├── Curriculum_Vitae.pdf # Your CV
├── images/
│   ├── profile/
│   │   └── moinul.jpg  # Your photo
│   ├── publications/   # Add paper figures here
│   └── icons/          # Custom icons (optional)
└── README.md           # This file
```

## 🚀 Quick Start - GitHub Pages Deployment

### Method 1: GitHub Desktop (Easiest)

1. **Install GitHub Desktop**: Download from [desktop.github.com](https://desktop.github.com/)

2. **Create Repository on GitHub**:
   - Go to [github.com/new](https://github.com/new)
   - Repository name: `MOINUL909.github.io`
   - Make it Public
   - Click "Create repository"

3. **Clone and Add Files**:
   - Open GitHub Desktop
   - File → Clone Repository
   - Clone your new repository
   - Copy ALL files from this portfolio into the cloned folder

4. **Commit and Push**:
   - In GitHub Desktop, add commit message: "Initial portfolio"
   - Click "Commit to main"
   - Click "Push origin"

5. **Visit Your Site**:
   - Wait 5-10 minutes
   - Visit: `https://moinul909.github.io/`

### Method 2: Git Command Line

```bash
# Navigate to the portfolio folder
cd portfolio-pro

# Initialize Git
git init

# Add all files
git add .

# Commit
git commit -m "Initial professional portfolio"

# Set branch
git branch -M main

# Add remote (replace MOINUL909 with your username)
git remote add origin https://github.com/MOINUL909/MOINUL909.github.io.git

# Push
git push -u origin main
```

### Method 3: GitHub Web Interface

1. Create repository: `MOINUL909.github.io`
2. Click "uploading an existing file"
3. Drag and drop ALL files
4. Commit changes
5. Wait 5-10 minutes
6. Visit: `https://moinul909.github.io/`

## 📝 Updating Your Content

All content is in `data.json` - just edit and push!

### Update Profile

```json
"profile": {
  "displayName": "Your Name",
  "title": "Your Title",
  "location": "Your Location",
  "phone": "+8801234567890",
  "bioParagraphs": [
    "Your bio here..."
  ]
}
```

### Add Experience

```json
{
  "title": "Your Position",
  "organization": "Company Name",
  "location": "City, Country",
  "startDate": "January 2026",
  "endDate": "Present",
  "current": true,
  "description": "What you did...",
  "achievements": [
    "Achievement 1",
    "Achievement 2"
  ],
  "icon": "fas fa-briefcase",
  "type": "industry"
}
```

### Add Publication

```json
{
  "id": "paper-id",
  "title": "Paper Title",
  "authorsHtml": "<strong>Your Name</strong>, Co-authors",
  "venueHtml": "Conference/Journal, Year",
  "thumbnail": "./images/publications/paper.jpg",
  "links": [
    {
      "label": "PDF",
      "href": "paper-url",
      "icon": "fas fa-file-pdf"
    }
  ],
  "abstractHtml": "Your abstract...",
  "bibtex": "@article{...}"
}
```

### Add Skill

```json
{
  "name": "Python",
  "level": 90,
  "icon": "fab fa-python",
  "color": "#3776AB"
}
```

## 🎨 Customization

### Change Colors

Edit `style.css` root variables:

```css
:root {
    --primary: #6366f1;      /* Main color */
    --secondary: #10b981;    /* Secondary color */
    --accent: #f59e0b;       /* Accent color */
}
```

### Change Fonts

In `index.html`, update Google Fonts link:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont&display=swap" rel="stylesheet">
```

Then in `style.css`:
```css
:root {
    --font-primary: 'YourFont', sans-serif;
    --font-heading: 'YourHeadingFont', sans-serif;
}
```

### Add Custom Icons

Download Font Awesome icons or use:
- [Font Awesome](https://fontawesome.com/icons)
- [Boxicons](https://boxicons.com/)

## 🔧 Technical Details

### Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **JavaScript** - Dynamic content loading
- **AOS Library** - Scroll animations
- **Font Awesome** - Icons
- **Google Fonts** - Typography

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

### Performance
- Optimized images
- Minimal external dependencies
- Fast loading times
- Smooth animations

## 📊 Features Breakdown

### Animations
- **Fade in/up/down/left/right**
- **Zoom in/out**
- **Slide animations**
- **Progress bar animations**
- **Typing effect**
- **Particle system**
- **Floating elements**

### Interactive Elements
- **Smooth scroll navigation**
- **Active link highlighting**
- **Hover effects on all cards**
- **Modal popups**
- **Collapsible mobile menu**
- **Copy-to-clipboard**
- **Back-to-top button**

## 🆘 Troubleshooting

### Site not loading?
- Wait 10 minutes after first deployment
- Check repository name: `YOURUSERNAME.github.io`
- Ensure repository is Public
- Verify `index.html` is in root folder

### Images not showing?
- Check file paths in `data.json`
- Ensure images are in `images/` folder
- Verify image files were uploaded

### Animations not working?
- Check browser console for errors (F12)
- Ensure AOS library is loading
- Clear browser cache

### Content not updating?
- Verify `data.json` syntax (use [jsonlint.com](https://jsonlint.com/))
- Push changes to GitHub
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

## 📧 Support

For issues or questions:
- Email: islam2205101592@diu.edu.bd
- GitHub: [@MOINUL909](https://github.com/MOINUL909)

## 📄 License

This portfolio template is open source. Feel free to use and modify!

## 🙏 Credits

- **Design & Development**: Professional portfolio template
- **Icons**: Font Awesome & Boxicons
- **Fonts**: Google Fonts (Inter & Poppins)
- **Animations**: AOS Library

---

**Your professional portfolio is ready! 🎉**

Visit: `https://moinul909.github.io/`

**Make it yours and showcase your amazing work to the world!** 🚀
