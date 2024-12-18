import React, { HTMLAttributes, FunctionComponent, useEffect } from 'react';
import { useState } from 'react';
import { Modal, Spinner, Form, Button, Row, Col, Container, Collapse, InputGroup } from 'react-bootstrap';
import BootstrapTable, { SelectRowProps } from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ICompany from '../../../types/ICompany';
import { requestAllCompanies, requestAllProducts } from '../../../utils/Requests';
import IProduct from '../../../types/IProduct';
import ISelectedProductListReceivedOrder from '../../../types/ISelectedProductListReceivedOrder';
import moment from 'moment';
import { Search } from 'react-bootstrap-icons';
import { DebounceInput } from 'react-debounce-input';
import filterFactory from 'react-bootstrap-table2-filter';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { SpinnerBlock } from '../../LoadingAnimation/SpinnerBlock';

interface AddReceivingOrderModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => Promise<void>;
    modalVisible: boolean;
}

const AddReceivingOrderModalComponent: FunctionComponent<AddReceivingOrderModalProps> = (props) => {
    const [isSaving] = useState(false);
    const [companyList, setCompanyList] = useState<ICompany[]>([]);
    const [productList, setProductList] = useState<IProduct[]>([]);
    const [isSearching] = useState(false);
    const [searchCompanyString, setSearchCompanyString] = useState<string>('');
    const [searchProductString, setSearchProductString] = useState<string>('');
    const [selectedProductList, setSelectedProductList] = useState<ISelectedProductListReceivedOrder[]>([]);
    const [currentProduct, setCurrentProduct] = useState<ISelectedProductListReceivedOrder>({
        quantity: 0,
        condition: '',
        product: {},
        comments: '',
    });
    const [expanderState, setExpanderState] = useState({
        orderInfoExpander: true,
        sellerInfoExpander: false,
        productInfoExpander: false,
        productsInOrderExpander: false,
    });
    const companyColumn = [

        {
            id: 1,
            dataField: 'companyType',
            text: 'Type',
            sort: true,
        },
        {
            id: 2,
            dataField: 'companyName',
            text: 'Company Name',
            sort: true,
        },
        {
            id: 3,
            dataField: 'companyRep',
            text: 'Company Rep',
            sort: true,
        },
        {
            id: 4,
            dataField: 'phoneNumber',
            text: 'Phone Number',
            sort: false,
            headerAlign: 'center',
        },
        {
            id: 5,
            dataField: 'email',
            text: 'Email',
            sort: false,
            headerAlign: 'center',
        },
        {
            id: 6,
            dataField: 'location',
            text: 'Location',
            sort: false,
        },
        {
            id: 7,
            dataField: 'comments',
            text: 'Comments',
            sort: false,
        },
    ];
    const productColumn = [
        {
            dataField: 'quantity',
            text: 'QTY',
            sort: true,
            headerAlign: 'center',
        },
        {
            dataField: 'productNumber',
            text: 'Product Number',
            sort: true,
        },
        {
            dataField: 'altNumber1',
            text: 'Alt 1',
            sort: true,
        },
        {
            dataField: 'altNumber2',
            text: 'Alt 2',
            sort: true,
        },
        {
            dataField: 'altNumber3',
            text: 'Alt 3',
            sort: true,
        },
        {
            dataField: 'altNumber4',
            text: 'Alt 4',
            sort: true,
        },
        {
            dataField: 'altNumber5',
            text: 'Alt 5',
            sort: true,
        },
        {
            dataField: 'altNumber6',
            text: 'Alt 6',
            sort: true,
        },
        {
            text: 'Type',
            dataField: 'productType',
            sort: true,
            headerAlign: 'center',
        },
        {
            text: 'Brand',
            dataField: 'brand',
            headerAlign: 'center',
            sort: true,
        },
        {
            dataField: 'description',
            text: 'Description',
            sort: false,
        },
    ];
    const selectedProductColumn = [
        {
            dataField: 'quantity',
            text: 'QTY',
            sort: true,
            headerAlign: 'center',
        },
        {
            dataField: 'condition',
            text: 'Condition',
            sort: true,
            headerAlign: 'center',
        },
        {
            dataField: 'product.productNumber',
            text: 'Product Number',
            sort: true,
        },
        {
            text: 'Type',
            dataField: 'product.productType',
            sort: true,
            headerAlign: 'center',
        },
        {
            text: 'Brand',
            dataField: 'product.brand',
            headerAlign: 'center',
            sort: true,
        },
        {
            dataField: 'comments',
            text: 'Comments',
            sort: false,
        },
    ]
    const options = {
        productOptions: {
            custom: true,
            totalSize: productList.length
        },
        companyOptions: {
            custom: true,
            totalSize: companyList.length
        }
    };
    const selectProductRow: SelectRowProps<IProduct> = {
        mode: 'radio',
        clickToSelect: true,
        onSelect: (row: IProduct) => {
            setCurrentProduct({ ...currentProduct, product: row });
        },
    };
    const selectCompanyRow: SelectRowProps<ICompany> = {
        mode: 'radio',
        clickToSelect: true,
        onSelect: (row: ICompany) => {
            setReceivingOrderState({ ...receivingOrderState, sellerId: row.id as number });
        },
    };
    const [receivingOrderState, setReceivingOrderState] = useState({
        poNumber: '',
        orderType: '',
        dateReceived: moment().format('YYYY-MM-DD'),
        comments: '',
        sellerId: 0,
        productsInOrder: {}
    });
    const getAllCompanies = async () => {
        setCompanyList(await requestAllCompanies());
        setProductList(await requestAllProducts());
    };
    const handleCompanySearch = (input: string, props: { searchText?: string; onSearch: any; onClear?: () => void; }) => {
        setSearchCompanyString(input);
        props.onSearch(input);
    };
    const handleProductSearch = (input: string, props: { searchText?: string; onSearch: any; onClear?: () => void; }) => {
        setSearchProductString(input);
        props.onSearch(input);
    };
    const onSubmit = () => {
        // Check for 
    }
    useEffect(() => {
        getAllCompanies();
    }, []);
    return (
        <div>
            <Modal backdrop="static" show={props.modalVisible} onHide={props.onClose} fullscreen={true}>
                <Modal.Header
                    style={{ background: '#212529', color: 'white', borderBottom: '1px solid rgb(61 66 70)' }}
                    closeButton
                >
                    <Modal.Title>
                        <h2 style={{ verticalAlign: '', fontWeight: 300 }} >Receiving Order</h2>
                        <p style={{ color: 'darkgray', fontSize: 18, fontWeight: 300 }}>
                            Please enter order information.
                        </p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#2c3034', color: 'white' }}>
                    <div className='container d-grid gap-2' style={{ marginBottom: 15 }}>
                        {isSaving ?
                            <div className='spinnerDiv' >
                                <ul>
                                    <li key='1' style={{ listStyle: 'none' }}>
                                        <Spinner animation="border" role="status" />
                                    </li>
                                    <li key='2' style={{ listStyle: 'none' }}>
                                        <label>Loading...</label>
                                    </li>
                                </ul>
                            </div>
                            :
                            <Form className="d-grid">
                                {/* Order Information Block */}
                                <>
                                    <div>
                                        <div style={{ display: 'flex', gap: '15px' }}>
                                            <h3 style={{ fontWeight: 300 }}>Order Information</h3>
                                            <Button variant="dark"
                                                onClick={() => {
                                                    setExpanderState({ ...expanderState, orderInfoExpander: !expanderState.orderInfoExpander })
                                                }}>{expanderState.orderInfoExpander ? '^' : 'V'}</Button>
                                        </div>
                                        <hr />
                                    </div>
                                    <Collapse in={expanderState.orderInfoExpander}>
                                        <Container>
                                            <p style={{ fontWeight: 300 }}> Please enter all information below, as it is required.</p>
                                            <Row>
                                                <Col>
                                                    <Form.Group className="mb-3" style={{ marginRight: 5 }}>
                                                        <Form.Label style={{ fontWeight: 300 }}>PO Number</Form.Label>
                                                        <Form.Control id="comments" type="text" placeholder="PO Number" onChange={(e) => setReceivingOrderState({ ...receivingOrderState, poNumber: e.target.value })} />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group className="mb-3" style={{ marginRight: 5 }}>
                                                        <Form.Label style={{ fontWeight: 300 }}>Order Type</Form.Label>
                                                        <Form.Select aria-label="Default select example" onChange={(e) => setReceivingOrderState({ ...receivingOrderState, orderType: e.target.value })}>
                                                            <option>Choose Order Type</option>
                                                            <option value="Order">Order</option>
                                                            <option value="RMA">RMA</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group className="mb-3" style={{ marginRight: 5 }}>
                                                        <Form.Label style={{ fontWeight: 300 }}>Date Received</Form.Label>
                                                        <Form.Control id="dateReceived" type="date"
                                                            value={receivingOrderState.dateReceived}
                                                            onChange={(e) => {
                                                                setReceivingOrderState({ ...receivingOrderState, dateReceived: moment(e.target.value).format('YYYY-MM-DD') });
                                                            }} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Form.Group className="mb-3" style={{ marginRight: 5 }}>
                                                        <Form.Label style={{ fontWeight: 300 }}>Tracking Number</Form.Label>
                                                        <Form.Control id="comments" type="text" placeholder="PO Number" onChange={(e) => setReceivingOrderState({ ...receivingOrderState, poNumber: e.target.value })} />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group className="mb-3" style={{ marginRight: 5 }}>
                                                        <Form.Label style={{ fontWeight: 300 }}>Shipped Via</Form.Label>
                                                        <Form.Select aria-label="Default select example" onChange={(e) => setReceivingOrderState({ ...receivingOrderState, orderType: e.target.value })}>
                                                            <option>Choose Order Type</option>
                                                            <option value="DHL">DHL</option>
                                                            <option value="FedEx">FedEx</option>
                                                            <option value="UPS">UPS</option>
                                                            <option value="USPS">USPS</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label style={{ fontWeight: 300 }}>Comments</Form.Label>
                                                        <Form.Control id="comments" type="text" placeholder="Comments" onChange={(e) => setReceivingOrderState({ ...receivingOrderState, comments: e.target.value })} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Collapse>

                                </>
                                {/* Seller Information Block */}
                                <>
                                    <div>
                                        <br />
                                        <br />
                                        <div style={{ display: 'flex', gap: '15px' }}>
                                            <h3 style={{ fontWeight: 300 }}>Seller Information</h3>
                                            <Button variant="dark"
                                                onClick={() => {
                                                    setExpanderState({ ...expanderState, sellerInfoExpander: !expanderState.sellerInfoExpander })
                                                }}>
                                                {expanderState.sellerInfoExpander ? '^' : 'V'}
                                            </Button>
                                        </div>
                                        <hr />
                                    </div>
                                    <Collapse in={expanderState.sellerInfoExpander}>
                                        <Container>
                                            {/* TODO Search Functionality of Quote Table */}
                                            <p style={{ fontWeight: 300 }}>Please select a seller from the table below. Hit the select button when finished.</p>
                                            {/* <Form.Group className="mb-3" style={{ marginRight: 5, width: '150px' }}>
                                                <Form.Control id="comments" type="text" placeholder="Search" />
                                            </Form.Group> */}
                                            <ToolkitProvider
                                                keyField="id"
                                                data={companyList}
                                                columns={companyColumn}
                                                search
                                            >
                                                {
                                                    props => {
                                                        return (
                                                            <div>
                                                                {isSearching ?
                                                                    <SpinnerBlock />
                                                                    :
                                                                    <div>
                                                                        <div className='d-flex justify-content-between'>
                                                                            <div className='d-flex justify-space-between'>
                                                                                <InputGroup className="mb-3">
                                                                                    <InputGroup.Text id="basic-addon2">
                                                                                        <Search />
                                                                                    </InputGroup.Text>
                                                                                    <DebounceInput
                                                                                        type="text"
                                                                                        className='debounce'
                                                                                        placeholder="Search..."
                                                                                        debounceTimeout={500}
                                                                                        value={searchCompanyString}
                                                                                        onChange={e => {
                                                                                            handleCompanySearch(e.target.value, { ...props.searchProps });
                                                                                        }} />
                                                                                </InputGroup>
                                                                            </div>
                                                                        </div>
                                                                        <BootstrapTable
                                                                            {...props.baseProps}
                                                                            bootstrap4
                                                                            striped
                                                                            hover
                                                                            selectRow={selectCompanyRow}
                                                                            noDataIndication='TABLE IS EMPTY'
                                                                            pagination={paginationFactory(options.companyOptions)}
                                                                            filter={filterFactory()}
                                                                            classes="table table-dark table-hover table-striped table-responsive"
                                                                        />
                                                                    </div>}
                                                            </div>
                                                        );
                                                    }
                                                }
                                            </ToolkitProvider>
                                        </Container>
                                    </Collapse>
                                </>
                                {/* Product Information Block */}
                                <>
                                    <div>
                                        <br />
                                        <br />
                                        <div style={{ display: 'flex', gap: '15px' }}>
                                            <h3 style={{ fontWeight: 300 }}>Product Information</h3>
                                            <Button variant="dark"
                                                onClick={() => {
                                                    setExpanderState({ ...expanderState, productInfoExpander: !expanderState.productInfoExpander })
                                                }}>
                                                {expanderState.productInfoExpander ? '^' : 'V'}
                                            </Button>
                                        </div>
                                        <hr />
                                    </div>
                                    <Collapse in={expanderState.productInfoExpander}>
                                        <Container>
                                            <p style={{ fontWeight: 300 }}>Enter in the info below. Then select a product from the table. Click submit when your finished.</p>
                                            <ToolkitProvider
                                                keyField="id"
                                                data={productList}
                                                columns={productColumn}
                                                search
                                            >
                                                {
                                                    props => {
                                                        return (
                                                            <div>
                                                                {isSearching ?
                                                                    <SpinnerBlock />
                                                                    :
                                                                    <div>
                                                                        <div className='d-flex justify-content-between'>
                                                                            <div className="d-flex" style={{ gap: '10px' }}>
                                                                                <Form.Group>
                                                                                    <InputGroup className="mb-3">
                                                                                        <InputGroup.Text id="basic-addon2">
                                                                                            <Search />
                                                                                        </InputGroup.Text>
                                                                                        <DebounceInput
                                                                                            type="text"
                                                                                            className='debounce'
                                                                                            placeholder="Search..."
                                                                                            debounceTimeout={500}
                                                                                            value={searchProductString}
                                                                                            onChange={e => {
                                                                                                handleProductSearch(e.target.value, { ...props.searchProps });
                                                                                            }} />
                                                                                    </InputGroup>
                                                                                </Form.Group>
                                                                                <Form.Group className="mb-4">
                                                                                    <Form.Control id="quantity" type="number" placeholder="Quantity"
                                                                                        onChange={(e) => {
                                                                                            setCurrentProduct({ ...currentProduct, quantity: e.target.value as unknown as number })
                                                                                        }} />
                                                                                </Form.Group>
                                                                                <Form.Group className="mb-3">
                                                                                    <Form.Select aria-label="Default select example"
                                                                                        onChange={(e) => {
                                                                                            setCurrentProduct({ ...currentProduct, condition: e.target.value })
                                                                                        }}>
                                                                                        <option>Choose Condition</option>
                                                                                        <option value="New_Factory_Sealed">New Factory Sealed</option>
                                                                                        <option value="New_Opened_Box">New Opened Box</option>
                                                                                        <option value="Renew">Renew</option>
                                                                                        <option value="Used">Used</option>
                                                                                        <option value="Damaged">Damaged</option>
                                                                                    </Form.Select>
                                                                                </Form.Group>
                                                                                <Form.Group className="mb-1">
                                                                                    <Form.Control id="comment" placeholder="Comments"
                                                                                        onChange={(e) => {
                                                                                            setCurrentProduct({ ...currentProduct, comments: e.target.value })
                                                                                        }} />
                                                                                </Form.Group>
                                                                            </div>
                                                                            <div style={{ float: 'right' }}>
                                                                                <Form.Group className="mb-3">
                                                                                    {/* TODO */}
                                                                                    <Button variant="secondary" onClick={() => {
                                                                                        selectedProductList.push(currentProduct);
                                                                                        setSelectedProductList(JSON.parse(JSON.stringify(selectedProductList)));
                                                                                    }}>Submit</Button>
                                                                                </Form.Group>
                                                                            </div>
                                                                        </div>

                                                                        <BootstrapTable
                                                                            {...props.baseProps}
                                                                            bootstrap4
                                                                            striped
                                                                            hover
                                                                            selectRow={selectProductRow}
                                                                            noDataIndication='TABLE IS EMPTY'
                                                                            pagination={paginationFactory(options.productOptions)}
                                                                            filter={filterFactory()}
                                                                            classes="table table-dark table-hover table-striped table-responsive"
                                                                        />
                                                                    </div>}
                                                            </div>
                                                        );
                                                    }
                                                }
                                            </ToolkitProvider>
                                        </Container>
                                    </Collapse>
                                </>
                                {/* Products In Order Block */}
                                <>
                                    <div>
                                        <br />
                                        <br />
                                        <div style={{ display: 'flex', gap: '15px' }}>
                                            <h3 style={{ fontWeight: 300 }}>Products in Order</h3>
                                            <Button variant="dark"
                                                onClick={() => {
                                                    setExpanderState({ ...expanderState, productsInOrderExpander: !expanderState.productsInOrderExpander })
                                                }}>
                                                {expanderState.productsInOrderExpander ? '^' : 'V'}
                                            </Button>
                                        </div>
                                        <hr />
                                    </div>
                                    <Collapse in={expanderState.productsInOrderExpander}>
                                        <Container>
                                            <p style={{ fontWeight: 300 }}>Review all products below.</p>
                                            <BootstrapTable
                                                keyField='productNumber'
                                                data={selectedProductList}
                                                columns={selectedProductColumn}
                                                bootstrap4
                                                classes="table table-dark table-hover table-striped"
                                                noDataIndication="Table is Empty"
                                            />
                                        </Container>
                                    </Collapse>
                                </>
                            </Form>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ background: '#212529', color: 'white', borderTop: '1px solid rgb(61 66 70)' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            variant="dark"
                            onClick={async () => {
                                onSubmit();
                            }}>
                            Finish
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div >
    );
};

export const AddReceivingOrderModal = withRouter(AddReceivingOrderModalComponent);