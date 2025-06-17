# 🚀 PngFy Pro Deployment Guide

## 📋 Prerequisites
- GitHub account
- Render account (free)
- Remove.bg API key

## 🎯 Recommended Platform: Render

### Why Render?
- ✅ Free tier available
- ✅ Supports Node.js applications
- ✅ Persistent file system (needed for uploads)
- ✅ Automatic HTTPS
- ✅ Easy GitHub integration
- ✅ Custom domains

## 📝 Step-by-Step Deployment

### Step 1: Prepare Your Repository
1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Verify these files are in your repo**:
   - ✅ `package.json`
   - ✅ `server.js`
   - ✅ `render.yaml`
   - ✅ `.gitignore`
   - ❌ `.env` (should NOT be in repo)

### Step 2: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account
3. Verify your email

### Step 3: Deploy on Render
1. **Click "New +"** in your Render dashboard
2. **Select "Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service**:
   - **Name**: `pngfy-pro`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

### Step 4: Set Environment Variables
1. **Go to your service dashboard**
2. **Click "Environment" tab**
3. **Add these variables**:
   ```
   NODE_ENV=production
   REMOVE_BG_API_KEY=your_actual_api_key_here
   ```

### Step 5: Deploy
1. **Click "Create Web Service"**
2. **Wait for build to complete** (2-3 minutes)
3. **Your app will be live at**: `https://your-app-name.onrender.com`

## 🔧 Alternative Platforms

### Railway (Alternative)
1. Go to [railway.app](https://railway.app)
2. Connect GitHub repository
3. Set environment variables
4. Deploy

### Heroku (Paid)
1. Install Heroku CLI
2. Create app: `heroku create your-app-name`
3. Set config: `heroku config:set REMOVE_BG_API_KEY=your_key`
4. Deploy: `git push heroku main`

## 🚫 Platforms to Avoid
- **Vercel**: Serverless, no file upload support
- **Netlify**: Serverless, no backend
- **AWS Lambda**: Serverless limitations

## 🔍 Troubleshooting

### Common Issues:
1. **Build fails**: Check Node.js version in `package.json`
2. **API errors**: Verify `REMOVE_BG_API_KEY` is set
3. **File upload fails**: Check uploads directory permissions

### Debug Commands:
```bash
# Check logs
render logs

# Restart service
render restart

# Check environment variables
render env ls
```

## 🌐 Custom Domain (Optional)
1. **In Render dashboard**: Go to Settings → Custom Domains
2. **Add your domain**: `yourdomain.com`
3. **Update DNS**: Point to Render's servers
4. **Wait for SSL**: Automatic HTTPS certificate

## 📊 Monitoring
- **Health Check**: `https://your-app.onrender.com/api/health`
- **Logs**: Available in Render dashboard
- **Metrics**: Basic metrics in free tier

## 💰 Cost Estimation
- **Render Free**: $0/month (limited usage)
- **Render Paid**: $7/month (unlimited)
- **Railway**: $5/month
- **Heroku**: $7/month

## ✅ Post-Deployment Checklist
- [ ] App loads without errors
- [ ] File upload works
- [ ] Background removal API works
- [ ] Health check endpoint responds
- [ ] HTTPS is working
- [ ] Custom domain (if used) is working

## 🆘 Support
- **Render Docs**: [docs.render.com](https://docs.render.com)
- **GitHub Issues**: Create issue in your repo
- **Community**: Stack Overflow, Reddit r/webdev 