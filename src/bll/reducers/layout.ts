export type TProductsLayout = 'list1' | 'grid2' | 'grid3' | 'grid4';
export type TDevice = 'mobile' | 'tablet' | 'laptop' | 'desktop';

const initialState = {
  device: 'desktop' as TDevice,
  theme: 'light' as 'light' | 'dark',
  productsLayout: 'grid3' as TProductsLayout,
  productsFirstImage: 'Model' as 'Model' | 'Product',
};

export const layoutReducer = (
  state: TLayoutState = initialState,
  action: TLayoutActions,
): TLayoutState => {
  switch (action.type) {
    case layoutActionVariables.SET_DEVICE_TYPE:
    case layoutActionVariables.SET_PRODUCTS_LAYOUT:
    case layoutActionVariables.SET_PRODUCTS_FIRST_IMAGE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
// actions
export const setDeviceType = (device: TDevice) =>
  ({
    type: layoutActionVariables.SET_DEVICE_TYPE,
    payload: { device },
  } as const);

export const setProductsLayout = (productsLayout: TProductsLayout) =>
  ({
    type: layoutActionVariables.SET_PRODUCTS_LAYOUT,
    payload: { productsLayout },
  } as const);

export const setProductsFirstImage = (productsFirstImage: 'Model' | 'Product') =>
  ({
    type: layoutActionVariables.SET_PRODUCTS_FIRST_IMAGE,
    payload: { productsFirstImage },
  } as const);

// types
export type TLayoutState = typeof initialState;
export type TLayoutActions =
  | ReturnType<typeof setDeviceType>
  | ReturnType<typeof setProductsLayout>
  | ReturnType<typeof setProductsFirstImage>;

// variables
const layoutActionVariables = {
  SET_DEVICE_TYPE: 'LAYOUT/SET-DEVICE-TYPE' as const,
  SET_THEME: 'LAYOUT/SET-THEME' as const,
  SET_PRODUCTS_LAYOUT: 'LAYOUT/SET-PRODUCTS-LAYOUT' as const,
  SET_PRODUCTS_FIRST_IMAGE: 'LAYOUT/SET-PRODUCTS-FIRST-IMAGE' as const,
};
