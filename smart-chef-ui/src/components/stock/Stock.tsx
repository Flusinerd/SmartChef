import React from "react";
import styles from "./Stock.module.css";

const SCStock = ({
  id,
  product,
  quantity,
  deleteStockHandler,
}: SCStockProps) => {
  const deleteStock = () => {
    deleteStockHandler(id);
  };

  return (
    <li>
      <div className={styles.liwrapper}>
        <span>{product}</span>
        <div className={styles.quantitiyaction}>
          {quantity}
          {/* präventiv mit button, da wir das icon nicht haben. Löschen muss später in der DB erfolgen ? */}
          <button onClick={deleteStock}>-</button>
        </div>
      </div>
    </li>
  );
};

export default SCStock;

export interface SCStockProps {
  id: number;
  product: string;
  quantity: string;
  deleteStockHandler: any;
}
