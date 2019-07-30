import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import MiniPallete from './MiniPallete.jsx';
import { withStyles } from '@material-ui/styles';

const styles = {
    root: {
        backgroundColor: "blue",
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap"
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        color: "white"
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "5%"
    }
};

class Palettelist extends Component {
    // constructor(props) {
    //     super(props);
    //     this.goToPalette = this.goToPalette.bind(this);
    // }
    goToPalette(id){
        this.props.history.push(`/palette/${id}`);
    }

    render() {
        const { palettes, classes } = this.props;

        return (
            <div className = {classes.root} >
                <div className = {classes.container}>
                    <nav className = {classes.nav}>
                        <h1>React Colors</h1>
                    </nav>
                    <div className={classes.palettes}>
                        {/* 
                        * So the way we navigate is we can do <redirect> or
                        * history.push where (history.push) we pass in the id or something
                        * and that will navigate/render that component.
                        * So when we open up the app, we see mini palletes/boxes 
                        * and when we click on the miniboxes/palettes we got navigated
                        * to the actual palette. We are doing it here using history.push,
                        * each history.push will have the id of that palette, and will
                        * be triggered when we click on the minipalettes.
                        * The handleclick props will have the palette id and gets rendered with
                        * each corresponding minibox/palette and in their we trigger it with onClick,
                        * that onClick will then trigger the function with the palette.id
                        * https://www.udemy.com/modern-react-bootcamp/learn/lecture/14384658?start=15#questions
                        * Watch from 5:30 to understand what is going on
                        */}
                        {palettes.map((palette) => (
                            <MiniPallete {...palette} handleClick = {()=> this.goToPalette(palette.id)}/>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Palettelist);