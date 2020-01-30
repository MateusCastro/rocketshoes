import React from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { useSelector, useDispatch } from 'react-redux';

import {
  removeFromCart,
  updateAmountRequest,
} from '../../store/modules/cart/actions';

import { formatPrice } from '../../util/format';
import { Container, ProductTable, Total } from './styles';

export default function Cart() {
  const cartProducts = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      formattedSubTotal: formatPrice(product.price * product.amount),
    }))
  );
  const productsTotal = useSelector(state =>
    formatPrice(
      state.cart.reduce(
        (sumTotal, product) => sumTotal + product.price * product.amount,
        0
      )
    )
  );

  const dispatch = useDispatch();

  function handleIncrement(product) {
    dispatch(updateAmountRequest(product.id, product.amount + 1));
  }
  function handleDecrement(product) {
    dispatch(updateAmountRequest(product.id, product.amount - 1));
  }

  function handleDelete(id) {
    dispatch(removeFromCart(id));
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th> </th>
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {cartProducts.map(product => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button
                    type="button"
                    onClick={() => handleDecrement(product)}
                  >
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button
                    type="button"
                    onClick={() => handleIncrement(product)}
                  >
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.formattedSubTotal}</strong>
              </td>
              <td>
                <button type="button" onClick={() => handleDelete(product.id)}>
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{productsTotal}</strong>
        </Total>
      </footer>
    </Container>
  );
}
