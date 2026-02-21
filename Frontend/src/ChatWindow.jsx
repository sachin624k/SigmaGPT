import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext } from "react";

const ChatWindow = () => {
  const { prompt, setPrompt, reply, setReply, currThreadId, setCurrThreadId } = useContext(MyContext);

  const getReply = async () => {
    console.log("message ", prompt, " threadId ", currThreadId);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId
      })
    };

    try {
      const response = await fetch("http://localhost:8080/api/chat", options);
      const res = await response.json();
      console.log(res);
      setReply(res.reply);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='chatWindow'>
      <div className='navbar'>
        <span>SigmaGPT <i className="fa-solid fa-angle-down"></i></span>
        <div className="userIconDiv">
          <span className="userIcon"><i className="fa-solid fa-user"></i></span>
        </div>
      </div>
      {/* <Chat></Chat> */}

      <div className="chatInput">
        <div className="inputBox">
          <input placeholder="Ask anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' ? getReply() : ''}
          >

          </input>
          <div id="submit" onClick={getReply}><i className="fa fa-paper-plane" aria-hidden="true"></i></div>
        </div>
        <p className="info">
          SigmaGPT can make mistakes. Check important info. See Cookie Preferences.
        </p>
      </div>
    </div>
  )
}

export default ChatWindow;