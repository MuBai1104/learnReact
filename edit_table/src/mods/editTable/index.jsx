import React, {useEffect, useState} from 'react';
import './style.css';
import {Table, Input} from '@alifd/next';

const result = [{
	id: '001',
	time: 1951,
	title: {name: 'The Old Man and the Sea'},
	num: {abs: 'ni hao'}
}, {
	id: '002',
	time: 1925,
	title: {name: 'the great gatsby'},
	num: {abs: 'The Old Man and the Sea'}
}, {
	id: '003',
	time: 1719,
	title: {name: 'The adventures of Robinson Crusoe'},
	num: {abs: 'The Old Man and the Sea'}
}];


const EditablePane = (props) => {
	const [cellTitle, setCellTitle] = useState(props.defaultTitle || "");
	const {record} = props || {};
	const [editable, setEditable] = useState(false);
	let typeKey = null;
	//修改后当前ID table 内容
	let dataList = [];
	record && Object.keys(record).map((item, index) => {

			if (typeof record[item] == "object") {
				dataList.push(record[item]);
				if (record[item][Object.keys(record[item])[0]] === cellTitle) {
					typeKey = Object.keys(record[item])[0];
				}
			} else {
				let obj = {};
				obj[item] = record[item];
				dataList.push(item);
				dataList[index] = {...obj};
			}
		}
	);

	const listEdi = (value) => {
		dataList && dataList.map((item, index) => {
			if (typeof item == "object") {
				if (Object.keys(item)[0] === typeKey) {
					dataList[index][Object.keys(dataList[index])[0]] = value;
				}
			}
		});
		console.log(dataList);
	};

	const onKeyDown = (e) => {
		const {keyCode} = e;
		if (keyCode > 36 && keyCode < 41) {
			e.stopPropagation();
		}
	};

	const onBlur = (e) => {
		setEditable(false);
		setCellTitle(e.target.value);
		listEdi(e.target.value)
	};

	const onDblClick = () => {
		setEditable(true)
	};

	if (editable) {
		return <Input autoFocus defaultValue={cellTitle} onKeyDown={onKeyDown} onBlur={onBlur}/>;
	}
	return <span onDoubleClick={onDblClick}>{cellTitle}</span>;

};


const EditTable = () => {
	/**
	 * @setRes	数据
	 */
	const [res, setRes] = useState(result);

	const renderCell = (value, index, record) => {
		return <EditablePane defaultTitle={value} record={record}/>;
	};


	return (<div>
		<Table dataSource={res}>
			<Table.Column title="Id" dataIndex="id"/>
			<Table.Column title="Title" dataIndex="title.name" cell={renderCell}/>
			<Table.Column title="Num" dataIndex="num.abs" cell={renderCell}/>
			<Table.Column title="Time" dataIndex="time"/>
		</Table>
	</div>)

};

export default EditTable;