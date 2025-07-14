# Personal Notes and Bookmark Manager

A modern, responsive web application built with Next.js and Tailwind CSS for managing personal notes and bookmarks. Features include user authentication, search functionality, tag-based organization, and a beautiful, intuitive interface.

## ✨ Features

### 🔐 Authentication
- **User Registration & Login**: Secure signup and login system with form validation
- **Protected Routes**: Only authenticated users can access notes and bookmarks
- **Persistent Sessions**: User sessions are maintained across browser sessions

### 📝 Notes Management
- **Create & Edit Notes**: Rich text editor with title, content, and tags
- **Tag System**: Organize notes with custom tags for easy categorization
- **Favorites**: Mark important notes as favorites for quick access
- **Search**: Full-text search across note titles and content
- **Filter by Tags**: Filter notes by one or multiple tags
- **Responsive Cards**: Beautiful card-based layout that works on all devices

### 🔖 Bookmark Management
- **Add Bookmarks**: Save websites with URL, title, and description
- **Auto-fetch Titles**: Automatic title extraction from URLs (handled by backend)
- **Tag Organization**: Organize bookmarks with custom tags
- **Favorites**: Mark frequently used bookmarks as favorites
- **Search & Filter**: Search through bookmarks by title, description, or URL
- **Quick Access**: Direct links to bookmarked websites

### 🎨 User Interface
- **Modern Design**: Clean, professional interface with subtle animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Dark Mode Ready**: Built with design tokens for future dark mode support
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Toast Notifications**: User-friendly feedback for all actions

## 🚀 Getting Started

### Prerequisites
- Node.js 16.0 or later
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd notes-bookmarks-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Add your environment variables here
   # Currently using mock authentication - replace with real API endpoints
   NEXT_PUBLIC_API_URL=your-api-url
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Landing page
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   ├── notes/             # Notes management page
│   └── bookmarks/         # Bookmarks management page
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── Navbar.tsx        # Navigation component
│   ├── ProtectedRoute.tsx # Route protection wrapper
│   ├── SearchFilter.tsx   # Search and filter component
│   ├── NoteCard.tsx      # Individual note card
│   ├── BookmarkCard.tsx  # Individual bookmark card
│   ├── NoteModal.tsx     # Note create/edit modal
│   └── BookmarkModal.tsx # Bookmark create/edit modal
├── lib/                   # Utilities and configurations
│   ├── store.ts          # Zustand state management
│   ├── auth.ts           # Authentication utilities
│   └── utils.ts          # General utilities
├── styles/               # Global styles
│   └── globals.css       # Tailwind CSS imports
└── public/               # Static assets
```

## 🔧 Configuration

### Environment Variables
- `NEXT_PUBLIC_API_URL`: Your backend API URL
- Additional environment variables can be added as needed

### Styling
- Uses Tailwind CSS for styling
- shadcn/ui components for consistent UI elements
- Framer Motion for animations
- Responsive design with mobile-first approach

## 📱 Pages Overview

### Landing Page (`/`)
- **Hero Section**: Eye-catching introduction with app features
- **Features Grid**: Showcase of key functionality
- **Call-to-Action**: Sign up and login buttons
- **Responsive Design**: Beautiful layout on all devices

### Authentication Pages
- **Login (`/login`)**: Email/password login with demo credentials
- **Signup (`/signup`)**: User registration with validation
- **Form Validation**: Real-time validation with error messages

### Notes Page (`/notes`)
- **Note Cards**: Grid layout with note previews
- **Search Bar**: Real-time search functionality
- **Tag Filters**: Filter notes by tags
- **Favorites Toggle**: Show only favorite notes
- **Add/Edit Modal**: Rich form for note creation and editing

### Bookmarks Page (`/bookmarks`)
- **Bookmark Cards**: Grid layout with bookmark previews
- **Search & Filter**: Search by title, description, or URL
- **Tag Organization**: Filter by tags
- **Quick Actions**: Edit, delete, and favorite buttons
- **External Links**: Direct navigation to bookmarked sites

## 🛠️ Technology Stack

- **Framework**: Next.js 13 with App Router
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Notifications**: Sonner (toast notifications)
- **TypeScript**: Full TypeScript support

## 🔐 Demo Credentials

For testing purposes, use these credentials:
- **Email**: test@example.com
- **Password**: password

## 🚧 Development Notes

### Mock Authentication
Currently using mock authentication for demonstration. Replace the mock functions in `lib/auth.ts` with real API calls:

```typescript
// Replace these functions with actual API calls
export const mockLogin = async (email: string, password: string) => {
  // Call your authentication API
};

export const mockSignup = async (name: string, email: string, password: string) => {
  // Call your user registration API
};
```

### State Management
The application uses Zustand for state management with separate stores for:
- Authentication state
- Notes management
- Bookmarks management

### API Integration
To connect to a real backend:
1. Update the authentication functions in `lib/auth.ts`
2. Replace mock data in `lib/store.ts` with API calls
3. Add proper error handling and loading states

## 🔄 Future Enhancements

- **Real Backend Integration**: Connect to a proper API
- **File Attachments**: Support for file uploads in notes
- **Categories**: Organize notes and bookmarks into categories
- **Export/Import**: Data export and import functionality
- **Dark Mode**: Toggle between light and dark themes
- **Collaborative Features**: Share notes and bookmarks with others
- **Advanced Search**: Full-text search with filters and sorting
- **PWA Support**: Offline functionality and app installation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Provide steps to reproduce any bugs

---

**Built with ❤️ using Next.js, Tailwind CSS, and modern web technologies**