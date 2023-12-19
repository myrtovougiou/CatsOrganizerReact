import { medVisitTypes, medVisitIcons } from '../constants.js';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

export default function MedicalVisit({type, canceled, scheduledDate, handleClick}){
    let scheduled = new Date(scheduledDate);
    let past = scheduled <= Date.now();
    scheduled = scheduled.toString();

    let medVisitClass = 'medicalVisit';
    if (past && canceled){
        medVisitClass = 'medicalVisit canceledPast';
    }
    else if (canceled){
        medVisitClass = 'medicalVisit canceled';
    }
    else if (past){
        medVisitClass = 'medicalVisit past';
    }

    return (
        <div className={medVisitClass} onClick={() => {handleClick()}}>
            <p>{medVisitTypes[type]}</p>
            <img src={medVisitIcons[type]}/>
            <p className='medVisitDate'>{scheduled.slice(4,15)}</p>
            <div className='medVisitDate'>
                <AccessAlarmIcon/>
                {scheduled.slice(16,21)}
            </div>
        </div>)
}
