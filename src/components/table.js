import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import '../App.css';

export const TITLE = 'TITLE';
export const COL = 'COL';

export class TableComponent extends PureComponent { // TODO: next: dropdown choice (from PEN!), one; then several rows at once

    constructor() {
        super();
        this.state = {};
    }

    startEditRow(r) { // use immutable w/in here (later poss. larger)
        this.setState({
            editRow: Immutable.fromJS(r)
        });
    }
    
    changeEditRowTitle(value) { // still immutable
        this.setState({
            editRow: this.state.editRow.mergeDeep({title: value})
        });
    }

    changeEditRowCol(colid, value) { // still immutable
        this.setState({
            editRow: this.state.editRow.mergeDeep({colvalues: {[colid]: value}})
        });
    }

    closeEditRow(save) { // (back from immutable)
        if (save && this.props.onRowEdit) {
            this.props.onRowEdit(this.state.editRow.toJS());
        };
        this.setState({
            editRow: null
        });
    }

    render() {
        return (<table>
            <thead>
                <tr>
                    <th><span>Title</span> <a className="link" onClick={() => (this.props.onSort ? this.props.onSort(TITLE) : null)}>^v</a></th>
                    {this.props.cols.map((c) => (
                        <th key={c._id}><span>{c.name}</span> <a className="link" onClick={() => (this.props.onSort ? this.props.onSort(COL, c._id) : null)}>^v</a></th>
                    ))}
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {this.props.rows.map((r) => (this.state.editRow && this.state.editRow.get('_id') === r._id)?( // TODO: dropdown 4 title, external links in add 2 edit (open on focus/hover)
                    <tr key={r._id}>
                        <td><input value={this.state.editRow.get('title') || ''} onChange={(event) => this.changeEditRowTitle(event.target.value)} /></td>
                        {this.props.cols.map((c) => (
                            <td key={c._id}>{this.props.editorFactory ? this.props.editorFactory(this.state.editRow.toJS(), c._id, (val) => (this.changeEditRowCol(c._id, val))) : (<input value={this.state.editRow.get('colvalues').get(c._id) || ''} onChange={(event) => (this.changeEditRowCol(c._id, event.target.value))} />)}</td>
                        ))}
                        <td><small><a className="link" onClick={() => this.closeEditRow(true)}>Save</a> <a className="link" onClick={() => this.closeEditRow()}>Discard</a></small></td>
                    </tr>
                ):(
                    <tr key={r._id}>
                        <td>{r.title || ''}</td>
                        {this.props.cols.map((c) => (
                            <td key={c._id} style={{ backgroundColor: ((c.choices.filter((ch) => ch.value === r.colvalues[c._id])[0] || {}).color || 'white') }}>{r.colvalues[c._id] || ''}</td>
                        ))}
                        <td><small><a className="link" onClick={() => this.startEditRow(r)}>Edit</a></small></td>
                    </tr>
                ))}
            </tbody>
        </table>);
    }
}

TableComponent.propTypes = {
    cols: PropTypes.arrayOf(PropTypes.shape({_id: PropTypes.any, name: PropTypes.string.isRequired, choices: PropTypes.arrayOf(PropTypes.shape({value: PropTypes.string.isRequired, color: PropTypes.string}))})).isRequired,
    rows: PropTypes.arrayOf(PropTypes.shape({_id: PropTypes.any, title: PropTypes.string.isRequired, colvalues: PropTypes.objectOf(PropTypes.string)})).isRequired,
    onSort: PropTypes.func, // gets type as TITLE/COL and (for latter) col id
    onOpenDetails: PropTypes.func, // TODO: actually trigger; gets row, open details in main app
    onRowEdit: PropTypes.func, // when a row was edited - gets deep copy of new row
    editorFactory: PropTypes.func, // when we do more than display; gets row, col id, callback for edit
};
