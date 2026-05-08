import React from 'react'

interface IMyJourneyCard {
    title: string;
    info: string;
}
const MyJourneyCard: React.FC<IMyJourneyCard> = ({ title, info }) => {
    return (
        <>
            <h3 className="text-text-light dark:text-text-dark text-lg">{title}</h3>
            <p className="text-text-light dark:text-text-dark text-base">{info}</p>
        </>
    )
}

export default MyJourneyCard