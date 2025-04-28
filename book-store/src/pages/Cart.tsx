import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import Title from '../components/common/Title';
import CartItem from '../components/cart/CartItem';
import { useCart } from '../hooks/useCart';
import Empty from '../components/common/Empty';
import { FaShoppingCart } from 'react-icons/fa';
import CartSummary from '../components/cart/CartSummary';

function Cart() {

    const {carts, deleteCartItem, isEmpty} = useCart();

    const [ checkedItems, setCheckedItems] = useState<number[]>([]);

    const handleCheckItem = (id: number) => {
        // 언체크
        if(checkedItems.includes(id)){
            setCheckedItems(checkedItems.filter((item) => item !== id));
        }else{
            // 체크
            setCheckedItems([...checkedItems, id]);
        }
    };

    const handleItemDelete = (id: number) => {
        deleteCartItem(id);
    }

    const totalQuantity = useMemo(() => {
        return carts.reduce((acc, cart) => {
            if(checkedItems.includes(cart.id)){
                return acc + cart.quantity;
            }
            return acc;
        }, 0)
    }, [carts, checkedItems]);

    const totalPrice = useMemo(() => {
        return carts.reduce((acc, cart)=> {
            if(checkedItems.includes(cart.id)){
                return acc + (cart.price * cart.quantity);
            }
            return acc;
        }, 0)
    }, [carts, checkedItems]);

    return (
        <>
            <Title size='large'>장바구니</Title>
            <CartStyle>
                {
                    !isEmpty &&(
                        <>
                            <div className="content">
                                {
                                    carts.map((item) => (
                                        <CartItem
                                            cart={item}
                                            key={item.id}
                                            checkedItems={checkedItems}
                                            onCheck={handleCheckItem}
                                            onDelete={handleItemDelete}
                                        />
                                    ))
                                }
                            </div>
                            <div className="summary">
                                <CartSummary
                                    totalQuantity={totalQuantity}
                                    totalPrice={totalPrice}
                                />
                            </div>
                        </>
                    )
                }
                {
                    isEmpty && (
                        <Empty
                            title='장바구니가 비었습니다.'
                            icon={<FaShoppingCart />}
                            description={<>장바구니를 채워보세요.</>}
                        />
                    )
                }
            </CartStyle>
        </>
    );
}

const CartStyle = styled.div`
    display: flex;
    gap: 24px;
    justify-content: space-between;
    padding: 24px 0 0 0;

    .content{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .summary{
        display: flex;
    }
`;

export default Cart;