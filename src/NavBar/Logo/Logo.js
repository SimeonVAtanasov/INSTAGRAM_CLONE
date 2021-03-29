import React from "react"

function Logo(props) {
    return (
        <img
            className={props.className}
            src={"logoHeader.png"}
            alt="instagram"
            width={props.width}
        />
    )
}

export default Logo