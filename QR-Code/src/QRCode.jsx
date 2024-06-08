import { useState } from "react";


export const QRCode = () => {
  const[img,setimg]=useState("");
  const[loading,setloading]=useState(false);
  const[qrdata,setqrdata]=useState("neha");
  const[size,setsize]=useState("200");
  
    async function generateQR(){
        setloading(true);
        try{
            const url=`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrdata)}`;//here we use encodeURIComponent to decode the special characters in qrdata
            setimg(url);
        }
        catch(error){
          console.log("Error generating QR-CODE",error);
        }
        finally{
          setloading(false);
        }

    }
    function downloadQR(name){   //here we are fetching the img address then we are converting the image data into blob(file type) then we are 
      //putting that data into a anchor tag and then we are assigning blob data to the link
      //we are converting the blob data into object because the blob data is primary 
      //the createObjectURL will convert the blob to img
      //then we 
      fetch(img)
      .then((response)=>response.blob())
      .then((blob)=>{
        const link=document.createElement("a");
        link.href=URL.createObjectURL(blob);
        link.download="qr-code.png";//name of the dowmload you can give any
        document.body.appendChild(link);//in this the link will be available in our page body before it will be virtual
        link.click();//here we make the link to download
        document.body.removeChild(link);//here we remove the link from the body
      })
      .catch(error)
        console.log("Error downloading QR-CODE",error);
      
    }
    
    return (
      <div className="app-container">
        <h1>QR-CODE GENERATOR</h1>
        {loading && <p>please wait..</p>}
       {img && <img src={img} className="qr-image"></img>}
      <div>
          <label htmlFor="dataInput" className="input-label" >Data for QR-CODE</label>
          <input type="text" value={qrdata} id="dataInput" onChange={(e)=>setqrdata(e.target.value)}placeholder="Enter data for QR Code"></input>
          <label htmlFor="sizeInput" className="input-label">Image size</label>
          <input type="text" id="sizeInput" value={size} onChange={(e)=>setsize(e.target.value)} placeholder="enter image size"></input>
          <button className="generate" disabled={loading} onClick={generateQR}>Generate QR Code</button>
          <button className="download" onClick={downloadQR}>Download QR code</button>
          {/* if we call the function normally like onclick={(downloadQR("neha"))} then it will be called when
           we load the page itself but we want it to be done only when we click the button so use arrowfunction */}
      </div>
      <p className="footer">Designed by Neha</p>
      </div>
      
    )
  }
  
  