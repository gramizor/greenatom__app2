import React from 'react'
import MyTable from '../components/MyTable/MyTable';
import ParentMobXStore from '../store/parent.store';
import index from "../index.module.scss"
import { classnames } from '../helpers/main.helper';
import { warehouse } from '../store/warehouse.store';

const Warehouse: React.FC = () => {
  return (
    <div className={classnames(index.taL)}>
      <h2>Склад</h2>
      <div>
        <MyTable mobx={warehouse} paginator={{
          pagePosition: 0,
          pageLength: 50
        }}/>
      </div>
    </div>
  )
}

export default Warehouse;