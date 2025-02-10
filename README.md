# Laravel Product Catalog with React

A modern web application built with Laravel 11 and React.js for managing and displaying products.

## Features

-   Product listing
-   Product details view
-   Admin dashboard for product management
-   Image upload functionality

## Requirements

-   PHP 8.2+
-   MySQL 5.7+
-   Node.js 16+
-   npm 8+
-   Composer 2+

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/shakibzaman/Laravel-Product-Catalog-React.git
cd Laravel-Product-Catalog-React
```

### 2. Backend Setup

```bash
# Install PHP dependencies
composer install

# Create environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate

# Create storage link for images
php artisan storage:link

# Start Laravel server
php artisan serve
```

### 3. Frontend Setup

```bash
# Install Node dependencies
npm install

# Start development server
npm run dev
```

### 4. Configure Environment

Update your `.env` file with necessary credentials:

```env
APP_NAME=ProductCatalog
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password

VITE_API_BASE_URL=http://localhost:8000/api
```

## Development Servers

-   Backend API: http://localhost:8000
-   Frontend: http://localhost:5173

## API Endpoints

```bash
# Public endpoints
GET /api/public-products     # Get all products
GET /api/public-products/{id} # Get single product

# Protected endpoints (requires authentication)
POST   /api/products        # Create product
GET    /api/products        # List products
GET    /api/products/{id}   # Get product
PUT    /api/products/{id}   # Update product
DELETE /api/products/{id}   # Delete product
```

## Production Deployment

1. Update `.env` for production:

```env
APP_ENV=production
APP_DEBUG=false
VITE_API_BASE_URL=https://your-domain.com/api
```

2. Build frontend assets:

```bash
npm run build
```

3. Configure your web server to point to the `public` directory

## Common Issues & Solutions

### API Connection Issues

-   Ensure VITE_API_BASE_URL in `.env` matches your API URL
-   Check CORS configuration in Laravel
-   Verify API server is running

### Image Upload Problems

-   Check storage permissions: `php artisan storage:link`
-   Verify upload directory is writable

## Support

For issues and feature requests, please create an issue in the GitHub repository or DM to zaman.shakib@gmail.com via Email.
