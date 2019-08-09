import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CopyToClipBoard from 'react-copy-to-clipboard';
import './ColorBox.css';

class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = { copied: false };
        this.changeCopyState = this.changeCopyState.bind(this);

    }
    changeCopyState() {
        this.setState({ copied: true }, () => {
            setTimeout(() => { this.setState({ copied: false }) }, 1500);
        });
    }

    render() {
        const { name, background, paletteId, id, moreUrl } = this.props;
        const { copied } = this.state;
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
            <CopyToClipBoard text={this.props.background} onCopy={this.changeCopyState}>
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
                    {/* 
                    * The problem with this approach is that,
                    * we have the copy animation firing up whenever
                    * we click on any part of this color box because 
                    * the function is triggered on anywhere we click.
                    * That also includes this link tag, since they are
                    * part of the whole colorbox as well. This is not 
                    * a very good user experience.
                    * The way we fix it to use a function called stop propagation, it 
                    * takes the event object and calls the function on that event
                    * It will prevent the onCopy property to fire up the function
                    * that has been assigned to it
                    * https://www.udemy.com/modern-react-bootcamp/learn/lecture/14384664#questions
                    * Watch from 3:29 to get idea how that function works
                    */}
                    {/* <Link exact to="/">
                        <span className="see-more">More</span>
                    </Link> */}

                    {/*
                    * Here %7D was being added at the end of my url,
                    * turns out it was coming from an unnecessary extra
                    * } bracket
                    * https://stackoverflow.com/questions/38997380/syntax-react-single-quote-double-quote-link-to-link
                    * So it was like this {`/palette/${paletteId}/${id}}`}
                    * Notice the extra } after id
                    */}

                    {/* <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}> */}
                    <Link to={moreUrl} onClick={e => e.stopPropagation()}>
                        <span className="see-more">More</span>
                    </Link>

                </div>
            </CopyToClipBoard>



        );
    }
}

export default ColorBox;

