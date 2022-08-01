import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Table.module.scss";
import { FormCheckbox } from "../Form";
import { FaPen, FaTrash } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

const cx = classNames.bind(styles);
const Table = ({ data, column, onActionEdit, onActionDel, dataEmpty }) => {
  const [checked, setChecked] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const handleCheckbox = (id) => {
    setChecked((prev) => {
      if (checked.includes(id)) {
        return checked.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const handleCheckAll = () => {
    setCheckAll(!checkAll);
  };



  useEffect(() => {
    if (checked.length >= 0 && checked.length < data.length) {
      setCheckAll(false);
    } else if (checked.length === data.length && data.length > 0) {
      setCheckAll(true);
    }
  }, [checked, data]);

  useEffect(() => {
    if (checkAll) {
      const arr = data.map((item) => item._id);
      setChecked(arr);
    } else if (checked.length === data.length) {
      setChecked([]);
    }
  }, [checkAll]);

  const handleActionEdit = (item) => {
    if(onActionEdit) {
      onActionEdit(item);
    }
  };
  const handleActionDel = (item) => {
    if(onActionDel) {
      onActionDel(item);
    }
  };

  return (
    <table className={cx("table")}>
      <thead>
        <tr>
          {column.map((item, index) => (
            <TableHeadItem
              handleCheckAll={handleCheckAll}
              checked={checkAll}
              key={uuidv4()}
              item={item}
            />
          ))}
        </tr>
      </thead>

      <tbody>
        {data.length <= 0 ? (
          <tr>
            <td colSpan={10} style={{ textAlign: "center" }}>
              {dataEmpty}
            </td>
          </tr>
        ) : (
          <>
            {data.map((item, index) => (
              <TableRow
                key={uuidv4()}
                handleCheckbox={handleCheckbox}
                item={item}
                column={column}
                checkedArr={checked}
                handleActionEdit={handleActionEdit}
                handleActionDel={handleActionDel}
              />
            ))}
          </>
        )}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  onActionEdit: PropTypes.func,
  onActionDel: PropTypes.func,
  dataEmpty: PropTypes.string
};
Table.defaultProps = {
  dataEmpty: 'Không tìm thấy dữ liệu',
  onActionDel: null,
  onActionEdit: null
}



const TableHeadItem = ({ item, checked, handleCheckAll }) => {
  if (item.type === "checkbox") {
    return (
      <th>
        <FormCheckbox checked={checked} onChange={handleCheckAll} />
      </th>
    );
  }
  return <th>{item.heading}</th>;
};
const TableRow = ({
  item,
  column,
  handleCheckbox,
  checkedArr,
  handleActionDel,
  handleActionEdit,
}) => {
  return (
    <>
    <tr>
      {column.map((columnItem, index) => {
        if (columnItem.type === "checkbox") {
          return (
            <td key={uuidv4()}>
              <FormCheckbox
                checked={checkedArr.includes(item._id)}
                onChange={() => handleCheckbox(item._id)}
              />
            </td>
          );
        }
        if (columnItem.type === "action") {
          return (
            <td key={uuidv4()}>
              <div className={cx("action")}>
                <span
                  onClick={() => handleActionEdit(item)}
                  className={`${cx("action-icon")} ${cx("icon--edit")}`}
                >
                  <FaPen />
                </span>
                <span
                  onClick={() => handleActionDel(item)}
                  className={`${cx("action-icon")} ${cx("icon--delete")}`}
                >
                  <FaTrash />
                </span>
              </div>
            </td>
          );
        }
        if (columnItem.type === "object") {
          const itemSplit = columnItem.value.split(".");
          return <td key={uuidv4()}>{item[itemSplit[0]][itemSplit[1]]}</td>;
        }
        if (columnItem.type === "array") {
          const itemSplit = columnItem.value.split(".");
          return (
            <td key={uuidv4()}>
              {item[itemSplit[0]].map((itemArr, index) => {
                return (
                  <React.Fragment key={uuidv4()}>
                    <span>{itemArr[itemSplit[1]]}</span>
                    {index >= 0 &&
                      index !== item[itemSplit[0]].length - 1 &&
                      ", "}
                  </React.Fragment>
                );
              })}
            </td>
          );
        }
        if (columnItem.type === "time") {
          return (
            <td key={uuidv4()}>{moment(item[columnItem.value]).format("L")}</td>
          );
        }
        return <td key={uuidv4()}>{item[columnItem.value]}</td>;
      })}
    </tr>
   
    </>
  );
};
export default Table;
