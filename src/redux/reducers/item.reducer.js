const itemReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ITEM':
      console.log(action.payload)
      return action.payload;
    default:
      return state;
  }
};



export default itemReducer;