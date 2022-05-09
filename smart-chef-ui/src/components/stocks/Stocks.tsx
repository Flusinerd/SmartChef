import styles from "./Stocks.module.css";
import SCStock, { SCStockProps } from "../stock/Stock";

const SCStocks = ({ stocks, openOverlay, openStockModalHandler }: any) => {
  return (
    <ul className={styles.ulStocks}>
      {stocks.map((stock: SCStockProps) => (
        <SCStock
          key={stock.id}
          id={stock.id}
          product={stock.product}
          quantity={stock.quantity}
          openStockModalHandler={openStockModalHandler}
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
