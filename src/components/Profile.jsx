import React from 'react';
const BASE_URL = "https://strangers-things.herokuapp.com/api/2303-FTB-MT-WEB-FT/posts";
import { useState } from 'react';
import LoginForm from './LoginForm';

const Profile = async ({token}) => {
   
  try{
    const response= await fetch(`${Base_URL}/users/me`, {
        headers: {
            'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
    });
    const result= await response.json();
    console.log(result);
    return result
  } catch (err){
    console.error(err);
  }
};

export default Profile;