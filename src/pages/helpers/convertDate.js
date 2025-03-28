export default function TransformDate(date){
    const dateObject = new window.Date(date);
    const getFullYear = dateObject.getFullYear();
    const getMonth = (dateObject.getMonth()+1).toString().padStart(2,"0");
    const getDay = dateObject.getDate().toString().padStart(2,"0");
   return `${getFullYear}-${getMonth}-${getDay}`
} 