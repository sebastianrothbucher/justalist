import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import './App.css';
//import 'bootstrap-css-only/css/bootstrap.css'
import { TableComponent, TITLE, COL } from './components/table';
import { ChoiceComponent } from './components/choice';
import { loadCols } from './redux/actions';

class App extends PureComponent {
    constructor() {
        super();
        this.state = { // most likely from a backend via componentMounted and poss. w/ real-time updates
            cols: [ // TODO: nicer colors, also nicer CSS for choice from pen
                { _id: "col1", name: "Mocks", choices: [{ value: "in progress", color: "yellow" }, { value: "need more love", color: "red" }, { value: "done", color: "green" }, { value: "postponed" }] },
                { _id: "col2", name: "Tests", choices: [{ value: "fail", color: "red" }, { value: "pass", color: "green" }] }
            ],
            rows: [
                { _id: "row1", title: "Table overview", colvalues: { col1: "need more love", col2: "fail" } },
                { _id: "row2", title: "Details view", colvalues: { col1: "in progress" } }
            ],
            rowsFiltered: null,
            sort: {
                what: null,
                colid: null,
                desc: false
            },
            filter: null
        };
    }

    doFilter(filter, rows) { // (for large data sets, we'd need the backend; and we could do more advanced filtering)
        this.setState({
            rowsFiltered: this._filterRows(filter, this.state.rows),
            filter: (filter || null)
        });
    }

    _filterRows(filter, rows) {
        let filterLower = filter ? filter.toLowerCase() : filter;
        return (filter ? [].concat(rows).filter((r) => (r.title || '').toLowerCase().indexOf(filterLower) >= 0 || Object.keys(r.colvalues).map((colid) => r.colvalues[colid]).filter((colvalue) => (colvalue || '').toLowerCase().indexOf(filterLower) >= 0).length > 0) : null);
    }

    doSort(what, colid) { // (for large data sets, we'd need the backend)
        let desc = ((!this.state.sort.desc) && this.state.sort.what === what && this.state.sort.colid === colid);
        this.setState({
            rows: [].concat(this.state.rows).sort((r1, r2) => {
                let v1 = ((TITLE === what ? r1.title : COL === what ? r1.colvalues[colid] : undefined) || '');
                let v2 = ((TITLE === what ? r2.title : COL === what ? r2.colvalues[colid] : undefined) || '');
                return (desc ? -1 : 1) * (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);
            }),
            sort: {
                what: what,
                colid: (COL === what ? colid : null),
                desc: desc
            }
        });
    }

    doRowEdit(newRow) { // remember: we're a pure component; TODO: with backend (and later re-calculate / re-validate)
        let newRows = this.state.rows.map((r) => (r._id === newRow._id ? newRow : r));
        this.setState({
            rows: newRows,
            rowsFiltered: this._filterRows(this.state.filter, newRows)
        });
    }

    createEditor(row, colId, editCallback) { // TODO: distinguish between col types
        return (<ChoiceComponent choices={this.state.cols.find((c) => (c._id === colId)).choices} 
            value={(this.state.cols.find((c) => (c._id === colId)).choices.find((c) => c.value === row.colvalues[colId]) || null)} 
            onChange={(choice) => editCallback(choice ? choice.value : null)} />);
    }

    render() { // (one could do a lot of styling)
        return (<div>
            <div><input type="search" value={this.state.filter || ''} onInput={(event) => this.doFilter(event.target.value)} /></div>
            <TableComponent cols={this.state.cols} rows={this.state.rowsFiltered || this.state.rows}
                onSort={this.doSort.bind(this)}
                onRowEdit={this.doRowEdit.bind(this)}
                editorFactory={this.createEditor.bind(this)} />
            <div>
                <button onClick={this.props.loadCols}>Load cols</button>
                <span>{(this.props.cols || []).join(', ')}</span>
            </div>
        </div>);
    }
}

const mapStateToProps = state => ({
    cols: state.cols
});

const mapDispatchToProps = dispatch => ({
    loadCols: () => dispatch(loadCols())
});

export { App as vanilla };
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
