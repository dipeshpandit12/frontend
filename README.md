# ClearStream Inc. – Application Overview

## What our application does
ClearStream Inc. is a goal-oriented advertising system that allows small business owners to define specific sales objectives and let AI optimize campaigns end-to-end.  

The platform serves:
- **Sellers** by helping them create professional ad campaigns.  
- **Buyers** by delivering authentic and personalized ads.  
- **Platforms** by fostering stronger engagement across their ecosystems.  

Sellers can set campaign goals, allocate budgets dynamically, upload product images, preview AI-generated ad variations, and monitor performance in real-time, while the backend optimizes ad distribution and targeting automatically.

---

## What framework it uses
- **Frontend**: JavaScript-based, built with **React/Next.js** and styled with **ShadCN UI** for a clean, responsive design.  
- **Backend**: Python with **FastAPI**, handling data processing, optimization logic, and integrations with marketplaces/e-commerce platforms.  

📂 Repo link: [GitHub – hsi_battle](https://github.com/dipeshpandit12/hsi_battle)

---

## How judges should navigate/interpret the application

### Step 1 – Clone the Repository
Browse the current repo and use `git clone` to download it.

### Step 2 – Setup Environment for Frontend
Create a `.env` file in the frontend directory and add:
```env
MONGODB_URI=String
JWT_SECRET=SECRET_KEY

```

Then run:

npm install
npm run dev


This starts the program.

Step 3 – Setup Backend

Clone the backend repo.

Create a .env file and add:
```
PORT=YOUR_PORT
GEMINI_API_KEY=GEMINI_STRING

```
Then run:

pip3 install -r requirements.txt
python3 main.py


The backend will now be up and running.

## 🏗️ Architecture

### Frontend Stack
- **Next.js 15.5.4**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library
- **React Hook Form**: Form management with validation

### Backend Integration
- **MongoDB**: NoSQL database for data storage
- **GridFS**: File storage system for images
- **External AI API**: Content generation service
- **RESTful APIs**: Clean API architecture

## 📁 Project Structure

```
frontend/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── files/                # File serving endpoints
│   │   ├── upload/               # File upload endpoints
│   │   └── user/                 # User management
│   ├── product-listing/          # Product catalog page
│   ├── product-view/             # Product detail page
│   ├── product-review/             # see the ad
│   └── seller-listing/           # Product creation page
├── components/                   # Reusable UI components
│   ├── auth/                     # Authentication forms
│   └── ui/                       # UI components
├── lib/                          # Utility libraries
│   ├── mongodb.ts               # Database connection
│   ├── gridfs.ts                # File storage utilities
│   └── utils.ts                 # General utilities
└── models/                       # Data models
```

## 🔄 Data Flow & Backend Connectivity

### 1. **Seller Listing Workflow**

```
User Selects Image → File Upload to MongoDB GridFS → Generate File URL
                                ↓
User Enters Description → Submit Form → Send to AI Processing API
                                ↓
Receive Generated Content → Display Results
```

#### Backend Integration:
1. **File Upload**: `POST /api/upload`
   - Validates file type and size (max 5MB)
   - Stores in MongoDB GridFS
   - Returns file ID for URL generation

2. **AI Content Generation**: External API `https://hsi-battle.onrender.com/processing-input`
   - Sends image URL and description
   - Receives AI-generated content:
     - Product title
     - Enhanced description
     - Marketing slogan
     - Hashtags
     - Image description
     - Video description

3. **File Serving**: `GET /api/files/[fileId]`
   - Retrieves files from GridFS
   - Serves with proper headers
   - Optimized caching

### 2. **Authentication Flow**

```
User Login/Signup → Form Validation → API Request → MongoDB User Verification
                                ↓
JWT Token Generation → Store in localStorage → Authenticated State
```

#### Backend Integration:
- **Login**: `POST /api/auth/login`
- **Signup**: `POST /api/auth/signup`
- **User Avatar**: `POST /api/user/avatar`

### 3. **Product Browsing**
- **Search**: Client-side filtering of product database
- **Categories**: Dynamic category-based filtering
- **Product Details**: Static product data with dynamic routing

## 🔧 API Endpoints

### File Management
```typescript
// Upload file to MongoDB GridFS
POST /api/upload
Content-Type: multipart/form-data
Body: { file: File, folder?: string }

Response: {
  message: string,
  fileId: string,
  filename: string,
  contentType: string,
  size: number
}
```

```typescript
// Retrieve file from GridFS
GET /api/files/[fileId]
Response: Binary file data with headers
```

### Authentication
```typescript
// User login
POST /api/auth/login
Body: { email: string, password: string }

Response: {
  success: boolean,
  token: string,
  user: UserObject
}
```

```typescript
// User registration
POST /api/auth/signup
Body: { name: string, email: string, password: string }

Response: {
  success: boolean,
  token: string,
  user: UserObject
}
```

### External AI API
```typescript
// Generate product content
POST https://hsi-battle.onrender.com/processing-input
Body: { image_url: string, text: string }

Response: {
  trace_id: string,
  title: string,
  description: string,
  slogan: string,
  hashtags: string[],
  image_description: string,
  video_description: string
}
```

## 💾 Database Schema

### MongoDB Collections

#### Users
```typescript
{
  _id: ObjectId,
  name: string,
  email: string,
  password: string, // hashed
  avatar?: string,
  createdAt: Date,
  updatedAt: Date
}
```

#### GridFS Files
```typescript
{
  _id: ObjectId,
  filename: string,
  contentType: string,
  length: number,
  chunkSize: number,
  uploadDate: Date,
  metadata: {
    folder: string,
    originalName: string,
    size: number
  }
}
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+
- MongoDB instance
- Environment variables configured

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Configure MongoDB connection
MONGODB_URI=mongodb://localhost:27017/shophub

# Start development server
npm run dev
```

# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Environment Variables
```env
MONGODB_URI=mongodb://localhost:27017/shophub
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

## 🔒 Security Features

- **Input Validation**: All forms have client and server-side validation
- **File Type Validation**: Only images allowed for upload
- **File Size Limits**: 5MB maximum file size
- **SQL Injection Protection**: MongoDB with parameterized queries
- **XSS Protection**: React's built-in XSS protection
- **CSRF Protection**: Next.js built-in CSRF protection

## 📱 Responsive Design

- **Mobile-First**: Designed for mobile devices first
- **Breakpoints**: 
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px
- **Touch-Friendly**: Large touch targets and intuitive gestures
- **Progressive Enhancement**: Works without JavaScript

## 🧪 Testing & Development

```bash
# Run linting
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## 🚀 Deployment

The application is ready for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS**
- **Docker containers**

### Build Configuration
```bash
# Production build
npm run build

# Environment variables required in production:
# - MONGODB_URI
# - NEXTAUTH_SECRET
# - NEXTAUTH_URL
```

## 📈 Performance Optimizations

- **Next.js Image Optimization**: Automatic image optimization
- **Code Splitting**: Automatic code splitting by pages
- **Static Generation**: Pre-rendered pages where possible
- **Caching**: Aggressive caching for static assets
- **Bundle Analysis**: Optimized bundle sizes

## 📚 Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial
- [MongoDB Documentation](https://docs.mongodb.com/) - database operations and GridFS
- [Tailwind CSS](https://tailwindcss.com/docs) - utility-first CSS framework
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - typed JavaScript

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Submit a pull request

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Issues**
   - Ensure MongoDB is running
   - Check MONGODB_URI in environment variables
   - Verify network connectivity

2. **File Upload Not Working**
   - Check MongoDB GridFS configuration
   - Verify file size limits (max 5MB)
   - Ensure proper file types (images only)

3. **AI API Integration Issues**
   - Verify external API endpoint is accessible
   - Check network connectivity
   - Ensure uploaded images are publicly accessible

### Critical Configuration Requirements

⚠️ **COMPULSORY**: The following environment variable must be set or the application will fail:

```env
MONGODB_URI=mongodb://localhost:27017/shophub
```

**Common Error when MONGODB_URI is missing or incorrect:**
```
at async POST (app/api/upload/route.ts:40:20)
  41 |     });
  42 |   }
> 43 |   cached!.conn = await cached!.promise;
     |                  ^
  44 |   return cached!.conn;
  45 | }
  46 | {
  errorLabelSet: Set(0) {},
  reason: [TopologyDescription],
  code: undefined,
  [cause]: [TopologyDescription]
```

**Solution:**
1. Create a `.env.local` file in the root directory
2. Add the MongoDB connection string:
   ```env
   MONGODB_URI=mongodb://localhost:27017/shophub
   ```
3. Ensure MongoDB service is running
4. Restart the development server

**MongoDB Setup Options:**
- **Local MongoDB**: Install MongoDB locally and use `mongodb://localhost:27017/shophub`
- **MongoDB Atlas**: Use cloud MongoDB service and replace with your Atlas connection string
- **Docker MongoDB**: Use Docker container with appropriate connection string

### Environment Variables Checklist

Before running the application, ensure these variables are set:

- ✅ `MONGODB_URI` - **REQUIRED** - Database connection string
- ✅ `NEXTAUTH_SECRET` - **REQUIRED** - Authentication secret key
- ✅ `NEXTAUTH_URL` - **REQUIRED** - Application URL (http://localhost:3000 for development)

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please contact the development team or create an issue in the repository.

---

*Built with ❤️ using Next.js, TypeScript, and modern web technologies.*
