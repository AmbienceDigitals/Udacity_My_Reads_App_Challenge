import {Component} from 'react';
import {Link} from 'react-router-dom';
import serializeForm from 'form-serialize';
import ImageInput from './ImageInput'

class CreateContact extends Component {
    // function to prevent default form behaviour
    handleSubmit = (e) => {
        e.preventDefault()
        // query to serialize the url into an object
        const values = serializeForm(e.target, {hash: true});
        // using props to push values to App.js
        this.props.onCreateContact(values);
    }
    render() {
        return (
            <div>
                <Link to="/" className='close-create-contact'>
                    Close
                </Link>
                <form
                onSubmit={this.handleSubmit}
                className='create-contact-form'>
                    <ImageInput
                    className="create-contact-avatar-input"
                    name="avatarURL"
                    maxHeight={64}>
                    </ImageInput>

                    <div className="create-contact-details">
                        <input type="text" name="name" placeholder="Name"></input>
                        <input type="email" name="email" placeholder="Email"></input>
                        <button>Add Contact</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateContact;