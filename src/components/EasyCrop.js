import { useState } from "react";
import CropIcon from "@mui/icons-material/Crop";
import Cropper from "react-easy-crop";
import { Typography } from "@mui/material";
import {
  Button,
  Box,
  DialogContent,
  DialogActions,
  Slider,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import getCroppedImg from "./CropImage";

const EasyCrop = ({ imageUrl, setOpenCrop, setImageUrl }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  function zoomPercent(value) {
    return `${Math.round(value * 100)}`;
  }

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const url = await getCroppedImg(imageUrl, croppedAreaPixels, rotation);
      //  console.log(m);
      // setFile(file);
      setImageUrl(url);
      setOpenCrop(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <DialogContent
        dividers
        sx={{
          position: "relative",
          background: "#3333",
          height: 500,
          width: "auto",
          my: 2,
          minWidth: { sm: 500 },
        }}
      >
        <Cropper
          image={imageUrl}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          showGrid={true}
          aspect={3/4}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropChange={setCrop}
          onCropComplete={cropComplete}
        />
      </DialogContent>
      <DialogActions sx={{ flexDirection: "column", mx: 3, my: 2 }}>
        <Box sx={{ mb: 1, width: "100%" }}>
          <Box>
            <Typography>Zoom:{zoomPercent(zoom)}</Typography>
            <Slider
              valueLabelDisplay="auto"
              valueLabelFormat={zoomPercent}
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </Box>
          <Box>
            <Typography>rotation:{rotation}</Typography>
            <Slider
              valueLabelDisplay="auto"
              min={0}
              max={360}
              value={rotation}
              onChange={(e, rotation) => setRotation(rotation)}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "row",
          }}
        >
          <Button
            variant="outlined"
            startIcon={<Cancel />}
            onClick={() => setOpenCrop(false)}
          >
            cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<CropIcon />}
            onClick={showCroppedImage}
          >
            Crop
          </Button>
        </Box>
      </DialogActions>
    </>
  );
};

export default EasyCrop;
