import React, { createContext, ReactNode, useState, useContext } from 'react';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { IProduct } from '../interfaces/IProduct';
import { IPaymentMethod } from '../interfaces/IPaymentMethod';
import { IShippingAddress } from '../interfaces/IShippingAddress';
import { AuthContext } from './AuthContext';

type AuthContextType = {
  isLoading: boolean;
  newer: IProduct[];
  mostSold: IProduct[];
  gaming: IProduct[];
  productsInCart: IProduct[];
  productsInWishList: IProduct[];
  paymentMethods: IPaymentMethod[];
  shippingAddresses: IShippingAddress[];
  shoppingCartTotal: number;
  fetchProducts: () => void;
  addProductToShoppingCart: (product: IProduct) => void;
  removeProductFromShoppingCart: (product: IProduct) => void;
  addProductToWishList: (product: IProduct) => void;
  removeProductFromWishList: (productId: string) => void;
  searchProducts: (search: string) => Promise<IProduct[] | undefined>;
  fetchPaymentMethods: () => void;
  addPaymentMethod: (paymentMethod: IPaymentMethod) => void;
  fetchShippingAddresses: () => void;
  addShippingAddress: (shippingAddress: IShippingAddress) => void;
  orderProducts: () => void;
};

interface Props {
  children: ReactNode;
}

export const ProductsContext = createContext({} as AuthContextType);

const ProductsProvider = ({ children }: Props) => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [newer, setNewer] = useState<IProduct[]>([]);
  const [mostSold, setMostSold] = useState<IProduct[]>([]);
  const [gaming, setGaming] = useState<IProduct[]>([]);
  const [productsInCart, setProductsInCart] = useState<IProduct[]>([]);
  const [shoppingCartTotal, setShoppingCartTotal] = useState<number>(0);
  const [productsInWishList, setProductsInWishList] = useState<IProduct[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([]);
  const [shippingAddresses, setShippingAddresses] = useState<
    IShippingAddress[]
  >([]);

  const fetchProducts = async () => {
    if (!isLoading) setIsLoading(true);

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

      setShoppingCartTotal(userSnapshot.data()?.shoppingCartTotal || 0);

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
    } finally {
      setIsLoading(false);
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
          shoppingCartTotal: firestore.FieldValue.increment(product.price),
        });
      setProductsInCart((products) => [...products, product]);
      setShoppingCartTotal((total) => total + product.price);
    } catch (error) {
      console.log(error);
    }
  };

  const removeProductFromShoppingCart = async (product: IProduct) => {
    try {
      await firestore()
        .collection('users')
        .doc(user?.uid)
        .update({
          shoppingCart: firestore.FieldValue.arrayRemove(
            firestore().doc(`products/${product.id}`),
          ),
          shoppingCartTotal: firestore.FieldValue.increment(-product.price),
        });
      setProductsInCart((products) =>
        products.filter((products) => products.id !== product.id),
      );
      setShoppingCartTotal((total) => total - product.price);
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

  const fetchPaymentMethods = async () => {
    if (!isLoading) setIsLoading(true);

    try {
      const userSnapshot = await firestore()
        .collection('users')
        .doc(user?.uid)
        .get();

      const paymentMethods = userSnapshot.data()?.paymentMethods;

      if (paymentMethods) {
        const paymentMethodsToSet: IPaymentMethod[] = [];

        paymentMethods.forEach(
          async (paymentMethod: FirebaseFirestoreTypes.DocumentData) => {
            const paymentMethodSnapshot = await firestore()
              .collection('paymentMethods')
              .doc(paymentMethod.id)
              .get();

            paymentMethodsToSet.push({
              id: paymentMethodSnapshot.id,
              ...paymentMethodSnapshot.data(),
            } as IPaymentMethod);

            setPaymentMethods([...paymentMethodsToSet]);
          },
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addPaymentMethod = async (paymentMethod: IPaymentMethod) => {
    try {
      const { id } = await firestore()
        .collection('paymentMethods')
        .add(paymentMethod);

      await firestore()
        .collection('users')
        .doc(user?.uid)
        .update({
          paymentMethods: firestore.FieldValue.arrayUnion(
            firestore().doc(`paymentMethods/${id}`),
          ),
        });
      setPaymentMethods((paymentMethods) => [
        ...paymentMethods,
        { id, ...paymentMethod },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchShippingAddresses = async () => {
    if (!isLoading) setIsLoading(true);

    try {
      const userSnapshot = await firestore()
        .collection('users')
        .doc(user?.uid)
        .get();

      const shippingAddresses = userSnapshot.data()?.shippingAddresses;

      if (shippingAddresses) {
        const shippingAddressesToSet: IShippingAddress[] = [];

        shippingAddresses.forEach(
          async (shippingAddress: FirebaseFirestoreTypes.DocumentData) => {
            const shippingAddressSnapshot = await firestore()
              .collection('shippingAddresses')
              .doc(shippingAddress.id)
              .get();

            shippingAddressesToSet.push({
              id: shippingAddressSnapshot.id,
              ...shippingAddressSnapshot.data(),
            } as IShippingAddress);

            setShippingAddresses([...shippingAddressesToSet]);
          },
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addShippingAddress = async (shippingAddress: IShippingAddress) => {
    try {
      const { id } = await firestore()
        .collection('shippingAddresses')
        .add(shippingAddress);

      await firestore()
        .collection('users')
        .doc(user?.uid)
        .update({
          shippingAddresses: firestore.FieldValue.arrayUnion(
            firestore().doc(`shippingAddresses/${id}`),
          ),
        });
      setShippingAddresses((shippingAddresses) => [
        ...shippingAddresses,
        { id, ...shippingAddress },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const orderProducts = async () => {
    try {
      const userSnapshot = await firestore()
        .collection('users')
        .doc(user?.uid)
        .get();

      const { id } = await firestore()
        .collection('orders')
        .add({ total: shoppingCartTotal });

      const shoppingCart = userSnapshot.data()?.shoppingCart;

      shoppingCart.forEach(
        async (product: FirebaseFirestoreTypes.DocumentData) => {
          await firestore()
            .collection('orders')
            .doc(id)
            .update({
              orders: firestore.FieldValue.arrayUnion(
                firestore().doc(`products/${product.id}`),
              ),
            });
        },
      );

      await firestore()
        .collection('users')
        .doc(user?.uid)
        .update({
          shoppingCart: [],
          shoppingCartTotal: 0,
          orders: firestore.FieldValue.arrayUnion(
            firestore().doc(`orders/${id}`),
          ),
        });

      setProductsInCart([]);
      setShoppingCartTotal(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        isLoading,
        newer,
        mostSold,
        gaming,
        productsInCart,
        productsInWishList,
        shoppingCartTotal,
        fetchProducts,
        addProductToShoppingCart,
        removeProductFromShoppingCart,
        addProductToWishList,
        removeProductFromWishList,
        searchProducts,
        paymentMethods,
        fetchPaymentMethods,
        addPaymentMethod,
        shippingAddresses,
        fetchShippingAddresses,
        addShippingAddress,
        orderProducts,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
