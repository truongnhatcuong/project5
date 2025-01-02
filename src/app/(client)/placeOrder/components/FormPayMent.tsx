/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";

import { useState } from "react";
import { toast } from "react-toastify";

const PaymentMethodForm = ({
  customerId,
  addressId,
}: {
  customerId: number;
  addressId: number;
}) => {
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const route = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn chặn reload trang
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerId, addressId, paymentMethod }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Đã Đặt Thành Công Đơn Hàng");
        route.push("/profile/listorder");
      } else {
        toast.error(data.message || "ít nhất phải có một sản phẩm");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="mt-[76px]">
      <form
        onSubmit={handleSubmit}
        className="bg-white h-full shadow-xl p-4 space-y-6"
      >
        <h2 className="text-lg font-semibold">Phương thức thanh toán</h2>

        {/* Phương thức thanh toán tiền mặt */}
        <div className="flex ">
          <input
            type="radio"
            name="payment"
            value="CASH"
            checked={paymentMethod === "CASH"}
            onChange={() => setPaymentMethod("CASH")}
            className="mr-1 cursor-pointer"
          />
          <p className="text-sm">Thanh toán khi nhận hàng</p>
        </div>

        {/* Phương thức thanh toán chuyển khoản ngân hàng */}
        <div className="flex  " title="không khả dụng">
          <input
            type="radio"
            name="payment"
            value="BANK_TRANSFER"
            checked={paymentMethod === "BANK_TRANSFER"}
            onChange={() => setPaymentMethod("BANK_TRANSFER")}
            className="mr-1 cursor-pointer"
            disabled
          />
          <p className="text-sm">Chuyển khoản</p>
        </div>

        <div className="flex " title="không khả dụng">
          <input
            type="radio"
            name="payment"
            value="E_WALLET"
            checked={paymentMethod === "E_WALLET"}
            onChange={() => setPaymentMethod("E_WALLET")}
            className="mr-1 cursor-pointer"
            disabled
          />
          <p className="text-sm">ví điện tử</p>
        </div>
        <hr className="border w-full" />

        {/* Nút gửi */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-black text-white hover:bg-gray-950"
        >
          Đặt Hàng
        </button>
      </form>
    </div>
  );
};

export default PaymentMethodForm;