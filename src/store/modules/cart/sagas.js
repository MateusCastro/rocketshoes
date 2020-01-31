import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';

import {
  addToCartSuccess,
  updateAmountRequest,
  updateAmountSuccess,
} from './actions';

function* addToCart({ id }) {
  const { data } = yield call(api.get, `/products/${id}`);

  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;

  const nextAmount = currentAmount + 1;

  if (nextAmount > stockAmount) {
    toast.error('Quantidade indisponível no estoque');
    return;
  }

  if (productExists) {
    yield put(updateAmountRequest(id, nextAmount));
  } else {
    const product = {
      ...data,
      amount: 1,
    };

    yield put(addToCartSuccess(product));
    history.push('/cart');
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.error('Quantidade indisponível no estoque');
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
