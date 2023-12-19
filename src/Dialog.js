import { Dialog } from '@mui/material';
import { MedVisitType } from './medicalVisits/MedVisitType.js'
import { useRef, useState } from 'react';
import { medVisitTypes, medVisitsUrls } from './constants.js';
import { handleRequest } from './request.js'
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import DatePicker from './DatePicker.js';

export function NewMedVisitDialog({catId, open, handleClose, setNewMedVisitType}){
    const [selectedMedVisitType, setSelectedMedVisitType] = useState(null);
    const [scheduledDate, setScheduledDate] = useState(Date.now());
    const medVisitTypesRef = useRef(new Map());

    function handleClick(id) {
      if (selectedMedVisitType) {
        let node = medVisitTypesRef.current.get(selectedMedVisitType);
        node.className = 'medVisitType';
      }
      setSelectedMedVisitType(id);
      let node = medVisitTypesRef.current.get(id);
      node.className = 'medVisitTypeSelected';
    }

    function handleSave(){
      if (selectedMedVisitType == null){
        return;
      }

      let scheduled = new Date(scheduledDate);
      var datestring = scheduled.getFullYear()  + "-" + (scheduled.getMonth()+1) + "-" + scheduled.getDate() + " " +
        scheduled.getHours() + ":" + scheduled.getMinutes();

      handleRequest('POST', medVisitsUrls[selectedMedVisitType], postSave, {
        scheduledDate: datestring,
        catId: catId
      });
    }

    function postSave(){
      setNewMedVisitType(selectedMedVisitType);      
      setSelectedMedVisitType(null);
      setScheduledDate(Date.now());
      handleClose();
    }
    
    let medicalVisitTypes= medVisitTypes.map((type,i) => <MedVisitType type = {i} handleClick={handleClick} ref={node => medVisitTypesRef.current.set(i, node)}/>)

    function handleDialogClose(){
      handleClose(); 
      setSelectedMedVisitType(null);
    }

    return (
        <div>
            <Dialog open={open} onClose={handleDialogClose} sx={getDialogWidth('820px')}>
              <div className='dialog'>
                <div className='dialogTitle'>
                  <IconButton><CloseIcon onClick= {handleDialogClose}/></IconButton>
                  <label>Add Medical Visit</label>
                  <IconButton><DoneIcon onClick= {handleSave}/></IconButton>
                </div>
                <div className ='medVisitTypes'>{medicalVisitTypes}</div>
                <DatePicker caption='Scheduled' day={scheduledDate} setScheduledDate = {setScheduledDate}/>
              </div>
            </Dialog>
        </div>
      );
}

export function EditDialog({title, open, loadContent, handleClose, handleSave}){

  return (
      <div>
          <Dialog open={open} onClose={handleClose} sx={getDialogWidth('500px')}>
            <div className='editDialog'>
              <div className='dialogTitle'>
                <IconButton><CloseIcon onClick= {handleClose}/></IconButton>
                <label>{title}</label>
                <IconButton><DoneIcon onClick= {handleSave}/></IconButton>
              </div>
              {loadContent()}
            </div>
          </Dialog>
      </div>
    );
}

function getDialogWidth(width){
  return {
    "& .MuiDialog-container": {
      "& .MuiPaper-root": {
        width: "100%",
        maxWidth: width
      },
    },
  }
}