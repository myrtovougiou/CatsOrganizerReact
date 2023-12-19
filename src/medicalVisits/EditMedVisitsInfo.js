import { TextField, MenuItem } from "@mui/material";
import { medVisitTypes, medVisitIcons, dateFormats, medVisitsUrls, parasites, bloodResults, chipPositions } from '../constants.js';
import { handleValueChanged, getMenuItemStyle } from "../common.js";
import { handleRequest } from '../request.js';
import LabeledCheckBox from "../LabeledCheckBox.js";
import IconButton from '@mui/material/IconButton';
import DatePicker from '../DatePicker.js';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export function getEditedMedVisitInfo(editedMedVisit, setEditedMedVisit, setReloadMedVisits, setDeletedMedVisit){

  function handleDelete(){
    handleRequest('DELETE', medVisitsUrls[editedMedVisit.type].concat(editedMedVisit.id), () => {
      setReloadMedVisits(true);
      setDeletedMedVisit(editedMedVisit);
    });
  }

  function setSelectedDate(date){
    setEditedMedVisit({...editedMedVisit, scheduledDate:date})
  }

  switch(editedMedVisit.type){
    case 0: return <ParasiteTreatmentEditInfo editedMedVisit={editedMedVisit} setEditedMedVisit={setEditedMedVisit} handleDelete={handleDelete} setSelectedDate={setSelectedDate}/>
    case 1: return <MicrochipEditInfo editedMedVisit={editedMedVisit} setEditedMedVisit={setEditedMedVisit} handleDelete={handleDelete} setSelectedDate={setSelectedDate}/>
    case 2: return <BloodTestEditInfo editedMedVisit={editedMedVisit} setEditedMedVisit={setEditedMedVisit} handleDelete={handleDelete} setSelectedDate={setSelectedDate}/>
    case 3: return <VaccinationEditInfo editedMedVisit={editedMedVisit} setEditedMedVisit={setEditedMedVisit} handleDelete={handleDelete} setSelectedDate={setSelectedDate}/>
    case 4: return <SterilizationEditInfo editedMedVisit={editedMedVisit} setEditedMedVisit={setEditedMedVisit} handleDelete={handleDelete} setSelectedDate={setSelectedDate}/>
    case 5: return <SurgeryEditInfo editedMedVisit={editedMedVisit} setEditedMedVisit={setEditedMedVisit} handleDelete={handleDelete} setSelectedDate={setSelectedDate}/>
    case 6:
    default: return <AppointmentEditInfo editedMedVisit={editedMedVisit} setEditedMedVisit={setEditedMedVisit} handleDelete={handleDelete} setSelectedDate={setSelectedDate}/>
  }
}

function SurgeryEditInfo({editedMedVisit, setEditedMedVisit, handleDelete, setSelectedDate}){
  return (
    <>
      <div className='surgerySection'>
        <div className="deleteSection">
          <IconButton onClick={handleDelete}><DeleteForeverIcon/></IconButton> 
          <img alt={medVisitTypes[editedMedVisit.type]} src={medVisitIcons[editedMedVisit.type]}/>    
        </div>                  
        <div className='surgeryInfo'>
          <TextField name ='purpose' label="Reason" variant="outlined" defaultValue = {editedMedVisit && editedMedVisit.purpose} onChange={(e) => handleValueChanged(e, editedMedVisit, setEditedMedVisit)}/>
          <DatePicker caption ='Scheduled' day={editedMedVisit && editedMedVisit.scheduledDate} setScheduledDate={setSelectedDate}/>
          <TextField name ='cost' label="Cost(€)" type="number" variant="outlined" defaultValue = {editedMedVisit && editedMedVisit.cost} onChange={(e) => handleValueChanged(e, editedMedVisit, setEditedMedVisit)}/>
          <TextField name ='medicationInstructions' className="textArea" label="Medication Instructions" multiline maxRows={10} variant="outlined" defaultValue = {editedMedVisit && editedMedVisit.medicationInstructions} onChange={(e) => handleValueChanged(e, editedMedVisit, setEditedMedVisit)}/>
          <LabeledCheckBox caption='Canceled' checked={editedMedVisit && editedMedVisit.isCanceled} onChange={() => {setEditedMedVisit({...editedMedVisit, isCanceled: !editedMedVisit.isCanceled})}}/>
        </div>
      </div>   
    </>)
}

