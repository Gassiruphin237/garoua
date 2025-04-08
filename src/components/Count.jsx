import React, { useState } from 'react'
import './Count.css'
function Count() {
    const [count, setCount] = useState(0)
    const Count = () => {
        setCount(count + 1)
    }
    
    return (
        <div className='count'>
            
        </div>
    )
}

export default Count
