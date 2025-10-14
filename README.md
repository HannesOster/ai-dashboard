# AI Content Assistant Dashboard

Eine moderne React-Anwendung mit AI-gestützten Text-Funktionen, powered by Hugging Face.

## 🚀 Features

- **Text Summarizer** - Fasse lange Texte in Kernpunkte zusammen
- **Text Translator** - Übersetze zwischen Englisch und Deutsch
- **Rewriter / Paraphraser** - Formuliere Texte neu

## 🛠️ Tech Stack

- React 18 + TypeScript
- Vite
- TailwindCSS
- Zustand (State Management)
- Lucide React (Icons)
- Hugging Face Inference API

## 📦 Installation

```bash
npm install
```

## 🔑 Setup

1. Erstelle eine `.env` Datei im Root-Verzeichnis
2. Füge deinen Hugging Face API Key hinzu:

```
VITE_HUGGINGFACE_API_KEY=dein_api_key_hier
```

Du kannst einen kostenlosen API Key auf [Hugging Face](https://huggingface.co/settings/tokens) erstellen.

## 🏃 Development

```bash
npm run dev
```

Öffne [http://localhost:5173](http://localhost:5173) im Browser.

## 🏗️ Build

```bash
npm run build
```

## 📁 Projekt-Struktur

```
src/
├── components/        # React Komponenten
│   ├── Dashboard.tsx
│   ├── Header.tsx
│   ├── InputSection.tsx
│   ├── FunctionSelector.tsx
│   ├── GenerateButton.tsx
│   └── OutputSection.tsx
├── services/          # API Services
│   └── huggingface.ts
├── store/            # Zustand Store
│   └── useAppStore.ts
├── App.tsx
└── main.tsx
```

## 🎨 Design

- Dark Mode Design
- Moderne, clean UI
- Responsive Layout
- Gradient-Buttons
- Smooth Transitions
# ai-dashboard
