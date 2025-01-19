# Stage 1: Build React app
FROM node:16 AS react-build

# Set working directory for React
WORKDIR /app/frontend

# Copy React app code
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./

# Build React app for production
RUN npm run build

# Stage 2: Django (backend)
FROM python:3.9-slim AS django-build

# Set working directory for Django
WORKDIR /app

# Install Python dependencies
COPY backend/requirements.txt .
RUN pip install -r requirements.txt

# Copy Django app code
COPY backend/ ./

# Copy React build files to Django static directory
COPY --from=react-build /app/frontend/build /app/backend/static/

# Collect static files for Django
RUN python manage.py collectstatic --noinput

# Run the server (example with Gunicorn)
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]