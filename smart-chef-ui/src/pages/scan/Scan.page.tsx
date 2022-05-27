import { Result } from "@zxing/library";
import axios from "axios";
import { baseUrl } from "../../api";
import { useEffect, useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import SCButton from "../../components/button/button";
import SCResponsiveContainer from "../../components/responsive-container/responsive-container";
import SCToggle from "../../components/toggle/Toggle";
import Add from "./add.svg";
import Dude from "./dude.svg";
import Remove from "./remove.svg";
import styles from "./Scanpage.module.css";
import {ManyResponseDTO} from "../../shared/many-response";
import { ProductDTO } from "../../shared/product";
import SCModal from "../../components/modal/Modal";

const SCScanPage = () => {
  const [scannedProducts, setScannedProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);

  const hideModal = () => {
    setShowModal(false);
  };

  const modalChildren = (
    <div className={styles.mCTitle}>
      Wollen Sie wirklich den Haushalt XXX verlassen?
    </div>
  );


  const modalButtons = (
    <div className={styles.mCButtons}>
      <SCButton id={styles.btnLeave}>Verlassen</SCButton>
      <SCButton id={styles.btnCancel} onClick={hideModal}>
        Abbrechen
      </SCButton>
    </div>
  );


  // When a product is scanned, add it to the list of scanned products, if the code is not already in the list
  const handleScan = async (result: Result) => {

    const products = await axios.get<ManyResponseDTO<ProductDTO>>(`${baseUrl}/api/products?gtin=${result.getText()}`)

    if (products.data.count === 0){
        setShowModal(true);
        return
    }

    const newProduct = new Product(
        products.data.results[0].name,
        products.data.results[0].id,
        products.data.results[0].gtin,
      );

    setScannedProducts((prev) => {
      
      const product = prev.find((p) => p.code === newProduct.code);
      if (!product) {
        return [...prev, newProduct];
      }
      return prev;
    });
  };

  const onSubmit = () => {
    console.log("Submit");
  };

  useEffect(() => {
    console.log("Scanned products: ", scannedProducts);
  }, [scannedProducts]);

  return (
    <SCResponsiveContainer pageTitle="Scannen">
        {showModal && (
        <SCModal
          modaltitle="Haushalt verlassen"
          children={modalChildren}
          hideOverlay={hideModal}
          buttons={modalButtons}
        />
      )}
      <div className={styles.scanWrapper}>
        <img src={Dude} alt="" className={styles["bg-image"]} />
        <div className="">
          <div className={styles.toggleWrapper}>
            <SCToggle activeLabel="Ausbuchen" inactiveLabel="Einscannen" />
          </div>
          <div className={styles.scan}>
            <BarcodeScannerComponent
              width={"70%"}
              onUpdate={(err, result) => {
                if (result) handleScan(result);
              }}
            />
          </div>
          {scannedProducts.length > 0 && (
            <>
              <ul className={styles.results}>
                {scannedProducts.map((product: Product) => (
                  <li key={product.id}>
                    <span>{product.name}</span>
                    <div className="flex items-center">
                      <span className="mr-2">{product.amount}x</span>
                      <button
                        onClick={() => {
                          // Increase amount of product
                          setScannedProducts(
                            scannedProducts.map((p) =>
                              p.code === product.code
                                ? { ...p, amount: p.amount + 1 }
                                : p
                            )
                          );
                        }}
                      >
                        <img src={Add} alt="+" />
                      </button>
                      <button
                        onClick={() => {
                          // Decrease amount of product if amount is 0, remove product from scanned products
                          setScannedProducts(
                            scannedProducts.map((p) =>
                              p.code === product.code
                                ? { ...p, amount: p.amount - 1 }
                                : p
                            )
                          );

                          if (product.amount === 1) {
                            setScannedProducts(
                              scannedProducts.filter(
                                (p) => p.code !== product.code
                              )
                            );
                          }
                        }}
                      >
                        <img src={Remove} alt="-" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <SCButton className="mt-2 w-full" onClick={onSubmit}>
                Übernehmen
              </SCButton>
            </>
          )}
        </div>
      </div>
    </SCResponsiveContainer>
  );
};

export default SCScanPage;

class Product {
  id: string;
  code: string;
  name: string;
  amount = 1;

  constructor(name: string, id: string, code: string) {
    this.id = id;
    this.code = code;
    this.name = name;
  }
}
