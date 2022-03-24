import create from 'zustand';

const useStore = create(set => ({
  carts: [],
  total: 0,
  globalQuantity: 1,
  addQuantity: items => set({globalQuantity: items}),
  addToCarts: items => set(state => ({carts: [...state.carts, items]})),
  deleteCartsItem: items => set({carts: items}),
  addTotal: items => set(items),
  removeAllCartsItem: () => set({carts: []}),
}));

export default useStore;
