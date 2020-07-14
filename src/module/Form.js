import React from 'react';

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
        <div>
            <p>Enter Japanese Sentence</p>
            <div>
              <label>
                  Name:
                  <textarea value={sentence}
                  onChange={this.handleChange}/>
              </label>
              <input type="submit"
              onClick={this.handleSubmit} />
            </div>
        </div>
      );
    }
  }

export default Form;