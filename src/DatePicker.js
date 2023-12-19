import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { dateFormats } from './constants';
import dayjs from "dayjs";

export default function DatePicker({caption, day, setScheduledDate, format}){
  const dateFormat = format ?? dateFormats[0];
  
  let dateClass = 'datePicker';
  let date = day;
  if (!day){
    dateClass = 'emptyDate datePicker';
    date = Date.now();
  }
  
  return (
  <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDateTimePicker className={dateClass} format={dateFormat} label={caption} value={dayjs(new Date(date))} onChange={(newDate) => {setScheduledDate(newDate)}}/>
    </LocalizationProvider>
  </>)
}