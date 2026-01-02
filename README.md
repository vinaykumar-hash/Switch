Switch

A web application for **clothing design, generation, and sharing**.  
Users can create unique clothing items, experiment with different styles, and share their creations with the community.

---

https://switchstyle.app/
---

##  Tech Stack

###  Frontend
- **Framework:** [React](https://reactjs.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **BaaS:** [Supabase](https://supabase.io/)

###  Backend
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express](https://expressjs.com/)
- **AI Integration:** [Google Generative AI (Gemini)](https://ai.google.dev/)
- **BaaS:** [Supabase](https://supabase.io/)

---

##  Setup Guide

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/nanofashion.git
cd nanofashion
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd api
npm install
```

### 4. Environment Variables Setup

You’ll need **two `.env` files** — one in the **root** for the frontend and one in the **api** directory for the backend.

---

####  Frontend `.env`
Create a `.env` file in the **project root** and add:

```env
VITE_SUPABASE_URL="https://your-supabase-url.supabase.co"
VITE_PROJECT_ID="your-project-id"
VITE_SUPABASE_KEY="your-supabase-anon-key"
VITE_BACKEND_URL="https://your-backend-url.onrender.com"
```

---

####  Backend `/api/.env`
Create a `.env` file in the **api** folder and add:

```env
PORT=5000
GEMINI_API_KEY="your-google-gemini-api-key"

# Supabase configuration
VITE_SUPABASE_URL="https://your-supabase-url.supabase.co"
VITE_PROJECT_ID="your-project-id"
SUPABASE_SERVICE_KEY="your-supabase-service-role-key"
VITE_SUPABASE_KEY="your-supabase-anon-key"
```

>  **Important:**  
> Never expose private or service-role Supabase keys in public repositories.  
> Keep `.env` files **excluded from Git** using a `.gitignore` file.

---

### 5. Run the Development Servers

#### Frontend
```bash
npm run dev
```

#### Backend
```bash
cd api
npm run dev
```

Both servers should now be running locally — typically:  
- Frontend → `http://localhost:5173`  
- Backend → `http://localhost:5000`

---

##  API Keys Setup

To run the app, you’ll need:

- **Supabase Project Keys:**  
  From your [Supabase Project Settings → API](https://supabase.com/dashboard).
- **Google Generative AI (Gemini) Key:**  
  From [Google AI Studio](https://aistudio.google.com/).

Add them to the `.env` files as shown above.

---

##  Known Bugs / Issues

1. **Generated Clothes Not Visible Immediately**  
   - After generating new clothing designs, they don’t appear instantly.  
   - **Workaround:** Refresh the page or click **Creations → Clothes** again.  
   -  *Fix coming in the next push.*

2. **Enhanced Prompt Display Format**  
   - The enhanced prompt currently returns as raw JSON instead of formatted text.  
   -  *Will be fixed in the next update.*

---

##  Upcoming Improvements
- Fix for immediate item rendering post-generation.  
- Proper parsing of AI-enhanced prompts.  
- Integration of user profiles and community sharing.  
- Gallery view with filters and search.  
- Better mobile responsiveness.

---

##  Author

**Vinay Kumar**  
UI/UX Designer & Full Stack Developer  
📎 [GitHub](https://github.com/vinaykumar-hash) • [Behance](https://www.behance.net/vinaykumar-hash)

---


