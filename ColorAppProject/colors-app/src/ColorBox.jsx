import React, { Component } from 'react';
import CopyToClipBoard from 'react-copy-to-clipboard';
import './ColorBox.css';

class ColorBox extends Component {
    constructor(props){
        super(props);
        this.state = {copied: false};
        this.changeCopyState = this.changeCopyState.bind(this);

    }
    changeCopyState(){
        this.setState({copied: true}, () => {
            setTimeout(() => {this.setState({copied:false})}, 1500);
        });
    }

    render() {
        const { name, background } = this.props;
        const {copied} = this.state;
        return (
            /*
            * onCopy property is a property provided by the Copy to Clip board package.
            * It gets triggered when we click and the thing gets copied
            * 
            * In the app, when we click one of the colors, we get an overlay that stays for
            * some time and then goes back to the color paletter. The way we created the overlay
            * was just using pure css, and then when clicked, we set the copied to true, and 
            * if that is true, we show the overlay by manipulating the class. 
            * 
            * On the click, we trigger the changeCopystate function, that keeps the copied to
            * true for 1.5 s and then set it to false. So for 1.5 s the css class for the overlay 
            * stays active then it is not anymore
            * 
            * the class is called .copy-overlay.show.
            */
            <CopyToClipBoard text={this.props.background} onCopy = {this.changeCopyState}>
                {/* this is equivalent to style = {{background: background}} */}
                <div className='ColorBox' style={{ background }} >
                    <div className={`copy-overlay ${copied && "show"}`} style={{ background }} />
                    <div className={`copy-msg ${copied && "show"}`}>
                        <h1>Copied</h1>
                        <p>{this.props.background}</p>
                    </div>
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

