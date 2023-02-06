import React from "react";
import Img from "../img/img.png"
import Attach from "../img/attach.png"

const Input = () => {
    return (
        <div className="input">
            <input type="text" name="" id="" placeholder="Type Something..." />
            <div className="send">
                <img src={Img} alt="" />
                <label htmlFor="file">
                    <img src={Attach} alt="" />
                </label>
                <input style={{display: "none"}} type="file" name="" id="file" />
                <button>Send</button>
            </div>
        </div>
    )
}

export default Input