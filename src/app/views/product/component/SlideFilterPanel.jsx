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

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterBtnRef && filterBtnRef.current && !filterBtnRef.current.contains(event.target) &&
        dialogRef.current && !dialogRef.current.contains(event.target) &&
        !event.target.closest('.MuiDialog-root')
      ) {
        handleShowFilters();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [filterBtnRef, handleShowFilters]);

  return (
    <Box>
      <CustomDialog
        PaperProps={{
          sx: {
            margin: 0,
            maxHeight: `calc(100dvh - ${topBarHeight + 9.1})`,
            position: 'fixed',
            top: topBarHeight + 9.1,
            left: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            borderTopLeftRadius: 0,
          }
        }}
        BackdropProps={{
          sx: {
            position: 'absolute',
            top: topBarHeight + 4,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          },
        }}
        open={showFilters}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleShowFilters}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent 
          sx={{ padding: 0 }}
          ref={dialogRef}
        >
          <Box
            sx={{
              p: 2,
              // overflowY: 'auto', // Make this box the only scrollable element
              minWidth: '250px',
              // maxHeight: '100dvh',
              // height: '100dvh',
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
