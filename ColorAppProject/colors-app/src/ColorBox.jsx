import React, { Component } from 'react';
import CopyToClipBoard from 'react-copy-to-clipboard';
import './ColorBox.css';

class ColorBox extends Component {

    render() {
        const { name, background } = this.props;
        return (
            <CopyToClipBoard text={this.props.background}>
                {/* this is equivalent to style = {{background: background}} */}
                <div className='ColorBox' style={{ background }} >
                    <div className="copy-container">
                        <div className="box-content">
                            <span>{name}</span>
                        </div>
                        <button className="copy-button">Copy</button>
                    </div>
                    <span className="see-more">More</span>
                </div>
            </CopyToClipBoard>

                

        );
    }
}

export default ColorBox;