function ParasiteTreatmentEditInfo({editedMedVisit, setEditedMedVisit, handleDelete, setSelectedDate}){
  let menuItems = parasites.map((type, i) => <MenuItem sx = {getMenuItemStyle()} value={i}>{type}</MenuItem>);
  
  return (
    <>
      <div className='parTreatmentSection'>
        <div className='deleteSection'>
          <IconButton onClick={handleDelete}><DeleteForeverIcon/></IconButton>
          <img alt={medVisitTypes[editedMedVisit.type]} src={medVisitIcons[editedMedVisit.type]}/>
        </div> 
        <div className='parTreatmentInfo'>
          <TextField name ='medicine' label="Medicine" variant="outlined" defaultValue = {editedMedVisit && editedMedVisit.medicine} onChange={(e) => handleValueChanged(e, editedMedVisit, setEditedMedVisit)}/>
          <TextField name ='parasitesType' select className='select' label="Type" value={editedMedVisit && editedMedVisit.parasitesType} onChange={(e) => handleValueChanged(e, editedMedVisit, setEditedMedVisit)}>
            {menuItems}
          </TextField>
          <TextField name ='cost' label="Cost(€)" type="number" variant="outlined" defaultValue = {editedMedVisit && editedMedVisit.cost} onChange={(e) => handleValueChanged(e, editedMedVisit, setEditedMedVisit)}/>
          <DatePicker name='scheduled' caption='Scheduled' day={editedMedVisit && editedMedVisit.scheduledDate} setScheduledDate={setSelectedDate}/>
          <LabeledCheckBox caption='Canceled' checked={editedMedVisit && editedMedVisit.isCanceled} onChange={() => {setEditedMedVisit({...editedMedVisit, isCanceled: !editedMedVisit.isCanceled})}}/>
        </div>
      </div>  
      </>)
}

function MicrochipEditInfo({editedMedVisit, setEditedMedVisit, handleDelete, setSelectedDate}){
  let menuItems = chipPositions.map((position, i) => <MenuItem sx = {getMenuItemStyle()} value={i}>{position}</MenuItem>);

  return (
    <>
      <div className='microchipSection'>
        <div className="deleteSection">
          <IconButton onClick={handleDelete}><DeleteForeverIcon/></IconButton>   
          <img alt={medVisitTypes[editedMedVisit.type]} src={medVisitIcons[editedMedVisit.type]}/>  
        </div>          
        <div className='microchipInfo'> 
          <TextField name = 'position' select className='select' label='Position' variant="outlined" defaultValue = {editedMedVisit && editedMedVisit.position} onChange={(e) => handleValueChanged(e, editedMedVisit, setEditedMedVisit)}>
            {menuItems}
          </TextField>
          <TextField name='number' label="Number" variant="outlined" defaultValue = {editedMedVisit && editedMedVisit.number} onChange={(e) => handleValueChanged(e, editedMedVisit, setEditedMedVisit)}/>
          <DatePicker caption ='Scheduled' day={editedMedVisit && editedMedVisit.scheduledDate} setScheduledDate={setSelectedDate}/>
          <TextField name= 'cost' label="Cost(€)" type="number" variant="outlined" defaultValue = {editedMedVisit && editedMedVisit.cost} onChange={(e) => handleValueChanged(e, editedMedVisit, setEditedMedVisit)}/>
          <LabeledCheckBox caption='Municipality Declared' checked={editedMedVisit && editedMedVisit.isMunicipalityDeclared} onChange={() => {setEditedMedVisit({...editedMedVisit, isMunicipalityDeclared: !editedMedVisit.isMunicipalityDeclared})}}/>
          <LabeledCheckBox caption='Canceled' checked={editedMedVisit && editedMedVisit.isCanceled} onChange={() => {setEditedMedVisit({...editedMedVisit, isCanceled: !editedMedVisit.isCanceled})}}/>
        </div>
      </div>   
    </>)
}

