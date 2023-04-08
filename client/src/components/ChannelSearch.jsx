import React, { useState, useEffect } from 'react'
import { useChatContext } from 'stream-chat-react'
import { SearchIcon } from '../assets';
import {ResultsDropdown} from './'

const ChannelSearch = ({setToggleContainer}) => {

    const [query,setQuery]=useState("");
    const [loading,setloading]=useState(false);
    const {client,setActiveChannel}=useChatContext(); 
    const [teamchannels,setteamchannels]=useState([]);
    const [directchannels,setdirectchannels]=useState([]);
   
    useEffect(()=>{
     if(!query){
        setteamchannels([]);
        setdirectchannels([]);
     }
    },[query])


    const getChannels=async(text)=>{
        

        try{
            const channelresponse=client.queryChannels({
                type:'team',
                name:{$autocomplete:text},
                members:{$in:[client.userID]}
            });
           
            const userResponse=client.queryUsers({
                id:{$ne:client.userID},
                name:{$autocomplete:text},
            });
           
            const [channels,{users}]=await Promise.all([channelresponse,userResponse]);
            if(channels.length)setteamchannels(channels);
            if(users.length)setdirectchannels(users);
           
        }catch(error){
            setQuery("")
        }
    }


    const onSearch=(event)=>{
        event.preventDefault();
        setloading(true);
        setQuery(event.target.value);
        getChannels(event.target.value);
    }


    const setChannel=(channel)=>{
        setQuery('');
        setActiveChannel(channel)
    }
    return (
        <div className='channel-search__container'>
            <div className='channel-search__input__wrapper'>
                <div className='channel-search__input__icon'>
                    <SearchIcon />
                </div>
                <input
                    className='channel-search__input__text'
                    placeholder='Search'
                    type="text"
                    value={query}
                    onChange={onSearch}
                />

            </div>
            {query &&
            (
                <ResultsDropdown 
                 teamChannels={teamchannels} 
                 directChannels={directchannels}
                loading={loading}
                setChannel={setChannel}
                setQuery={setQuery}
                setToggleContainer={setToggleContainer} />
            )}

        </div>
    )
}

export default ChannelSearch