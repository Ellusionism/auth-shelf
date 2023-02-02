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
  yield takeEvery('DELETE_ITEM', deleteShelfItem);
}

export default shelfSaga;