import React, { useState } from 'react';
import { IconButton , Icon, Typography, Avatar, Box } from '@mui/material';

import { useNotistack } from "../../hooks/useNotistack";

const FileUpload = ({ error, helperText, required, acceptedTypes, sx, file, setFile, id, close, multiple, handleMultipleFileChange, height, width }) => {

  const { triggerNotifications } = useNotistack();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {

      if (acceptedType && acceptedType.length > 0) {
        
        if (!acceptedType.includes(selectedFile.type)) {
          triggerNotifications([{text:'Invalid file type. Please select a valid file.', variant: 'error'}], 20)
          return;
        }
      }
      setFile(selectedFile);
      event.target.value = null;
    }
  };

  const acceptedType = acceptedTypes && acceptedTypes.length>0 ? acceptedTypes : ['image/jpg', 'image/png', 'image/jpeg']

  const handleRemoveImage = () => {
    setFile('');
  };

  return (
    <React.Fragment>
      <Box sx={sx} display="flex" alignItems="center" flexDirection="row" border={file?'none':'1px solid rgba(47, 49, 45, 0.64)'} borderRadius={'11px'}>
        {close && file && (
              <IconButton sx={{zIndex: '1', position: 'relative'}} oxnClick={(event)=>{event.preventDefault(); event.stopPropagation(); handleRemoveImage()}} area-label="remove"><Icon sx={{fontSize: '20px'}}>cancel</Icon></IconButton >
            )}
        <label htmlFor={id===undefined?"icon-button-file":id}>
          {
            file ? (
              <Avatar src={URL.createObjectURL(file)} sx={{ width: width?width:150, height: height?height:150, borderRadius: '10px' }} />
            ) :
            (
              <Avatar
                sx={{ width: width?width:150, height: height?height:150, borderRadius: '10px', cursor: 'pointer', backgroundColor: 'transparent' }}
                component="div"
              >
                <img
                  src="/assets/images/image_upload.jpg"
                  alt="Upload Image"
                  style={{ width: '75%', height: '75%', objectFit: 'cover', borderRadius: '10px' }}
                />
              </Avatar>
            )
          }
          
              <input
                accept={acceptedType.join(',')}
                id={id===undefined?"icon-button-file":id}
                type="file"
                multiple={multiple!==undefined && multiple}
                style={{ display: 'none' }}
                onChange={multiple!==undefined && multiple ? handleMultipleFileChange : handleFileChange}
              />
        </label>
    </Box>
    {
      error && <Typography 
                  sx={
                    {color: '#FF3D57', 
                    fontSize: '0.75rem',
                    textAlign: 'left',
                    marginRight: '14px',
                    marginBottom: '0',
                    marginLeft: '14px'
                    }
                  }
                >{helperText}</Typography>
    }
  </React.Fragment>
  );
};

export default FileUpload;
