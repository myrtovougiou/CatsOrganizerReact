export function getMenuItemStyle(){
    return {fontFamily: "'Courier New', Courier, monospace", fontSize:'13px'};
}

export function getCheckBoxStyle(){
    return {color: 'rgba(0, 0, 0, 0.2)', '& .MuiSvgIcon-root': { fontSize: 17 }};
}

export function handleValueChanged(e, value, setValue){
    setValue({
        ...value,
        [e.target.name]: e.target.value
      });
}

export function sortByBirthDate(prev, next) {
  if (prev.birthDate > next.birthDate){
      return 1;
  }
  else if (prev.birthDate < next.birthDate){
      return -1;
  }
  else {
      return 0;
  }
}

export function sortByLastName(prev, next) {
  if (prev.lastName > next.lastName){
      return 1;
  }
  else if (prev.lastName < next.lastName){
      return -1;
  }
  else if (prev.firstName > next.firstName){
      return 1;
  }
  else if (prev.firstName < next.firstName){
    return -1;
  }
  else {
    return 0;
  }
}