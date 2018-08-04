import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { matchingForeground } from '../util/colorUtil';
import styleRes from '../util/styleRes';
import styles from './choice.css';

export class ChoiceComponent extends PureComponent {

    constructor() {
        super();
        this.state = {
            selIndex: -1
        };
    }

    _setSel(what, stay) {
        if (this.props.onChange) {
            this.props.onChange(what);
        }
        if (!stay) {
            this.suggestPos.blur();
        }
    }

    _resetSel() {
        this.setState({
            selIndex: -1
        });
    }

    _onKeyDown(event) { // TODO: fallback 2 keyCode
        let currIndex = this.state.selIndex;
        if ("ArrowDown" === event.key) {
            currIndex++;
            if (currIndex >= this.props.choices.length) {
                currIndex = 0;
            }
            this.setState({
                selIndex: currIndex
            });
        } else if ("ArrowUp" === event.key) {
            currIndex--;
            if (currIndex < 0) {
                currIndex = (this.props.choices.length - 1);
            }
            this.setState({
                selIndex: currIndex
            });
        } else if ("Enter" === event.key) {
            this._setSel(this.props.choices[currIndex], true);
        } else if ("Backspace" === event.key) {
            this._setSel(null, true);
        }
    }

    render() {
        return (<span className={styleRes(styles, 'choice') + (this.props.xpand ? (" " + styleRes(styles, 'xpand')) : "")} role="listbox">
            <span className={styleRes(styles, 'suggestPos')} tabIndex="0" ref={(e) => this.suggestPos=e} onFocus={this._resetSel.bind(this)} onBlur={this._resetSel.bind(this)} onKeyDown={this._onKeyDown.bind(this)}>
                <span className={styleRes(styles, 'current')} style={{backgroundColor: ((this.props.value ? this.props.value.color : undefined) || 'white')}}>{this.props.value ? this.props.value.value : ''}</span>
                <span className={styleRes(styles, 'clear')} onClick={() => this._setSel(null)}></span>
                <ul className={styleRes(styles, 'suggestContent')}>
                    {this.props.choices.map((c, i) => (
                        <li key={i} role="option" onClick={() => this._setSel(c)} aria-selected={this.state.selIndex === i ? 'selected' : null} className={this.state.selIndex === i ? styleRes(styles, 'sel') : ''} style={{ backgroundColor: (c.color || "white"), color: matchingForeground(c.color || "white") }}>{c.value}</li>
                    ))}
                </ul>
            </span>
        </span>);
    }
}

ChoiceComponent.propTypes = {
    choices: PropTypes.arrayOf(PropTypes.shape({value: PropTypes.string.isRequired, color: PropTypes.string})).isRequired,
    value: PropTypes.shape({value: PropTypes.string.isRequired, color: PropTypes.string}),
    onChange: PropTypes.func, // gets new value as {value, color?} (null for empty)
    xpand: PropTypes.bool,
}