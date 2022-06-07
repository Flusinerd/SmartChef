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
import { ManyResponseDTO } from "../../shared/many-response";
import { CreateProductDto, ProductDTO } from "../../shared/product";
import SCModal from "../../components/modal/Modal";
import SCInput from "../../components/input/Input";
import SCSelect from "../../components/select/Select";
import { useForm } from "react-hook-form";
import { ProductCategoryDto } from "../../shared/product-category";
import { AuthService } from "../../authentication";

const SCScanPage = () => {
  type ProductWithPieces = Product & {
    pieces: number;
  };

  const [scannedProducts, setScannedProducts] = useState<ProductWithPieces[]>(
    []
  );
  const [showModal, setShowModal] = useState(false);
  const [latestGtin, setLatestGtin] = useState("");
  const [productCategoryOptions, setProductCategoryOptions] = useState<
    ProductCategoryDto[]
  >([]);
  const [scanMode, setScanMode] = useState(false);

  const authService = AuthService.getInstance();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "all",
  });

  const hideModal = () => {
    setShowModal(false);
  };

  const getProductCategories = async () => {
    const response = await axios.get<ManyResponseDTO<ProductCategoryDto>>(
      `${baseUrl}/api/productcategories`
    );
    setProductCategoryOptions(
      response.data.results.sort((a, b) => (a.name > b.name ? 1 : -1))
    );
  };

  useEffect(() => {
    getProductCategories();
  }, []);

  const unitOptions = [
    { id: "GRAM", value: "GRAM", label: "Gramm" },
    { id: "KILOGRAM", value: "KILOGRAM", label: "Kilogramm" },
    { id: "LITER", value: "LITER", label: "Liter" },
    { id: "MILLILITER", value: "MILLILITER", label: "Milliliter" },
    { id: "PIECE", value: "PIECE", label: "Stück" },
  ];

  const onNewProductSubmit = async (data: FormValues) => {
    console.log(data);
    const res = await axios.post<ProductDTO>(`${baseUrl}/api/products/`, {
      amount: parseFloat(data.amount),
      gtin: latestGtin,
      name: data.name,
      category_id: data.type,
      manufacturer: data.manufacturer,
      unit: data.unit,
    } as CreateProductDto);

    reset();

    setShowModal(false);

    // Add new product to scannedProducts
    setScannedProducts((prev) => [
      ...prev,
      {
        pieces: 1,
        amount: parseFloat(data.amount),
        code: latestGtin,
        id: res.data.id,
        name: data.name,
        unit: "Stk",
      },
    ]);
  };

  const modalButtons = (
    <div className={styles.mCButtons}>
      <SCButton id={styles.btnLeave} type="submit" disabled={!isValid}>
        Hinzufügen
      </SCButton>
      <SCButton id={styles.btnCancel} onClick={hideModal}>
        Abbrechen
      </SCButton>
    </div>
  );

  const modalChildren = (
    <div className={styles.mCWrapper}>
      <h2>Bitte fügen Sie den Artikel hinzu</h2>
      <form
        className={styles.mcMain}
        onSubmit={handleSubmit(onNewProductSubmit)}
      >
        <div className="flex md:flex-row gap-2 justify-between flex-col">
          <div className="flex flex-col">
            <SCInput
              placeholder="Produktname*"
              register={register("name", {
                required: "Produktname wird benötigt",
              })}
              className="flex-auto"
            />
            {errors.name?.type === "required" && (
              <span className="color-primary mt-2">{errors.name?.message}</span>
            )}
          </div>
          <div className="flex flex-col text-sm">
            <SCSelect
              placeholder="Produkt-Typ*"
              register={register("type", {
                required: "Produkt-Typ wird benötigt",
              })}
              options={productCategoryOptions.map((option) => ({
                value: option.id,
                label: option.name,
              }))}
            />
            {errors.name?.type === "required" && (
              <span className="color-primary mt-2">{errors.name?.message}</span>
            )}
          </div>
        </div>
        <SCInput
          placeholder="Hersteller*"
          register={register("manufacturer", {
            required: "Hersteller wird benötigt",
          })}
        />
        {errors.manufacturer?.type === "required" && (
          <span className="color-primary">{errors.manufacturer?.message}</span>
        )}
        <div className={styles.mcAmountUnit}>
          <div className="flex flex-col gap-2">
            <SCInput
              placeholder="Menge pro Stück*"
              type="number"
              step="any"
              register={register("amount", {
                required: "Produktmenge wird benötigt",
              })}
            />
            {errors.amount?.type === "required" && (
              <span className="color-primary">{errors.amount?.message}</span>
            )}
          </div>
          <SCSelect
            options={unitOptions}
            register={register("unit", { required: "Einheit wird benötigt" })}
          />
          {errors.unit?.type === "required" && (
            <span className="color-primary">{errors.unit?.message}</span>
          )}
        </div>
        {modalButtons}
      </form>
    </div>
  );

  // When a product is scanned, add it to the list of scanned products, if the code is not already in the list
  const handleScan = async (result: Result) => {
    const gtin = result.getText();

    console.log(gtin);

    setLatestGtin(gtin);

    const products = await axios.get<ManyResponseDTO<ProductDTO>>(
      `${baseUrl}/api/products?gtin=${gtin}`
    );

    if (products.data.count === 0) {
      setShowModal(true);
      return;
    }

    const newProduct = new Product(
      products.data.results[0].name,
      products.data.results[0].id,
      products.data.results[0].gtin,
      products.data.results[0].unit,
      products.data.results[0].amount
    );

    setScannedProducts((prev) => {
      const product = prev.find((p) => p.code === newProduct.code);
      if (!product) {
        return [
          ...prev,
          {
            pieces: 1,
            ...newProduct,
          },
        ];
      }
      return prev;
    });
  };

  const onSubmit = async () => {
    if (
      !authService.tokenData ||
      !authService.tokenData.householdIds ||
      authService.tokenData.householdIds.length === 0
    ) {
      alert("Sie müssen sich zuerst in einem Haushalt einloggen");
      return;
    }
    const quantityPrefix = scanMode === true ? -1 : 1;
    await axios.patch(
      `${baseUrl}/api/households/${authService.tokenData?.householdIds[0]}/stock/`,
      scannedProducts.map((p) => ({
        productId: p.id,
        quantity: quantityPrefix * p.amount * p.pieces,
      })) as UpdateStockDTO[]
    );
    alert("Lagerbestand wurde erfolgreich aktualisiert");
    setScannedProducts([]);
  };

  useEffect(() => {
    console.log("Scanned products: ", scannedProducts);
  }, [scannedProducts]);

  return (
    <SCResponsiveContainer pageTitle="Scannen">
      {showModal && (
        <SCModal
          modaltitle="Unbekannter Artikel"
          children={modalChildren}
          hideOverlay={hideModal}
        />
      )}
      <div className={styles.scanWrapper}>
        <img src={Dude} alt="" className={styles["bg-image"]} />
        <div className="">
          <div className={styles.toggleWrapper}>
            <SCToggle
              activeLabel="Ausbuchen"
              inactiveLabel="Einscannen"
              onChange={(data: any) => {
                setScanMode(data.target.checked);
              }}
            />
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
                {scannedProducts.map((product: ProductWithPieces) => (
                  <li key={product.id}>
                    <span>{product.name}</span>
                    <div className="flex items-center">
                      <span className="mr-2">
                        {scanMode === true ? "-" : ""}
                        {product.pieces} Stck
                      </span>
                      <button
                        onClick={() => {
                          // Increase amount of product
                          setScannedProducts(
                            scannedProducts.map((p) =>
                              p.code === product.code
                                ? { ...p, pieces: p.pieces + 1 }
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
                                ? { ...p, pieces: p.pieces - 1 }
                                : p
                            )
                          );

                          if (product.pieces === 1) {
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
  unit: string;

  constructor(
    name: string,
    id: string,
    code: string,
    unit: string = "Stk",
    amount = 1
  ) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.unit = unit;
    this.amount = amount;
  }
}

type FormValues = {
  name: string;
  manufacturer: string;
  amount: string;
  unit: string;
  type: string;
};

type UpdateStockDTO = {
  productId: string;
  quantity: number;
};
