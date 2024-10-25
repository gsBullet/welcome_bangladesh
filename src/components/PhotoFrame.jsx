import React, { useState, useRef } from "react";
import EasyCrop from "./EasyCrop";
import "react-image-crop/dist/ReactCrop.css";
import html2canvas from "html2canvas";

const PhotoFrame = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [openCrop, setOpenCrop] = useState(null);
  const canvasRef = useRef(null);

  async function photoHandler(e) {
    const fileImage = e.target.files[0];

    if (fileImage) {
      setImageUrl(URL.createObjectURL(fileImage));
      setOpenCrop(true);
    }
  }

  const handleDownload = () => {
    const photoFrameContent = document.querySelector(".photo-frame");

    // Use html2canvas to capture the content of the .photo-frame div
    html2canvas(photoFrameContent).then((canvas) => {
      // Convert canvas content to a data URL representing a PNG image
      const url = canvas.toDataURL("image/png");

      // Create a link element and trigger download
      const link = document.createElement("a");
      link.download = "photo_frame.png";
      link.href = url;
      link.click();
      setImageUrl(null);
    });
  };

  return !openCrop ? (
    <div className="container my-5">
      <div className="card frameHeader">
        <div className="card-header">
          <h1 className="text-light text-center fw-bold">
            শুভেচ্ছা–কথা <br />
            NDF-BD কে জানাতে পারেন <br />
            আপনার শুভেচ্ছা-কথা
          </h1>
        </div>
      </div>

      <div className="row my-5 justify-content-end align-items-start">
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
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-7 col-sm-12 col-md-12">
          <div className="card w-75 m-auto">
            <div className="card-body shadow h-100">
              <div className="photo-frame">
                <img className="myPic border-0" src={imageUrl} alt="" />
                <img className="phtooFrame w-100" src="./img/47as.png" alt="" />
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
              <button className="btn w-100" onClick={handleDownload}>
                Download
              </button>
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

export default PhotoFrame;
