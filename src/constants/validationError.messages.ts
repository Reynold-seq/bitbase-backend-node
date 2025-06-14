export enum ValidationMessages {
  MONGO_DB_URI_REQUIRED = "MongoDB URI is required. Please provide it to proceed. 📝",
  ACCESS_TOKEN_SECRET_LENGTH = "Access token secret must be at least 10 characters long. 🔑",
  CORS_ORIGIN_REQUIRED = "CORS Origin must be provided. 🏠",
  CLOUDINARY_CLOUD_NAME_REQUIRED = "Cloudinary Cloud Name is required to upload images. 🌥️",
  CLOUDINARY_API_KEY_REQUIRED = "Cloudinary API Key is required to connect to the service. 🔑",
  CLOUDINARY_API_SECRET_REQUIRED = "Cloudinary API Secret is required for secure access. 🔐",
  SALT_REQUIRED = "Salt is required for secure encryption. Please provide it. 🧂",
}
