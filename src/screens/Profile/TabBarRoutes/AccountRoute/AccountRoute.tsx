import React from "react";
import { ScrollView } from "react-native";
import auth from '@react-native-firebase/auth';
import Ionicons from "react-native-vector-icons/Ionicons";
import { AccountOption } from "../../../../components";
import { Colors } from "../../../../styles";
import styles from './AccountRoute.styles';

const AccountRoute = () => {
  return (
    <ScrollView style={[styles.scene, styles.accountOptionContainer]}>
      <AccountOption
        style={styles.accountOption}
        title="Cuenta de banco"
        iconLeft={<Ionicons name="card" size={25} color={Colors.light} />}
        iconRight={
          <Ionicons name="chevron-forward" size={30} color={Colors.light} />
        }
      />
      <AccountOption
        style={styles.accountOption}
        title="Notificaciones"
        iconLeft={
          <Ionicons name="notifications" size={25} color={Colors.light} />
        }
        iconRight={
          <Ionicons name="chevron-forward" size={30} color={Colors.light} />
        }
      />
      <AccountOption
        style={styles.accountOption}
        title="Cambiar dirección"
        iconLeft={
          <Ionicons name="location-sharp" size={25} color={Colors.light} />
        }
        iconRight={
          <Ionicons name="chevron-forward" size={30} color={Colors.light} />
        }
      />
      <AccountOption
        style={styles.accountOption}
        title="Cambiar correo"
        iconLeft={<Ionicons name="mail" size={25} color={Colors.light} />}
        iconRight={
          <Ionicons name="chevron-forward" size={30} color={Colors.light} />
        }
      />
      <AccountOption
        style={styles.accountOption}
        title="Cambiar contraseña"
        iconLeft={
          <Ionicons name="lock-closed" size={25} color={Colors.light} />
        }
        iconRight={
          <Ionicons name="chevron-forward" size={30} color={Colors.light} />
        }
      />
      <AccountOption
        style={styles.accountOptionSignOut}
        title="Cerrar sesión"
        iconLeft={<Ionicons name="log-out" size={25} color={Colors.light} />}
        onPress={() => {
          auth().signOut();
        }}
      />
    </ScrollView>
  );
};

export default AccountRoute;
