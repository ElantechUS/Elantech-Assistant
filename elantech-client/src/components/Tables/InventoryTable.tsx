import React, { FunctionComponent, HTMLAttributes, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Pencil, Trash } from 'react-bootstrap-icons';
import BootstrapTable, { SelectRowProps } from 'react-bootstrap-table-next';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import IInventory from '../../types/IInventory';
import IProduct from '../../types/IProduct';
import { EditInventoryModal } from '../Modals/Inventory/EditInventoryModal';
import { EditMultipleInventoryModal } from '../Modals/Inventory/EditMultipleInventoryModal';
import { RemoveInventoryModal } from '../Modals/Inventory/RemoveInventoryModal';
import { RemoveMultipleInventoryModal } from '../Modals/Inventory/RemoveMultipleInventoryModal';


interface InventoryTableProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    inventory: IInventory[];
    getAllInventory: (productId: number) => void
    selectedProduct: IProduct;
    getAllProducts: () => void;
}

const InventoryTableComponent: FunctionComponent<InventoryTableProps> = (props) => {
    const [inventoryList, setInventoryList] = useState<IInventory[]>(props.inventory);
    const [selectedInventoryList, setSelectedInventoryList] = useState<IInventory[]>([]);
    const [selectedInventory, setSelectedInventory] = useState<IInventory>(
        {
            id: 0,
            productId: 0,
            removedId: 0,
            poId: undefined,
            serialNumber: '',
            condition: '',
            warrantyExpiration: '',
            isTested: false,
            dateTested: '',
            comment: '',
            location: '',
        }
    );
    const [editInventorySwitch, setEditInventorySwitch] = useState(false);
    const [removeInventorySwitch, setRemoveInventorySwitch] = useState(false);
    const [removeMultipleInventorySwitch, setRemoveMultipleInventorySwitch] = useState(false);
    const [editMultipleInventorySwitch, setEditMultipleInventorySwitch] = useState(false);

    const [tempSelected, setTempSelected] = useState<string[]>([]);

    const rankFormatterRemove = (_: any, data: any, index: any) => {
        return (
            <div
                style={{
                    textAlign: 'center',
                    cursor: 'pointer',
                    lineHeight: 'normal'
                }}
                onClick={(e) => {
                    e.stopPropagation()
                }} >
                <div onClick={(e) => {
                    setRemoveInventorySwitch(true);
                    setSelectedInventory(data);

                }}
                >
                    <Trash style={{ fontSize: 20, color: 'white' }} />
                </div>
            </div>
        );
    };
    const rankFormatterEdit = (_: any, data: any, index: any) => {
        return (
            <div
                style={{
                    textAlign: 'center',
                    cursor: 'pointer',
                    lineHeight: 'normal',
                    zIndex: 0
                }}
                onClick={(e) => {
                    e.stopPropagation()
                }} >
                <div onClick={(e) => {
                    setEditInventorySwitch(true);
                    setSelectedInventory(data);
                }}
                >
                    <Pencil style={{ fontSize: 20, color: 'white' }} />
                </div>
            </div>
        );
    };
    const handleConditionSort = (order: string) => {
        if(order === 'desc') {
            console.log('Handle Sort: ' + order);
            inventoryList.sort((a, b) => b.condition.localeCompare(a.condition));
            console.log(inventoryList);
        } else {
            console.log('Handle Sort: ' + order);
            inventoryList.sort((a, b) => a.condition.localeCompare(b.condition));
            console.log(inventoryList);
        }
    }
    const columns = [
        {
            id: 1,
            dataField: 'serialNumber',
            text: 'Serial Number',
            sort: false,
        },
        {
            id: 2,
            dataField: 'condition',
            text: 'Condition',
            sort: true,
            onSort: (field: any, order: string) => {
                handleConditionSort(order);
            }
        },
        {
            id: 3,
            dataField: 'sellerName',
            text: 'Seller Name',
            sort: false
        },
        {
            id: 4,
            dataField: 'orderNumber',
            text: 'Order Number',
            sort: false,
        },
        {
            id: 5,
            dataField: 'dateReceived',
            text: 'Date Received',
            sort: false,
        },
        {
            id: 6,
            dataField: 'warrantyExpiration',
            text: 'Warranty Expiration',
            sort: false,
        },
        {
            id: 7,
            dataField: 'comment',
            text: 'Comment',
            sort: false,
        },
        {
            id: 8,
            dataField: 'location',
            text: 'Location',
            sort: false,
        },
        {
            id: 9,
            dataField: 'dateTested',
            text: 'Date Tested',
            sort: false,
        },
        {
            id: 10,
            dataField: 'isTested',
            text: 'Tested',
            sort: false,
            headerAlign: 'center',
        },
        {
            id: 11,
            dataField: 'reserved',
            text: 'Reserved',
            sort: false,
            headerAlign: 'center',
        },
        {
            id: 11,
            dataField: 'edit',
            text: 'Edit',
            sort: false,
            formatter: rankFormatterEdit,
        },
        {
            id: 12,
            dataField: 'remove',
            text: 'Remove',
            sort: false,
            formatter: rankFormatterRemove,
        }
    ];
    const [lastSelected, setLastSelected] = useState(-1);
    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        bgColor: '#0da7fd73 !important',
        selected: tempSelected,
        selectColumnStyle:
        {

        },
        onSelect: (row: IInventory, isSelect: boolean, rowIndex: number, e: any) => {
            if(e.shiftKey) {
                if (isSelect === true && lastSelected !== -1) {
                    if(lastSelected > rowIndex) {
                        for(let i = lastSelected; i > rowIndex ; i--){
                            if (!selectedInventoryList.includes(inventoryList[i])) selectedInventoryList.push(inventoryList[i]);
                            if (!tempSelected.includes(inventoryList[i].serialNumber)) tempSelected.push(inventoryList[i].serialNumber);
                            setLastSelected(-1);
                        }
                    } else {
                        for(let i = lastSelected; i < rowIndex; i++){
                            if (!selectedInventoryList.includes(inventoryList[i])) selectedInventoryList.push(inventoryList[i]);
                            if (!tempSelected.includes(inventoryList[i].serialNumber)) tempSelected.push(inventoryList[i].serialNumber);
                            setLastSelected(-1);
                        }
                    }
                }
                if(lastSelected === -1) {
                    setLastSelected(rowIndex);
                    console.log('HERE');
                }
            }
            if (isSelect === true) {
                // Add inventory to list
                selectedInventoryList.push(row);
                tempSelected.push(row.serialNumber);
                setSelectedInventoryList([...selectedInventoryList]);
                setLastSelected(rowIndex);
            } else {
                // Remove Inventory from list
                const index = selectedInventoryList.indexOf(row);
                selectedInventoryList.splice(index, 1);
                tempSelected.splice(index, 1);
                setSelectedInventoryList([...selectedInventoryList]);
            }
        },
        onSelectAll: (isSelect: any, rows: IInventory[], e: any) => {
            setLastSelected(-1);
            if (isSelect === true) {
                for (let i = 0; i < rows.length; i++) {
                    selectedInventoryList.push(rows[i]);
                    tempSelected.push(rows[i].serialNumber);
                }
                setSelectedInventoryList([...selectedInventoryList]);
                
            } else {
                setSelectedInventoryList([]);
                setTempSelected([]);
            }
        }
    };
    useEffect(() => {
        setInventoryList(props.inventory);
    });
    return (
        <div>
            <br />
            <div>
                <div>
                    <div className='d-flex flex-row-reverse' style={{ marginBottom: 5 }}>
                        <input type='text'
                            className="form-control custom-input d-flex flex-row-reverse"
                            placeholder="0"
                            value={selectedInventoryList.length}
                            readOnly={true}
                            style={{ width: 70, textAlign: 'center', marginLeft: 5 }}
                        />
                        {
                            selectedInventoryList.length > 1 &&
                            <div className='fade-in-right' aria-controls="example-fade-text">
                                <Button variant='dark' style={{ marginLeft: 5 }}
                                    onClick={() => {
                                        console.log('')
                                    }}
                                >
                                    Reserve Items
                                </Button>
                                <Button variant='dark' style={{ marginLeft: 5 }}
                                    onClick={() => {
                                        setEditMultipleInventorySwitch(true);
                                    }}
                                >
                                    Edit Multiple Inventory
                                </Button>
                                <Button variant='dark' style={{ marginLeft: 5 }}
                                    onClick={() => {
                                        setRemoveMultipleInventorySwitch(true);
                                    }}
                                >
                                    Remove Multiple
                                </Button>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div style={{overflowX: 'auto', maxHeight: 500}} className='no-highlight'>
                <BootstrapTable
                    key='inventory_table'
                    bootstrap4
                    condensed
                    selectRow={selectRow as SelectRowProps<IInventory>}
                    data={inventoryList}
                    columns={columns}
                    keyField='serialNumber'
                    classes="table table-dark table-hover table-striped"
                    noDataIndication="Table is Empty"
                />
            </div>
            {
                editInventorySwitch &&
                <div className='modal-dialog'>
                    <EditInventoryModal
                        modalVisible={editInventorySwitch}
                        selectedInventory={selectedInventory}
                        getAllInventory={props.getAllInventory}
                        selectedProduct={props.selectedProduct}
                        onClose={async () => {
                            setEditInventorySwitch(false);
                        }}
                    />
                </div>
            }
            {
                removeInventorySwitch &&
                <div className='modal-dialog'>
                    <RemoveInventoryModal
                        modalVisible={removeInventorySwitch}
                        selectedInventory={selectedInventory}
                        getAllInventory={props.getAllInventory}
                        getAllProducts={props.getAllProducts}
                        selectedProduct={props.selectedProduct}
                        onClose={async () => {
                            setRemoveInventorySwitch(false);
                            setSelectedInventoryList([]);
                        }}
                    />
                </div>
            }
            {
                removeMultipleInventorySwitch &&
                <div className='modal-dialog'>
                    <RemoveMultipleInventoryModal
                        modalVisible={removeMultipleInventorySwitch}
                        selectedInventory={selectedInventoryList}
                        getAllProducts={props.getAllProducts}
                        getAllInventory={props.getAllInventory}
                        selectedProduct={props.selectedProduct}
                        onClose={async () => {
                            setSelectedInventoryList([]);
                            setRemoveMultipleInventorySwitch(false);
                        }}
                    />
                </div>
            }
            {
                editMultipleInventorySwitch &&
                <div className='modal-dialog'>
                    <EditMultipleInventoryModal
                        modalVisible={editMultipleInventorySwitch}
                        selectedInventory={selectedInventoryList}
                        onClose={async () => {
                            setEditMultipleInventorySwitch(false);
                        }}
                    />
                </div>
            }
        </div >
    );
};

export const InventoryTable = withRouter(InventoryTableComponent);
