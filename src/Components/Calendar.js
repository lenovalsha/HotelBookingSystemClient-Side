import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// export default function Calendars(props){
//     return( <Calendar onChange={props.setDate} value={props.date}/>)
// }
export default function Calendars(props){
    return(<div className='datepicker'>
    <label for="start">{props.label}</label>

    <input type="date" id="start" name="trip-start"
       value={props.date}
       min={new Date().toISOString().split("T"[0])} max="2023-12-31" onChange={(e) => props.setDate(e.target.value)}/>
    </div>
    )
}