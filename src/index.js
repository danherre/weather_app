import react from 'react';
import reactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Loader from './Loader';

class App extends react.Component {
    state = { latitude: null, errorMessage: "" };

    renderHelper() {
        if (this.state.errorMessage) {
            return <div>Error: {this.state.errorMessage} </div>
        }
        else if (this.state.latitude) {
            return <SeasonDisplay lat={this.state.latitude}/>
        }
        return <Loader message="Please accept location request"/>
    }

    render() {
        return (
            <div>
                {this.renderHelper()}
            </div>
        );
    }

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (GeolocationPosition) => this.setState({ latitude: GeolocationPosition.coords.latitude }),
            (err) => this.setState({ errorMessage: err.message})
        );

    }
};

reactDOM.render(
    <App />,
    document.getElementById('root')
);