import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

export const TITLE = 'TITLE';
export const COL = 'COL';

export class TableComponent extends PureComponent {

    render() {
        return (<table>
            <thead>
                <tr>
                    <th><span>Title</span> <a className="link" onClick={(() => (this.props.onSort ? this.props.onSort(TITLE) : null)).bind(this)}>^v</a></th>
                    {this.props.cols.map((c) => (<th key={c._id}><span>{c.name}</span> <a className="link" onClick={(() => (this.props.onSort ? this.props.onSort(COL, c._id) : null)).bind(this)}>^v</a></th>))}
                </tr>
            </thead>
            <tbody>
                {this.props.rows.map((r) => (<tr key={r._id}>
                    <td>{r.title || ''}</td>
                    {this.props.cols.map((c) => (<td key={c._id} style={{ backgroundColor: ((c.choices.filter((ch) => ch.value == r.colvalues[c._id])[0] || {}).color || 'white') }}>{r.colvalues[c._id] || ''}</td>))}
                </tr>))}
            </tbody>
        </table>);
    }
}

TableComponent.propTypes = {
    cols: PropTypes.arrayOf(PropTypes.object).isRequired,
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSort: PropTypes.func,
    editorFactory: PropTypes.func, // when we do more than display
};
