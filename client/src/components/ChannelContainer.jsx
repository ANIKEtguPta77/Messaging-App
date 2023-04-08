import React from 'react';
import {Channel,useChatContext} from 'stream-chat-react'
import { MessageSimple } from 'stream-chat-react';
import {ChannelInner,CreateChannel,EditChannel} from './';

const ChannelContainer = ({ isCreating,isEditing,setisCreating,setisEditing,CreateType}) => {

  const {channel} =useChatContext();
  

  if(isCreating){
    return (
        <div className='channel__container'>
            <CreateChannel CreateType={CreateType} setisCreating={setisCreating}/>
        </div>
    )
  }

  if(isEditing){
    return(
      <div className='channel__container'>
      <EditChannel setisEditing={setisEditing}/>
  </div>
    )
  }

  const EmptyState=()=>{
    <div className='channel-empty__container'>
      <p className='channel-empty__first'>This is the beginning of the chat history</p>
      <p className='channel-empty__second'>Send messages,attachments,links,emojis and more !!!!</p>
    </div>
  }

  return (
    <div className='channel__container'>
      <Channel
          EmptyStateIndicator={EmptyState}
          Message={(messageProps,i)=><MessageSimple key={i}{...messageProps}/>}
          >
        <ChannelInner setIsEditing={setisEditing}/>
      </Channel>
    </div>
  )
}

export default ChannelContainer