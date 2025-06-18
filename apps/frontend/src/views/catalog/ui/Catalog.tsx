import './catalog.css';

import Categories from '../../../components/categories/Categories';
import { CatalogItems } from '#/widgets/catalog-items';

export const CatalogPage = () => {
  return (
    <>
      {/* <ExHeader /> */}

      <Categories />

      <CatalogItems />
    </>
  );
};
