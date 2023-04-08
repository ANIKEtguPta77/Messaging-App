import React, { useState } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'
import signinImage from '../assets/signup.jpg'
const IntialState={
    fullName:'',
    username:'',
    phone:'',
    avatarUrl:'',
    password:'',
    confirmpassword:''

}

const cookies=new Cookies();


const Auth = () => {
    const [isSignup, setisSignup] = useState(true);
    const [form,setform]=useState(IntialState);

    const switchmode = () => {
        setisSignup((prevSignup) => !prevSignup)
    }
   
    const handelChange = (e) => {
        setform({...form,
            [e.target.name]:e.target.value})
           
     }
     
     const handleSubmit=async(e)=>{ 
        
        e.preventDefault();

        const {username,password,phone,avatarUrl}=form;
        
        const URL="https://medicalpager.onrender.com/auth"
        const {data:{token,userId,hashedpassword,fullName}} =await axios.post(`${URL}/${isSignup ?'signup':'login'}`,{
            username,password,fullName:form.fullName,phone,avatarUrl
        })
        cookies.set('token',token);
        cookies.set('username',username);
        cookies.set('fullName',fullName);
        cookies.set('userId',userId);
        
        if(isSignup){
            cookies.set('phoneNumber',phone);
            cookies.set('avatarURL',avatarUrl);
            cookies.set('hashedpassword',hashedpassword);
        }

        window.location.reload();
     }
    return (
        <div className='auth__form-container'>
            <div className='auth__form-container_fields'>
                <div className='auth__form-container_fields-content'>
                    <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='fullName'>Full Name</label>
                                <input name="fullName"
                                    type="text"
                                    placeholder='Full Name'
                                    onChange={handelChange}
                                    required
                                />
                            </div>
                        )}
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='username'>Username</label>
                            <input name="username"
                                type="text"
                                placeholder='username'
                                onChange={handelChange}
                                required
                            />
                        </div>
                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='phone'>Phone Number</label>
                                <input name="phone"
                                    type="text"
                                    placeholder='Phone Number'
                                    onChange={handelChange}
                                    required
                                />
                            </div>
                        )}
                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='avatarUrl'>Avatar URL</label>
                                <input name="avatarUrl"
                                    type="text"
                                    placeholder='Avatar URL'
                                    onChange={handelChange}
                                    required
                                />
                            </div>
                        )}
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='password'>Password</label>
                            <input name="password"
                                type="password"
                                placeholder='Password'
                                onChange={handelChange}
                                required
                            />
                        </div>

                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='confirmpassword'>Confirm Password</label>
                                <input name="confirmpassword"
                                    type="password"
                                    placeholder='Confirm Password'
                                    onChange={handelChange}
                                    required
                                />
                            </div>
                        )}
                            <div className='auth__form-container_fields-content_button'>
                                <button>{isSignup?'Sign up':'Sign in'}</button>
                            </div>

                    </form>

                    <div className='auth__form-container_fields-account'>
                        <p>
                            {isSignup ? 'Already have an account? ' : 'Dont have a account ?'}
                            <span onClick={switchmode}>
                                {isSignup ? ' Sign in ' : ' Sign UP '}
                            </span>
                        </p>
                    </div>
                </div>

            </div>
            <div className='auth__form-container_image'>
                <img src={signinImage} alt="sign in" />
            </div>
        </div>
    )
}

export default Auth