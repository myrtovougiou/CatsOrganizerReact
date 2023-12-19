import { forwardRef } from 'react'
import { medVisitIcons, medVisitTypes } from '../constants.js';

export const MedVisitType = forwardRef((props ,ref) => {
    const {type, handleClick} = props;

    return (
        <div ref = {ref} className="medVisitType" onClick={() => handleClick(type)}>
            <img alt={medVisitTypes[type]} src={medVisitIcons[type]}/>
            <p>
                {medVisitTypes[type]}
            </p>
        </div>)
})