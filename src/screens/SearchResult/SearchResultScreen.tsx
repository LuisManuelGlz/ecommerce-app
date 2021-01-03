import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { Text, SearchResultItem } from '../../components';
import styles from './SearchResultScreen.styles';
import { MainStackParamList } from '../../navigation/MainNavigator';
import { IProduct } from '../../interfaces/IProduct';
import { ProductsContext } from '../../context/ProductsContext';
import { useHeaderHeight } from '@react-navigation/stack';

interface Props {
  route: RouteProp<MainStackParamList, 'SearchResult'>;
}

const SearchResultScreen = ({ route }: Props) => {
  const { search } = route.params;
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const { searchProducts } = useContext(ProductsContext);
  const [productsResult, setProductsResult] = useState<IProduct[]>([]);

  useEffect(() => {
    (async () => {
      const products = await searchProducts(search);
      if (products) {
        setProductsResult((p) => [...p, ...products]);
      }
    })();
  }, []);

  return (
    <View style={[styles.container, { marginTop: headerHeight }]}>
      <Text size="h2" style={styles.searchTitle}>Resultados de "{search}"</Text>
      <FlatList
        data={productsResult}
        renderItem={({ item }: { item: IProduct }) => (
          <SearchResultItem key={item.id} product={item} />
        )}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
    </View>
  );
};

export default SearchResultScreen;
