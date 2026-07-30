#!/bin/bash

set -e

echo "===================================="
echo "🚀 Starting Foliofy Deployment"
echo "===================================="

cd /home/ubuntu/apps/foliofy

echo "📥 Updating repository..."

git reset --hard HEAD
git clean -fd
git fetch origin
git reset --hard origin/master

echo "🐍 Activating virtual environment..."
source venv/bin/activate

echo "📦 Installing Python packages..."
pip install -r requirements.txt

echo "🗄 Running migrations..."
python manage.py migrate

echo "📁 Collecting static files..."
python manage.py collectstatic --noinput

echo "⚛️ Building Frontend..."
cd frontend
npm ci
npm run build

echo "📤 Deploying Frontend..."
sudo rm -rf /var/www/foliofy/frontend/*
sudo cp -r dist/* /var/www/foliofy/frontend/

cd ..

echo "🎨 Building Portfolio Renderer..."
cd portfolio-renderer
npm ci
npm run build

echo "📤 Deploying Portfolio Renderer..."
sudo rm -rf /var/www/foliofy/portfolio-renderer/*
sudo cp -r dist/* /var/www/foliofy/portfolio-renderer/

cd ..

echo "🔄 Restarting Gunicorn..."
sudo systemctl restart foliofy

echo "🌐 Reloading Nginx..."
sudo systemctl reload nginx
