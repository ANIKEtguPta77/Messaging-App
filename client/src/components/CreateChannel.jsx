import React,{useState} from 'react';
import { useChatContext } from 'stream-chat-react';
import {UserList} from './'
import { CloseCreateChannel } from '../assets';


const ChannelNameInput=({channelName='',setchannelName})=>{
  

  const handleChange=(event)=>{
    event.preventDefault();
    setchannelName(event.target.value);
  }


  return (
    <div className='channel-name-input__wrapper'>
    <p>
      Name
    </p>
    <input value={channelName} onChange={handleChange} placeholder="channel-name"/>
    <p>Add Members</p>
    </div>
  )
}



const CreateChannel = ({CreateType,setisCreating}) => {

  const {client,setActiveChannel}=useChatContext();
  const [selectedusers,setselectedusers]=useState([client.userID || ''])
  const [channelName,setchannelName]=useState('');

  const createChannel=async(e)=>{
    e.preventDefault();

    try{
      const newChannel=await client.channel(CreateType,channelName,{
        name:channelName,members:selectedusers
      });
      await newChannel.watch();
      setchannelName('');
      setisCreating(false);
      setselectedusers([client.userID || '']);
      setActiveChannel(newChannel);
    }catch(error){
      console.log(error);
  }
}


  return (
    <div className='create-channel__container'>

          <div className='create-channel__header'>
            <p>{CreateType==='team'?'Create a New Channnel':'Send a Direct Message'}</p>
            <CloseCreateChannel setisCreating={setisCreating}/>
          </div>
          {CreateType==='team'&& < ChannelNameInput channelName={channelName} setchannelName={setchannelName}/>}
          <UserList setselectedusers={setselectedusers}/>
          <div className='create-channel__button-wrapper' onClick={createChannel}>
            <p>{CreateType==='team'?'Create Channel':'Create message Group'}</p>
          </div>
    </div>
  )
}


export default CreateChannel