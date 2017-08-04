import React, { PureComponent } from 'react';
import './App.css';

const TITLE='TITLE';
const COL='COL';

class App extends PureComponent { 
  constructor() {
    super();
    this.state = {
      cols: [
        {_id: "col1", name: "Mocks", choices: [{value: "in progress", color: "yellow"}, {value: "need more love", color: "red"}, {value: "done", color: "green"}, {value: "postponed"}]},
        {_id: "col2", name: "Tests", choices: [{value: "fail", color: "red"}, {value: "pass", color: "green"}]}
      ],
      rows: [
        {_id: "row1", title: "Table overview", colvalues: {col1: "need more love", col2: "fail"}},
        {_id: "row2", title: "Details view", colvalues: {col1: "in progress"}}
      ],
      sort: {
        what: null,
        colid: null,
        desc: false
      }
    };
  }

  doSort(what, colid) {
  }

  render() {
    return (<table>
      <tr>
        <th><span>Title</span> <a className="link" onClick={(() => this.doSort(TITLE)).bind(this)}>^v</a><th>
        {this.state.cols.map((c) => (<th><span>{}</span> <a className="link" onClick={(() => this.doSort(COL, c._id)).bind(this)}>^v</a></th>))}
      </tr>
      {this.state.rows.map((r) => <tr>
      
      </tr>)}
    </table>);
  }
}

export default App;
