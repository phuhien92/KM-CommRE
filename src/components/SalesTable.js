import React from 'react';

const SalesTable = ({ data, selectedAgent, onSelect }) => {
    return (
        <table className="table table-bordered table-hover">
            <thead>
                <tr>
                    <th>Agent</th>
                    <th>Sales</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.length ?
                        data.map(([agent, sales]) => (
                            <tr key={agent} className={agent === selectedAgent ? 'selected' : ''} onClick={() => onSelect(agent)}>
                                <td className="fw-bold">{agent}</td>
                                <td className="fw-bold">{sales}</td>
                            </tr>
                        )) : null}
            </tbody>
        </table>
    )
}

export default SalesTable;