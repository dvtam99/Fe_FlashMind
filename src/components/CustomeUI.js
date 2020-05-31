import React, {useState} from 'react'

export const Textarea = ({value, onBlur, placeholder}) => {

    const [curVal, setCurVal] = useState(value)

    return <textarea placeholder={placeholder} value={curVal} onChange={event => setCurVal(event.target.value)}  onBlur={onBlur}/>
}

export const Input = ({value, onBlur, placeholder}) => {

    const [curVal, setCurVal] = useState(value)

    return <input 
                placeholder={placeholder} 
                type="text" value={curVal} 
                onChange={event => setCurVal(event.target.value)}  
                onBlur={onBlur}
            />
}