import React, { useState } from 'react'




const Component = props => {
    const [number, setNumber] = useState(0)
    
    const increase = () => {
        setNumber(number++)
    }

    const renderNumber = (num) => {
        if(num % 15 === 0){
            return 'fizzbuzz'
        } else if (num % 5 === 0){
            return 'buzz'
        } else if (num % 3 === 0){
            return 'fizz'
        } else {
            return num
        }
    }
    
    return(
        <div>
            <button onClick={increase}>{() => renderNumber(number)}</button>
        </div>
    )
}

    