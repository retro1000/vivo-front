import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { Box, Typography } from '@mui/material';
import FilterBar from './Filtering';
import { topBarHeight } from "app/utils/constant";
import styled from '@emotion/styled';

const CustomDialog = styled(Dialog)({
  "& .MuiDialog-root": {
    position: "fixed",
    background: 'red',
    top: `${topBarHeight} !important`, // Adjust positioning as needed
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide
      direction="right"
      ref={ref}
      mountOnEnter
      unmountOnExit
      {...props}
    />
  );
});

const SlideFilterPanel = ({ showFilters, handleClearAll, selectedFilters, filters, handleFilterChange, handleShowFilters, filterBtnRef }) => {
  const dialogRef = React.useRef(null);

  // UseEffect to handle click outside of dialog to close it
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the dialog and the filter button
      if (
        filterBtnRef && filterBtnRef.current && !filterBtnRef.current.contains(event.target) &&
        dialogRef.current && !dialogRef.current.contains(event.target) &&
        !event.target.closest('.MuiDialog-root') // Ensure the backdrop is also included
      ) {
        handleShowFilters(); // Close dialog if clicked outside
      }
    };

    // Add event listener when the component is mounted
    document.addEventListener('click', handleClickOutside);

    // Cleanup event listener when the component is unmounted
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [filterBtnRef, handleShowFilters]);

  return (
    <Box>
      <CustomDialog
        sx={{
          '& .MuiDialog-paper': {},
        }}
        PaperProps={{
          sx: {
            margin: 0,
            // width: '320px',
            maxHeight: `calc(100dvh - ${topBarHeight+9.1})`,
            position: 'fixed',
            top: topBarHeight + 9.1,
            left: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            borderTopLeftRadius: 0
          }
        }}
        BackdropProps={{
          sx: {
            position: 'absolute',
            top: topBarHeight + 4, // Set overlay (backdrop) to start 75px from the top
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.2)', // Adjust backdrop color and opacity as needed
          },
        }}
        open={showFilters}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleShowFilters}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent 
          sx={{ height: '100dvh', width: '300px' }}
          ref={dialogRef} // Attach ref to the dialog content
        >
          <Box
            sx={{
              p: 2,
              position: 'absolute',
              overflowY: 'auto',
              top: 0,
              left: 0,
              minWidth: '250px',
              maxHeight: '100dvh',
              height: '100dvh',
              zIndex: 1200,
              backgroundColor: 'white',
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" gutterBottom>
                Filters
              </Typography>
              <Button
                variant="text"
                color="primary"
                onClick={handleClearAll}
                disabled={Object.keys(selectedFilters).length === 0}
              >
                Clear All
              </Button>
            </Box>

            <FilterBar
              filters={filters}
              handleFilterChange={handleFilterChange}
              selectedFilters={selectedFilters}
            />
          </Box>
        </DialogContent>
      </CustomDialog>
    </Box>
  );
};

export default SlideFilterPanel;
