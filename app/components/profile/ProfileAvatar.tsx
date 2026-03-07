"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./Profile.module.css";

export default function ProfileAvatar({name}:any){

  const [avatar,setAvatar]=useState(
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d"
  );

  const fileRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = ()=>{
    fileRef.current?.click();
  };

  const handleImageChange = (e:any)=>{

    const file = e.target.files[0];

    if(!file) return;

    const preview = URL.createObjectURL(file);

    setAvatar(preview);
  };

  return(

    <div className={styles.left}>

      <div className={styles.avatarBox}>

        <Image
          src={avatar}
          alt="avatar"
          fill
          className={styles.avatar}
        />

        <button
          className={styles.editAvatar}
          onClick={handleAvatarClick}
        >
          ✏️
        </button>

        <input
          type="file"
          hidden
          ref={fileRef}
          onChange={handleImageChange}
        />

      </div>

      <h2 style={{color:"#333", fontFamily:"Arial, sans-serif",fontWeight:"bold"}}>{name}</h2>

      <p className={styles.role}>
        Property Seeker
      </p>

    </div>

  );

}