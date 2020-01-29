export default function cart(state = [], action) {
  switch (action.type) {
    case '@cart/ADD_REQUEST':
      return [...state, action.id];
    default:
      return state;
  }
}
