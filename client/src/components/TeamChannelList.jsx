import React from 'react'
import { AddChannel } from '../assets'

const TeamChannelList = ({children,error=false,loading,type,isCreating,setisCreating,setCreateType,setisEditing,setToggleContainer}) => {
    if(error){
        return type==='team'?(
            <div className='team-channel-list'>
                <p className='team-channel-list__message'>Connection Error please wait a momnet and try again</p>
            </div>
        ):null
    }

    if(loading){
        return(
            <div className='team-channel-list'>
                <p className='team-channel-list__message'>
                    {type==='team'?'Channels':'Messages'} Loading......
                </p>
            </div>
        )
    } 
  return (
    <div className='team-channel-list'>
    <div className='team-channel-list__header'>
        <p className='team-channel-list__header__title' style={{color:'black'}}>
            {type==='team'?'Channels':'Direct Messages'}
        </p>
        <AddChannel
            isCreating={isCreating}
            setisCreating={setisCreating}
            setCreateType={setCreateType}
            setisEditing={setisEditing}
            type={type==='team'?'team':'messaging'}
            setToggleContainer={setToggleContainer}
        />
    </div>
        {children}
    </div>
  )
}

export default TeamChannelList