import React, { useState } from "react"
import { ReactComponent as Minus } from "../components/icons/minus.svg"
import { ReactComponent as Plus } from "../components/icons/plus.svg"
import { ReactComponent as Heart } from "../components/icons/heart.svg"
import { ReactComponent as ActiveHeart } from "../components/icons/activeHeart.svg"

import Products from "../components/products/products"

import img from "../components/icons/detail-main-img.svg"
import img1 from "../components/icons/detail-img.svg"
import img2 from "../components/icons/detail-img2.svg"

import "../styles/components/DetailOfProduct.scss"

const DetailOfProduct = ({ product }) => {
    const [checked, setChecked] = useState(false)
    // plug
    const [heart, setHeart] = useState(false)
    const Check = () => {
        setChecked(!checked)
    }
    console.log(product)
    const complect = {
        img: img2,
        title: "Зеркало Анталия (3 полки) (Дуб Крафт Бел) 500*700 (Four) Стандарт Анталия (3 полк..",
        price: "14200 с",
    }

    const complects = new Array(6).fill(complect)

    return (
        <>
            <div className="detail_page">
                <div className="about_product">
                    <div className="left">
                        <div className="first-c">
                            <img
                                src={img2}
                                alt="#"
                                className="img"
                            />
                            <img
                                src={img1}
                                alt="#"
                                className="img"
                            />
                            <img
                                src={img2}
                                alt="#"
                                className="img"
                            />
                            <img
                                src={img1}
                                alt="#"
                                className="img"
                            />
                            <img
                                src={img1}
                                alt="#"
                                className="img"
                            />
                        </div>
                        <div className="second-c">
                            <img
                                src={img}
                                alt=""
                                className="second-c__image"
                            />
                            <div
                                onClick={() => {
                                    {
                                        heart ? setHeart(false) : setHeart(true)
                                    }
                                }}
                                className="heart"
                            >
                                {heart ? <ActiveHeart /> : <Heart />}
                            </div>
                        </div>
                    </div>
                    <div className="third-c">
                        <h2>
                            Зеркало Анталия (3 полки) (Дуб Крафт Бел) 500*700
                            (Four) Стандарт Анталия (3 полки) (Дуб Крафт Бел)
                        </h2>
                        <p>Комплекты:</p>
                        <div className="complects scrollbar_primary">
                            {complects.map((el, index) => (
                                <div
                                    key={index}
                                    className="complect"
                                    onClick={() => Check()}
                                >
                                    <div
                                        className={
                                            checked ? "checked" : "check"
                                        }
                                    ></div>
                                    <img
                                        src={el.img}
                                        alt=""
                                        className="c-img"
                                    />
                                    <p className="title">{el.title}</p>
                                    <h5>{el.price}</h5>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="fourth-c">
                        <div className="top">
                            <p>
                                <span className="discount">453990 с</span>
                                <span className="price">
                                    <s>459930 с</s>
                                </span>
                            </p>
                            <p className="articul">Артикул: ZGW131240</p>
                            <div className="line"></div>
                            <div className="lists">
                                <ul>
                                    <li className="first-li">В наличии</li>
                                </ul>
                                <ul>
                                    <li className="second-li">Комплект</li>
                                </ul>
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="quantity">
                                <Minus />
                                <h2>10</h2>
                                <Plus />
                            </div>
                            <button className="toBasket">В корзину</button>
                        </div>
                    </div>
                </div>
                <div className="description">
                    <h2>Описание:</h2>
                    <p>
                        У нас появились совершенно новые модели гарнитуров и
                        кофейных столов, чтобы сделать вашу гостиную еще более
                        комфортной и элегантной. Мы предлагаем разнообразные
                        стили и цветовые решения, чтобы подчеркнуть ваш
                        уникальный вкус.У нас появились совершенно новые модели
                        гарнитуров и кофейных столов, чтобы сделать вашу
                        гостиную еще более комфортной и элегантной. У нас
                        появились совершенно новые модели гарнитуров и кофейных
                        столов, чтобы сделать вашу гостиную еще более комфортной
                        и элегантной.
                    </p>
                </div>

                <div className="same">
                    <Products title="Похожие товары" />
                </div>
            </div>
        </>
    )
}

export default DetailOfProduct
