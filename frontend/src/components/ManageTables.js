import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listTablesAll,
  removeTables,
  updateTables,
} from "../actions/tableActions";
function ManageTables() {
  const dispatch = useDispatch();
  const tableListAll = useSelector((state) => state.tableListAll);
  const { loading, tables } = tableListAll;
  const tableRemove = useSelector((state) => state.tableRemove);
  const { loading: removeTablesLoading } = tableRemove;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const tableUpdate = useSelector((state) => state.tableUpdate);
  const { loading: updateTablesLoading } = tableUpdate;

  useEffect(() => {
    if (tables.length < 1 || !removeTablesLoading || updateTablesLoading) {
      dispatch(listTablesAll());
    }
    // eslint-disable-next-line
  }, [dispatch, removeTablesLoading, updateTablesLoading]);
  return (
    <div className="main-manage-tables">
      <div className="manage-table-heading">
        <div>Name</div>
        <div>Reserved By</div>
        <div>Reserved Date</div>
        <div>Reserved Time</div>
        <div>Action</div>
      </div>
      <div className="manage-table-list">
        {!loading
          ? tables.map((item) => {
              const date = new Date(item.reservedDate);
              const [month, day, year, hour, min, sec] = [
                date.getMonth(),
                date.getDate(),
                date.getFullYear(),
                date.getHours(),
                date.getMinutes(),
                date.getSeconds(),
              ];
              return (
                <React.Fragment key={item._id}>
                  <div>{item.name}</div>
                  {item.reservedBy ? (
                    <div>{item.reservedByName}</div>
                  ) : (
                    <div></div>
                  )}
                  <div>{`${day}-${month + 1}-${year}`}</div>
                  <div>{`${hour}:${min}:${sec}`}</div>
                  <div>
                    {item.reservedBy === null ? (
                      <button
                        onClick={() => {
                          dispatch(
                            updateTables({
                              name: item.name,
                              userName: userInfo.name,
                            })
                          );
                        }}
                      >
                        Reserve
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          dispatch(removeTables(item._id));
                        }}
                      >
                        Un-Reserve
                      </button>
                    )}
                  </div>
                </React.Fragment>
              );
            })
          : "Loading..."}
      </div>
    </div>
  );
}

export default ManageTables;
