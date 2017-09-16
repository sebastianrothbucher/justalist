import React, { PureComponent } from 'react';
import './App.css';
//import 'bootstrap-css-only/css/bootstrap.css'
import { TableComponent, TITLE, COL } from './components/table';

class App extends PureComponent {
    constructor() {
        super();
        this.state = { // most likely from a backend via componentMounted and poss. w/ real-time updates
            cols: [
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

    doFilter(filter) { // (for large data sets, we'd need the backend; and we could do more advanced filtering)
        let filterLower = filter ? filter.toLowerCase() : filter;
        this.setState({
            rowsFiltered: (filter ? [].concat(this.state.rows).filter((r) => (r.title || '').toLowerCase().indexOf(filterLower) >= 0 || Object.keys(r.colvalues).map((colid) => r.colvalues[colid]).filter((colvalue) => (colvalue || '').toLowerCase().indexOf(filterLower) >= 0).length > 0) : null),
            filter: (filter || null)
        });
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

    // TODO: edit - inline (replace row w/ form) or sep. nav; replaces one row; will be delegated 2 backend (and later re-calculate / re-validate)

    render() { // (one could do a lot of styling)
        // TODO: select cols to show, supply editors, open details (including col.detailOnly)
        return (<div>
            <div><input type="search" value={this.state.filter || ''} onInput={((event) => this.doFilter(event.target.value)).bind(this)} /></div>
            <TableComponent cols={this.state.cols} rows={this.state.rowsFiltered || this.state.rows} onSort={this.doSort.bind(this)} />
        </div>);
    }
}

export default App;
