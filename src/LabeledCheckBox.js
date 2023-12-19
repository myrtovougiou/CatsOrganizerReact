import { Checkbox } from "@mui/material";
import { getCheckBoxStyle } from './common.js'

export default function LabeledCheckBox({caption, checked, onChange, className = null}){
return (
    <div className="checkBox">
        <Checkbox sx = {getCheckBoxStyle()} checked={checked} onChange={onChange}/>
        <p className={className}>{caption}</p>
  </div>
)
}