function VaccinationEditInfo({editedMedVisit, setEditedMedVisit, handleDelete, setSelectedDate}){
    return (     
      <>
        <div className='vaccinationSection'>
          <div className="deleteSection">
            <IconButton onClick={handleDelete}><DeleteForeverIcon/></IconButton> 
            <img alt={medVisitTypes[editedMedVisit.type]} src={medVisitIcons[editedMedVisit.type]}/>    
          </div>         
          <div className='vaccinationInfo'>
            <TextField name ='vaccineName' label="Vaccine" variant="outlined" defaultValue = {editedMedVisit && editedMedVisit.vaccineName} onChange={(e) => handleValueChanged(e, editedMedVisit, setEditedMedVisit)}/>
            <TextField name ='vaccineManufacturer' label="Manufacturer" variant="outlined" defaultValue = {editedMedVisit && editedMedVisit.vaccineManufacturer} onChange={(e) => handleValueChanged(e, editedMedVisit, setEditedMedVisit)}/>
            <TextField name ='disease' label="Disease" variant="outlined" defaultValue = {editedMedVisit && editedMedVisit.disease} onChange={(e) => handleValueChanged(e, editedMedVisit, setEditedMedVisit)}/>
            <TextField name ='catWeight' label="Weight(kg)" type="number" variant="outlined" defaultValue = {editedMedVisit && editedMedVisit.catWeight} onChange={(e) => handleValueChanged(e, editedMedVisit, setEditedMedVisit)}/>
            <TextField name ='cost' label="Cost(€)" type="number" variant="outlined" defaultValue = {editedMedVisit && editedMedVisit.cost} onChange={(e) => handleValueChanged(e, editedMedVisit, setEditedMedVisit)}/>
            <DatePicker caption='Scheduled' day={editedMedVisit && editedMedVisit.scheduledDate} setScheduledDate={setSelectedDate}/>
            <LabeledCheckBox caption='Canceled' checked={editedMedVisit && editedMedVisit.isCanceled} onChange={() => {setEditedMedVisit({...editedMedVisit, isCanceled: !editedMedVisit.isCanceled})}}/>
          </div>
        </div>  
      </>)
}

function BloodTestEditInfo({editedMedVisit, setEditedMedVisit, handleDelete, setSelectedDate}){

  function setResultsDate(x){
    setEditedMedVisit({...editedMedVisit, bloodResultsDate:x})
  }

  let menuItems = bloodResults.map((result, i) => <MenuItem sx = {getMenuItemStyle()} value={i == 0 ? 'false' : 'true'}>{result}</MenuItem>);

    return (
      <>
        <div className='bloodTestSection'>
          <div className="deleteSection">
            <IconButton onClick={handleDelete}><DeleteForeverIcon/></IconButton> 
            <img alt={medVisitTypes[editedMedVisit.type]} src={medVisitIcons[editedMedVisit.type]}/>    
          </div>               
          <div className='bloodTestInfo'>
          <TextField name ='reason' label="Reason" variant="outlined" defaultValue = {editedMedVisit && editedMedVisit.reason} onChange={(e) => handleValueChanged(e, editedMedVisit, setEditedMedVisit)}/>
          <TextField name ='isNegative' select className='select' label="Result" value={editedMedVisit && editedMedVisit.isNegative} onChange={(e) => handleValueChanged(e, editedMedVisit, setEditedMedVisit)}>
            {menuItems}
          </TextField>
          <TextField name ='cost' number label="Cost(€)" variant="outlined" defaultValue = {editedMedVisit && editedMedVisit.cost} onChange={(e) => handleValueChanged(e, editedMedVisit, setEditedMedVisit)}/>
          <DatePicker caption ='Scheduled' day={editedMedVisit && editedMedVisit.scheduledDate} setScheduledDate={setSelectedDate}/>
          <DatePicker format={dateFormats[1]} caption='Results recieved' day={editedMedVisit && editedMedVisit.bloodResultsDate} setScheduledDate={setResultsDate}/>
          <LabeledCheckBox caption='Canceled' checked={editedMedVisit && editedMedVisit.isCanceled} onChange={() => {setEditedMedVisit({...editedMedVisit, isCanceled: !editedMedVisit.isCanceled})}}/>
          </div>  
        </div>   
      </>)
}

