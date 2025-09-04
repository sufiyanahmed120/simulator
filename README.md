# C++ Learning Simulator

An interactive web application designed to make C++ programming concepts easy and visual for college beginners. Features include interactive learning modules, an AI Tutor, and a real-time code simulator.

## 🚀 Features

### 📚 Learning Modules
- **Interactive C++ Lessons**: Step-by-step modules covering fundamentals to advanced concepts
- **Progress Tracking**: XP system, levels, and achievement badges
- **Search & Filter**: Find modules by difficulty or topic
- **Restart Capability**: Reset progress and retake modules

### 🤖 AI Tutor
- **Intelligent Chat Interface**: Ask questions about C++ programming
- **Code Examples**: Syntax-highlighted code blocks with copy functionality
- **Fallback Responses**: Works even without API keys
- **Context Awareness**: Remembers conversation history

### 💻 Code Simulator
- **Monaco Editor**: Professional code editing experience
- **Real-time Execution**: Run C++ code instantly
- **Step-by-step Debugging**: Visual execution flow
- **Memory Visualizer**: See variables, stack, and heap in real-time
- **Error Handling**: Clear compilation and runtime error messages

### 🎨 Modern UI/UX
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark/Light Theme**: Toggle between themes
- **Smooth Animations**: Framer Motion powered transitions
- **Gamified Experience**: Progress bars, achievements, and XP system

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Monaco Editor** - Professional code editor
- **Lucide React** - Beautiful icons

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Firebase Auth** - Google authentication
- **Firestore** - User progress and data storage
- **OpenAI API** - AI Tutor functionality
- **Judge0 API** - Safe code execution

### UI Components
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Modern component library
- **next-themes** - Theme management

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cpp-simulator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your API keys:
   - Firebase configuration
   - OpenAI API key (optional)
   - Judge0 API key (optional)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Required Environment Variables

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# Optional APIs (app works without these)
OPENAI_API_KEY=your_openai_api_key
RAPIDAPI_KEY=your_rapidapi_key
```

### Firebase Setup

1. Create a new Firebase project
2. Enable Authentication (Google provider)
3. Create a Firestore database
4. Add your Firebase config to environment variables

### API Keys (Optional)

- **OpenAI API**: For enhanced AI Tutor responses
- **Judge0 API**: For real C++ code execution (via RapidAPI)

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically on push

3. **Environment Variables in Vercel**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.local`

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📁 Project Structure

```
cpp-simulator/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── tutor/         # AI Tutor endpoint
│   │   │   └── execute/       # Code execution endpoint
│   │   ├── modules/           # Learning modules page
│   │   ├── tutor/             # AI Tutor page
│   │   ├── simulator/         # Code simulator page
│   │   ├── profile/           # User profile page
│   │   ├── settings/          # Settings page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home dashboard
│   ├── components/            # Reusable components
│   │   ├── auth-provider.tsx  # Firebase auth context
│   │   ├── navigation.tsx     # Main navigation
│   │   └── theme-provider.tsx # Theme management
│   ├── lib/                   # Utility functions
│   │   ├── firebase.ts        # Firebase configuration
│   │   └── utils.ts           # Helper functions
│   └── types/                 # TypeScript types
│       └── index.ts           # Type definitions
├── public/                    # Static assets
├── env.example               # Environment variables template
└── README.md                 # This file
```

## 🎯 Usage

### For Students
1. **Sign in** with your Google account
2. **Start learning** with the beginner modules
3. **Ask questions** to the AI Tutor
4. **Practice coding** in the simulator
5. **Track progress** and earn achievements

### For Educators
1. **Monitor student progress** through the dashboard
2. **Customize modules** by editing the module data
3. **Add new content** by extending the module system
4. **Integrate with LMS** using the API endpoints

## 🔒 Security

- **Safe Code Execution**: All code runs in isolated containers
- **Authentication**: Google OAuth for secure user management
- **Input Validation**: All user inputs are validated
- **Rate Limiting**: API endpoints are rate-limited
- **Environment Variables**: Sensitive data is properly secured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Monaco Editor** - Professional code editing
- **Firebase** - Authentication and database
- **OpenAI** - AI capabilities
- **Judge0** - Safe code execution
- **Vercel** - Deployment platform

## 📞 Support

- **Email**: support@cppsimulator.com
- **GitHub Issues**: [Report bugs](https://github.com/cppsimulator/issues)
- **Documentation**: [Full docs](https://docs.cppsimulator.com)

---

Built with ❤️ for C++ learners everywhere
