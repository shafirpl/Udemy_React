class Machine extends React.Component {
    render() {
        let msg;
        if ((this.props.s1 === this.props.s2) && (this.props.s2 === this.props.s3) && (this.props.s3 === this.props.s1)) {
            msg = 
                <div>
                    < p > {this.props.s1} {this.props.s2} {this.props.s3} </p>
                    <p> You Win </p>
                </div>
        }
        else{
            msg = 
                <div>
                    <p>{this.props.s1} {this.props.s2} {this.props.s3}</p>
                    <p>You Lose</p>
                </div>
        }
        return ( 
        <div> {msg} </div>)
            
            
    }
}