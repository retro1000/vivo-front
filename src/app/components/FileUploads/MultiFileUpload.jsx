import React, { useState } from 'react';
import { Grid, Icon, Typography } from '@mui/material';

import { FileUpload } from '..';

import { useNotistack } from "../../hooks/useNotistack";

const MultiFileUpload = ({ enableAdd, fileCount, required, acceptedTypes, sx, files, setFiles, id, close }) => {

    const { triggerNotifications } = useNotistack();

    const acceptedType = acceptedTypes && acceptedTypes.length>0 ? acceptedTypes : ['image/jpg', 'image/png', 'image/jpeg']

    const [currentCount, setCurrentCount] = useState(files && files.length>0 ? files.length : (fileCount>4 ? 4 : fileCount));

    const [fileList, setFileList] = useState(
        files && files.length>0 ? files.concat(Array.from({ length: fileCount-files.length }, () => '')) : Array.from({ length: fileCount }, () => '')
    );

    const handleMultipleFileChange = (event) => {
        let selectedFiles = [...event.target.files];

        if (selectedFiles) {
    
          if (acceptedType && acceptedType.length > 0) {
            selectedFiles = selectedFiles.filter((f, index)=>{
              if (index+1>fileCount-files.length) {
                triggerNotifications([{text:`File limit exceed. Maximum file limit is ${fileCount}.`, variant: 'warning'}], 20)
                return false;
              }
              if (!acceptedType.includes(f.type)) {
                triggerNotifications([{text:'Invalid file type. Please select a valid file.', variant: 'error'}], 20)
                return false;
              }
              return true;
            })
          }
          
          setFiles(selectedFiles);
          let counter = 0;
          const newList = fileList.map(f=>{
            if(counter<selectedFiles.length){
                return f==='' ? selectedFiles[counter++] : f;
            }
            return f;
          })
          setFileList(newList);
          setCurrentCount(currentCount+counter<fileCount?currentCount+counter:fileCount);

          event.target.value = null;
        }
    };


    return (
        <Grid container spacing={2}>
            {Array.from({ length: currentCount }, (_, index) => (
                <Grid item key={index}>
                    <FileUpload 
                        required={required}
                        acceptedTypes={acceptedType}
                        multiple={true}
                        sx={sx}
                        file={fileList[index]}
                        setFile={() => {
                            const newList = [...fileList]
                            newList[index] = '';
                            setFileList(newList)
                            setFiles([...newList.filter(f=>f!=='')])
                        }}
                        id={`${id}-${index}`}
                        close={close}
                        handleMultipleFileChange={handleMultipleFileChange}
                    />
                </Grid>
            ))}
            {enableAdd && currentCount<fileCount ?
                <Grid sx={{display: 'flex', width: 150, height: 150, flexDirection: 'column', gap: '0.1em', justifyContent: 'center', alignItems: 'center', marginTop: '14px'}}>
                    <span style={{cursor: currentCount>=fileCount ? '' : 'pointer'}} onClick={()=>{if(currentCount<fileCount) setCurrentCount(currentCount+1)}}>
                        <Icon sx={{fontSize: '80px'}}>add</Icon>
                    </span>
                    <Typography sx={{marginTop: '-20px'}}>Add new</Typography>
                </Grid> : ''
            }
        </Grid>
    );
};

export default MultiFileUpload;
