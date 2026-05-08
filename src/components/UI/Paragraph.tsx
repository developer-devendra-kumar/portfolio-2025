import React from 'react'

interface IParagraphProps {
    text: string;
    id?: string;
    className?: string;
}
const Paragraph: React.FC<IParagraphProps> = ({ text, id, className }) => {
    return (
        <p id={id} className={`fade-up mt-2 text-lg text-text-light dark:text-text-dark ${className || ""}`}>
            {text}
        </p>
    )
}

export default Paragraph
