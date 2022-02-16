import { TSortValue } from '../../common/types/request';

const initialState = {
  sortBy: 'stock' as TSortValue,
  sortValues: ['stock', 'newProduct', 'ascPrice', 'descPrice'] as Array<TSortValue>,
};

export const sortReducer = (
  state: TSortState = initialState,
  action: TSortActions,
): TSortState => {
  switch (action.type) {
    case sortActionVariables.SET_SORTBY:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
// actions
export const setSortBy = (sortBy: TSortValue) =>
  ({
    type: sortActionVariables.SET_SORTBY,
    payload: { sortBy },
  } as const);

// types
export type TSortState = typeof initialState;
export type TSortActions = ReturnType<typeof setSortBy>;

// variables
const sortActionVariables = {
  SET_SORTBY: 'SORT/SET-SORTBY' as const,
};
