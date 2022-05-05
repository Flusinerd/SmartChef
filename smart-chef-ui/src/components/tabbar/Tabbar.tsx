import { HTMLAttributes } from "react";
import { classNames } from "../../shared/merge-classnames";
import styles from "./Tabbar.module.scss";
import BarcodeIcon from "../../assets/icons/barcode-outline.svg";
import BookIcon from "../../assets/icons/book-outline.svg";
import CogIcon from "../../assets/icons/cog-outline.svg";
import ListIcon from "../../assets/icons/list-outline.svg";
import { Link } from "react-router-dom";

function SCTabbar(props: HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  return (
    <div
      className={classNames(
        className,
        "flex w-full h-16 justify-evenly items-center",
        styles["tabbar-container"]
      )}
      {...rest}
    >
      <Link to="">
        <div
          className={classNames(
            "flex flex-col justify-center",
            styles["icon-wrapper"]
          )}
        >
          <img
            alt=""
            src={BarcodeIcon}
            className={classNames("h-8", styles["tabbar-icon"])}
          />
          <span className="text-sm">Scannen</span>
        </div>
      </Link>
      <Link to="" className={classNames("flex flex-col justify-center")}>
        <div
          className={classNames(
            "flex flex-col justify-center",
            styles["icon-wrapper"]
          )}
        >
          <img
            alt=""
            src={ListIcon}
            className={classNames("h-8", styles["tabbar-icon"])}
          />
          <span className="text-sm">Einkaufsliste</span>
        </div>
      </Link>
      <Link to="" className={classNames("flex flex-col justify-center")}>
        <div
          className={classNames(
            "flex flex-col justify-center",
            styles["icon-wrapper"]
          )}
        >
          <img
            alt=""
            src={BookIcon}
            className={classNames("h-8", styles["tabbar-icon"])}
          />
          <span className="text-sm">Rezepte</span>
        </div>
      </Link>
      <Link to="" className={classNames("flex flex-col justify-center")}>
        <div
          className={classNames(
            "flex flex-col justify-center",
            styles["icon-wrapper"]
          )}
        >
          <img
            alt=""
            src={CogIcon}
            className={classNames("h-8", styles["tabbar-icon"])}
          />
          <span className="text-sm">Einstellungen</span>
        </div>
      </Link>
    </div>
  );
}

export default SCTabbar;
