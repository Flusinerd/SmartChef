import React from "react";
import styles from "./Stock.module.css";
// import {ReactComponent as Edit} from "./edit.svg";

const SCStock = ({
  id,
  product,
  quantity,
  openEditModalHandler,
}: SCStockProps) => {
  const openStockModal = () => {
    openEditModalHandler(id);
  };

  return (
    <li className={styles.liwrapperStock}>
        <span>{product}</span>
        <div className={styles.quantitiyaction}>
          {quantity}
          {/* präventiv mit button, da wir das icon nicht haben. Löschen muss später in der DB erfolgen ? */}
          {/* <button onClick={openStockModal}><Edit className={styles.edit} /></button> */}
        </div>
    </li>
  );
};

export default SCStock;

export interface SCStockProps {
  id: string;
  product: string;
  quantity: string;
  openEditModalHandler: any;
}
