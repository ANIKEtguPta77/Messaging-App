import React,{useState} from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie'
import { ChannelContainer,ChannelListContainer,Auth } from './components';
import './App.css';
import 'stream-chat-react/dist/css/index.css'


const cookies=new Cookies();

const apiKey="9zbaztqd2hxd"
const client=StreamChat.getInstance(apiKey); 
const authToken=cookies.get("token")


if(authToken){
  client.connectUser({
    id:cookies.get('userId'),
    name:cookies.get('username'),
    fullName:cookies.get('fullName'), 
    image:cookies.get('avatarURL'),
    hashedpassword:cookies.get('hashedpassword'),
    phoneNumber:cookies.get('phoneNumber'),

  },authToken)
}


const App = () => {

  const [CreateType,setCreateType]=useState('');
  const [isCreating,setisCreating]=useState(false);
  const [isEditing,setisEditing]=useState(false);
  if(!authToken)return <Auth />
  

  return (
    <div className="app__wrapper">
    <Chat client={client} theme="team light">
        <ChannelListContainer
          isCreating={isCreating}
          setCreateType={setCreateType}
          setisCreating={setisCreating}
          setisEditing={setisEditing}
         />
        <ChannelContainer
          isCreating={isCreating}
          isEditing={isEditing}
          setisCreating={setisCreating}
          setisEditing={setisEditing}
          CreateType={CreateType}
        />

       
    </Chat>
    </div>
  )
}

export default App