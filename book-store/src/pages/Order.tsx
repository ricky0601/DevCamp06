import { useLocation } from "react-router-dom";
import Title from "../components/common/Title";
import { CartStyle } from "./Cart";
import CartSummary from "../components/cart/CartSummary";
import Button from "../components/common/Button";
import InputText from "../components/common/inputText";
import { useForm } from "react-hook-form";
import { Delivery, OrderSheet } from "../models/order.model";

interface DeveryForm extends Delivery{
    addressDetail: string;
}

function Order(){

    const location = useLocation();
    const orderDataFromCart = location.state;

    const {totalQuantity, totalPrice, firstBookTitle} = orderDataFromCart;

    const {
        register,
        handleSubmit,
        formState:{errors},
    } = useForm<DeveryForm>();

    const handlePay = (data: DeveryForm) => {
        const orderData: OrderSheet = {
            ...orderDataFromCart,
            delivery: {
                ...data,
                address: `${data.address} ${data.addressDetail}`
            },
        };

        // 서버로 넘기는 로직 필요
        console.log(orderData);
        
    }


    return(
        <>
            <Title size="large">주문서 작성</Title>
            <CartStyle>
                <div className="content">
                    <div className="order-info">
                        <Title size="medium" color="text">
                            배송 정보
                        </Title>
                        <form className="delivery">
                            <fieldset>
                                <label>주소</label>
                                <div className="input">
                                    <InputText inputType="text" {...register("address", {required: true})} />
                                </div>
                                <Button size="medium" scheme="normal">
                                    주소 찾기
                                </Button>
                            </fieldset>
                            {errors.address && <p className="error-text">주소를 입력해주세요.</p>}
                            <fieldset>
                                <label>상세 주소</label>
                                <div className="input">
                                    <InputText inputType="text" {...register("addressDetail", {required: true})}/>
                                </div>
                            </fieldset>
                            {errors.address && <p className="error-text">상세 주소를 입력해주세요.</p>}
                            <fieldset>
                                <label>수령인</label>
                                <div className="input">
                                    <InputText inputType="text" {...register("receiver", {required: true})} />
                                </div>
                            </fieldset>
                            {errors.address && <p className="error-text">수령인을 입력해주세요.</p>}
                            <fieldset>
                                <label>연락처</label>
                                <div className="input">
                                    <InputText inputType="text" {...register("contact", {required: true})}/>
                                </div>
                            </fieldset>
                            {errors.address && <p className="error-text">연락처를 입력해주세요.</p>}
                        </form>
                    </div>
                    <div className="order-info">
                        <Title size="medium" color="text">
                            주문 상품
                        </Title>
                        <strong>
                            {firstBookTitle} 등 총 {totalQuantity} 권
                        </strong>
                    </div>
                </div>
                <div className="summary">
                    <CartSummary
                        totalQuantity={totalQuantity}
                        totalPrice={totalPrice}
                    />
                    <Button size='large' scheme='primary' onClick={handleSubmit(handlePay)}>
                        결제하기
                    </Button>
                </div>
            </CartStyle>
        </>
    )
}

export default Order;