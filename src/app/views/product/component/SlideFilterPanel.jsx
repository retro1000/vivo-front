import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { Box, Typography } from '@mui/material';
import FilterBar from './Filtering';
import { scrollBarThin, topBarHeight, topBarHeightNewBar } from "app/utils/constant";
import styled from '@emotion/styled';

const CustomDialog = styled(Dialog)({
  "& .MuiDialog-root": {
    position: "fixed",
    background: 'red',
    top: `${136.41} !important`, // Adjust positioning as needed
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
            maxHeight: `calc(100dvh - ${136.41+9.1})`,//+9.1
            position: 'fixed',
            top: 136.41,
            left: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            borderTopLeftRadius: 0,
            overflow: 'hidden', // Prevent scrolling inside the dialog
          }
        }}
        BackdropProps={{
          sx: {
            position: 'absolute',
            top: topBarHeightNewBar,
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
          sx={{ padding: 0, overflow: 'hidden' }}
          ref={dialogRef}
        >
          <Box
            sx={{
              p: 0.5,
              pr: '0.1px !important', 
              // overflowY: 'auto', // Make this box the only scrollable element
              minWidth: '350px',
              // maxHeight: '100dvh',
              // overflowY: 'hidden',
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
              maxHeight={`calc(100dvh - ${topBarHeightNewBar+40}px)`}
            />
          </Box>
        </DialogContent>
      </CustomDialog>
    </Box>
  );
};

export default SlideFilterPanel;