function SterilizationEditInfo({editedMedVisit, setEditedMedVisit, handleDelete, setSelectedDate}){

  function setStitchesRemovalDate(x){
    setEditedMedVisit({...editedMedVisit, stitchesRemovalDate:x})
  }

    return (
      <>
        <div className='sterilizationSection'>
          <div className="deleteSection">
            <IconButton onClick={handleDelete}><DeleteForeverIcon/></IconButton>  
            <img alt={medVisitTypes[editedMedVisit.type]} src={medVisitIcons[editedMedVisit.type]}/>   
          </div>          
          <div className='sterilizationInfo'>
          <DatePicker caption ='Scheduled' day={editedMedVisit && editedMedVisit.scheduledDate} setScheduledDate={setSelectedDate}/>
          <DatePicker format={dateFormats[1]} caption='Stitches Removed' day={editedMedVisit && editedMedVisit.stitchesRemovalDate} setScheduledDate={setStitchesRemovalDate}/>
          <TextField name ='cost' label="Cost(€)" type="number" variant="outlined" defaultValue = {editedMedVisit && editedMedVisit.cost} onChange={(e) => handleValueChanged(e, editedMedVisit, setEditedMedVisit)}/>
          <TextField name ='medicationInstructions' className="textArea" label="Medication Instructions" multiline maxRows={10} variant="outlined" defaultValue = {editedMedVisit && editedMedVisit.medicationInstructions} onChange={(e) => handleValueChanged(e, editedMedVisit, setEditedMedVisit)}/>
          <LabeledCheckBox caption='Canceled' checked={editedMedVisit && editedMedVisit.isCanceled} onChange={() => {setEditedMedVisit({...editedMedVisit, isCanceled: !editedMedVisit.isCanceled})}}/>
          </div>
        </div>   
      </>)
}

function AppointmentEditInfo({editedMedVisit, setEditedMedVisit, handleDelete, setSelectedDate}){
    return (
      <>
        <div className='appointmentSection'>
          <div className="deleteSection">
            <IconButton onClick={handleDelete}><DeleteForeverIcon/></IconButton>  
            <img alt={medVisitTypes[editedMedVisit.type]} src={medVisitIcons[editedMedVisit.type]}/>   
          </div>                
          <div className='appointmentInfo'>
            <TextField name ='notes' label="Reason" multiline maxRows={10} variant="outlined" defaultValue = {editedMedVisit && editedMedVisit.notes} onChange={(e) => handleValueChanged(e, editedMedVisit, setEditedMedVisit)}/>
            <DatePicker caption ='Scheduled' day={editedMedVisit && editedMedVisit.scheduledDate} setScheduledDate={setSelectedDate}/>
            <TextField name='cost' label="Cost(€)" type="number" variant="outlined" defaultValue = {editedMedVisit && editedMedVisit.cost} onChange={(e) => handleValueChanged(e, editedMedVisit, setEditedMedVisit)}/>
            <LabeledCheckBox caption='Canceled' checked={editedMedVisit && editedMedVisit.isCanceled} onChange={() => {setEditedMedVisit({...editedMedVisit, isCanceled: !editedMedVisit.isCanceled})}}/>
          </div>
        </div>   
    </>)
}