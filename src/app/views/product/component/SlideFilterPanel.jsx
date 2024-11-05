import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { Box, Typography } from '@mui/material';
import FilterBar from './Filtering';
import { topBarHeight } from "app/utils/constant";

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

const SlideFilterPanel = ({ showFilters, handleClearAll, selectedFilters, filters, handleFilterChange, handleShowFilters }) => {
  return (
    // <React.Fragment>
    <Box>
      <Dialog
        sx={{
            '& .MuiDialog-paper': {
              margin: 0,
              width: '320px',
              maxHeight: '100vh',
              position: 'fixed',
              top: topBarHeight,
              left: 0,                    // Anchors to the left side
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
            },
        }}
        BackdropProps={{
            sx: {
              position: 'absolute',
              top: topBarHeight,         // Set overlay (backdrop) to start 75px from the top
              left: 0,
            //   width: '100%',
            //   height: 'calc(100% - 75px)',  // Adjust height to fill the screen from 75px down
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust backdrop color and opacity as needed
            },
        }}
        open={showFilters}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleShowFilters}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent sx={{height: '100dvh', width: '300px'}}>
          <Box
            sx={{
              p: 2,
              position: 'absolute',
              overflowY: 'auto',
              top: 0,
              left: 0,
            //   width: '250px',
              minWidth: '250px',
            //   maxWidth: '250px',
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
      </Dialog>
    </Box>
    // </React.Fragment>
  );
};

export default SlideFilterPanel;
