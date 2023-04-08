import React,{useState} from 'react'
import {useChatContext} from 'stream-chat-react'
import {UserList} from './'
import { CloseCreateChannel } from '../assets'



const ChannelNameInput=({channelName,setchannelName})=>{
  

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







const EditChannel = ({setisCreating,setisEditing}) => {

  const {channel} =useChatContext();
  const [channelName,setchannelName]=useState(channel.data.name||channel.data.id);
  const [seleectedusers,setselectedusers]=useState([]);

  const updateChannel=async(event)=>{
    event.preventDefault();
    const nameChanged=channelName!==(channel.data.name||channel.data.id);

    if(nameChanged)
    {
      await channel.update({name:channelName},{text:`channel name is changed to ${channelName}`})
    }

    if(seleectedusers.length){
      await channel.addMembers(seleectedusers);

    }
    setchannelName('');
    setisEditing(false);
    setselectedusers([]);
  }

  return (
    <div className='edit-channel__container'>
    <div className='edit-channel__header'>
    <p>Edit Channel</p>
    <CloseCreateChannel setisEditing={setisEditing} setisCreating={setisCreating}/>
    </div>
    <ChannelNameInput channelName={channelName} setchannelName={setchannelName}/>
    <UserList setselectedusers={setselectedusers}/>
    <div className='edit-channel__button-wrapper' onClick={updateChannel}>
      <p>Save Changes</p>
    </div>
    </div>
  )
}

export default EditChannel