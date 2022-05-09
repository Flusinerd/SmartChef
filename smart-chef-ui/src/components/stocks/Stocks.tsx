import styles from "./Stocks.module.css";
import SCStock, { SCStockProps } from "../stock/Stock";

const SCStocks = ({ stocks, openOverlay, deleteStockHandler }: any) => {
  return (
    <ul className={styles.ulStocks}>
      {stocks.map((stock: SCStockProps) => (
        <SCStock
          key={stock.id}
          id={stock.id}
          product={stock.product}
          quantity={stock.quantity}
          deleteStockHandler={deleteStockHandler}
        />
      ))}
      <li className={styles.newArticle}>
        <button onClick={openOverlay}>+</button>
        <p>Neuen Artikel hinzufügen</p>
      </li>
    </ul>
  );
};

export default SCStocks;
