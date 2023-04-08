import react, { useEffect, useState } from 'react'
import { Avatar, useChatContext } from 'stream-chat-react'
import { InviteIcon } from '../assets'


const ListContainer = ({ children }) => {
    return (
        <div className='user-list__container'>
            <div className='user-list__header'>
                <p>User</p>
                <p>Invite</p>
            </div>
            {children}
        </div>
    )
}

const UserItem = ({user,setselectedusers}) => {
    const [selected,setselected]=useState(false)
  
    const handleselect=()=>{
        if(selected)
        {
            setselectedusers((prevusers)=>
            prevusers.filter((prevuser)=>
            prevuser!==user.id
            ))
        }
        else{
            setselectedusers((prevusers)=>[...prevusers,user.id])
        }
        setselected((prevsel)=>!prevsel)
    }

    return (
        <div className='user-item__wrapper' onClick={handleselect}>
            <div className='user-item__name-wrapper'>
                <Avatar image={user.image} name={user.fullName|| user.id}size={32}/>
                <p className='user-item__name'>{user.fullName|| user.id}</p>
            </div>
            {selected?<InviteIcon/>:<div className='user-item__invite-empty'/>}
        </div>
    )
}




const UserList = ({setselectedusers}) => {

    const { client } = useChatContext();
    const [users, setusers] = useState([]);
    const [loading, setloading] = useState(false);
    const [listEmpty, setlistEmpty] = useState(false);
    const [error,seterror]=useState(false);

    useEffect(() => {
        const getUsers = async () => {
            if (loading) return;

            setloading(true);

            try {
                const response = await client.queryUsers(
                    {
                        id: { $ne: client.userID }
                    },
                    {
                        id: 1
                    },
                    { limit: 8 }
                );
                if (response.users.length) {
                    setusers(response.users)
                    
                }
                else{
                    setlistEmpty(true)
                }
            } catch (error) {
                seterror(true)
            }
            setloading(false)
        }

       if(client) getUsers()     


    },[])

    if(error){
        return(
            <ListContainer>
            <div className='user-list__message'>
                Error loading ,please refresh and try again.
            </div>
            </ListContainer>
        )
    }
    if(listEmpty){
        return(
            <ListContainer>
            <div className='user-list__message'>
               No users found
            </div>
            </ListContainer>
        )
    }


    return (
        <ListContainer>
            {loading?<div className='user-list__message'>
                Loading users....
                </div>:(
                    users.map((user,i)=>(
                       
                        <UserItem index={i} key={user.id} user={user} setselectedusers={setselectedusers}/>
                    ))
                )}
        </ListContainer>
    )
}


export default UserList;