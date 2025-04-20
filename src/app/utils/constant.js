export const topBarHeight = 64;
export const topBarHeightNewBar = 136.41;
export const sideNavWidth = 260;
export const navbarHeight = 60;
export const sidenavCompactWidth = 80;
export const containedLayoutWidth = 1200;
export const fullWidth = 0;


export const scrollBarThin = {
    '&::-webkit-scrollbar': {
      width: '4px', // Adjust the width of the scrollbar
    },
    '&::-webkit-scrollbar-track': {
      background: '#a6a6a6', // Background of the scrollbar track
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#6e6e6e', // Color of the scrollbar thumb
      borderRadius: '8px', // Rounded corners
      border: '2px solid transparent', // Adds a little padding between the thumb and track
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#777', // Thumb color on hover
    }
}

export const scrollBar = {
  '&::-webkit-scrollbar': {
    width: '4px', // Adjust the width of the scrollbar
  },
  '&::-webkit-scrollbar-track': {
    background: '#333', // Background of the scrollbar track
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'white', // Color of the scrollbar thumb
    borderRadius: '8px', // Rounded corners
    border: '2px solid transparent', // Adds a little padding between the thumb and track
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#777', // Thumb color on hover
  }
}

export const containerPadding = {
  pr: { xs: 2, sm: 3, md: 3 },
  pl: { xs: 2, sm: 3, md: 3 },
} 

export const services = {
  product_service: 'product-service'
}; 

export const url_elements = {
  seperator: '/',
  comma: ',',
  parameter_start: '?',
  parameter_and: '&',
  parameter_equal: '=',
} 

export const endpoints = {
  products: 'products',
  categories: 'categories',
  banners: 'banners',
} 

export const status = {
  active: {name: 'Active', code: 'ACTIVE'},
  inactive: {name: 'Inactive', code: 'INACTIVE'},
  pending: {name: 'Pending', code: 'PENDING'},
} 

export const url_parameters = {
  type: 'type',
  status: 'status',
  size: 'size',
  offset: 'offset',
} 

export const positions = {
  top: {name: 'Top', code: 'TOP'},
  middle: {name: 'Middle', code: 'MIDDLE'},
} 

export const homepage_product_display_types = {
  forYou: {name: 'For You', code: 'FOR_YOU'},
  moreToLove: {name: 'More to Love', code: 'MORE_TO_LOVE'},
  popular: {name: 'Popular', code: 'POPULAR'},
  todaysDeals: {name: "Today's Deals", code: 'TODAYS_DEALS'},
  newArrivals: {name: 'New Arrivals', code: 'NEW_ARRIVALS'},
  dailyEdits: {name: 'Daily Edits', code: 'DAILY_EDITS'},
} 
