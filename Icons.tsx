import React from 'react';
import { PropsWithChildren } from 'react';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

type iconprops = PropsWithChildren<{
    name: string;    
}>

const Icons = ({ name }:iconprops) => {
    switch (name) {

    
        case 'circle':
            return <FontAwesome6 name="circle-play" size={38} color='#E74292'/>
            break;
        
            case 'cross':
                return <FontAwesome6 name="circle-pause" size={38} color='#FF222f'/>
                break;
        default:
            return<FontAwesome6 name="flag" size ={38} color='#4BCFyA'/>
            break;
        
    }


}
    
export default Icons;