import { ReactNode } from "react"
import Button from "./Button";

interface AlertProps {
    children: ReactNode;
    dismiss?: string;
    pRole?: string;
    onClose?: () => void
}

function Alert({children, dismiss, pRole, onClose} : AlertProps) {
  return (<>
    <div className={"alert alert-primary " + dismiss} role={pRole}>
    <strong>{children}</strong>
    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={onClose}></button>
    </div>
    </>
  )
}

export default Alert