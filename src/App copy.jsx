import React, { useState, useRef } from "react";
import "react-image-crop/dist/ReactCrop.css";
import html2canvas from "html2canvas";
import EasyCrop from "./components/EasyCrop";

const App = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [openCrop, setOpenCrop] = useState(null);
  const [name, setName] = useState(null);
  const canvasRef = useRef(null);
  async function photoHandler(e) {
    const fileImage = e.target.files[0];

    if (fileImage) {
      setImageUrl(URL.createObjectURL(fileImage));
      setOpenCrop(true);
    }
  }

  const handleDownload1 = () => {
    const photoFrameContent1 = document.querySelector(".photo-frame-1");

    // Set options for html2canvas
    const options = {
        scale: 7 // Increase the scale to improve image quality
    };

    // Use html2canvas to capture the content of the .photo-frame div with specified options
    html2canvas(photoFrameContent1, options).then((canvas) => {
        // Convert canvas content to a data URL representing a PNG image
        const url = canvas.toDataURL("image/png");

        // Create a link element and trigger download
        const link = document.createElement("a");
        link.download = "photo_frame.png";
        link.href = url;
        link.click();
    });
};

  const handleDownload2 = () => {
   
    const photoFrameContent2 = document.querySelector(".photo-frame-2");
   // Set options for html2canvas
   const options = {
    scale: 7 // Increase the scale to improve image quality
};
    
    html2canvas(photoFrameContent2,options).then((canvas) => {
      // Convert canvas content to a data URL representing a PNG image
      const url = canvas.toDataURL("image/png");

      // Create a link element and trigger download
      const link = document.createElement("a");
      link.download = "photo_frame.png";
      link.href = url;
      link.click();
      // setImageUrl(null);
    });
   
  };
  const handleDownload3 = () => {
  
    const photoFrameContent3 = document.querySelector(".photo-frame-3");

    // Set options for html2canvas
    const options = {
      scale: 7 // Increase the scale to improve image quality
  };


    // Use html2canvas to capture the content of the .photo-frame div
   
    html2canvas(photoFrameContent3,options).then((canvas) => {
      // Convert canvas content to a data URL representing a PNG image
      const url = canvas.toDataURL("image/png");

      // Create a link element and trigger download
      const link = document.createElement("a");
      link.download = "photo_frame.png";
      link.href = url;
      link.click();
      // setImageUrl(null);
    });
  };
  

  return !openCrop ? (
    <div className="container my-5">
      <div className="card frameHeader">
        <div className="card-header">
          <h1 className="text-light text-center fw-bold">
            ৪৭ তম প্রতিষ্ঠাবার্ষিকী উপলক্ষে আপনি বাংলাদেশ ইসলামী ছাত্রশিবির কে
            শুভেচ্ছা জানাতে পারেন
          </h1>
        </div>
      </div>

      <div className="row flex-column gap-3 align-items-center">
        <div className="col-lg-4 col-sm-10 col-md-12 pt-5">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="fw-semibold text-center">
                আপনার ছবি আপলোড করে ছবিটি ডাউনলোড করে শেয়ার করুন।
              </h4>
              <form action="#">
                <div className="mb-3">
                  <label htmlFor="" className="form-label fs-5 fw-lighter">
                    আপনার ছবি দিন
                  </label>
                  <input
                    onChange={photoHandler}
                    type="file"
                    accept="image/*"
                    className="form-control"
                    name="myImage"
                    id="myImage"
                  />
                </div>
                <div class="mb-3">
                  <label for="" class="form-label">
                    আপনার নাম লিখুন
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="name"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="আপনার নাম লিখুন"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-7 col-sm-12 col-md-12">
          <div className="d-flex flex-column gap-3">
            <div className="msb">
              <div className="card w-75 m-auto">
                <div className="card-body shadow h-100">
                  <div className="photo-frame-1 ">
                    <img className="myPic border-0" src={imageUrl} alt="" />
                    <img
                      className="phtooFrame w-100"
                      src="./img/47as.png"
                      alt=""
                    />
                    <h3 className="text-center fs-3 fw-bold text-light w-100 py-1 nameObject">
                      {name}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-10 m-auto py-3">
                <div className="d-flex align-items-center justify-content-center gap-3">
                  <button
                    className="btn btn-success w-100"
                    onClick={() => setOpenCrop(true)}
                  >
                    Edit
                  </button>
                  <canvas ref={canvasRef} style={{ display: "none" }} />
                  <button className="btn w-100" onClick={handleDownload1}>
                    Download
                  </button>
                </div>
              </div>
            </div>
            <div className="msb">
              <div className="card w-75 m-auto">
                <div className="card-body shadow h-100">
                  <div className="photo-frame-2">
                    <img className="myPic border-0" src={imageUrl} alt="" />
                    <img
                      className="phtooFrame w-100"
                      src="./img/47b.png"
                      alt=""
                    />
                    <h3 className="text-center fs-3 fw-bold text-primary w-100 py-1 nameObject">
                      {name}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-10 m-auto py-3">
                <div className="d-flex align-items-center justify-content-center gap-3">
                  <button
                    className="btn btn-success w-100"
                    onClick={() => setOpenCrop(true)}
                  >
                    Edit
                  </button>
                  <canvas ref={canvasRef} style={{ display: "none" }} />
                  <button className="btn w-100" onClick={handleDownload2}>
                    Download
                  </button>
                </div>
              </div>
            </div>
            <div className="msb">
              <div className="card w-75 m-auto">
                <div className="card-body shadow h-100">
                  <div className="photo-frame-3">
                    <img className="myPic border-0" src={imageUrl} alt="" />
                    <img
                      className="phtooFrame w-100"
                      src="./img/47c.png"
                      alt=""
                    />
                    <h3 className="text-center fs-3 fw-bold text-danger w-100 py-1 nameObject">
                      {name}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-10 m-auto py-3">
                <div className="d-flex align-items-center justify-content-center gap-3">
                  <button
                    className="btn btn-success w-100"
                    onClick={() => setOpenCrop(true)}
                  >
                    Edit
                  </button>
                  <canvas ref={canvasRef} style={{ display: "none" }} />
                  <button className="btn w-100" onClick={handleDownload3}>
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="container h-75 w-75">
      <EasyCrop {...{ imageUrl, setOpenCrop, setImageUrl }} />
    </div>
  );
};

export default App;
