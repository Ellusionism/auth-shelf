import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchShelf() {
  try {
    const response = yield axios.get('/api/shelf')
      yield put({
        type: 'SET_SHELF',
        payload: response.data
    })
  } catch (error) {
    console.error('Error in shelf.saga/fetchShelf:', error)
  }
};

function* deleteShelfItem(action) {
  try {
    yield axios.delete(`/api/shelf/${action.payload}`)
    yield put ({ type: 'FETCH_SHELF'});

  }
  catch (error) {
    console.log('Error in shelf.saga/deleteShelfItem:', error)
  }
}

function* shelfSaga() {
  yield takeEvery('FETCH_SHELF', fetchShelf);

  yield takeEvery('CREATE_ITEM', createItem)

  yield takeEvery('DELETE_ITEM', deleteShelfItem);

}

function* createItem(action) {
  console.log('createItem action.payload:', action.payload)
  // Send the new plant (action.payload) to our server
  // (POST /api/shelf)
  try {
    const newItem = action.payload // 👈 this variable will evaluate to
                                    // something like:
                                    // { name: 'Thing', kingdom: 'Other Thing', ...}
    // POST the new plant object to the server:
    const response = yield axios({
      method: 'POST',
      url: '/api/shelf',
      data: newItem
    })
    
    // Now that we've successfully added a plant to the plants table,
    // we call the fetchPlants Saga function to bring our plantList reducer
    // back in sync with our plants table:
    yield put({
      type: 'FETCH_SHELF'
    })
  } catch (error) {
    console.log('createItem fail:', error)
  }
}

export default shelfSaga;

