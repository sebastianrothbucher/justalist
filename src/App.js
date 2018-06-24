import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import './App.css';
//import 'bootstrap-css-only/css/bootstrap.css'
import { TableComponent } from './components/table';
import { ChoiceComponent } from './components/choice';
import { loadCols as loadColsAction, loadRows as loadRowsAction, filter as filterAction, sort as sortAction, editRow as editRowAction, registerNotify as registerNotifyAction } from './redux/actions';

class App extends PureComponent {
    constructor() {
        super();
        this.state = {}; // (nth so far)
    }

    componentDidMount() { // load what we need
        this.props.loadCols();
        this.props.loadRows();
        this.props.registerNotify();
    }

    createEditor(row, colId, editCallback) { // TODO: distinguish between col types
        return (<ChoiceComponent xpand={true} choices={this.props.cols.find((c) => (c._id === colId)).choices} 
            value={(this.props.cols.find((c) => (c._id === colId)).choices.find((c) => c.value === row.colvalues[colId]) || null)} 
            onChange={(choice) => editCallback(choice ? choice.value : null)} />);
    }

    render() { // (one could do a lot of styling)
        return (<div>
            <div><label className="filterbar"><span className="fa fa-filter"></span><input type="search" value={this.props.filter || ''} onInput={(event) => this.props.doFilter(event.target.value)} /></label></div>
            <TableComponent tableClassName="table" cols={this.props.cols} rows={this.props.rowsSorted || this.props.rowsFiltered || this.props.rows} sort={this.props.sort}
                onSort={(what, colid) => this.props.doSort(what, colid, (this.props.sort && this.props.sort.what === what && this.props.sort.colid === colid) ? (!this.props.sort.desc) : false)}
                onRowEdit={(newRow) => this.props.doEditRow(newRow)}
                editorFactory={this.createEditor.bind(this)} />
        </div>);
    }
}

const mapStateToProps = state => ({...state, cols: (state.cols || []), rows: (state.rows || [])}); // we need all, eff'ly

const mapDispatchToProps = dispatch => ({
    loadCols: () => dispatch(loadColsAction()),
    loadRows: () => dispatch(loadRowsAction()),
    registerNotify: () => dispatch(registerNotifyAction()),
    doFilter: (val) => dispatch(filterAction(val)),
    doSort: (what, colid, desc) => dispatch(sortAction(what, colid, desc)),
    doEditRow: (newRow) => dispatch(editRowAction(newRow))
});

export { App as vanilla };
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
