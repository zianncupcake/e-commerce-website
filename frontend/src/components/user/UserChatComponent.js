import "../../chat.css"
import React, {useState} from 'react';

const UserChatComponent = () => {
    const [isChecked, setIsChecked] = useState(false);
    const handleChange = () => {
        setIsChecked(!isChecked);
      };
    return (
        <>
        <input type="checkbox" id="check" checked={isChecked} onChange={handleChange}/>
        <label className="chat-btn" htmlFor="check">
            <span className="position-absolute top-0 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
            <i className={`bi ${isChecked ? 'bi-x-circle' : 'bi-chat-dots'}`}></i>
        </label>
        <div className="chat-wrapper" style={{ opacity: isChecked ? 1 : 0 }}>
            <div className="chat-header">
                <h6>Let's Chat</h6>
            </div>
            <div className="chat-form">
                <div className="chat-msg">
                <p className="bg-primary p-3 ms-4 text-light rounded-pill">
                        <b>You wrote:</b>Hello 
                    </p>
                    <p>
                        <b>Support wrote:</b>Hello john
                    </p>
                    
                </div>
                <textarea id="clientChatMsg" className="form-control" placeholder="What's up?"></textarea>
                <button className="btn btn-success btn-block">Submit</button>
            </div>
            
        </div>
        </>
    )
        
}

export default UserChatComponent