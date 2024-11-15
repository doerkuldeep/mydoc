import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet, Switch} from 'react-native';

type Product = {
  id: number;
  product_name: string;
  product_status: boolean;
  category_name: string;
  subcategory_name: string;
  brand_name: string;
};

const products: Product[] = [
  {
    id: 1,
    product_name: 'Wireless Headphones',
    product_status: true,
    category_name: 'Electronics',
    subcategory_name: 'Audio',
    brand_name: 'SoundPro',
  },
  {
    id: 2,
    product_name: 'Yoga Mat',
    product_status: true,
    category_name: 'Fitness',
    subcategory_name: 'Accessories',
    brand_name: 'FitGear',
  },
  {
    id: 3,
    product_name: 'Gaming Laptop',
    product_status: false,
    category_name: 'Electronics',
    subcategory_name: 'Computers',
    brand_name: 'GameMaster',
  },
  {
    id: 4,
    product_name: 'LED Desk Lamp',
    product_status: true,
    category_name: 'Home',
    subcategory_name: 'Lighting',
    brand_name: 'BrightLife',
  },
  {
    id: 5,
    product_name: 'Running Shoes',
    product_status: false,
    category_name: 'Sportswear',
    subcategory_name: 'Footwear',
    brand_name: 'SpeedyStep',
  },
];

const ProductsScreen = () => {
  const [data, setData] = useState(products);

  const toggleStatus = (id: number) => {
    const updatedProducts = data.map(product =>
      product.id === id
        ? {...product, product_status: !product.product_status}
        : product,
    );
    setData(updatedProducts);
  };

  const renderRow = ({item, index}: {item: Product; index: number}) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{index + 1}</Text>

      <View style={[styles.cell, styles.productCell]}>
        <Text style={styles.productName}>{item.product_name}</Text>
        <Text style={styles.productDetails}>
          {`${item.category_name} > ${item.subcategory_name} > ${item.brand_name}`}
        </Text>
      </View>

      <View style={[styles.cell, styles.statusCell]}>
        <Switch
          value={item.product_status}
          onValueChange={() => toggleStatus(item.id)}
          trackColor={{false: '#ccc', true: '#4CAF50'}}
          thumbColor={item.product_status ? '#fff' : '#f4f3f4'}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Product Table</Text>
      <View style={styles.row}>
        <Text style={styles.headerCell}>S.No</Text>
        <Text style={[styles.headerCell, styles.productCell]}>Product</Text>
        <Text style={[styles.headerCell, styles.statusCell]}>Status</Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderRow}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text>No products available</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    fontSize: 14,
    textAlign: 'left', // Align text to the left
    paddingHorizontal: 8,
  },
  productCell: {
    flex: 3,
    justifyContent: 'center',
  },
  statusCell: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align content to the left
  },
  headerCell: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'left', // Align text to the left
    flex: 1,
    paddingHorizontal: 8,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'left', // Align text to the left
  },
  productDetails: {
    fontSize: 12,
    color: '#555',
    textAlign: 'left', // Align text to the left
  },
  statusIcon: {
    marginLeft: 8,
  },
});

export default ProductsScreen;
