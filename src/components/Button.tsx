import { TChildren } from "../types/types";

interface ButtonProps {
    children: TChildren;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}

export default function Button({children, onClick, ...props}: ButtonProps) {
    return <button onClick={onClick} {...props}>{children}</button>;
}