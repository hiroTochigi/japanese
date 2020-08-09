import React from 'react';
import "./Form.css"

class Form extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
    }
  
    handleChange = (event) => {
      this.props.handleChange(event.target.value)
    }
  
    handleSubmit = (event) => {
      this.props.handleSubmit()
    }

    render() {
      const sentence = this.props.sentence
      return (
        <div className="form-box">
            <p>Enter Japanese Sentence</p>
            <div className="form">
              <input type="search" value={sentence}
                  onChange={this.handleChange}/>
              <input type="submit"
              onClick={this.handleSubmit} />
            </div>
        </div>
      );
    }
  }

export default Form;