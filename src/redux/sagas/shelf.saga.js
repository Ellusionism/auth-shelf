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

function* shelfSaga() {
  yield takeEvery('FETCH_SHELF', fetchShelf);
}

export default shelfSaga;