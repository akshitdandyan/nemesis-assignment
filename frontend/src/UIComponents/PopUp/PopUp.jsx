import { useEffect, useState } from 'react';
import './styles.scss';

let w = 100;

const PopUp = ({ popUpState, setPopUpState }) => {
    const [visibility,setVisibilty] = useState(true)
    const [bg,setBg]=useState("grey");
    const [loaderWidth,setLoaderWidth] = useState(100);

    // pop up component is working in a very simple way, whenever message is empty is will be hidden 
    // and whenever message is pushed to state, it will pop up
    useEffect(() => {
        if(popUpState.message)setVisibilty(true)
        else return setVisibilty(false)
        if(popUpState.type==='error') setBg("rgb(158, 80, 80)")
        else if(popUpState.type==='success') setBg("rgb(80, 148, 96)")
        var widthChanger = setInterval(async() => {
            if(w===-25){
                setVisibilty(false)
                clearInterval(widthChanger)
                return
            }
            setLoaderWidth(w)
            w-=25
        }, 1000);
        setLoaderWidth(100)
        w = 100
    }, [popUpState])


    return (
        <div className={visibility?'pop-up':'pop-up hide-pop-up'} style={{background:bg}}>
            <div className='pop-up-message'>{popUpState.message}</div>
            <div className='pop-up-close-icon'><i className="fas fa-times-circle" onClick={()=> setPopUpState({message:"",type:""})}></i></div>
            <div className='pop-up-loader' style={{width:loaderWidth+"%"}}></div>
        </div>
    )
}

export default PopUp
