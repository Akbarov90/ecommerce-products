import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProduct} from "../../redux/products/productSlice";
import {Col, Row, List, Button} from 'antd';
import {Loader} from "../components/Loader";
import Rating from "../components/Rating";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Product = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {product, loading} = useSelector(state => state.Products);
    // getting product category
    useEffect(() => {
        dispatch(getProduct(id))
    }, [])


    return (
        <div className={'container'}>
            <Link to={'/'}>
                <Button type={'primary'} style={{margin: '20px 50px'}} htmlType={'button'}>&#8592; Back to Home</Button>
            </Link>
            {loading ? <Loader/> :
                <Row style={{margin: '30px'}} gutter={32}>
                    <Col xl={12}>
                            <LazyLoadImage delayTime={300} effect={"blur"} className={'products-image'}
                                           src={product.thumbnail}
                                           alt={product.title}/>
                        <Row style={{margin: '20px 0'}} gutter={8}>
                            {product?.images?.map((i, index) => (
                                <Col key={index} md={8}>
                                    <LazyLoadImage delayTime={300} className={'products-image'} effect={"blur"}
                                                   style={{margin: '10px'}} width={150} src={i}
                                                   alt=""/>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col xl={12}>
                        <List>
                            <List.Item><h1>{product.brand}</h1> <h1>{product.title}</h1></List.Item>
                            <List.Item><p>{product.description}</p></List.Item>
                            <List.Item><h4>Discount Percentage -{product.discountPercentage}</h4></List.Item>
                            <List.Item><h4>Stock - {product.stock}</h4></List.Item>
                            <List.Item><Rating color={{color: '#f8e825'}} value={product.rating}/></List.Item>
                            <List.Item><h1>{product.price} $</h1></List.Item>
                        </List>
                    </Col>
                </Row>
            }
            <h1 style={{textAlign: 'center'}}>Copyright Akbarov Abduvahob )) &copy;</h1>
        </div>
    )
}

export default Product;