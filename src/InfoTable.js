import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
	td {
	  border-bottom: 0;
	}
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
	border-right: 0;
      }
    }
  }
`

function Table({ columns, data }) {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({
		columns,
		data,
	})

	return (
		<table {...getTableProps()}>
		<thead>
		{headerGroups.map(headerGroup => (
			<tr {...headerGroup.getHeaderGroupProps()}>
			{headerGroup.headers.map(column => (
				<th {...column.getHeaderProps()}>{column.render('Header')}</th>
			))}
			</tr>
		))}
		</thead>
		<tbody {...getTableBodyProps()}>
		{rows.map((row, i) => {
			prepareRow(row)
			return (
				<tr {...row.getRowProps()}>
				{row.cells.map(cell => {
					return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
				})}
				</tr>
			)
		})}
		</tbody>
		</table>
	)
}

function InfoTable(props) {

	return (
		<Styles>
		<Table columns={props.columns} data={props.data} />
		</Styles>
	)
}

export const range = len => {
	const arr = []
	for (let i = 0; i < len; i++) {
		arr.push(i)
	}
	return arr
}

export function makeData(creatorFunction, ...lens) {
	const makeDataLevel = (depth = 0) => {
		const len = lens[depth]
		return range(len).map(d => {
			return {
				...creatorFunction(),
				subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
			}
		})
	}

	return makeDataLevel()
}

export default InfoTable 
