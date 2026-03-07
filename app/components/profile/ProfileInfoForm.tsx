import styles from "./Profile.module.css";

export default function ProfileInfoForm({form,setForm}:any){

  const handleChange=(e:any)=>{

    setForm({
      ...form,
      [e.target.name]:e.target.value
    });

  };

  return(

    <>

      <h3 style={{color:"#333"}}>Profile Information</h3>

      <div className={styles.grid}>

        <div className={styles.inputGroup}>
          <label>Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Phone</label>
          <input
            name="phone"
            value={form.phone}
            disabled
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Address</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
          />
        </div>

      </div>
    </>

  );
}