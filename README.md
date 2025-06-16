# PngFy Pro - AI Background Removal Tool

A professional-grade background removal application built with modern web technologies. Transform your images instantly with AI-powered background removal.

![PngFy Pro](https://img.shields.io/badge/PngFy-Pro-blue?style=for-the-badge&logo=image)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-4.18+-black?style=for-the-badge&logo=express)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

## ✨ Features

- **AI-Powered Background Removal** - Advanced machine learning algorithms for precise edge detection
- **Lightning Fast Processing** - Results in under 5 seconds with optimized cloud infrastructure
- **High Quality Output** - Maintain original image quality with lossless processing
- **Secure & Private** - Images are processed securely and automatically deleted
- **Drag & Drop Interface** - Intuitive file upload with visual feedback
- **Multiple Format Support** - JPG, PNG, WEBP (up to 10MB)
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Professional UI/UX** - Modern, clean interface with smooth animations
- **Real-time Progress** - Visual feedback during processing
- **Error Handling** - Comprehensive error handling with user-friendly messages

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Remove.bg API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/pngfy-pro.git
   cd pngfy-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and add your Remove.bg API key:
   ```env
   REMOVE_BG_API_KEY=your_remove_bg_api_key_here
   ```

4. **Build assets**
   ```bash
   npm run build
   ```

5. **Start the server**
   ```bash
   npm start
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

### Development

For development with hot reloading:

```bash
npm run dev
```

For watching CSS and JS changes:

```bash
npm run watch
```

## 🏗️ Architecture

### Backend (Node.js/Express)

- **Express.js** - Web framework
- **Multer** - File upload handling
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API protection
- **Compression** - Response compression
- **Sharp** - Image processing utilities

### Frontend (Vanilla JavaScript)

- **Modern ES6+** - Latest JavaScript features
- **CSS Custom Properties** - Dynamic theming
- **SCSS** - Advanced CSS preprocessing
- **Responsive Design** - Mobile-first approach
- **Progressive Web App** - PWA capabilities
- **Service Worker** - Offline functionality

### Security Features

- **API Key Protection** - Server-side API key handling
- **File Validation** - Type and size validation
- **Rate Limiting** - Prevent abuse
- **CSP Headers** - Content Security Policy
- **Input Sanitization** - XSS protection
- **Automatic Cleanup** - Temporary file removal

## 📁 Project Structure

```
pngfy-pro/
├── public/                 # Static assets
│   ├── css/               # Compiled CSS
│   ├── js/                # JavaScript files
│   ├── images/            # Image assets
│   └── index.html         # Main HTML file
├── src/
│   └── styles/            # SCSS source files
├── uploads/               # Temporary upload directory
├── server.js              # Express server
├── package.json           # Dependencies and scripts
├── env.example            # Environment variables template
└── README.md              # This file
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3000` |
| `REMOVE_BG_API_KEY` | Remove.bg API key | Required |

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Main application page |
| `POST` | `/api/remove-background` | Remove image background |
| `GET` | `/api/health` | Health check endpoint |

## 🎨 Customization

### Styling

The application uses CSS custom properties for easy theming. Edit `src/styles/main.scss` to customize:

```scss
:root {
  --primary: #6366f1;        // Primary brand color
  --secondary: #f59e0b;      // Secondary color
  --success: #10b981;        // Success state color
  --danger: #ef4444;         // Error state color
  // ... more variables
}
```

### Features

Add new features by extending the `PngFyApp` class in `public/js/app.js`:

```javascript
class PngFyApp {
  // ... existing methods
  
  async newFeature() {
    // Your custom feature implementation
  }
}
```

## 📊 Performance

### Optimizations

- **Image Compression** - Automatic image optimization
- **Lazy Loading** - Images load on demand
- **Caching** - Browser and service worker caching
- **Minification** - CSS and JS minification for production
- **CDN Ready** - Static assets optimized for CDN delivery

### Monitoring

Built-in performance monitoring:

```javascript
// Track custom metrics
window.performanceMonitor.startTimer('custom-operation');
// ... your code
window.performanceMonitor.endTimer('custom-operation');
```

## 🔒 Security

### Best Practices

- API keys stored server-side only
- File type validation
- Size limits enforced
- Rate limiting on API endpoints
- Automatic file cleanup
- HTTPS enforcement in production

### Deployment Security

```bash
# Set production environment
NODE_ENV=production

# Use HTTPS in production
# Configure reverse proxy (nginx/Apache)
# Set up SSL certificates
# Enable security headers
```

## 🚀 Deployment

### Heroku

```bash
# Create Heroku app
heroku create your-pngfy-app

# Set environment variables
heroku config:set REMOVE_BG_API_KEY=your_api_key
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Vercel/Netlify

Configure build settings:

- **Build Command**: `npm run build`
- **Output Directory**: `public`
- **Install Command**: `npm install`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation
- Ensure responsive design

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Remove.bg](https://remove.bg/) - Background removal API
- [Inter Font](https://rsms.me/inter/) - Beautiful typography
- [Feather Icons](https://feathericons.com/) - Clean icon set

## 📞 Support

- **Documentation**: [Wiki](https://github.com/your-username/pngfy-pro/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-username/pngfy-pro/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/pngfy-pro/discussions)
- **Email**: support@pngfy-pro.com

## 🔄 Changelog

### v2.0.0 (Current)
- Complete UI/UX redesign
- Modern JavaScript architecture
- Enhanced security features
- Performance optimizations
- Mobile-responsive design
- Professional documentation

### v1.0.0 (Original)
- Basic background removal functionality
- Simple Bootstrap UI
- Frontend-only implementation

---

Made with ❤️ by the PngFy Pro Team 