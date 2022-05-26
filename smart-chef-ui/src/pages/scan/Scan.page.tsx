import { Result } from "@zxing/library";
import { useEffect, useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import SCButton from "../../components/button/button";
import SCResponsiveContainer from "../../components/responsive-container/responsive-container";
import SCToggle from "../../components/toggle/Toggle";
import Add from "./add.svg";
import Dude from "./dude.svg";
import Remove from "./remove.svg";
import styles from "./Scanpage.module.css";

const SCScanPage = () => {
  const [scannedProducts, setScannedProducts] = useState<Product[]>([]);

  // When a product is scanned, add it to the list of scanned products, if the code is not already in the list
  const handleScan = (result: Result) => {
    setScannedProducts((prev) => {
      const newProduct = new Product(
        "Test",
        "" + (prev.length + 1),
        result.getText()
      );
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
