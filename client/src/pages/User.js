import React,{Component} from 'react';
import UncontrolledTextField from '../utilities/TextField'
class Home extends Component { 
    constructor(props){
      super(props)
      this.state = {}
    }

    addURL = async(url) => {
        //this.props.addVideo(this.props.app.pendingURL)
        this.props.addVideo(url);
    }

    render(){
        return (
            <div>
                <h1>Home Page</h1>
                <div>
                    <UncontrolledTextField label='Enter URL' addValue={this.addURL}/>
                    <ul>
                        {this.props.app.userVideos.map((vid)=>{
                        return <li>{vid}</li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Home;