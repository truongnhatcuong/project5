import React from "react";

import DeleteCustomer from "./DeleteCustomer";
import UpdateCustomer from "./UpdateCustomer";

interface ICustomer {
  customer_id: number;
  name: string;
  email: string;
  phone: number;
  address: string;
  roleId: number;
}

interface ITableCustomer {
  customer: ICustomer[];
  reloadData: () => void;
}

const TableCustomer = (props: ITableCustomer) => {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="min-w-full table-auto text-sm text-left text-gray-500">
        {/* head */}
        <thead className="bg-gray-950 text-white">
          <tr>
            <th className="p-4"></th>
            <th className="p-4">Tên khách hàng</th>
            <th className="p-4 ">Email</th>
            <th className="p-4">Số điện thoại</th>
            <th className="p-4">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {props.customer.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-600">
                Chưa có khách hàng
              </td>
            </tr>
          ) : (
            props.customer.map((item) => (
              <tr
                key={item.customer_id}
                className="border-b hover:bg-gray-100 transition-colors"
              >
                <td className="p-4"></td>
                <td className="p-4">{item.name}</td>
                <td className="p-4">{item.email}</td>
                <td className="p-4">{item.phone}</td>

                <td className={`p-2  flex gap-5  }`}>
                  <DeleteCustomer
                    customer_id={item.customer_id}
                    reloadData={props.reloadData}
                  />
                  <UpdateCustomer props={item} reloadData={props.reloadData} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableCustomer;
