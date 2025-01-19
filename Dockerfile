# Stage 1: Build React app for production
FROM node:20 AS react-build
WORKDIR /app/frontend

# Install dependencies for React app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Copy the rest of the React app and build it
COPY frontend ./
RUN npm run build

# Stage 2: Django (backend)
FROM python:3.10-slim AS django-build
WORKDIR /app/backend

# Install dependencies for Django app
COPY backend/requirements.txt ./
RUN pip install -r requirements.txt

# Copy React build files to Django static directory
COPY --from=react-build /app/frontend/dist /app/backend/static/

# Collect static Django
RUN python manage.py collectstatic

# Expose port and command to run the Django app (adjust to your needs)
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
