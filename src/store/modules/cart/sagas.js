import { call, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';

import { addToCartSuccess } from './actions';

function* addToCart({ id }) {
  const response = yield call(api.get, `/products/${id}`);
  console.tron.log(response);

  yield put(addToCartSuccess(response.data));
}

/* function* updateAmount(action) {
  const { id, amount: nextAmount } = action;
  if (nextAmount <= 0) return;
  yield put(updateLoading(id, true));

  const {
    data: { amount: stockAmount },
  } = yield call(api.get, `/stock/${id}`);

  if (nextAmount > stockAmount) {
    toast.error('Quantidade indisponível no estoque');
    yield put(updateLoading(id, false));
    return;
  }
  yield put(updateAmountSuccess(id, nextAmount));
  yield put(updateLoading(id, false));
} */

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  // takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
