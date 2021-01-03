import React, { createContext, ReactNode, useState, useContext } from 'react';
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
  productsInWishList: IProduct[];
  fetchProducts: () => void;
  addProductToShoppingCart: (product: IProduct) => void;
  removeProductFromShoppingCart: (productId: string) => void;
  addProductToWishList: (product: IProduct) => void;
  removeProductFromWishList: (productId: string) => void;
  searchProducts: (search: string) => Promise<IProduct[] | undefined>;
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
  const [productsInWishList, setProductsInWishList] = useState<IProduct[]>([]);

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
              { id: productSnapshot.id, ...productSnapshot.data() } as IProduct,
            ]);
          },
        );
      }

      const wishList = userSnapshot.data()?.wishList;
      if (wishList) {
        wishList.forEach(
          async (product: FirebaseFirestoreTypes.DocumentData) => {
            const productSnapshot = await firestore()
              .collection('products')
              .doc(product.id)
              .get();
            setProductsInWishList((products) => [
              ...products,
              { id: productSnapshot.id, ...productSnapshot.data() } as IProduct,
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

  const removeProductFromShoppingCart = async (productId: string) => {
    try {
      await firestore()
        .collection('users')
        .doc(user?.uid)
        .update({
          shoppingCart: firestore.FieldValue.arrayRemove(
            firestore().doc(`products/${productId}`),
          ),
        });
      setProductsInCart((products) =>
        products.filter((products) => products.id !== productId),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const addProductToWishList = async (product: IProduct) => {
    try {
      await firestore()
        .collection('users')
        .doc(user?.uid)
        .update({
          wishList: firestore.FieldValue.arrayUnion(
            firestore().doc(`products/${product.id}`),
          ),
        });
      setProductsInWishList((products) => [...products, product]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeProductFromWishList = async (productId: string) => {
    try {
      await firestore()
        .collection('users')
        .doc(user?.uid)
        .update({
          wishList: firestore.FieldValue.arrayRemove(
            firestore().doc(`products/${productId}`),
          ),
        });
      setProductsInWishList((products) =>
        products.filter((products) => products.id !== productId),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const searchProducts = async (search: string) => {
    try {
      const productsSnapshot = await firestore()
        .collection('products')
        .where('titleLower', '>=', search)
        .where('titleLower', '<=', search + '\uf8ff')
        .get();

      const products: IProduct[] = [];

      productsSnapshot.forEach((documentSnapshot) => {
        const product = {
          id: documentSnapshot.id,
          ...documentSnapshot.data(),
        } as IProduct;

        products.push(product);
      });

      return products;
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
        productsInWishList,
        fetchProducts,
        addProductToShoppingCart,
        removeProductFromShoppingCart,
        addProductToWishList,
        removeProductFromWishList,
        searchProducts,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
