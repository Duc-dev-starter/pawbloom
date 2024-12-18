"use client";

import { DeleteWithDialog } from "@/components/common";
import Image from "next/image";
import React, { useState } from "react";

const cartData = [
    {
        id: "1",
        name: "Product 1",
        price: 10000,
        quantity: 2,
        image: ["/assets/images/homepage.png"],
    },
    {
        id: "2",
        name: "Product 2",
        price: 20000,
        quantity: 1,
        image: ["/assets/images/homepage.png"],
    },
];

const Cart = () => {
    const [cart, setCart] = useState(cartData);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleSelectAll = () => {
        if (selectedItems.length === cart.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(cart.map((item) => item.id));
        }
    };

    const handleSelectItem = (id: string) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    const handleDeleteSelected = () => {
        setCart(cart.filter((item) => !selectedItems.includes(item.id)));
        setSelectedItems([]);
    };

    const handleClearCart = () => {
        setCart([]);
        setSelectedItems([]);
    };

    const totalSelected = selectedItems.reduce((total, id) => {
        const item = cart.find((product) => product.id === id);
        return total + (item?.price || 0) * (item?.quantity || 0);
    }, 0);

    return (
        <div className="border-t p-14">
            <div className="mb-3 text-2xl">
                <h1>Giỏ hàng của bạn</h1>
            </div>

            {/* Header */}
            <div className="grid grid-cols-[1fr_4fr_2fr_1fr_1fr] items-center gap-4 border-b pb-4 text-gray-700">
                <input
                    type="checkbox"
                    checked={selectedItems.length === cart.length}
                    onChange={handleSelectAll}
                />
                <p>Tên sản phẩm</p>
                <p>Số lượng</p>
                <p>Giá tiền</p>
                <p>Hành động</p>
            </div>

            {/* Product List */}
            <div>
                {cart.map((product) => (
                    <div
                        key={product.id}
                        className="grid grid-cols-[1fr_4fr_2fr_1fr_1fr] items-center gap-4 border-y py-4 text-gray-700"
                    >
                        <input
                            type="checkbox"
                            checked={selectedItems.includes(product.id)}
                            onChange={() => handleSelectItem(product.id)}
                        />
                        <div className="flex items-start gap-6">
                            <Image
                                src={product.image[0]}
                                className="w-16 sm:w-20"
                                alt={product.name}
                                width={10}
                                height={10}
                            />
                            <div>
                                <p className="text-xs font-medium sm:text-lg">{product.name}</p>
                            </div>
                        </div>
                        <input
                            type="number"
                            min={1}
                            defaultValue={product.quantity}
                            className="max-w-10 border p-1 sm:max-w-20 sm:px-2"
                        />
                        <p>{product.price * product.quantity} VND</p>
                        <DeleteWithDialog
                            tooltipContent="Xóa sản phẩm"
                            dialogDescription="Bạn có chắc muốn xóa sản phẩm khỏi giỏ hàng"
                            dialogTitle="Bạn có chắc chắn"
                            onConfirm={() =>
                                setCart(cart.filter((item) => item.id !== product.id))
                            }
                        />
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="my-20 flex flex-col items-end gap-4">
                {selectedItems.length > 0 && (
                    <button
                        className="rounded bg-red-500 px-4 py-2 text-white"
                        onClick={handleDeleteSelected}
                    >
                        Xóa sản phẩm đã chọn
                    </button>
                )}
                <button
                    className="rounded bg-gray-500 px-4 py-2 text-white"
                    onClick={handleClearCart}
                >
                    Xóa sạch giỏ hàng
                </button>
                <div className="w-full sm:w-[450px]">
                    <div className="w-full">

                        <div className="mt-2 flex flex-col gap-2 text-sm">
                            <div className="flex justify-between">
                                <p>Số sản phẩm được chọn</p>
                                <p>{selectedItems.length}</p>
                            </div>
                            <div className="flex justify-between">
                                <b className="text-2xl">Tổng tiền</b>
                                <b className="text-2xl">{totalSelected} VND</b>
                            </div>
                            <button
                                className={`mt-4 w-full rounded px-4 py-2 ${selectedItems.length > 0
                                    ? "bg-brand-200 text-white"
                                    : "bg-gray-300 text-gray-500"
                                    }`}
                                disabled={selectedItems.length === 0}
                                onClick={() => alert("Checkout thành công!")}
                            >
                                Thanh toán
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
