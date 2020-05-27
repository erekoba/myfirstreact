import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SwipeableRoutes from "react-swipeable-routes";

const RedView = () => (
    <div style={{ height: 300, backgroundColor: "red" }}>Red</div>
);
const BlueView = () => (
    <div style={{ height: 300, backgroundColor: "blue" }}>Blue</div>
);
const GreenView = () => (
    <div style={{ height: 300, backgroundColor: "green" }}>Green</div>
);
const YellowView = () => (
    <div style={{ height: 300, backgroundColor: "yellow" }}>Yellow</div>
);

class Swipableroute extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <div>
                        <Link to="/red">Red</Link> |<Link to="/blue">Blue</Link> |
                        <Link to="/green">Green</Link> |<Link to="/yellow">Yellow</Link>
                    </div>

                    <SwipeableRoutes>
                        <Route path="/red" component={RedView} />
                        <Route path="/blue" component={BlueView} />
                        <Route path="/green" component={GreenView} />
                        <Route path="/yellow" component={YellowView} />
                    </SwipeableRoutes>
                </div>
            </Router>
        );
    }
}

export default Swipableroute;