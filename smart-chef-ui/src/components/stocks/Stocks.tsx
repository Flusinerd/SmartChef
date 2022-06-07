import SCStock, { SCStockProps } from "../stock/Stock";
import styles from "./Stocks.module.css";

const SCStocks = ({
  stocks,
  openNewModalHandler,
  openEditModalHandler,
}: {
  stocks: SCStockProps[];
  openNewModalHandler: any;
  openEditModalHandler: any;
}) => {
  return (
    <ul className={styles.ulStocks}>
      {stocks.map((stock: SCStockProps) => (
        <SCStock
          key={stock.id}
          id={stock.id}
          product={stock.product}
          quantity={stock.quantity}
          openEditModalHandler={openEditModalHandler}
        />
      ))}
      {/* <li className={styles.newArticle}>
        <button onClick={openNewModalHandler}>
          <Add className={styles.add} />
        </button>
        <p>Neuen Artikel hinzufügen</p>
      </li> */}
    </ul>
  );
};

export default SCStocks;
