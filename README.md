# MediChat AI 🏥

MediChat AI is an intelligent medical awareness chatbot designated to provide reliable, evidence-based health information to the general public. It bridges the gap between conversational AI and verified medical data, eliminating the risks of "hallucinations" common in standard large language models by relying on **Retrieval-Augmented Generation (RAG)** and **Symptom Detection AI**. 

## 🌟 Core Features

- **Symptom Detection** 🩺: Employs Natural Language Processing (NLP) to extract clinical symptoms directly from natural language queries, enabling a highly focused conversation.
- **RAG-Powered Responses** 📖: Dynamically queries high-fidelity, verified medical datasets (such as WHO reports and expert clinical guidelines) to ensure the generated responses are evidence-based and factual.
- **Dynamic Awareness Alerts** 🌍: A real-time monitoring module that cross-references user geographical data with global disease outbreak datasets to push proactive, location-specific health warnings to users.
- **User Session Tracking** 📜: Securely maintains conversation histories to give users a personalized health awareness record.

## 🏗️ System Architecture

The project is built on a modern, modular three-tier architecture ensuring scalability, separation of concerns, and ease of maintenance:

1. **Presentation Layer (Front-End)**: Built with **React.js** and **Tailwind CSS**. Manages the chat interface, awareness dashboards, symptom checklists, and secure client-side sessions for a responsive user experience.
2. **Application Layer (Back-End)**: Powered by **Node.js** and **Express**. Handles NLP parsing, routing of user queries, execution of the RAG pipeline, and orchestrates the AI model generation.
3. **Database Layer**: A high-speed robust JSON-based layer (managing `users`, `diseases`, `symptoms`, `history`, and `outbreaks`). Optimized for rapid symptom matching and retrieving thousands of verified medical facts for RAG augmentation.

### System Modules

- **Admin Module**: Manages medical datasets, global outbreak alerts, and clinical guidelines.
- **Medical Awareness & Analysis Module**: Core logic handling the extraction of natural language symptoms and matching them to disease probabilities and prevention strategies.
- **User (Patient) Module**: The primary interface for users to submit queries, receive medical advice, and view their history and localized alerts.

## 🧪 Testing Methods

The application undergoes rigorous testing across multiple stages to guarantee accuracy and reliability:
- **Unit Testing**: Testing individual functions like Symptom Extraction and Admin Login.
- **Integration Testing**: Verifying the flow from Chat UI -> Backend API -> JSON Knowledge Base.
- **Database Testing**: Ensuring `history.json` and medical datasets are accurately read and appended without duplication.
- **Performance Testing**: Ensuring the RAG vector retrieval happens smoothly in a timely manner.

## 🚀 Future Enhancements

- **Mobile Application Integration**: Extending the chatbot to Android/iOS for instant mobile access.
- **Wearable Health Data**: Syncing data from devices (e.g., heart rate monitors) for greater personalization.
- **Multilingual Support**: Providing native healthcare queries across various regional languages.
- **Cloud-Based Storage**: Migrating datasets to a robust cloud database for enhanced security and real-time collaborative updates.

## 📚 References & Concepts

Built using leading concepts from:
- *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (Lewis et al., 2020)*
- Standard guidelines available via the World Health Organization (WHO) website.
- Official documentation for React, Node.js, Express, and modern NLP.
