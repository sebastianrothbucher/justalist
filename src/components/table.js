import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { matchingForeground, determineBackground } from '../util/colorUtil';

export const TITLE = 'TITLE';
export const COL = 'COL';

const TITLE_WIDTH = 40; // %
const ACTION_WIDTH = 120; // px

export class TableComponent extends PureComponent {

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
        const sortStyle = (what, colid) => ((this.props.sort && what === this.props.sort.what && (COL !== this.props.sort.what || colid === this.props.sort.colid)) ? (this.props.sort.desc ? "fa-sort-down" : "fa-sort-up") : "fa-unsorted");
        return (<table className={this.props.tableClassName}>
            <thead className={this.props.theadClassName}>
                <tr>
                    <th style={{ width: TITLE_WIDTH + "%" }}><span>Title</span> <span role="button" className={"link fa " + sortStyle(TITLE)} onClick={() => (this.props.onSort ? this.props.onSort(TITLE) : null)}></span></th>
                    {this.props.cols.map((c) => (
                        <th key={c._id} style={{ width: Math.floor((100 - TITLE_WIDTH) / this.props.cols.length) + "%" }}><span>{c.name}</span> <span role="button" className={"link fa " + sortStyle(COL, c._id)} onClick={() => (this.props.onSort ? this.props.onSort(COL, c._id) : null)}></span></th>
                    ))}
                    <th style={{ width: ACTION_WIDTH + "px" }}></th>
                </tr>
            </thead>
            <tbody className={this.props.tbodyClassName}>
                {this.props.rows.map((r) => (this.state.editRow && this.state.editRow.get('_id') === r._id)?( // TODO: dropdown 4 title, external links in add 2 edit (open on focus/hover)
                    <tr key={r._id}>
                        <td style={{ width: TITLE_WIDTH + "%" }}><input value={this.state.editRow.get('title') || ''} onChange={(event) => this.changeEditRowTitle(event.target.value)} /></td>
                        {this.props.cols.map((c) => (
                            <td key={c._id} style={{ backgroundColor: determineBackground(c, r), color: matchingForeground(determineBackground(c, r)), width: Math.floor((100 - TITLE_WIDTH) / this.props.cols.length) + "%" }}>{this.props.editorFactory ? this.props.editorFactory(this.state.editRow.toJS(), c._id, (val) => (this.changeEditRowCol(c._id, val))) : (<input value={this.state.editRow.get('colvalues').get(c._id) || ''} onChange={(event) => (this.changeEditRowCol(c._id, event.target.value))} />)}</td>
                        ))}
                        <td style={{ minWidth: ACTION_WIDTH + "px" }}><small><a className="link" onClick={() => this.closeEditRow(true)}>Save</a> <a className="link" onClick={() => this.closeEditRow()}>Discard</a></small></td>
                    </tr>
                ):(
                    <tr key={r._id}>
                        <td style={{ width: "40%" }}>{r.title || ''}</td>
                        {this.props.cols.map((c) => (
                            <td key={c._id} style={{ backgroundColor: determineBackground(c, r), color: matchingForeground(determineBackground(c, r)), width: Math.floor((100 - TITLE_WIDTH) / this.props.cols.length) + "%" }}>{r.colvalues[c._id] || ''}</td>
                        ))}
                        <td style={{ minWidth: ACTION_WIDTH + "px" }}><small><a className="link" onClick={() => this.startEditRow(r)}>Edit</a></small></td>
                    </tr>
                ))}
            </tbody>
        </table>); // TODO: tfoot for several rows at once
    }
}

TableComponent.propTypes = {
    cols: PropTypes.arrayOf(PropTypes.shape({_id: PropTypes.any, name: PropTypes.string.isRequired, choices: PropTypes.arrayOf(PropTypes.shape({value: PropTypes.string.isRequired, color: PropTypes.string}))})).isRequired,
    rows: PropTypes.arrayOf(PropTypes.shape({_id: PropTypes.any, title: PropTypes.string.isRequired, colvalues: PropTypes.objectOf(PropTypes.string)})).isRequired,
    sort: PropTypes.shape({}), // null or info on which sort to display
    onSort: PropTypes.func, // gets type as TITLE/COL and (for latter) col id
    onOpenDetails: PropTypes.func, // TODO: actually trigger; gets row, open details in main app
    onRowEdit: PropTypes.func, // when a row was edited - gets deep copy of new row
    editorFactory: PropTypes.func, // when we do more than display; gets row, col id, callback for edit
    tableClassName: PropTypes.string,
    theadClassName: PropTypes.string,
    tbodyClassName: PropTypes.string,
};
