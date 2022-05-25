import styles from "./StockPage.module.css";
import SCInput from "../../components/input/Input";
import SCStocks from "../../components/stocks/Stocks";
import { useState } from "react";
import Modal from "../../components/modal/Modal";
import Button from "../../components/button/button";
import SCResponsiveContainer from "../../components/responsive-container/responsive-container";

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
  const [showNewModal, setShowNewModal] = useState(false);

  const [modalChildren, setModalChildren] = useState(<div></div>);

  const openEditModalHandler = (id: number) => {
    editModal(id);
    setShowEditModal(true);
  };

  const hideEditModalHandler = () => {
    setShowEditModal(false);
  };

  const openNewModalHandler = () => {
    setShowNewModal(true);
  };

  const hideNewModalHandler = () => {
    setShowNewModal(false);
  };

  const editModal = (id: number) => {
    const editStock = stocks.filter((stock) => stock.id === id)[0];

    setModalChildren(
      <div className={styles.mCWrapper}>
        <div className={styles.mCTitle}>{editStock.product}</div>
        <div className={styles.mCInputWrapper}>
          <SCInput type="text" placeholder="Ist-Menge" />
          <SCInput type="text" placeholder="Soll-Menge" />
        </div>
        <div className={styles.mCButtonWrapper}>
          <Button onClick={hideEditModalHandler}>Abbrechen</Button>
          <Button>Speichern</Button>
        </div>
      </div>
    );
  };

  return (
    <SCResponsiveContainer>
      {showEditModal && (
        <Modal
          modaltitle="Artikel verwalten"
          hideOverlay={hideEditModalHandler}
          children={modalChildren}
        />
      )}
      {showNewModal && (
        <Modal
          modaltitle="Artikel verwalten"
          hideOverlay={hideNewModalHandler}
          children={modalChildren}
        />
      )}
      <div className={styles.contentCenter}>
        <div className={styles.contentWrapper}>
          <div className={styles.searchWrapper}>
            <SCInput placeholder="Suchen" />
          </div>
          <SCStocks
            stocks={stocks}
            openEditModalHandler={openEditModalHandler}
            openNewModalHandler={openNewModalHandler}
          />
        </div>
      </div>
    </SCResponsiveContainer>
  );
}

export default SCStockPage;
