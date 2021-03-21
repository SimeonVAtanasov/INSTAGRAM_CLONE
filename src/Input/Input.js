export default function Input(props) {
    return (
        <>
            <input className={props.className} value={props.value} placeholder={props.title} onInput={props.onInput} type="text" required />
            {(props.text) ? <span>{props.text}</span> : <></>}

        </>
    )
}