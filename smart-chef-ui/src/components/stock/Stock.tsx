import React from "react";
import styles from "./Stock.module.css";

const SCStock = ({
  id,
  product,
  quantity,
  openStockModalHandler,
}: SCStockProps) => {
  const openStockModal = () => {
    openStockModalHandler(id);
  };

  return (
    <li className={styles.liwrapperStock}>
        <span>{product}</span>
        <div className={styles.quantitiyaction}>
          {quantity}
          {/* präventiv mit button, da wir das icon nicht haben. Löschen muss später in der DB erfolgen ? */}
          <button onClick={openStockModal}>-</button>
        </div>
    </li>
  );
};

export default SCStock;

export interface SCStockProps {
  id: number;
  product: string;
  quantity: string;
  openStockModalHandler: any;
}
