# RAG-Powered-Summarizer


This project provides an AI-powered text summarization tool using the **Retrieval-Augmented Generation (RAG)** model. The backend is powered by Hugging Face Transformers and Flask, while the frontend is built with Next.js.

## Project Structure

The project is divided into two main parts:

- **Backend**: Python-based API for summarization using Hugging Face models.
- **Frontend**: React/Next.js interface for users to interact with the summarization API.

### File Structure

```plaintext
summarization-app/
│
├── backend/
│   ├── app.py                  # Flask application that handles the API and summarization
│   └── requirements.txt        # Python dependencies for backend
│   
│
├── frontend/
│   ├── .next/                  # Next.js build files
│   ├── node_modules/           # Dependencies for frontend
│   ├── public/                 # Static assets like images, fonts, etc.
│   ├── src/                    # React components and pages
│   ├── package-lock.json       # Lock file for npm dependencies
│   ├── package.json            # Frontend project configuration
│   ├── README.md               # Frontend documentation
│   ├── next-env.d.ts           # TypeScript declarations for Next.js
│   ├── next.config.ts          # Next.js configuration file
│   └── requirements.txt        # Python dependencies for backend
│
├── .gitignore                  # Specifies files and directories to ignore
├── package-lock.json           # npm lock file
├── README.md                   # Project documentation (this file)
└── tsconfig.json               # TypeScript configuration file
```

## Setup

### Backend

1. **Install dependencies**:
   - Navigate to the `backend/` directory.
   - Create a virtual environment (if not done already):
     ```bash
     python3 -m venv venv
     ```
   - Activate the virtual environment:
     ```bash
     source venv/bin/activate  # On macOS/Linux
     ```
   - Install the dependencies:
     ```bash
     pip3 install -r requirements.txt
     ```

2. **Run the backend server**:
   - Start the Flask server:
     ```bash
     python3 app.py
     ```
   - The API will be available at `http://localhost:5001`.

### Frontend

1. **Install dependencies**:
   - Navigate to the `frontend/` directory.
   - Install the npm dependencies:
     ```bash
     npm install
     ```

2. **Run the frontend server**:
   - Start the development server:
     ```bash
     npm run dev
     ```
   - The frontend will be available at `http://localhost:3000`.

## Usage

1. Open the frontend in your browser (`http://localhost:3000`).
2. Enter the text you want to summarize in the provided text box.
3. Click "Summarize" to generate the summary, which will be displayed below the input.

## Technologies Used

- **Backend**:
  - Python 3
  - Flask
  - Hugging Face Transformers
  - PyTorch

- **Frontend**:
  - React
  - Next.js
  - Tailwind CSS
  - Axios for API requests

