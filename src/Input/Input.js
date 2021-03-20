export default function Input(props) {
    return (
        <>
            <input onInput={props.onInput} type="text" required />
            <span>{props.text}</span>
        </>
    )
}