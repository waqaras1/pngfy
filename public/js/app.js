// PngFy Pro - Modern Background Removal Application
class PngFyApp {
    constructor() {
        this.currentFile = null;
        this.processedImageUrl = null;
        this.isProcessing = false;
        
        this.init();
    }
    
    init() {
        this.hideLoadingScreen();
        this.bindEvents();
        this.setupDragAndDrop();
        this.showToast('Welcome to PngFy Pro! 🚀', 'info');
    }
    
    hideLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            const app = document.getElementById('app');
            
            loadingScreen.classList.add('hidden');
            app.style.display = 'block';
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 350);
        }, 1500);
    }
    
    bindEvents() {
        // Navigation
        document.getElementById('nav-toggle')?.addEventListener('click', this.toggleMobileMenu.bind(this));
        
        // Upload buttons
        document.getElementById('upload-btn')?.addEventListener('click', () => this.openFileDialog());
        document.getElementById('browse-btn')?.addEventListener('click', () => this.openFileDialog());
        document.getElementById('file-input')?.addEventListener('change', (e) => this.handleFileSelect(e));
        
        // Demo button
        document.getElementById('demo-btn')?.addEventListener('click', () => this.loadDemoImage());
        
        // Process and download
        document.getElementById('process-btn')?.addEventListener('click', () => this.processImage());
        document.getElementById('download-btn')?.addEventListener('click', () => this.downloadImage());
        document.getElementById('change-image-btn')?.addEventListener('click', () => this.resetUpload());
        document.getElementById('new-image-btn')?.addEventListener('click', () => this.resetUpload());
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
    
    setupDragAndDrop() {
        const uploadArea = document.getElementById('upload-area');
        const fileInput = document.getElementById('file-input');
        
        if (!uploadArea || !fileInput) return;
        
        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, this.preventDefaults, false);
            document.body.addEventListener(eventName, this.preventDefaults, false);
        });
        
        // Highlight drop area when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.classList.add('drag-over');
            }, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.classList.remove('drag-over');
            }, false);
        });
        
        // Handle dropped files
        uploadArea.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            
            if (files.length > 0) {
                this.handleFile(files[0]);
            }
        }, false);
        
        // Click to upload
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });
    }
    
    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    openFileDialog() {
        document.getElementById('file-input').click();
    }
    
    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.handleFile(file);
        }
    }
    
    handleFile(file) {
        // Validate file type
        if (!this.isValidImageFile(file)) {
            this.showToast('Please select a valid image file (JPG, PNG, WEBP)', 'error');
            return;
        }
        
        // Validate file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
            this.showToast('File size must be less than 10MB', 'error');
            return;
        }
        
        this.currentFile = file;
        this.displayImagePreview(file);
        this.showUploadPreview();
        this.showToast('Image uploaded successfully!', 'success');
    }
    
    isValidImageFile(file) {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        return validTypes.includes(file.type);
    }
    
    displayImagePreview(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.getElementById('original-preview');
            if (preview) {
                preview.src = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    }
    
    showUploadPreview() {
        document.getElementById('upload-area').style.display = 'none';
        document.getElementById('upload-preview').style.display = 'block';
        document.getElementById('preview-result').style.display = 'none';
    }
    
    async processImage() {
        if (!this.currentFile || this.isProcessing) return;
        
        this.isProcessing = true;
        this.setProcessingState(true);
        
        try {
            const formData = new FormData();
            formData.append('image', this.currentFile);
            
            const response = await fetch('/api/remove-background', {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to process image');
            }
            
            const blob = await response.blob();
            this.processedImageUrl = URL.createObjectURL(blob);
            
            // Display result
            const resultPreview = document.getElementById('result-preview');
            if (resultPreview) {
                resultPreview.src = this.processedImageUrl;
            }
            
            document.getElementById('preview-result').style.display = 'block';
            this.showToast('Background removed successfully!', 'success');
            
        } catch (error) {
            console.error('Processing error:', error);
            this.showToast(error.message || 'Failed to remove background. Please try again.', 'error');
        } finally {
            this.isProcessing = false;
            this.setProcessingState(false);
        }
    }
    
    setProcessingState(isProcessing) {
        const processBtn = document.getElementById('process-btn');
        const btnText = processBtn.querySelector('.btn-text');
        const btnLoading = processBtn.querySelector('.btn-loading');
        
        if (isProcessing) {
            processBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'flex';
        } else {
            processBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    }
    
    downloadImage() {
        if (!this.processedImageUrl) {
            this.showToast('No processed image to download', 'warning');
            return;
        }
        
        const link = document.createElement('a');
        link.href = this.processedImageUrl;
        link.download = `pngfy-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showToast('Download started!', 'success');
    }
    
    resetUpload() {
        this.currentFile = null;
        this.processedImageUrl = null;
        this.isProcessing = false;
        
        // Reset file input
        document.getElementById('file-input').value = '';
        
        // Show upload area
        document.getElementById('upload-area').style.display = 'block';
        document.getElementById('upload-preview').style.display = 'none';
        
        // Reset processing state
        this.setProcessingState(false);
    }
    
    async loadDemoImage() {
        try {
            // Load the actual demo image
            const response = await fetch('/images/demo_before.png');
            if (response.ok) {
                const blob = await response.blob();
                const file = new File([blob], 'demo_before.png', { type: 'image/png' });
                this.handleFile(file);
                this.showToast('Demo image loaded!', 'info');
            } else {
                this.showToast('Demo image not available', 'warning');
            }
        } catch (error) {
            this.showToast('Failed to load demo image', 'error');
        }
    }
    
    toggleMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    }
    
    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        toast.innerHTML = `
            <div class="toast-header">
                <div class="toast-title">${icons[type]} ${this.capitalizeFirst(type)}</div>
                <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
            <div class="toast-message">${message}</div>
        `;
        
        toastContainer.appendChild(toast);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 5000);
    }
    
    capitalizeFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

// Utility functions
class Utils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    static formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    static validateImageFile(file) {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        const maxSize = 10 * 1024 * 1024; // 10MB
        
        if (!validTypes.includes(file.type)) {
            return { valid: false, error: 'Invalid file type. Please select a JPG, PNG, or WEBP image.' };
        }
        
        if (file.size > maxSize) {
            return { valid: false, error: 'File size too large. Please select an image smaller than 10MB.' };
        }
        
        return { valid: true };
    }
}

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
    }
    
    startTimer(name) {
        this.metrics[name] = performance.now();
    }
    
    endTimer(name) {
        if (this.metrics[name]) {
            const duration = performance.now() - this.metrics[name];
            console.log(`${name} took ${duration.toFixed(2)}ms`);
            delete this.metrics[name];
            return duration;
        }
    }
    
    measureImageLoad(imageElement) {
        return new Promise((resolve) => {
            if (imageElement.complete) {
                resolve();
            } else {
                imageElement.onload = () => resolve();
                imageElement.onerror = () => resolve();
            }
        });
    }
}

// Analytics (basic implementation)
class Analytics {
    static trackEvent(eventName, properties = {}) {
        // In a real app, you'd send this to your analytics service
        console.log('Analytics Event:', eventName, properties);
        
        // Example: Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, properties);
        }
    }
    
    static trackPageView(pageName) {
        this.trackEvent('page_view', { page_name: pageName });
    }
    
    static trackImageUpload(fileSize, fileType) {
        this.trackEvent('image_upload', {
            file_size: fileSize,
            file_type: fileType
        });
    }
    
    static trackBackgroundRemoval(success, processingTime) {
        this.trackEvent('background_removal', {
            success: success,
            processing_time: processingTime
        });
    }
}

// Error handling
class ErrorHandler {
    static handleError(error, context = '') {
        console.error(`Error in ${context}:`, error);
        
        // In a real app, you'd send this to your error tracking service
        if (typeof Sentry !== 'undefined') {
            Sentry.captureException(error, {
                tags: { context }
            });
        }
        
        // Show user-friendly error message
        const app = window.pngfyApp;
        if (app) {
            app.showToast('Something went wrong. Please try again.', 'error');
        }
    }
    
    static setupGlobalErrorHandling() {
        window.addEventListener('error', (event) => {
            this.handleError(event.error, 'Global Error');
        });
        
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError(event.reason, 'Unhandled Promise Rejection');
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Setup global error handling
        ErrorHandler.setupGlobalErrorHandling();
        
        // Initialize the app
        window.pngfyApp = new PngFyApp();
        
        // Track page view
        Analytics.trackPageView('home');
        
        // Performance monitoring
        window.performanceMonitor = new PerformanceMonitor();
        
        console.log('🚀 PngFy Pro initialized successfully!');
        
    } catch (error) {
        ErrorHandler.handleError(error, 'App Initialization');
    }
});

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PngFyApp, Utils, Analytics, ErrorHandler };
} 