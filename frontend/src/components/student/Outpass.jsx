import React from 'react'

const Outpass = () => {
  return (
    <div style={{height:"100vh",width:"100%"}}>
        <div style={{height:"10vh", width:"100vw"}}> nav bar</div>
        <div
  style={{
    width: "100%",
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    
  }}
>
  <form
    style={{
      width: "50%",
      height: "85vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#fff",
      borderRadius: "2vh",
      boxShadow: "0 0 2vh rgba(0,0,0,0.1)",
      padding: "1.5%",
    
     
    }}
  >
    <h2
      style={{
        fontSize: "3vh",
        fontWeight: "bold",
        marginBottom: "1%",
        textAlign: "center",
      }}
    >
      OUTPASS FORM
    </h2>

   
      {/* Left Side */}
      <div style={{ width: "90%",height:"70vh"}}>
        <div style={{width:"100%",marginBottom:"3%",display:"flex",justifyContent:"space-between"}}>
          <div style={{width:"48%",}}>
        <label style={{ fontSize: "2vh",fontWeight:"500"}}>FROM DATE</label>
        <input
          type="date"
          style={{
            width: "100%",
            padding: "3%",
            fontSize: "2vh",
            borderRadius: "1vh",
            border: "1px solid black",
          }}
        />
</div>
<div style={{width:"48%",}}>
        <label style={{ fontSize: "2vh",fontWeight:"500" }}>TO DATE</label>
        <input
          type="date"
          style={{
            width: "100%",
            padding: "3%",
            fontSize: "2vh",
            borderRadius: "1vh",
            border: "1px solid black",
          }}
        />
        </div>
</div>
<div style={{width:"100%",marginBottom:"3%",display:"flex",justifyContent:"space-between"}}>
  <div style={{width:"48%",}}>
        <label style={{ fontSize: "2vh",fontWeight:"500" }}>NO OF DAYS</label>
        <input
          type="number"
          style={{
            width: "100%",
            padding: "3%",
            fontSize: "2vh",
            borderRadius: "1vh",
            border: "1px solid black",
          }}
        />
        </div>
         <div style={{width:"48%",}}>
        <label style={{ fontSize: "2vh",fontWeight:"500" }}>ROOM NO</label>
        <input
          type="text"
          style={{
            width: "100%",
            padding: "3%",
            fontSize: "2vh",
            borderRadius: "1vh",
            border: "1px solid black",
          }}
        />
        </div>
</div>
<div style={{width:"100%",marginBottom:"2%",display:"flex",justifyContent:"space-between"}}>
   <div style={{width:"48%",}}>
        <label style={{ fontSize: "2vh",fontWeight:"500" }}>PARENTS MOBILE NO</label>
        <input
          type="text"
          style={{
            width: "100%",
            padding: "3%",
            fontSize: "2vh",
            borderRadius: "1vh",
            border: "1px solid black",
          }}
        />
        </div>
         <div style={{width:"48%",}}>
        <label style={{ fontSize: "2vh",fontWeight:"500" }}>NATIVE</label>
        <input
          type="text"
          style={{
            width: "100%",
            padding: "3%",
            fontSize: "2vh",
            borderRadius: "1vh",
            border: "1px solid black",
          }}
        />
        </div>
        </div>
      

      {/* Right Side */}
     
        <label style={{ fontSize: "2vh",fontWeight:"500" }}>NAME OF THE ACCOMPANING PERSON</label>
        <input
          type="text"
          style={{
            width: "100%",
            padding: "1.5%",
            marginBottom: "1%",
            fontSize: "2vh",
            borderRadius: "1vh",
            border: "1px solid black",
          }}
        />

        {/* Guardian / Parent */}
        <div
          style={{
            display: "flex",
            gap: "12%",
            marginBottom: "2%",
            fontSize: "2vh",
            
          }}
        >
          <label>
            <input type="checkbox" /> <span style={{fontWeight:"450"}}>GUARDIAN</span>
          </label>
          <label>
            <input type="checkbox" /> <span style={{fontWeight:"450"}}>PARENT</span>
          </label>
        </div>

        <label style={{ fontSize: "2vh",fontWeight:"500" }}>REASON FOR LEAVE</label>
        <input
          type="text"
          style={{
            width: "100%",
            padding: "1.5%",
            marginBottom: "3%",
            fontSize: "2vh",
            borderRadius: "1vh",
            border: "1px solid black",
          }}
        />
<div style={{width:"100%",marginBottom:"3.8%",display:"flex",justifyContent:"space-between"}}>
          <div style={{width:"48%",}}>
        <label style={{ fontSize: "2vh",fontWeight:"500" }}>LEAVING DATE</label>
        <input
          type="date"
          style={{
            width: "100%",
            padding: "3%",
            fontSize: "2vh",
            borderRadius: "1vh",
            border: "1px solid black",
          }}
        />
        </div>
 <div style={{width:"48%",}}>
        <label style={{ fontSize: "2vh",fontWeight:"500" }}>LEAVING TIME</label>
        <input
          type="time"
          style={{
            width: "100%",
            padding: "3%",
            fontSize: "2vh",
            borderRadius: "1vh",
            border: "1px solid black",
          }}
        />
        </div>
        </div>
     </div>
    

    {/* Submit Button */}
    <div style={{ width: "100%", textAlign:"center",marginTop:"1%" }}>
      <button
        type="submit"
        style={{
          padding: "0.5% 5% 0.5% 5%",
          fontSize: "2vh",
          backgroundColor: "#1E2E4F",
          fontWeight:"bold",
          color: "white",
          border: "none",
          borderRadius: "5vh",
          cursor: "pointer",
        }}
      >
        SUBMIT
      </button>
    </div>
  </form>
</div>

    </div>
  )
}


export default Outpass