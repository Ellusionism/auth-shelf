const shelfReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SHELF':
      console.log(action.payload)
      return action.payload;
    default:
      return state;
  }
};



export default shelfReducer;