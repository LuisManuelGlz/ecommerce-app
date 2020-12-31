import React, {
  createContext,
  ReactNode,
  useState,
  SetStateAction,
  Dispatch,
  useContext,
} from 'react';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { IProduct } from '../interfaces/IProduct';
import { AuthContext } from './AuthContext';

type AuthContextType = {
  newer: IProduct[];
  mostSold: IProduct[];
  gaming: IProduct[];
  productsInCart: IProduct[];
  fetchProducts: () => void;
  addProductToShoppingCart: (product: IProduct) => void;
};

interface Props {
  children: ReactNode;
}

export const ProductsContext = createContext({} as AuthContextType);

const ProductsProvider = ({ children }: Props) => {
  const { user } = useContext(AuthContext);
  const [newer, setNewer] = useState<IProduct[]>([]);
  const [mostSold, setMostSold] = useState<IProduct[]>([]);
  const [gaming, setGaming] = useState<IProduct[]>([]);
  const [productsInCart, setProductsInCart] = useState<IProduct[]>([]);

  const fetchProducts = async () => {
    try {
      const productsSnapshot = await firestore().collection('products').get();
      productsSnapshot.forEach((documentSnapshot) => {
        const product = {
          id: documentSnapshot.id,
          ...documentSnapshot.data(),
        } as IProduct;

        if (product.section === 'newer') {
          setNewer((products) => [...products, product]);
        }
        if (product.section === 'the most sold') {
          setMostSold((products) => [...products, product]);
        }
        if (product.section === 'gaming') {
          setGaming((products) => [...products, product]);
        }
      });

      const userSnapshot = await firestore()
        .collection('users')
        .doc(user?.uid)
        .get();

      const shoppingCart = userSnapshot.data()?.shoppingCart;
      if (shoppingCart) {
        shoppingCart.forEach(
          async (product: FirebaseFirestoreTypes.DocumentData) => {
            const productSnapshot = await firestore()
              .collection('products')
              .doc(product.id)
              .get();
            setProductsInCart((products) => [
              ...products,
              productSnapshot.data() as IProduct,
            ]);
          },
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addProductToShoppingCart = async (product: IProduct) => {
    try {
      await firestore()
        .collection('users')
        .doc(user?.uid)
        .update({
          shoppingCart: firestore.FieldValue.arrayUnion(
            firestore().doc(`products/${product.id}`),
          ),
        });
      setProductsInCart((products) => [...products, product]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        newer,
        mostSold,
        gaming,
        productsInCart,
        fetchProducts,
        addProductToShoppingCart,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
