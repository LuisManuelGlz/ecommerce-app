import React from "react";
import { ScrollView } from "react-native";
import { HistoryOrder, Text } from "../../../../components";
import styles from './HistoryRoute.styles'

const HistoryRoute = () => {
  return (
    <ScrollView style={[styles.scene, styles.historyOrderContainer]}>
      <Text style={styles.noOrdersYet} size="h2">No hay órdenes aún</Text>
      {/* <HistoryOrder style={styles.historyOrder} orderNumber="1" />
      <HistoryOrder style={styles.historyOrder} orderNumber="1" />
      <HistoryOrder style={styles.historyOrder} orderNumber="1" />
      <HistoryOrder style={styles.historyOrder} orderNumber="1" />
      <HistoryOrder style={styles.historyOrder} orderNumber="1" />
      <HistoryOrder style={styles.historyOrder} orderNumber="1" />
      <HistoryOrder style={styles.historyOrder} orderNumber="1" />
      <HistoryOrder style={styles.historyOrder} orderNumber="1" />
      <HistoryOrder style={styles.historyOrder} orderNumber="10" /> */}
    </ScrollView>
  );
};

export default HistoryRoute;
