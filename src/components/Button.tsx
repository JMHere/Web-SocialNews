
interface ButtonProps {
    buttonText?: string
    color?: string
    classString: string
    dismiss?: string
    arial?: string
    clicked?: () => void;

}

function Button({buttonText, color= "primary", classString, dismiss, arial, clicked } : ButtonProps) {
  return (<>
    <button type="button" className={classString} data-bs-dismiss={dismiss} aria-label={arial} onClick={clicked}>{buttonText}</button>
    </>
  )
}

export default Button