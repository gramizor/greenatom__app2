import React from 'react';
import index from "../index.module.scss";
import { classnames } from '../helpers/main.helper';
import MyTable from '../components/MyTable/MyTable';
import { orders } from '../store/pages/orders.store';

const Order: React.FC = () => {
  return (
    <div className={classnames(index.taL)}>
      <h2>Заказы</h2>
      <div>
        <MyTable mobx={orders} paginator={{
          pagePosition: 0,
          pageSize: 50,
        }}/>
      </div>
    </div>
  )
}

export default Order;