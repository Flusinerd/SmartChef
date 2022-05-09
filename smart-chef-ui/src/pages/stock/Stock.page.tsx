import styles from "./StockPage.module.css";
import SCNavbar from "../../components/navbar/Navbar";
import SCInput from "../../components/input/Input";
import SCStocks from "../../components/stocks/Stocks";
import { useState } from "react";

function SCStockPage() {
  const [stocks, setStocks] = useState([
    {
      id: 1,
      product: "Tomatensaft",
      quantity: "3/5 L",
    },
    {
      id: 2,
      product: "Tomatensaft saftig",
      quantity: "3/5 L",
    },
    {
      id: 3,
      product: "Tomatensaft trüb",
      quantity: "3/5 L",
    },
  ]);

  const deleteStockHandler = (id: number) => {
    setStocks(stocks.filter((stock) => stock.id !== id));
  };

  return (
    <>
      <SCNavbar />
      <div className={styles.contentWrapper}>
        <div className={styles.searchWrapper}>
          <SCInput placeholder="Suchen" />
        </div>
        <SCStocks stocks={stocks} deleteStockHandler={deleteStockHandler}/>
      </div>
    </>
  );
}

export default SCStockPage;
