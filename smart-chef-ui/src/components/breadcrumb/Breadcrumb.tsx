import React from "react"
import styles from "./Breadcrumb.module.css"


function SCBreadcrumbItem({ url, name, index, isLast }:
  { url: string, name: React.ReactNode | string, index: number, isLast: boolean }) {
  return (
    <React.Fragment>
      <li itemProp="itemListElement" itemScope
        itemType="https://schema.org/ListItem" key={index} className={styles["breadcrumb-element"]}>
        <a itemProp="item" href={url} className={styles["breadcrumb-element-link"]}>
          <span itemProp="name" className={styles["breadcrumb-element-name"]}>{name}</span></a>
        <meta itemProp="position" content={index.toString()} />
      </li>

      {isLast ? "" : <span className={styles["breadcrumb-element-divider"]}>{'>'}</span>}
    </React.Fragment>
  )
}
function SCBreadcrumb({ breadcrumbItems }: BreadcrumbProps) {
  return (
    <nav className={styles["c-breadcrumb"]}>
      <ol itemScope itemType="https://schema.org/BreadcrumbList" className={styles["breadcrumb-list"]}>
        {breadcrumbItems.map((item, index, array) =>
          <SCBreadcrumbItem {...item} index={index + 1} isLast={array.length - 1 === index} key={index} />)}
      </ol>
    </nav>
  );
}
export default SCBreadcrumb;




interface BreadcrumbProps {
  breadcrumbItems: Array<BreadcrumbItemProps>;
}

interface BreadcrumbItemProps {
  url: string
  name: React.ReactNode | string
}