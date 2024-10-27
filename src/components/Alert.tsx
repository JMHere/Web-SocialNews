import { ReactNode } from "react"
import Button from "./Button";

interface AlertProps {
    children: ReactNode;
    dismiss?: string;
    pRole?: string;
}

function Alert({children, dismiss, pRole} : AlertProps) {
  return (<>
    <div className={"alert alert-primary " + dismiss} role={pRole}>
    <strong>{children}</strong> bruh
    <Button classString="btn-close" dismiss="alert" arial="Close"></Button>
    </div>
    </>
  )
}

export default Alert