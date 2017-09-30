import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './choice.css';

export class ChoiceComponent extends PureComponent {

    constructor() {
        super();
        this.state = {
            selIndex: -1
        };
    }

    resetSel() {
        this.setState({
            selIndex: -1
        });
    }

    _onKeyDown(event) { // TODO: fallback 2 keyCode
        let currIndex = this.state.selIndex;
        if ("ArrowDown" === event.key) {
            currIndex++;
            if (currIndex >= this.choices.length) {
                currIndex = 0;
            }
            this.setState({
                selIndex: currIndex
            });
        } else if ("ArrowUp" === event.key) {
            currIndex--;
            if (currIndex < 0) {
                currIndex = (this.choices.length - 1);
            }
            this.setState({
                selIndex: currIndex
            });
        } else if ("Enter" === event.key) {
            if (this.props.onChange) {
                this.props.onChange(this.props.choices[currIndex]);
            }
        } else if ("Backspace" === event.key) {
            if (this.props.onChange) {
                this.props.onChange(null);
            }
        }
    }

    render() {
        return (<span className="choice" role="listbox">
            <span className="suggestPos" tabIndex="0" onFocus={this.resetSel.bind(this)} onBlur={this.resetSel.bind(this)} onKeyDown={this._onKeyDown.bind(this)}>
                <span className="current" style={{backgroundColor: ((this.props.value ? this.props.value.color : undefined) || 'white')}}>{this.props.value ? this.props.value.value : ''}</span>
                <span className="clear" onClick={() => (this.props.onChange ? this.props.onChange(null) : null)}></span>
                <ul className="suggestContent">
                    {this.props.choices.map((c, i) => (
                        <li key={i} role="option" onClick={() => (this.props.onChange ? this.props.onChange(c) : null)} aria-selected={this.state.selIndex === i ? 'selected' : null} className={this.state.selIndex === i ? 'sel' : ''} style={{backgroundColor: (c.color || 'white')}}>{c.value}</li>
                    ))}
                </ul>
            </span>
        </span>);
    }
}

ChoiceComponent.propTypes = {
    choices: PropTypes.arrayOf(PropTypes.shape({value: PropTypes.string.isRequired, color: PropTypes.string})).isRequired,
    value: PropTypes.shape({value: PropTypes.string.isRequired, color: PropTypes.string}),
    onChange: PropTypes.func // gets new value as {value, color?} (null for empty)
}