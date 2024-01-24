import React from "react";
import styles from "./MyTable.module.scss";
import { Table } from "react-bootstrap";
import { employee } from "../../store/employee2.store";
import { IEmployee } from "../../types/employerTypes";
import { isObject } from "lodash";
import { observer } from "mobx-react-lite";
import { classnames } from "../../helpers/main.helper";


interface IMyTableProps {
  mobx: any

}

const MyTable: React.FC<IMyTableProps> = (props) => {
  return (
    <div>
      <Table striped bordered hover size="sm" className={classnames(styles.table)}>
        <thead>
          <tr>
            {
              Object.keys(props.mobx.constData[0]).map((value: string, index: number) => {
                return <th key={index}>{value}</th>
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            props.mobx.constData.map((empl: IEmployee, index: number) => {
              return <tr key={index}>
                {
                  Object.keys(empl).map((keyName: string, jndex: number) => {
                    return <td key={jndex}>{
                      isObject(empl[keyName]) ? Object.values(empl[keyName]).join(", ") : empl[keyName]
                    }</td>;
                  })
                }
              </tr>
            })
          }
        </tbody>
      </Table>
    </div>
  )
};

export default observer(MyTable);
