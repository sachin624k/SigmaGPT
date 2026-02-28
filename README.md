## 🚀 SigmaGPT – Full Stack AI Chat Application
<p align="center">
  <img 
    src="./Frontend/src/assets/img1.png" 
    alt="SigmaGPT UI 1"
    width="950"
  />
</p>

SigmaGPT is a thread-based AI chat application built using:
- ***Frontend***: React
- ***Backend***: Node.js + Express
- ***Database***: MongoDB
- ***AI Integration***: OpenAI API
It stores chat history and manages conversations using thread architecture.

### 🏗️ System Architecture
```mermaid
flowchart LR
    A[User] --> B[Frontend - React]
    B --> C[Backend - Express API]
    C --> D[(MongoDB Database)]
    C --> E[OpenAI API]
    E --> C
    C --> B
```
**Flow Summary**
- User sends message from frontend
- Backend receives via POST /api/chat
- Backend checks/creates thread
- Saves user message
- Calls OpenAI API
- Saves AI response
- Sends reply back to frontend

### 🗂️ Project Structure
```code
backend/
│
├── models/
│     ├── Thread.js
│     └── Message.js
│
├── routes/
│     └── chat.js
│
├── utils/
│     └── openai.js
│
└── server.js
```
### 🗄️ Database Design
**Thread Schema**
- `threadId`
- `title`
- `messages[]`
- `createdAt`
- `updatedAt`

**Message Schema**
- `content`
- `role` → ("user" | "assistant")
- `timestamp`
Each thread represents one chat session.

### 🔌 API Endpoints
***Get All Threads***
```code
GET /thread
```
***Get Single Thread***
```code
GET /thread/:threadId
```
***Delete Thread***
```code
DELETE /thread/:threadId
```
***Send Message & Get AI Reply***
```code
 POST /chat
Body:
{
  threadId,
  message
}
```

### 🔄 Chat Lifecycle (Sequence Diagram)
```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant DB as MongoDB
    participant AI as OpenAI

    U->>F: Send Message
    F->>B: POST /api/chat
    B->>DB: Check Thread
    alt Thread not exists
        B->>DB: Create Thread
    end
    B->>DB: Save User Message
    B->>AI: Request Completion
    AI-->>B: AI Reply
    B->>DB: Save AI Reply
    B-->>F: Return Response
    F-->>U: Display Reply
```

### ✨ Features
- Thread-based conversation system
- Persistent chat history
- AI-powered responses
- RESTful API architecture
- Clean modular backend structure
- Markdown support in responses
<p align="center">
  <img 
    src="./Frontend/src/assets/img2.png" 
    alt="SigmaGPT UI 2"
    width="950"
  />
</p>