import React, { useState } from "react"
import {Input} from "../../cp1-elements/el01-Input/Input"
import { Icon } from "../../cp1-elements/el10-Icons/Icon"

type TSearchProps = {
    
}

export const Search = () => {
    const [focused, setFocused] = useState(false);
    const className = focused ? "focused" : ""
    return <div className="header-search">
        <Icon name={"magnifying-glass"} className={className} />
        <div className="field iconized__L">
            <Input placeholder={"Search products"}
                onChangeFocus={(state) => {setFocused(state)}}
                onChangeText={() => { }} />
        </div>
        
    </div>
}