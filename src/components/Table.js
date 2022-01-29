import numeral from 'numeral';
import React from 'react';
import './table.css'

const Table = ({ countries }) => {
    return (
        <div className='table'>
            <table>
                <tbody>

                    {countries.map(({ country, cases }, index) => (
                        <tr key={index}>
                            <td><strong>{index + 1}. </strong> {country}</td>
                            <td><strong>{numeral(cases).format("0,0")}</strong></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default Table;
