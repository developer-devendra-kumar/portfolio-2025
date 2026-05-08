import React from 'react'

interface ISectionTitleProps {
    title: string;
    sectionId?: string;
    accentId?: string;
}
const SectionTitle: React.FC<ISectionTitleProps> = ({ title, sectionId, accentId }) => {
    return (
        <h2 className="text-4xl font-bold mb-8 text-center" id={sectionId || ""}>
            <span className="section-title" {...(accentId ? { id: accentId } : {})}>
                {title}
            </span>
        </h2>
    )
}

export default SectionTitle
