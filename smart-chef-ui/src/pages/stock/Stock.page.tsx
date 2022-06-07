import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../api";
import { AuthService } from "../../authentication";
import Button from "../../components/button/button";
import SCInput from "../../components/input/Input";
import Modal from "../../components/modal/Modal";
import SCResponsiveContainer from "../../components/responsive-container/responsive-container";
import SCStocks from "../../components/stocks/Stocks";
import { HouseholdWithStockDTO, StockDTO } from "../../shared/household";
import styles from "./StockPage.module.css";

function SCStockPage() {
  const [productCategories, setStocks] = useState<StockDTO[]>([]);

  const authService = AuthService.getInstance();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);

  const [modalEditChildren, setModalEditChildren] = useState(<></>);
  const [modalNewChildren, setModalNewChildren] = useState(<></>);

  useEffect(() => {
    async function fetchData() {
      if (
        !authService.tokenData ||
        !authService.tokenData.householdIds ||
        authService.tokenData.householdIds.length === 0
      ) {
        alert("Sie müssen sich zuerst in einem Haushalt einloggen");
        return;
      }
      const household = await axios.get<HouseholdWithStockDTO>(
        `${baseUrl}/api/households/${authService.tokenData.householdIds[0]}`
      );
      setStocks(household.data.stock);
      }
    fetchData();
  }, [authService.tokenData]);

  const openEditModalHandler = (id: string) => {
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

  const modalEditButtons = (
    <div className={styles.mCEditButtons}>
      <Button id={styles.btnCancel} onClick={hideEditModalHandler}>
        Abbrechen
      </Button>
      <Button id={styles.btnSave}>Speichern</Button>
    </div>
  );

  const modalNewButtons = (
    <>
      <div className={styles.mCNewInputs}>
        <SCInput type="text" placeholder="Neuer Artikel" />
        <SCInput type="text" placeholder="Ist-Menge" />
        <SCInput type="text" placeholder="Soll-Menge" />
      </div>
      <div className={styles.mCNewButtons}>
        <Button id={styles.btnCancel} onClick={hideNewModalHandler}>
          Abbrechen
        </Button>
        <Button id={styles.btnSave}>Speichern</Button>
      </div>
    </>
  );

  const editModal = (id: string) => {
    // const editStock = stocks.filter((stock) => stock.id === id)[0];

    // setModalEditChildren(
    //   <div className={styles.mCEditWrapper}>
    //     <div className={styles.mCEditTitle}>{editStock.product}</div>
    //     <div className={styles.mCEditInputWrapper}>
    //       <SCInput type="text" placeholder="Ist-Menge" />
    //       <SCInput type="text" placeholder="Soll-Menge" />
    //     </div>
    //   </div>
    // );
  };

  return (
    <SCResponsiveContainer>
      {showEditModal && (
        <Modal
          modaltitle="Artikel verwalten"
          hideOverlay={hideEditModalHandler}
          children={modalEditChildren}
          buttons={modalEditButtons}
        />
      )}
      {showNewModal && (
        <Modal
          modaltitle="Neuen Artikel hinzufügen"
          hideOverlay={hideNewModalHandler}
          buttons={modalNewButtons}
        />
      )}
      <div className={styles.contentCenter}>
        <div className={styles.contentWrapper}>
          {/* <div className={styles.searchWrapper}>
            <SCInput placeholder="Suchen" />
          </div> */}
          <SCStocks
            stocks={productCategories.map((stock) => ({
              id: stock.id,
              product: stock.product.name, 
              quantity: Math.round(stock.actual * 10) / 10 + " / " +  Math.round(stock.target * 10) / 10 + " " + stock.product.unit,
              openEditModalHandler: openEditModalHandler,
            }))}
            openEditModalHandler={openEditModalHandler}
            openNewModalHandler={openNewModalHandler}
          />
        </div>
      </div>
    </SCResponsiveContainer>
  );
}

export default SCStockPage;
