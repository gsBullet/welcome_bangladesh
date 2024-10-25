import React, { useState, useRef } from "react";
import "react-image-crop/dist/ReactCrop.css";
import html2canvas from "html2canvas";
import EasyCrop from "./components/EasyCrop";

import { Typography } from "@mui/material";
import { Box, Slider } from "@mui/material";

const App = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imgScale, setImgScale] = useState(5);
  const [openCrop, setOpenCrop] = useState(null);
  const [name, setName] = useState(null);
  const canvasRef = useRef(null);
  async function photoHandler(e) {
    e.preventDefault();

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
      scale: imgScale, // Increase the scale to improve image quality
    };

    // Use html2canvas to capture the content of the .photo-frame div with specified options
    html2canvas(photoFrameContent1, options).then((canvas) => {
      // Convert canvas content to a data URL representing a PNG image
      const url = canvas.toDataURL("image/png");

      // Create a link element and trigger download
      const link = document.createElement("a");
      link.download = "bd.2.png";
      link.href = url;
      link.click();
    });
  };

  // Call handleDownload1 function when needed

  return !openCrop ? (
    <div className="container my-5">
      <div className="card frameHeader">
        <div className="card-header">
          <h1 className="text-light text-center fw-bold">
            নতুন বাংলাদেশকে স্বাগতম জানিয়ে প্রোফাইল ফ্রেম
          </h1>
        </div>
      </div>

      <div className="row flex-column gap-3 align-items-center">
        <div className="col-lg-6 col-sm-12 col-md-9 pt-5">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="fw-semibold text-center">
                নিজের কাঙ্খিত ফটোটি আপলোড করে ফ্রেমসহ ডাউনলোড করে নিন। এরপর
                ডাউনলোডকৃত ফটোটি ফেসবুকে প্রোফাইল পিকচার হিসেবে আপলোড করে দিন।
                ফ্রেমটি নিজে প্রোফাইলে যুক্ত করুন ও শেয়ার করে ছড়িয়ে দিন।
              </h5>

              {imageUrl?.length ? (
                <form action="#" className="d-none">
                  <div className="mb-3">
                    <label for="myImage" className="form-label fs-6 fw-lighter">
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
                  <div className="mb-3 d-none">
                    <label for="name" className="form-label fs-6">
                      আপনার নাম লিখুন
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="এখানে নাম লিখুন"
                    />
                  </div>
                </form>
              ) : (
                <form action="#">
                  <div className="mb-3">
                    <label for="name" className="form-label fs-6">
                      আপনার সংক্ষিপ্ত নাম লিখুন
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="এখানে নাম লিখুন"
                    />
                  </div>
                  <div className="mb-3">
                    <label for="myImage" className="form-label fs-6 fw-lighter">
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
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-7 col-sm-12 col-md-9">
          <div className="d-flex flex-column gap-3">
            <div className="msb">
              <div className="card w-75 m-auto">
                <div className="card-body shadow h-100">
                  <div className="photo-frame-1">
                    <img className="myPic" src={imageUrl} alt="" />
                    <img
                      className="phtooFrame"
                      src="./img/welcome.png"
                      alt=""
                    />
                    <h3 className="nameObject">{name}</h3>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-8 col-sm-10 m-auto py-3">
                <div className="d-flex align-items-center justify-content-center gap-3">
                  <button
                    className="btn btn-primary fw-bold w-100"
                    onClick={() => setOpenCrop(true)}
                  >
                    Edit
                  </button>

                  <canvas ref={canvasRef} style={{ display: "none" }} />
                  <button
                    className="btn  btn-success fw-bold w-100"
                    onClick={handleDownload1}
                  >
                    Download
                  </button>
                </div>
              </div>
              <div className="col-lg-8 col-md-8 col-sm-10 m-auto">
                <Box>
                  <Typography>
                    <h2 className="fw-bold text-primary">
                      {" "}
                      Export Quality: {imgScale}
                    </h2>
                  </Typography>
                  <Slider
                    valueLabelDisplay="auto"
                    min={1}
                    max={10}
                    value={imgScale}
                    onChange={(e, rotation) => setImgScale(rotation)}
                  />
                </Box>
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
