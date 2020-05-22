import React, { useState } from 'react'



class Component extends React.Component {
    state = {
        number: 0
    }
    
    increase = () => {
        this.setState({number: this.state.number++})
    }

    renderNumber = (num) => {
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

    render(){
        return (
            <div>
                <button onClick={increase}>{() => this.renderNumber(num)}</button>
            </div>
        )
    }
}


export default Component
    