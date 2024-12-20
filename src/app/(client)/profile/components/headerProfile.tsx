import React from "react";
import MenuItemProfile from "./MenuItemProfile";

const listProfile = [
  {
    link: "/profile",
    title: "Thông Tin",
  },
  {
    link: "/profile/edit",
    title: "Sửa Thông Tin",
  },
  {
    link: "/profile/change",
    title: "Đổi Mật Khẩu",
  },
  {
    link: "/profile/history",
    title: "Lịch sử ",
  },
];
const HeaderProfile = () => {
  return (
    <>
      <ul className="flex space-x-24 bg-slate-300 p-3 border border-t-gray-400 pl-16">
        {listProfile.map((item) => (
          <li key={item.link}>
            <MenuItemProfile {...item} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default HeaderProfile;
