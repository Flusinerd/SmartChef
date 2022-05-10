import styles from "./StockPage.module.css";
import SCNavbar from "../../components/navbar/Navbar";
import SCInput from "../../components/input/Input";
import SCStocks from "../../components/stocks/Stocks";
import { useState } from "react";
import Modal from "../../components/modal/Modal";
import Button from "../../components/button/button";

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

  const [showEditModal, setShowEditModal] = useState(false);

  const [ modalChildren, setModalChildren] = useState(<div></div>);

  const openStockModalHandler = (id: number) => {
    editModal(id);
    setShowEditModal(true);
  };

  const hideStockModalHandler = () => {
      setShowEditModal(false);
  }

  const editModal = (id: number) => {
    const editStock = stocks.filter((stock) => stock.id === id)[0];

    setModalChildren(<div className={styles.mCWrapper}>
        <div className={styles.mCTitle}>{editStock.product}</div>
        <div className={styles.mCInputWrapper}>
            <SCInput type="text" placeholder="Ist-Menge" />
            <SCInput type="text" placeholder="Soll-Menge" />
        </div>
        <div className={styles.mCButtonWrapper}>
            <Button onClick={hideStockModalHandler}>Abbrechen</Button>
            <Button>Speichern</Button>
        </div>
    </div>);
  }

  

  return (
    <>
    {showEditModal && <Modal modaltitle="Artikel verwalten" hideOverlay={hideStockModalHandler} children={modalChildren} />}
      <SCNavbar />
      <div className={styles.contentCenter}>
        <div className={styles.contentWrapper}>
          <div className={styles.searchWrapper}>
            <SCInput placeholder="Suchen" />
          </div>
          <SCStocks stocks={stocks} openStockModalHandler={openStockModalHandler} />
        </div>
      </div>
    </>
  );
}

export default SCStockPage;
