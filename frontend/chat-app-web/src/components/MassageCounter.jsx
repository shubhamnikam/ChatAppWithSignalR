import React from 'react';
import { Table } from 'react-bootstrap';

const MassageCounter = ({ userMessages = [] }) => {
    return (
        <div>
            <Table striped bordered>
                <tbody>
                    {userMessages.map((msg, index) => (
                        <tr key={index}>
                            <td>{msg.user} - {msg.message}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            ss
        </div>
    );
}

export default MassageCounter;
