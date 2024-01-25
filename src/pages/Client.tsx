import React from "react";
import index from "../index.module.scss";
import { classnames } from "../helpers/main.helper";
import MyTable from "../components/MyTable/MyTable";
import { clients } from "../store/clients.store";

interface IPropsClient {

}

const Client: React.FC<IPropsClient> = (props) => {
  return (
    <div className={classnames(index.taL)}>
      <h2>Клиенты</h2>

      <div>
        <MyTable mobx={clients} paginator={{
          pagePosition: 0,
          pageSize: 50
        }}/>
      </div>
    </div>
  )
};

export default Client;
