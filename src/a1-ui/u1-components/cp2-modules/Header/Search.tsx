import React, { useState } from "react"
import {Input} from "../../cp1-elements/el01-Input/Input"
import { Icon } from "../../cp1-elements/el10-Icons/Icon"

type TSearchProps = {
    
}

export const Search = () => {

    return <div className="header-search">
        <div className="field iconized">
            <Input placeholder={"Search products"}
                onChangeText={() => { }} /> 
            <div className="input__dash" /> 
            <Icon name={"magnifying-glass"} size="full"/>
        </div>
        
    </div>
}