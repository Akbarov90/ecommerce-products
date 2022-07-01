import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {filterProducts, getProducts, getCategory} from "../../redux/products/productSlice";
import {Col, Card, Row, Form, Input, Button, Select, Pagination, Empty} from 'antd';
import {Loader} from "../components/Loader";
import {Link} from "react-router-dom";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


const {Option} = Select;
const {Meta} = Card;


const Products = () => {
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(true);
    const [name, setName] = useState('');
    const [form] = Form.useForm();
    const [category, setCategory] = useState('');
    const {productsData, loading, categoryProducts, count} = useSelector(state => state.Products);

    // getting prodcut and her category
    useEffect(() => {
        dispatch(getProducts({limit: 4, offset: 0}));
        dispatch(getCategory())
    }, []);


    // console.log(productsData);


    //searching
    const onSearch = () => {
        setDisabled(false)
        dispatch(filterProducts({name, category, limit: 4, offset: 0}))
    };

    // reset input vlues
    const onReset = () => {
        form.resetFields();
        setDisabled(true);
        setName('');
        setCategory('');
        dispatch(getProducts({limit: 4, offset: 0}))
    };

    // pagination page
    const handlePage = (e) => {
        dispatch(filterProducts({name, limit: e * 4, category, offset: e * 4 - 4}))
    }

    // select filter
    const handleSelect = (e) => {
        dispatch(filterProducts({name, category: e, limit: 4, offset: 0}))
        console.log(e)
        setCategory(e)

    }


    return (
        <div className={'container'}>

            <Form onFinish={onSearch} form={form}>
                <div className={'searchbox'}>
                    <div className={'searchbox_item'}>
                        <Form.Item name={'name'}>
                            <Input value={name} onChange={e => setName(e.target.value)} type={'text'}
                                   style={{width: '400px'}}
                                   placeholder={'Search'}/>
                        </Form.Item>
                        <Form.Item>
                            <Button style={{margin: '0 20px'}} htmlType={'submit'} type={'primary'}>Search</Button>
                            <Button
                                type={'danger'}
                                disabled={disabled}
                                className={'search-button2'}
                                htmlType={'button'}
                                onClick={onReset}
                            >
                                Clear
                            </Button>
                        </Form.Item>
                    </div>
                    <div>
                        <Select
                            style={{
                                width: 180,
                            }}
                            // options={}
                            placeholder="Please select"
                            defaultValue={category}
                            value={category}
                            onChange={handleSelect}
                        >
                            <Option value={''}>All</Option>
                            {categoryProducts?.map((i) => (
                                <Option key={i} value={i}>{i}</Option>
                            ))}
                        </Select>
                    </div>
                </div>
            </Form>


            {loading ? <Loader/> :
                <Row
                    gutter={{
                        xs: 8,
                        sm: 16,
                        md: 24,
                        lg: 32,
                    }}
                >{productsData.length > 0 ?
                    productsData?.map((product) => (
                        <Col key={product.id} md={12} lg={8} xl={6}>
                            <Link to={`/product/${product.id}`}>
                                <Card
                                    hoverable
                                    style={{
                                        margin: '20px'
                                    }}
                                    cover={<LazyLoadImage delayTime={300} effect={"blur"} alt="example"
                                                          src={product.thumbnail} width={'100%'}/>}
                                >
                                    <Meta title={product.brand} description={product.description}/>
                                    <div className="additional">
                                        <h3 style={{margin: "10px 0"}}
                                            className="price">Price: {`${product.price} $`}</h3>
                                    </div>
                                </Card>
                            </Link>
                        </Col>

                    ))
                    : <Empty/>

                }
                </Row>
            }
            <Pagination className={'pagination-product'} defaultCurrent={1} onChange={handlePage}
                        responsive={true} defaultPageSize={4} total={count}/>
            <h1 style={{textAlign: 'center'}}>Copyright Akbarov Abduvahob )) &copy;</h1>
        </div>
    )
}

export default Products
