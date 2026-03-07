import styles from "./Profile.module.css";

export default function ProfileMap({latitude,longitude}:any){

  if(!latitude) return null;

  return(

    <div className={styles.map}>

      <iframe
        src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
      />

    </div>

  );

}